import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateReceivableDto {

    @IsNumber()
    idconta_receber: number

    @IsOptional()
    @IsString()
    descricao: string

    @IsOptional()
    @IsNumber()
    valor: number

    @IsOptional()
    @IsString()
    categoria: string

    @IsOptional()
    @IsString()
    status: string
}