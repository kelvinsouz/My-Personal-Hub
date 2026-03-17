import Toolbar from "@/shared/components/Toolbar";
import ConfirmActionDialog from "@/shared/components/ConfirmActionDialog";

import { useAccountsReceivablePage, ReceivableTable, SaveEditReceivableDialog, ReceivableCategoryDialog } from "@/modules/finances/accountsReceivable"

import { useAccountsPayablePage, PayableTable, SaveEditPayableDialog, PayableCategoryDialog } from "@/modules/finances/accountsPayable"

export default function AccountsPayable() {
	const {
		payables, payablesCategories, selected, selectedId, editMode,
		saveEditDialogOpen, payableCategoryDialogOpen, confirmActionDialogOpen,
		setSelectedId, setSaveEditDialogOpen, setPayableCategoryDialogOpen,
		setConfirmActionDialogOpen, openNew, openEdit, openDelete,
		handleSave, handleDelete, insertPayableCategory,
	} = useAccountsPayablePage();

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Contas a pagar</h2>

			<Toolbar
				onNew={openNew}
				onEdit={openEdit}
				onDelete={openDelete}
				hasSelection={!!selectedId}
			/>

			<PayableTable
				payables={payables}
				selectedId={selectedId}
				functionWhenClickingPayable={setSelectedId}
			/>

			<SaveEditPayableDialog
				open={saveEditDialogOpen}
				onClose={() => setSaveEditDialogOpen(false)}
				onSave={handleSave}
				payable={editMode ? selected : null}
				categories={payablesCategories}
				title={editMode ? "Editar conta a pagar" : "Nova conta a pagar"}
				onCategoryCreate={() => setPayableCategoryDialogOpen(true)}
			/>

			<ConfirmActionDialog
				open={confirmActionDialogOpen}
				onClose={() => setConfirmActionDialogOpen(false)}
				onConfirm={handleDelete}
				itemToInteract={selected}
				title="Excluir registro"
				message="Tem certeza que deseja excluir o registro?"
			/>

			<PayableCategoryDialog
				open={payableCategoryDialogOpen}
				onClose={() => setPayableCategoryDialogOpen(false)}
				onSave={insertPayableCategory}
			/>
		</div>
	);
}