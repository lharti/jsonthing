import * as Joi from 'joi'

export interface AppConfig {
    PORT: number

    DB_URI: string
    DB_NAME: string
}

export const appConfigValidationSchema = Joi.object({
    PORT: Joi.number().required(),

    DB_URI: Joi.string().required(),
    DB_NAME: Joi.string().required(),
})
