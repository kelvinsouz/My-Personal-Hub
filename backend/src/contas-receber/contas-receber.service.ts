import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContaReceberDto } from './dto/create-conta-receber.dto'

@Injectable()
export class ContasReceberService {

    constructor(private prisma: PrismaService) {

    }

    insertAccountReceivable(accountReceivable: CreateContaReceberDto) {
        return this.prisma.contasReceber.create({
            data: accountReceivable
        })
    }
}