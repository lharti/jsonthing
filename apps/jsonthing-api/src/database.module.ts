import { AppConfig } from '@/config/app.config'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService<AppConfig>) => {
                return {
                    uri: configService.get('DB_URI'),
                    dbName: configService.get('DB_NAME'),
                }
            },

            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
