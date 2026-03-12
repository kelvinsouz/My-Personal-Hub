import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class CreateContaReceberDto {
    @IsString()
    descricao: string

    @IsNumber()
    valor: number

    @IsString()
    categoria: string

    @IsString()
    status: string
}