import { useState, useCallback, useEffect } from "react";
import { ReceivableCategory } from "@/modules/finances/accountsReceivable/types/receivableCategory";
import { toast } from "sonner";

const BASE_URL = "http://localhost:3000/accounts-receivable-categories";

export function useReceivablesCategories() {

	const [receivablesCategories, setCategories] = useState<ReceivableCategory[]>([]);

	const fetchCategories = useCallback(async () => {
		try {
			const apiResponse = await fetch(
				BASE_URL,
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

	const insertReceivableCategory = useCallback(async (category: ReceivableCategory) => {
		try {

			const apiResponse = await fetch(
				BASE_URL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(category),
				}
			);

			if (!apiResponse.ok) {
				const errorData = await apiResponse.json().catch(() => ({}));
				toast.error(
					`Erro ao inserir categoria: 
					${errorData.message || apiResponse.statusText}`
				);

				return;
			}

			toast.success(`Categoria inserida com sucesso!`);

			fetchCategories();
		} catch (error: any) {
			console.error(error);
			toast.error(`Erro ao inserir categoria: ${error.message}`);
		}
	})


	useEffect(() => {
		fetchCategories();
	}, [fetchCategories]);

	return { insertReceivableCategory, receivablesCategories };
}