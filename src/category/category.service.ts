import { returnCategoryObject } from './return-category.object'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './dto/category.dto'
import { generateSlug } from './../generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany({
			select: returnCategoryObject
		})
	}

	async getById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			}
		})
		if (!category) throw new Error('Category not found')
		return category
	}

	async getBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			}
		})
		if (!category) throw new Error('Category not found')
		return category
	}

	async create(dto: CategoryDto) {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
				image: ''
			}
		})
	}

	async update(id: string, dto: CategoryDto) {
		return await this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: generateSlug(dto.name),
				image: dto.image
			}
		})
	}

	async delete(id: string) {
		return await this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
