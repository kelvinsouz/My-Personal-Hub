import { useState } from "react";
import { CATEGORIAS_DESPESA } from "@/types";

import { useExpenses } from "@/shared/hooks/useFinanceData";
import { usePayables } from "@/modules/finances/accountsPayable/hooks/usePayables";
import { usePayablesCategories } from "@/modules/finances/accountsPayable/hooks/usePayablesCategories";

import Toolbar from "@/shared/components/Toolbar";

import PayableTable from "@/modules/finances/accountsPayable/components/PayableTable";

import SaveEditPayableDialog from "@/modules/finances/accountsPayable/components/SaveEditPayableDialog";
import PayableCategoryDialog from "@/modules/finances/accountsPayable/components/PayableCategoryDialog";
import ConfirmActionDialog from "@/shared/components/ConfirmActionDialog";

import { toast } from "sonner";

export default function AccountsPayable() {

	const { insertPayable, fetchPayables, updatePayable, deletePayable, payables } = usePayables();
	const { insertPayableCategory, payablesCategories } = usePayablesCategories();

	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [saveEditDialogOpen, setSaveEditDialogOpen] = useState(false);
	const [payableCategoryDialogOpen, setPayableCategoryDialogOpen] = useState(false);
	const [confirmActionDialogOpen, setConfirmActionDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const selected = payables.find(
		(payable) => payable.account_payable_id === selectedId
	);

	const openNewPayableWindow = () => {
		setEditMode(false);
		setSaveEditDialogOpen(true);
	};

	const openEditPayableWindow = () => {

		if (!selected) {
			toast.error(`Selecione um registro antes de editar!`);
			return;
		}

		setEditMode(true);
		setSaveEditDialogOpen(true);
	};

	const openDeletePayableWindow = () => {

		if (!selected) {
			toast.error(`Selecione um registro antes de excluir!`);
			return;
		}

		setConfirmActionDialogOpen(true);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Contas a pagar</h2>
			<Toolbar
				onNew={openNewPayableWindow}
				onEdit={openEditPayableWindow}
				onDelete={openDeletePayableWindow}
				hasSelection={!!selectedId} />

			<PayableTable
				payables={payables}
				selectedId={selectedId}
				functionWhenClickingPayable={setSelectedId}
			/>

			<SaveEditPayableDialog
				open={saveEditDialogOpen}
				onClose={() => setSaveEditDialogOpen(false)}
				onSave={
					(accountPayable) => {

						if (editMode) {
							updatePayable(accountPayable);
							setSelectedId(null);
							return;
						}

						insertPayable(accountPayable);
						setSelectedId(null);
					}
				}
				payable={editMode ? selected : null}
				categories={payablesCategories}
				title={editMode ? "Editar conta a pagar" : "Nova conta a pagar"}
				onCategoryCreate={() => {
					setPayableCategoryDialogOpen(true);
				}}
			/>

			<ConfirmActionDialog
				open={confirmActionDialogOpen}
				onClose={() => setConfirmActionDialogOpen(false)}
				onConfirm={(accountPayableToDelete) => {
					deletePayable(accountPayableToDelete);
					setSelectedId(null);
				}}
				itemToInteract={selected}
				title="Excluir registro"
				message="Tem certeza que deseja excluir o registro?"
			/>

			<PayableCategoryDialog
				open={payableCategoryDialogOpen}
				onClose={() => setPayableCategoryDialogOpen(false)}
				onSave={(newCategory) => {
					insertPayableCategory(newCategory);
				}}
			/>
		</div>
	);
}
