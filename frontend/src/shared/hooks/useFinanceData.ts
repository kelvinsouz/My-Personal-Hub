import { useState, useCallback, useEffect } from "react";
import { FinanceRecord } from "@/types";
import { getExpenses, saveExpenses, getIncomes, saveIncomes, seedData } from "@/shared/services/storage";
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
