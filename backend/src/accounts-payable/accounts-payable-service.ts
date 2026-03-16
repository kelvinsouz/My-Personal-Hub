import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePayableDto } from './dto/create-payable.dto'
import { UpdatePayableDto } from './dto/update-payable.dto'

@Injectable()
export class AccountsPayableService {

    constructor(private prisma: PrismaService) {

    }

    createPayable(newPayable: CreatePayableDto) {
        return this.prisma.accountsPayable.create({
            data: newPayable
        })
    }

    getAllPayables() {
        return this.prisma.accountsPayable.findMany({
            include: {
                category: true
            }
        })
    }

    updatePayable(id: number, payable: UpdatePayableDto) {
        return this.prisma.accountsPayable.update({
            where: {
                account_payable_id: id
            },
            data: payable
        })
    }

    deletePayable(id: number) {
        return this.prisma.accountsPayable.delete({
            where: {
                account_payable_id: id
            }
        })
    }
}