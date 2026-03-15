import { useState } from "react";
import { CATEGORIAS_DESPESA } from "@/types";

import { useExpenses } from "@/hooks/useFinanceData";
import { usePayables } from "@/hooks/usePayables";

import Toolbar from "@/components/Toolbar";

import FinanceTable from "@/components/FinanceTable";
import PayableTable from "@/components/PayableTable";

import RecordFormDialog from "@/components/RecordFormDialog";
import SaveEditPayableDialog from "@/components/SaveEditPayableDialog";

import { toast } from "sonner";

export default function AccountsPayable() {

	const { expenses, add, update, remove } = useExpenses();
	const { insertPayable, fetchPayables, updatePayable, deletePayable, payables } = usePayables();
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const selected = expenses.find((e) => e.id === selectedId) || null;

	const handleNew = () => {
		setEditMode(false);
		setDialogOpen(true);
	};

	const handleEdit = () => {
		if (!selected) return;
		setEditMode(true);
		setDialogOpen(true);
	};

	const handleDelete = () => {
		if (!selectedId) return;
		remove(selectedId);
		setSelectedId(null);
		toast.success("Registro excluído");
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Contas a pagar</h2>
			<Toolbar
				onNew={handleNew}
				onEdit={handleEdit}
				onDelete={handleDelete}
				hasSelection={!!selectedId} />
			<FinanceTable records={expenses} selectedId={selectedId} onSelect={setSelectedId} />
			<RecordFormDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSave={(r) => {
					editMode ? update(r) : add(r);
					toast.success(editMode ? "Registro atualizado" : "Registro criado");
					setSelectedId(null);
				}}
				record={editMode ? selected : null}
				categorias={CATEGORIAS_DESPESA}
				title={editMode ? "Editar conta a pagar" : "Nova conta a pagar"}
			/>
		</div>
	);
}
