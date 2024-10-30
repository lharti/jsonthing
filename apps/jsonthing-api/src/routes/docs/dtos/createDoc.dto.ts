import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDocDto {
    @IsString()
    @IsOptional()
    content?: object

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string
}
