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
import { UserService } from 'src/user/user.service'
@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private userService: UserService
	) { }

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

	// async getNewTokens(refreshToken: string) {
	// 	console.log('getNewTokens', refreshToken)
	// 	const result = await this.jwt.verifyAsync(refreshToken)
	// 	if (!result) throw new UnauthorizedException('Invalid refresh token')

	// 	const user = await this.userService.getById(result.id)

	// 	const tokens = await this.issueTokens(user.id)

	// 	return {
	// 		user: this.returnUserFields(user),
	// 		...tokens
	// 	}
	// }

	async getNewTokens(refreshToken: string) {
		try {
			const result = await this.jwt.verifyAsync(refreshToken)

			const user = await this.userService.getById(result.id)
			const tokens = await this.issueTokens(user.id)

			return {
				user: this.returnUserFields(user),
				...tokens
			}
		} catch (error) {

			if (error.name === 'TokenExpiredError') {
				throw new UnauthorizedException('jwt expired')
			}

			throw error
		}
	}

	private async issueTokens(userId: string) {
		// console.log('issueTokensUserId', userId)
		const data = { id: userId }
		const accessToken = await this.jwt.sign(data, {
			expiresIn: '10s'
		})

		const refreshToken = await this.jwt.sign(data, {
			expiresIn: '25s'
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
