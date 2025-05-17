import { Body, Controller, Get, Param } from '@nestjs/common'
import { CategoryService } from './category.service'

@Controller('category')
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.categoryService.getById(id)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.categoryService.getBySlug(slug)
	}
}
