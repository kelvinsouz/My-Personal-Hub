export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FinanceRecord {
  descricao: string;
  valor: number;
  categoria: string;
  status: "pendente" | "pago" | "atrasado";
}

export type Expense = FinanceRecord;
export type Income = FinanceRecord;

export const CATEGORIAS_DESPESA = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Moradia",
  "Saúde",
  "Educação",
  "Outros",
] as const;

export const STATUS_OPTIONS = ["pendente", "pago", "atrasado"] as const;