import { PrismaService } from '../prisma/prisma.service';
import { CreateContaReceberDto } from './dto/create-conta-receber.dto';
export declare class ContasReceberService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateContaReceberDto): import("@prisma/client").Prisma.Prisma__contasReceberClient<{
        descricao: string;
        valor: number;
        categoria: string;
        status: string;
        data_criacao: Date;
        idconta_receber: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
