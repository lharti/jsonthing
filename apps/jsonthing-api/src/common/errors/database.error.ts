import mongoose from 'mongoose'
import { CustomError } from 'ts-custom-error'

export class DatabaseError extends CustomError {
    public cause?: Error

    constructor(message: string, cause: mongoose.Error) {
        super(`${message}  ${cause.message}`)

        this.cause = cause
    }
}
