import { useState } from "react";
import { useReceivables } from "@/hooks/useReceivables";
import { CATEGORIAS_RECEITA } from "@/types";
import Toolbar from "@/components/Toolbar";
import ReceivableTable from "@/components/ReceivableTable";
import SaveEditReceivableDialog from "@/components/SaveEditReceivableDialog";
import RecordFormDialog from "@/components/RecordFormDialog";
import { toast } from "sonner";

export default function AccountsReceivable() {

	const { insertReceivables, selectReceivables, updateReceivable, receivables } = useReceivables()
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [saveEditDialogOpen, setSaveEditDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	// trying to find a receivable from the api that matches the selected row on the table.
	// we then send it to the dialog window
	const selected = receivables.find(
		(receivable) => receivable.idaccount_receivable === selectedId
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

		remove(selectedId);
		setSelectedId(null);
		toast.success("Registro excluído");
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
				categorias={CATEGORIAS_RECEITA}
				title={editMode ? "Editar conta a receber" : "Nova conta a receber"}
			/>
		</div>
	);
}
