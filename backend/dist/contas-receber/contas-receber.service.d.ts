import { PrismaService } from '../prisma/prisma.service';
import { CreateContaReceberDto } from './dto/create-conta-receber.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';
export declare class ContasReceberService {
    private prisma;
    constructor(prisma: PrismaService);
    insertAccountReceivable(accountReceivable: CreateContaReceberDto): import("@prisma/client").Prisma.Prisma__contasReceberClient<{
        descricao: string;
        valor: number;
        categoria: string;
        status: string;
        data_criacao: Date;
        idconta_receber: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getAllAccountsReceivable(): import("@prisma/client").Prisma.PrismaPromise<{
        descricao: string;
        valor: number;
        categoria: string;
        status: string;
        data_criacao: Date;
        idconta_receber: number;
    }[]>;
    updateAccountReceivable(id: number, accountReceivable: UpdateReceivableDto): import("@prisma/client").Prisma.Prisma__contasReceberClient<{
        descricao: string;
        valor: number;
        categoria: string;
        status: string;
        data_criacao: Date;
        idconta_receber: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
