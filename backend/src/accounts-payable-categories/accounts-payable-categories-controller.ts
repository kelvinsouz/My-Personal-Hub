import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common'
import { AccountsPayableCategoriesService } from './accounts-payable-categories-service'
import { CreatePayableCategoryDto } from './dto/create-payable-category.dto'
import { UpdatePayableCategoryDto } from './dto/update-payable-category.dto'

@Controller('accounts-payable-categories')
export class AccountsPayableCategoriesController {
    constructor(private readonly payableCategoriesServiceFunctions: AccountsPayableCategoriesService) { }

    @Get()
    getAllCategories() {
        return this.payableCategoriesServiceFunctions.getAllCategories();
    }

    @Post()
    createCategory(@Body() newCategory: CreatePayableCategoryDto) {
        return this.payableCategoriesServiceFunctions.createCategory(newCategory);
    }

    // @Put(':id')
    // updateCategory(@Param('id') id: string, @Body() UpdatePayableCategoryDto: UpdateCategoryDto) {
    //     return this.categoriesService.updateCategory(Number(id), updateCategoryDto);
    // }

    // @Delete(':id')
    // deleteCategory(@Param('id') id: string) {
    //     return this.categoriesService.deleteCategory(Number(id));
    // }
}