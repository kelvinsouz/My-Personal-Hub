import { Body, Controller, Post, Get } from '@nestjs/common'
import { ContasReceberService } from './contas-receber.service'
import { CreateContaReceberDto } from './dto/create-conta-receber.dto'

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

}