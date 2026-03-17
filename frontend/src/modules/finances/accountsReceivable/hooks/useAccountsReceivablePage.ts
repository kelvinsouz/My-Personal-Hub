import { useState } from "react";
import { useReceivables } from "./useReceivables";
import { useReceivablesCategories } from "./useReceivablesCategories";
import { toast } from "sonner";

export function useAccountsReceivablePage() {
    const {
        insertReceivables,
        selectReceivables,
        updateReceivable,
        deleteReceivable,
        receivables,
    } = useReceivables();

    const { insertReceivableCategory, receivablesCategories } =
        useReceivablesCategories();

    // states
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [saveEditDialogOpen, setSaveEditDialogOpen] = useState(false);
    const [receivableCategoryDialogOpen, setReceivableCategoryDialogOpen] =
        useState(false);
    const [confirmActionDialogOpen, setConfirmActionDialogOpen] =
        useState(false);
    const [editMode, setEditMode] = useState(false);

    const selected = receivables.find(
        (r) => r.account_receivable_id === selectedId
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

    const handleSave = (accountReceivable: any) => {
        if (editMode) {
            updateReceivable(accountReceivable);
        } else {
            insertReceivables(accountReceivable);
        }
        setSelectedId(null);
    };

    const handleDelete = (item: any) => {
        deleteReceivable(item);
        setSelectedId(null);
    };

    return {
        // dados
        receivables,
        receivablesCategories,
        selected,
        selectedId,
        editMode,
        // estados dos dialogs
        saveEditDialogOpen,
        receivableCategoryDialogOpen,
        confirmActionDialogOpen,
        // ações
        setSelectedId,
        setSaveEditDialogOpen,
        setReceivableCategoryDialogOpen,
        setConfirmActionDialogOpen,
        openNew,
        openEdit,
        openDelete,
        handleSave,
        handleDelete,
        insertReceivableCategory,
    };
}