import { appConfigValidationSchema } from '@/config/app.config'
import { DatabaseModule } from '@/database.module'
import { DocsModule } from '@/routes/docs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,

            validationSchema: appConfigValidationSchema,
        }),

        DatabaseModule,

        // API ROUTES
        DocsModule,
    ],
})
export class AppModule {}
