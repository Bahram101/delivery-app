import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.category.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				createdAt: true,
				updatedAt: true
			}
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

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: '',
				image: ''
			}
		})
	}
}
