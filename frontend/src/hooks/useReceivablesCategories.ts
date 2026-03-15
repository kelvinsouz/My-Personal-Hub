// hooks/useReceivableCategories.ts
import { useState, useCallback, useEffect } from "react";
import { ReceivableCategory } from "@/types/receivableCategory";
import { toast } from "sonner";

export function useReceivablesCategories() {

	const [receivablesCategories, setCategories] = useState<ReceivableCategory[]>([]);

	const fetchCategories = useCallback(async () => {
		try {
			const apiResponse = await fetch(
				"http://localhost:3000/accounts-receivable-categories",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					},
				}
			);
			if (!apiResponse.ok) {
				const errorData = await apiResponse.json().catch(() => ({}));
				toast.error(
					`Erro ao buscar contas a receber: 
                    ${errorData.message || apiResponse.statusText}`
				);

				return;
			}

			const categoriesFromApi = await apiResponse.json();
			setCategories(categoriesFromApi);
		} catch (error) {
			console.error(error);
			toast.error(`Erro: ${error.message}`);
		}
	}, []);


	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return { receivablesCategories };
}