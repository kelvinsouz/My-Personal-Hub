import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateReceivableCategoryDto } from './dto/create-receivable-category.dto'
import { UpdateReceivableCategoryDto } from './dto/update-receivable-category.dto'

@Injectable()
export class AccountsReceivableCategoriesService {

    constructor(private prisma: PrismaService) {

    }


    getAllCategories() {
        return this.prisma.accountsReceivableCategories.findMany()
    }

    createCategory(category: CreateReceivableCategoryDto) {
        return this.prisma.accountsReceivableCategories.create({
            data: category
        })
    }
}