import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContasReceberModule } from './contas-receber/contas-receber.module';

@Module({
  imports: [ContasReceberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }