import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	getAll() {
		// return this.prisma.category.findMany({
		// 	select: {
		// 		id: true,
		// 		name: true,
		// 		image: true,
		// 		createdAt: true,
		// 		updatedAt: true
		// 	}
		// })
		return ['Category 1', 'Category 2', 'Category 3']
	}
}
