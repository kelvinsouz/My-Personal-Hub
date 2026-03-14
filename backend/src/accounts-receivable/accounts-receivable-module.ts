import { Module } from '@nestjs/common';
import { AccountsReceivableController } from './accounts-receivable-controller';
import { AccountsReceivableService } from './accounts-receivable-service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AccountsReceivableController],
    providers: [AccountsReceivableService],
})
export class AccountsReceivableModule { }