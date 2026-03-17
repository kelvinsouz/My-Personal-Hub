import { useState, useCallback, useEffect } from "react";
import { ReceivableRecord } from "@/types";
import { toast } from "sonner";

const BASE_URL = "http://localhost:3000/accounts-receivable";

export function useReceivables() {

    const [receivables, setReceivables] = useState<ReceivableRecord[]>([]);

    const selectReceivables = useCallback(async () => {
        try {

            const apiResponse = await fetch(
                BASE_URL,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                toast.error(
                    `Erro ao buscar contas a receber: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            const receivablesFromApi = await apiResponse.json();

            // reloading receivables
            setReceivables(receivablesFromApi);
        } catch (error: any) {
            console.error(error);
            toast.error(`Erro: ${error.message}`);
        }
    }, []);

    const insertReceivables = useCallback(async (accountReceivable: ReceivableRecord) => {
        try {

            const apiResponse = await fetch(
                BASE_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accountReceivable)
                }
            );

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                toast.error(
                    `Erro ao inserir conta a receber: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            toast.success("Conta a receber criada com sucesso!")

            // reloading receivables
            selectReceivables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, [selectReceivables]);


    const updateReceivable = useCallback(async (accountReceivable: ReceivableRecord) => {
        try {

            const apiResponse = await fetch(
                `${BASE_URL}/${accountReceivable.account_receivable_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accountReceivable)
                }
            );

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                toast.error(
                    `Erro ao editar conta a receber: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            toast.success("Conta a receber atualizada com sucesso!")

            // reloading receivables
            selectReceivables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, [selectReceivables]);

    const deleteReceivable = useCallback(async (accountReceivable) => {
        try {
            const url = `http://localhost:3000/accounts-receivable/${accountReceivable.account_receivable_id}`;

            const apiResponse = await fetch(
                url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                toast.error(
                    `Erro ao deletar conta a receber: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            toast.success("Conta a receber deletada com sucesso!")

            // reloading receivables
            selectReceivables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, []);

    useEffect(() => {
        selectReceivables();
    }, [selectReceivables]);

    return {
        insertReceivables,
        selectReceivables,
        updateReceivable,
        deleteReceivable,
        receivables,
    };
}