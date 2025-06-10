import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import path from 'app-root-path'
import { ServeStaticModule } from '@nestjs/serve-static'
console.log('path', path)
@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		CategoryModule,
		ProductModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
