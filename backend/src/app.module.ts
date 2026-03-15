import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsReceivableModule } from './accounts-receivable/accounts-receivable-module';
import { AccountsReceivableCategoriesModule } from './accounts-receivable-categories/accounts-receivable-categories-module';
import { AccountsPayableModule } from './accounts-payable/accounts-payable-module';
import { AccountsPayableCategoriesModule } from './accounts-payable-categories/accounts-payable-categories-module';

@Module({
  imports: [
    AccountsReceivableModule,
    AccountsReceivableCategoriesModule,
    AccountsPayableModule,
    AccountsPayableCategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }