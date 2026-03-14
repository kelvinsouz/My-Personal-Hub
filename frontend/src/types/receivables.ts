export interface ReceivableRecord {
    idconta_receber: number;
    descricao: string;
    valor: number;
    categoria: string;
    status: "pendente" | "pago" | "atrasado";
}