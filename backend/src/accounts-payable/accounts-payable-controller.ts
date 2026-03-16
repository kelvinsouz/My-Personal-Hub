import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common'
import { AccountsPayableService } from './accounts-payable-service'
import { CreatePayableDto } from './dto/create-payable.dto'
import { UpdatePayableDto } from './dto/update-payable.dto'

@Controller('accounts-payable')
export class AccountsPayableController {
    constructor(private readonly accountsPayableServiceFunctions: AccountsPayableService) { }

    @Get()
    getAllPayables() {
        return this.accountsPayableServiceFunctions.getAllPayables();
    }

    @Post()
    createPayable(
        @Body() newPayable: CreatePayableDto
    ) {
        return this.accountsPayableServiceFunctions.createPayable(newPayable);
    }

    @Put(':id')
    updatePayable(
        @Param('id') id: string,
        @Body() payable: UpdatePayableDto
    ) {
        return this.accountsPayableServiceFunctions.updatePayable(Number(id), payable);
    }

    @Delete(':id')
    deletePayable(@Param('id') id: string) {
        return this.accountsPayableServiceFunctions.deletePayable(Number(id));
    }
}