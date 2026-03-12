import { useState } from "react";
import { useIncomes } from "@/hooks/useFinanceData";
import { CATEGORIAS_RECEITA } from "@/types";
import Toolbar from "@/components/Toolbar";
import FinanceTable from "@/components/FinanceTable";
import RecordFormDialog from "@/components/RecordFormDialog";
import { toast } from "sonner";

export default function ContasReceber() {
	const { incomes, add, update, remove } = useIncomes();
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const selected = incomes.find((e) => e.id === selectedId) || null;

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
			<h2 className="text-2xl font-bold mb-6">Contas a receber</h2>
			<Toolbar onNew={handleNew} onEdit={handleEdit} onDelete={handleDelete} hasSelection={!!selectedId} />
			<FinanceTable records={incomes} selectedId={selectedId} onSelect={setSelectedId} />
			<RecordFormDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSave={(r) => {
					debugger;
					editMode ? update(r) : add(r);
					toast.success(editMode ? "Registro atualizado" : "Registro criado");
					setSelectedId(null);
				}}
				record={editMode ? selected : null}
				categorias={CATEGORIAS_RECEITA}
				title={editMode ? "Editar conta a receber" : "Nova conta a receber"}
			/>
		</div>
	);
}
