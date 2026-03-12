import { FinanceRecord } from "@/types";

interface Props {
  expenses: FinanceRecord[];
}

export default function TopExpensesList({ expenses }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const top8 = expenses
    .filter((e) => {
      const d = new Date(e.data);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 8);

  return (
    <div className="finance-card">
      <h3 className="text-lg font-semibold mb-4">Maiores gastos do mês</h3>
      {top8.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma despesa encontrada</p>
      ) : (
        <ul className="space-y-3">
          {top8.map((expense, i) => (
            <li key={expense.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{expense.descricao}</p>
                  <p className="text-xs text-muted-foreground">{expense.categoria}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-destructive">
                R$ {expense.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
