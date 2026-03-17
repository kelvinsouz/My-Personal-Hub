import { useState } from "react";
import { useAccountsReceivablePage } from "@/modules/finances/accountsReceivable/hooks/useAccountsReceivablePage";
import Toolbar from "@/shared/components/Toolbar";
import ReceivableTable from "@/modules/finances/accountsReceivable/components/ReceivableTable";
import SaveEditReceivableDialog from "@/modules/finances/accountsReceivable/components/SaveEditReceivableDialog";
import ReceivableCategoryDialog from "@/modules/finances/accountsReceivable/components/ReceivableCategoryDialog";
import ConfirmActionDialog from "@/shared/components/ConfirmActionDialog";
import { toast } from "sonner";

export default function AccountsReceivable() {
	const {
		receivables, receivablesCategories, selected, selectedId, editMode,
		saveEditDialogOpen, receivableCategoryDialogOpen, confirmActionDialogOpen,
		setSelectedId, setSaveEditDialogOpen, setReceivableCategoryDialogOpen,
		setConfirmActionDialogOpen, openNew, openEdit, openDelete,
		handleSave, handleDelete, insertReceivableCategory,
	} = useAccountsReceivablePage();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Contas a receber</h2>

			<Toolbar
				onNew={openNew}
				onEdit={openEdit}
				onDelete={openDelete}
				hasSelection={!!selectedId}
			/>

			<ReceivableTable
				receivables={receivables}
				selectedId={selectedId}
				functionWhenClickingReceivable={setSelectedId}
			/>

			<SaveEditReceivableDialog
				open={saveEditDialogOpen}
				onClose={() => setSaveEditDialogOpen(false)}
				onSave={handleSave}
				receivable={editMode ? selected : null}
				categories={receivablesCategories}
				title={editMode ? "Editar conta a receber" : "Nova conta a receber"}
				onCategoryCreate={() => setReceivableCategoryDialogOpen(true)}
			/>

			<ConfirmActionDialog
				open={confirmActionDialogOpen}
				onClose={() => setConfirmActionDialogOpen(false)}
				onConfirm={handleDelete}
				itemToInteract={selected}
				title="Excluir registro"
				message="Tem certeza que deseja excluir o registro?"
			/>

			<ReceivableCategoryDialog
				open={receivableCategoryDialogOpen}
				onClose={() => setReceivableCategoryDialogOpen(false)}
				onSave={insertReceivableCategory}
			/>
		</div>
	);
}