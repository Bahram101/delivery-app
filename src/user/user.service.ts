import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					orderBy: {
						createdAt: 'asc'
					},
					select: {
						product: {
							select: {
								id: true,
								name: true,
								price: true,
								image: true,
								slug: true,
								category: {
									select: {
										name: true,
										slug: true
									}
								}
							}
						}
					}
				},
				...selectObject
			}
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user
	}

	async toggleFavorite(userId: string, productId: string) {
		const user = await this.getById(userId)

		if (!user) throw new NotFoundException('User not found')

		const isExists = await this.prisma.favorite.findFirst({
			where: {
				userId,
				productId
			}
		})

		if (isExists) {
			await this.prisma.favorite.delete({
				where: {
					userId_productId: {
						userId,
						productId
					}
				}
			})
		} else {
			await this.prisma.favorite.create({
				data: {
					userId,
					productId
				}
			})
		}
		return { message: 'Success' }
	}

	async getAllUsers() {
		return await this.prisma.user.findMany()
	}
}
