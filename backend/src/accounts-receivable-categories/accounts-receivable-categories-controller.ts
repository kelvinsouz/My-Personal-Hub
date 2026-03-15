import { Body, Controller, Post, Get, Put, Delete, Param } from '@nestjs/common'
import { AccountsReceivableCategoriesService } from './accounts-receivable-categories-service'
import { CreateReceivableCategoryDto } from './dto/create-receivable-category.dto'
import { UpdateReceivableCategoryDto } from './dto/update-receivable-category.dto'

@Controller('accounts-receivable-categories')
export class AccountsReceivableCategoriesController {
    constructor(private readonly receivableCategoriesService: AccountsReceivableCategoriesService) { }

    @Get()
    getAllCategories() {
        return this.receivableCategoriesService.getAllCategories();
    }

    // @Post()
    // createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    //     return this.categoriesService.createCategory(createCategoryDto);
    // }

    // @Put(':id')
    // updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    //     return this.categoriesService.updateCategory(Number(id), updateCategoryDto);
    // }

    // @Delete(':id')
    // deleteCategory(@Param('id') id: string) {
    //     return this.categoriesService.deleteCategory(Number(id));
    // }
}