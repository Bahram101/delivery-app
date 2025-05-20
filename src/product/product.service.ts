import { generateSlug } from './../generate-slug';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  // async getAll() {
  //   return await this.prisma.product.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       image: true,
  //       createdAt: true,
  //       updatedAt: true
  //     }
  //   })
  // }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        slug
      }
    })
    if (!product) throw new Error('product not found')
    return product
  }

  async create(dto: ProductDto) {
    return this.prisma.product.create({
      data: {
        name: '',
        slug: '',
        image: ''
      }
    })
  }

  async update(id: string, dto: ProductDto) {
    return await this.prisma.product.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image
      }
    })
  }

  async delete(id: string) {
    return await this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
