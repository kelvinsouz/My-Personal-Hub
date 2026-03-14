export interface ReceivableRecord {
    idaccount_receivable: number;
    description: string;
    value: number;
    category: string;
    status: "pendente" | "pago" | "atrasado";
}