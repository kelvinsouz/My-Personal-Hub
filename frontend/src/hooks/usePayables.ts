import { useState, useCallback, useEffect } from "react";
import { PayableRecord } from "@/types";
import { toast } from "sonner";

const BASE_URL = "http://localhost:3000/accounts-payable";

export function usePayables() {

    const [payables, setPayables] = useState<PayableRecord[]>([]);

    const fetchPayables = useCallback(async () => {
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
                    `Erro ao buscar contas a pagar: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            const payablesFromApi = await apiResponse.json();

            setPayables(payablesFromApi);
        } catch (error: any) {
            console.error(error);
            toast.error(`Erro: ${error.message}`);
        }
    }, []);

    const insertPayable = useCallback(async (accountPayable: PayableRecord) => {
        try {

            const apiResponse = await fetch(
                BASE_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accountPayable)
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

            fetchPayables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, [fetchPayables]);


    const updatePayable = useCallback(async (accountPayable: PayableRecord) => {
        try {

            const apiResponse = await fetch(
                `${BASE_URL}/${accountPayable.account_payable_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accountPayable)
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

            toast.success("Conta a pagar atualizada com sucesso!")

            fetchPayables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, [fetchPayables]);

    const deletePayable = useCallback(async (accountPayable) => {
        try {

            const apiResponse = await fetch(
                `${BASE_URL}/${accountPayable.account_payable_id}`,
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
                    `Erro ao deletar conta a pagar: 
                    ${errorData.message || apiResponse.statusText}`
                );

                return;
            }

            toast.success("Conta a pagar deletada com sucesso!")

            // reloading receivables
            fetchPayables();
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    }, [fetchPayables]);

    useEffect(() => {
        fetchPayables();
    }, [fetchPayables]);

    return {
        insertPayable,
        fetchPayables,
        updatePayable,
        deletePayable,
        payables
    };
}