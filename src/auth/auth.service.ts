import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { log } from 'console'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

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
		const tokens = await this.issueTokens(newUser.id)
		return {
			user: this.returnUserFields(newUser),
			...tokens
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Invalid refresh token')
		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})
		const tokens = await this.issueTokens(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: string) {
		const data = { id: userId }
		const accessToken = await this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = await this.jwt.sign(data, {
			expiresIn: '7d'
		})
		return { accessToken, refreshToken }
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})
		const isValidPassword = await verify(user.password, dto.password)

		if (!user || !isValidPassword) {
			throw new UnauthorizedException('Invalid email or password')
		}

		return user
	}
}
