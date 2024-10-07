import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateDocDto {
    @IsString()
    @IsOptional()
    content?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string
}
