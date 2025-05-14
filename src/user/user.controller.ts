import {
	Controller,
	Get,
	HttpCode,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Get('get-all')
	getAll() {
		return this.userService.getAllUsers()
	}
}
