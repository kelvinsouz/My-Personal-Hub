import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateReceivableDto {

    @IsNumber()
    idaccount_receivable: number

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    value: number

    @IsOptional()
    @IsString()
    category: string

    @IsOptional()
    @IsString()
    status: string
}