import { Module } from '@nestjs/common';
import { AccountsPayableCategoriesController } from './accounts-payable-categories-controller';
import { AccountsPayableCategoriesService } from './accounts-payable-categories-service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AccountsPayableCategoriesController],
    providers: [AccountsPayableCategoriesService],
})
export class AccountsPayableCategoriesModule { }