import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppConfig } from './config/app.config'

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    })

    app.useGlobalPipes(new ValidationPipe())

    const appConfig = app.get(ConfigService<AppConfig>)

    const port = appConfig.get<number>('PORT', 3000)

    await app.listen(port)

    console.log(`Application is running on: ${await app.getUrl()}`)
}

if (require.main === module) {
    bootstrap()
}
