import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateReceivableCategoryDto {

    @IsNumber()
    account_receivable_category_id: number

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsString()
    color: number
}