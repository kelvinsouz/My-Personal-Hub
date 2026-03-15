import { Module } from '@nestjs/common';
import { AccountsReceivableCategoriesController } from './accounts-receivable-categories-controller';
import { AccountsReceivableCategoriesService } from './accounts-receivable-categories-service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AccountsReceivableCategoriesController],
    providers: [AccountsReceivableCategoriesService],
})
export class AccountsReceivableCategoriesModule { }