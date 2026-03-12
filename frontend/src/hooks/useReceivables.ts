import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export function useReceivables() {

    const insertAccountsReceivable = useCallback(async (accountReceivable) => {
        try {

            debugger

            const apiResponse = await fetch(
                "http://localhost:3000/contas-receber",
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
                    `Erro ao inserir conta a receber: ${errorData.message || apiResponse.statusText
                    }`
                );

                return;
            }

            toast.success("Conta a receber criada com sucesso!")
        } catch (error: any) {
            toast.error(`Erro: ${error.message}`);
        }
    });

    return {
        insertAccountsReceivable
    };
}