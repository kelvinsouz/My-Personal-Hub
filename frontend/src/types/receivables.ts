export interface ReceivableRecord {
    account_receivable_id: number;
    description: string;
    value: number;
    category: string;
    status: "pendente" | "pago" | "atrasado";
}