import { ContasReceberService } from './contas-receber.service';
import { CreateContaReceberDto } from './dto/create-conta-receber.dto';
export declare class ContasReceberController {
    private readonly accountsReceivableServiceFunctions;
    constructor(accountsReceivableServiceFunctions: ContasReceberService);
    createAccountReceivable(accountReceivable: CreateContaReceberDto): import("@prisma/client").Prisma.Prisma__contasReceberClient<{
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
}
