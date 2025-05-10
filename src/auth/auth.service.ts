import { BadRequestException, Injectable } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	async register(dto: AuthDto) {
		const olsUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (olsUser)
			throw new BadRequestException('User with this email already exists')

		const newUser = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: faker.person.fullName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number(),
				password: await hash(dto.password)
			}
		})

		return newUser
	}
}
