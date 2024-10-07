import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDocDto {
    @IsString()
    @IsOptional()
    content?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string
}
