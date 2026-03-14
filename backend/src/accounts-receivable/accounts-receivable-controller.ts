import { Body, Controller, Post, Get, Put, Param } from '@nestjs/common'
import { AccountsReceivableService } from './accounts-receivable-service'
import { CreateReceivableDto } from './dto/create-receivable.dto'
import { UpdateReceivableDto } from './dto/update-receivable.dto'

@Controller('accounts-receivable')
export class AccountsReceivableController {
    constructor(private readonly accountsReceivableServiceFunctions: AccountsReceivableService) { }

    @Post()
    createAccountReceivable(
        @Body() accountReceivable: CreateReceivableDto
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