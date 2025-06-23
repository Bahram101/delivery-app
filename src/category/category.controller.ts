import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('categories')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get('')
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.categoryService.getById(id)
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.getBySlug(slug)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	@HttpCode(200)
	@UsePipes(ValidationPipe)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
