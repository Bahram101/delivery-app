import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDto } from './dto/product.dto'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.productService.getAll(searchTerm)
	}

	@Get('/by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.productService.getBySlug(slug)
	}

	@Get('/by-category/:categorySlug')
	async getByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.getByCategory(categorySlug)
	}

	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	@Post()
	async create(@Body() dto: ProductDto) {
		return this.productService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.productService.delete(id)
	}
}
