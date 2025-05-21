import { generateSlug } from './../generate-slug'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './dto/product.dto'
import { CategoryService } from 'src/category/category.service'
import { returnProductObject } from './return-product.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private categoryService: CategoryService
	) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return await this.prisma.product.findMany({
			select: returnProductObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	async search(searchTerm: string) {
		return await this.prisma.product.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					},
					{
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			},
			select: returnProductObject
		})
	}

	async getBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Product not found')
		return product
	}

	async getByCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObject
		})
		if (!products) throw new Error('Products not found')
		return products
	}

	async create(dto: ProductDto) {
		const { name, description, image, price, categoryId } = dto

		await this.categoryService.getById(categoryId)

		return this.prisma.product.create({
			data: {
				name,
				slug: generateSlug(dto.name),
				image,
				description,
				price,
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async update(id: string, dto: ProductDto) {
		const { name, description, image, price, categoryId } = dto

		await this.categoryService.getById(categoryId)

		return await this.prisma.product.update({
			where: {
				id
			},
			data: {
				name,
				description,
				price,
				slug: generateSlug(name),
				image,
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: string) {
		return await this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
