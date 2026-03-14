import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common'
import { ContasReceberService } from './contas-receber.service'
import { CreateContaReceberDto } from './dto/create-conta-receber.dto'
import { UpdateReceivableDto } from './dto/update-receivable.dto'

@Controller('contas-receber')
export class ContasReceberController {
    constructor(private readonly accountsReceivableServiceFunctions: ContasReceberService) { }

    @Post()
    createAccountReceivable(
        @Body() accountReceivable: CreateContaReceberDto
    ) {
        return this.accountsReceivableServiceFunctions.insertAccountReceivable(accountReceivable)
    };

    @Get()
    getAllAccountsReceivable() {
        return this.accountsReceivableServiceFunctions.getAllAccountsReceivable()
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateReceivableDto: UpdateReceivableDto
    ) {
        return this.accountsReceivableServiceFunctions.updateAccountReceivable(Number(id), updateReceivableDto);
    }
}