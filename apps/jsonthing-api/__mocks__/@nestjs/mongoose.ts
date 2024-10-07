import {
    ModelDefinition,
    MongooseModuleOptions,
} from '@nestjs/mongoose'

class MongooseModule {
    static config: MongooseModuleOptions
    static injected: unknown[]
    static models: ModelDefinition[]

    // @ts-expect-error - its a mock dude, chill
    static forRootAsync({ useFactory, inject }) {
        const configService = {
            get: (key: string) => `${key}_VALUE`,
        }

        this.config = useFactory(configService)
        this.injected = inject

        return {
            module: MongooseModule,
        }
    }

    static forFeature(models: ModelDefinition[]) {
        this.models = models

        return {
            module: MongooseModule,
        }
    }
}

const actualMongooseModule = jest.requireActual('@nestjs/mongoose')

module.exports = {
    ...actualMongooseModule,
    MongooseModule,
}
