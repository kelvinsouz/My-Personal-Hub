import { useState, useCallback, useEffect } from "react";
import { FinanceRecord } from "@/types";
import { getExpenses, saveExpenses, getIncomes, saveIncomes, seedData } from "@/services/storage";
import { toast } from "sonner";

export function useExpenses() {
	const [expenses, setExpenses] = useState<FinanceRecord[]>([]);

	useEffect(() => {
		seedData();
		setExpenses(getExpenses());
	}, []);

	const refresh = useCallback(() => setExpenses(getExpenses()), []);

	const add = useCallback((record: FinanceRecord) => {
		const updated = [...getExpenses(), record];
		saveExpenses(updated);
		setExpenses(updated);
	}, []);

	const update = useCallback((record: FinanceRecord) => {
		const updated = getExpenses().map((r) => (r.id === record.id ? record : r));
		saveExpenses(updated);
		setExpenses(updated);
	}, []);

	const remove = useCallback((id: string) => {
		const updated = getExpenses().filter((r) => r.id !== id);
		saveExpenses(updated);
		setExpenses(updated);
	}, []);

	return { expenses, add, update, remove, refresh };
}

export function useIncomes() {
	const [incomes, setIncomes] = useState<FinanceRecord[]>([]);

	useEffect(() => {
		seedData();
		setIncomes(getIncomes());
	}, []);

	const refresh = useCallback(() => setIncomes(getIncomes()), []);

	const add = useCallback(async (record) => {
		try {
			const recorde = {
				descricao: record.descricao,
				status: record.status,
				valor: record.valor,
				categoria: record.categoria,
			};

			debugger;
			const res = await fetch("http://localhost:3000/contas-receber", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(recorde),
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				throw new Error(errorData.message || "Erro ao criar registro");
			}

			const created = await res.json();
			setIncomes((prev) => [...prev, created]);
			toast.success("Registro criado com sucesso");
		} catch (err: any) {
			console.error(err);
			toast.error(`Erro: ${err.message}`);
		}
	}, []);

	const update = useCallback((record: FinanceRecord) => {
		const updated = getIncomes().map((r) => (r.id === record.id ? record : r));
		saveIncomes(updated);
		setIncomes(updated);
	}, []);

	const remove = useCallback((id: string) => {
		const updated = getIncomes().filter((r) => r.id !== id);
		saveIncomes(updated);
		setIncomes(updated);
	}, []);

	return { incomes, add, update, remove, refresh };
}
