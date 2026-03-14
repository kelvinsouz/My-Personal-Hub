import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContaReceberDto } from './dto/create-conta-receber.dto'
import { UpdateReceivableDto } from './dto/update-receivable.dto'

@Injectable()
export class ContasReceberService {

    constructor(private prisma: PrismaService) {

    }

    insertAccountReceivable(accountReceivable: CreateContaReceberDto) {
        return this.prisma.contasReceber.create({
            data: accountReceivable
        })
    }

    getAllAccountsReceivable() {
        return this.prisma.contasReceber.findMany()
    }

    updateAccountReceivable(id: number, accountReceivable: UpdateReceivableDto) {
        return this.prisma.contasReceber.update({
            where: {
                idconta_receber: id
            },
            data: accountReceivable
        })
    }
}