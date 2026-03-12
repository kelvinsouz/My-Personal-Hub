import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
	onNew: () => void;
	onEdit: () => void;
	onDelete: () => void;
	hasSelection: boolean;
}

export default function Toolbar({ onNew, onEdit, onDelete, hasSelection }: Props) {
	return (
		<div className="flex gap-2 mb-6">
			<Button onClick={onNew} className="gap-2">
				<Plus className="h-4 w-4" /> Nova conta
			</Button>
			<Button variant="outline" onClick={onEdit} disabled={!hasSelection} className="gap-2">
				<Pencil className="h-4 w-4" /> Editar
			</Button>
			<Button variant="outline" onClick={onDelete} disabled={!hasSelection} className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground">
				<Trash2 className="h-4 w-4" /> Excluir
			</Button>
		</div>
	);
}
