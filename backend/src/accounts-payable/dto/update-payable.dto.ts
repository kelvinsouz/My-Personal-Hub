import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdatePayableDto {

    @IsNumber()
    account_payable_id: number

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    value: number

    @IsOptional()
    @IsNumber()
    account_payable_category_id: number

    @IsOptional()
    @IsString()
    status: string
}