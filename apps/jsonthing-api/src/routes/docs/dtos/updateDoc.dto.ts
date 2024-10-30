import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateDocDto {
    @IsString()
    @IsOptional()
    content?: object

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string
}
