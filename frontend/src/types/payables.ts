export interface PayableRecord {
    account_payable_id: number;
    description: string;
    value: number;
    account_payable_category_id: number;
    status: "pendente" | "pago" | "atrasado";
}