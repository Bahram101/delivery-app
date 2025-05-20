import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Put
} from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductDto } from './dto/product.dto'

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@HttpCode(200)
	@Post()
	async create(@Body() dto: ProductDto) {
		return this.productService.create(dto)
	}

	@Get('get-all')
	async getAll() {
		return this.productService.getAll()
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(id, dto)
	}
}
