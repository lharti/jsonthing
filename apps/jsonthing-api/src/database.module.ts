import { databaseConfig } from '@/config/database.config'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfig)],

            useFactory: databaseConfig => ({
                uri: databaseConfig.get('uri'),
                dbName: databaseConfig.get('name'),
            }),

            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
