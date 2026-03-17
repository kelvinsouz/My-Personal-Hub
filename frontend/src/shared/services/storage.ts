import { FinanceRecord } from "@/types";

const EXPENSES_KEY = "finance_expenses";
const INCOMES_KEY = "finance_incomes";

function getRecords(key: string): FinanceRecord[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveRecords(key: string, records: FinanceRecord[]) {
  localStorage.setItem(key, JSON.stringify(records));
}

// Expenses
export function getExpenses(): FinanceRecord[] {
  return getRecords(EXPENSES_KEY);
}

export function saveExpenses(records: FinanceRecord[]) {
  saveRecords(EXPENSES_KEY, records);
}

// Incomes
export function getIncomes(): FinanceRecord[] {
  return getRecords(INCOMES_KEY);
}

export function saveIncomes(records: FinanceRecord[]) {
  saveRecords(INCOMES_KEY, records);
}

// Seed example data
export function seedData() {
  if (getExpenses().length === 0) {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const expenses: FinanceRecord[] = [
      { id: crypto.randomUUID(), descricao: "Aluguel", valor: 2500, categoria: "Moradia", data: new Date(year, month, 5).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Supermercado", valor: 850, categoria: "Alimentação", data: new Date(year, month, 8).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Uber", valor: 320, categoria: "Transporte", data: new Date(year, month, 10).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Cinema", valor: 80, categoria: "Lazer", data: new Date(year, month, 12).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Restaurante", valor: 450, categoria: "Alimentação", data: new Date(year, month, 14).toISOString(), status: "pendente" },
      { id: crypto.randomUUID(), descricao: "Gasolina", valor: 280, categoria: "Transporte", data: new Date(year, month, 15).toISOString(), status: "pendente" },
      { id: crypto.randomUUID(), descricao: "Internet", valor: 120, categoria: "Moradia", data: new Date(year, month, 18).toISOString(), status: "pendente" },
      { id: crypto.randomUUID(), descricao: "Academia", valor: 150, categoria: "Saúde", data: new Date(year, month, 1).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Curso online", valor: 200, categoria: "Educação", data: new Date(year, month, 3).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Streaming", valor: 55, categoria: "Lazer", data: new Date(year, month, 7).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Farmácia", valor: 95, categoria: "Saúde", data: new Date(year, month, 20).toISOString(), status: "atrasado" },
      { id: crypto.randomUUID(), descricao: "Roupas", valor: 380, categoria: "Outros", data: new Date(year, month, 22).toISOString(), status: "pendente" },
    ];
    saveExpenses(expenses);
  }

  if (getIncomes().length === 0) {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const incomes: FinanceRecord[] = [
      { id: crypto.randomUUID(), descricao: "Salário", valor: 8500, categoria: "Salário", data: new Date(year, month, 5).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Projeto freelance", valor: 2000, categoria: "Freelance", data: new Date(year, month, 15).toISOString(), status: "pago" },
      { id: crypto.randomUUID(), descricao: "Dividendos", valor: 350, categoria: "Investimentos", data: new Date(year, month, 20).toISOString(), status: "pendente" },
    ];
    saveIncomes(incomes);
  }
}
