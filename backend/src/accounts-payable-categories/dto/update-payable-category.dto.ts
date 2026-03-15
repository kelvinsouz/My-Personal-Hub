import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdatePayableCategoryDto {

    @IsNumber()
    account_payable_category_id: number

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