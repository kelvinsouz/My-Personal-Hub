import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateReceivableCategoryDto {

    @IsNumber()
    idaccount_receivable_category: number

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    color: number
}