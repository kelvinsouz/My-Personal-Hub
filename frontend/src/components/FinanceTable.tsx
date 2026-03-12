import { FinanceRecord } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  records: FinanceRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function StatusBadge({ status }: { status: FinanceRecord["status"] }) {
  const cls = status === "pago" ? "status-pago" : status === "pendente" ? "status-pendente" : "status-atrasado";
  return <span className={cls}>{status}</span>;
}

export default function FinanceTable({ records, selectedId, onSelect }: Props) {
  return (
    <div className="finance-card overflow-hidden p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                Nenhum registro encontrado
              </TableCell>
            </TableRow>
          ) : (
            records.map((r) => (
              <TableRow
                key={r.id}
                onClick={() => onSelect(r.id)}
                className={`cursor-pointer transition-colors ${selectedId === r.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/30"}`}
              >
                <TableCell className="font-medium">{r.descricao}</TableCell>
                <TableCell>R$ {r.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{r.categoria}</TableCell>
                <TableCell>{new Date(r.data).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
