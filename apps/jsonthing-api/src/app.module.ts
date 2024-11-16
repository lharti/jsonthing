import { appConfigValidationSchema } from '@/config/app.config'
import { DatabaseModule } from '@/database.module'
import { DocsModule } from '@/routes/docs'
import { HealthzModule } from '@/routes/healthz'
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
        HealthzModule,
    ],
})
export class AppModule {}
