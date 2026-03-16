import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreatePayableCategoryDto } from './dto/create-payable-category.dto'
import { UpdatePayableCategoryDto } from './dto/update-payable-category.dto'

@Injectable()
export class AccountsPayableCategoriesService {

    constructor(private prisma: PrismaService) {

    }

    getAllCategories() {
        return this.prisma.accountsPayableCategories.findMany()
    }

    createCategory(category: CreatePayableCategoryDto) {
        return this.prisma.accountsPayableCategories.create({
            data: category
        })
    }
}