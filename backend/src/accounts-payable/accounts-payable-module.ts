import { Module } from '@nestjs/common';
import { AccountsPayableController } from './accounts-payable-controller';
import { AccountsPayableService } from './accounts-payable-service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AccountsPayableController],
    providers: [AccountsPayableService],
})
export class AccountsPayableModule { }