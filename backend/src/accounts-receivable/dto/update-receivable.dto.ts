import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator'

export class UpdateReceivableDto {

    @IsNumber()
    account_receivable_id: number

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    value: number

    @IsOptional()
    @IsNumber()
    account_receivable_category_id: number

    @IsOptional()
    @IsString()
    status: string
}