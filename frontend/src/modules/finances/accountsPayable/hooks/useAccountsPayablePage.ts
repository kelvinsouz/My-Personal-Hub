import { useState } from "react";
import { usePayables } from "./usePayables";
import { usePayablesCategories } from "./usePayablesCategories";
import { toast } from "sonner";

export function useAccountsPayablePage() {
    const {
        insertPayable,
        fetchPayables,
        updatePayable,
        deletePayable,
        payables,
    } = usePayables();

    const { insertPayableCategory, payablesCategories } = usePayablesCategories();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [saveEditDialogOpen, setSaveEditDialogOpen] = useState(false);
    const [payableCategoryDialogOpen, setPayableCategoryDialogOpen] = useState(false);
    const [confirmActionDialogOpen, setConfirmActionDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const selected = payables.find(
        (payable) => payable.account_payable_id === selectedId
    );

    const openNew = () => {
        setEditMode(false);
        setSaveEditDialogOpen(true);
    };

    const openEdit = () => {
        if (!selected) {
            toast.error("Selecione um registro antes de editar!");
            return;
        }
        setEditMode(true);
        setSaveEditDialogOpen(true);
    };

    const openDelete = () => {
        if (!selected) {
            toast.error("Selecione um registro antes de excluir!");
            return;
        }
        setConfirmActionDialogOpen(true);
    };

    const handleSave = (accountPayable: any) => {
        if (editMode) {
            updatePayable(accountPayable);
        } else {
            insertPayable(accountPayable);
        }
        setSelectedId(null);
    };

    const handleDelete = (item: any) => {
        deletePayable(item);
        setSelectedId(null);
    };

    return {
        // dados
        payables,
        payablesCategories,
        selected,
        selectedId,
        editMode,
        // estados dos dialogs
        saveEditDialogOpen,
        payableCategoryDialogOpen,
        confirmActionDialogOpen,
        // ações
        setSelectedId,
        setSaveEditDialogOpen,
        setPayableCategoryDialogOpen,
        setConfirmActionDialogOpen,
        openNew,
        openEdit,
        openDelete,
        handleSave,
        handleDelete,
        insertPayableCategory,
    };
}