import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateReceivableDto } from './dto/create-receivable.dto'
import { UpdateReceivableDto } from './dto/update-receivable.dto'

@Injectable()
export class AccountsReceivableService {

    constructor(private prisma: PrismaService) {

    }

    insertAccountReceivable(accountReceivable: CreateReceivableDto) {
        return this.prisma.accountsReceivable.create({
            data: accountReceivable
        })
    }

    getAllAccountsReceivable() {
        return this.prisma.accountsReceivable.findMany({
            include: {
                category: true
            }
        })
    }

    updateAccountReceivable(id: number, accountReceivable: UpdateReceivableDto) {
        return this.prisma.accountsReceivable.update({
            where: {
                account_receivable_id: id
            },
            data: accountReceivable
        })
    }

    deleteAccountReceivable(id: number) {
        return this.prisma.accountsReceivable.delete({
            where: {
                account_receivable_id: id
            }
        })
    }
}