import { useState } from "react";
import { useReceivables } from "@/hooks/useReceivables";
import { useReceivablesCategories } from "@/hooks/useReceivablesCategories";
import Toolbar from "@/components/Toolbar";
import ReceivableTable from "@/components/ReceivableTable";
import SaveEditReceivableDialog from "@/components/SaveEditReceivableDialog";
import ReceivableCategoryDialog from "@/components/ReceivableCategoryDialog";
import ConfirmActionDialog from "@/components/ConfirmActionDialog";
import { toast } from "sonner";

export default function AccountsReceivable() {

	const { insertReceivables, selectReceivables, updateReceivable, deleteReceivable, receivables } = useReceivables();
	const { insertReceivableCategory, receivablesCategories } = useReceivablesCategories();

	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [saveEditDialogOpen, setSaveEditDialogOpen] = useState(false);
	const [receivableCategoryDialogOpen, setReceivableCategoryDialogOpen] = useState(false);
	const [confirmActionDialogOpen, setConfirmActionDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// trying to find a receivable from the api that matches the selected row on the table.
	// we then send it to the dialog window
	const selected = receivables.find(
		(receivable) => receivable.account_receivable_id === selectedId
	);

	const openNewReceivableWindow = () => {
		setEditMode(false);
		setSaveEditDialogOpen(true);
	};

	const openEditReceivableWindow = () => {

		if (!selected) {
			toast.error(`Selecione um registro antes de editar!`);
			return;
		}

		setEditMode(true);
		setSaveEditDialogOpen(true);
	};

	const openDeleteReceivableWindow = () => {

		if (!selected) {
			toast.error(`Selecione um registro antes de excluir!`);
			return;
		}

		setConfirmActionDialogOpen(true);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Contas a receber</h2>

			<Toolbar
				onNew={openNewReceivableWindow}
				onEdit={openEditReceivableWindow}
				onDelete={openDeleteReceivableWindow}
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
				onSave={
					(accountReceivable) => {

						if (editMode) {
							updateReceivable(accountReceivable);
							setSelectedId(null);
							return;
						}

						insertReceivables(accountReceivable);
						setSelectedId(null);
					}
				}
				receivable={editMode ? selected : null}
				categories={receivablesCategories}
				title={editMode ? "Editar conta a receber" : "Nova conta a receber"}
				onCategoryCreate={() => {
					setReceivableCategoryDialogOpen(true);
				}}
			/>

			<ConfirmActionDialog
				open={confirmActionDialogOpen}
				onClose={() => setConfirmActionDialogOpen(false)}
				onConfirm={(accountReceivableToDelete) => {
					deleteReceivable(accountReceivableToDelete);
					setSelectedId(null);
				}}
				itemToInteract={selected}
				title="Excluir registro"
				message="Tem certeza que deseja excluir o registro?"
			/>

			<ReceivableCategoryDialog
				open={receivableCategoryDialogOpen}
				onClose={() => setReceivableCategoryDialogOpen(false)}
				onSave={(newCategory) => {
					insertReceivableCategory(newCategory);
				}}
			/>
		</div>
	);
}