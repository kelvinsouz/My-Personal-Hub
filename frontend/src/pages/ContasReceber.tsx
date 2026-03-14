import { useState } from "react";
import { useReceivables } from "@/hooks/useReceivables";
import { CATEGORIAS_RECEITA } from "@/types";
import Toolbar from "@/components/Toolbar";
import FinanceTable from "@/components/FinanceTable";
import RecordFormDialog from "@/components/RecordFormDialog";
import { toast } from "sonner";

export default function ContasReceber() {

	const { insertReceivables, selectReceivables, selectedAccountsReceivable } = useReceivables()
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const openNewReceivableWindow = () => {
		setEditMode(false);
		setDialogOpen(true);
	};

	const openEditReceivableWindow = () => {
		if (!selected) return;
		setEditMode(true);
		setDialogOpen(true);
	};

	const openDeleteReceivableWindow = () => {
		if (!selectedId) return;
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

			<FinanceTable
				records={selectedAccountsReceivable}
				selectedId={selectedId}
				onSelect={setSelectedId}
			/>

			<RecordFormDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSave={(accountReceivable) => {
					editMode ? update(accountReceivable) : insertReceivables(accountReceivable);
					setSelectedId(null);
				}}
				record={editMode ? selected : null}
				categorias={CATEGORIAS_RECEITA}
				title={editMode ? "Editar conta a receber" : "Nova conta a receber"}
			/>
		</div>
	);
}
