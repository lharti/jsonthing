import { Json } from '@/common/types'
import { toJson } from '@/common/utils'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateDocDto {
    @Transform(({ value }) => toJson(value))
    @IsOptional()
    content?: Json

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    title?: string
}
