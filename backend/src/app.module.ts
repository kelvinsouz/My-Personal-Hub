import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsReceivableModule } from './accounts-receivable/accounts-receivable-module';

@Module({
  imports: [AccountsReceivableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }