import { useAuth } from "@/context/AuthContext";
import { useExpenses } from "@/hooks/useFinanceData";
import TopExpensesList from "@/components/TopExpensesList";
import DashboardChart from "@/components/DashboardChart";

export default function Resumo() {
  const { user } = useAuth();
  const { expenses } = useExpenses();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Olá, {user?.name || "usuário"} 👋
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopExpensesList expenses={expenses} />
        <DashboardChart expenses={expenses} />
      </div>
    </div>
  );
}
