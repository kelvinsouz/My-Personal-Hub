import { FinanceRecord, ReceivableRecord } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Props {
    receivables: ReceivableRecord[];
    selectedId: string | null;
    onSelect: (idaccount_receivable: string) => void;
}

function StatusBadge({ status }: { status: FinanceRecord["status"] }) {
    const cls =
        status === "pago"
            ? "status-pago"
            : status === "pendente"
                ? "status-pendente"
                : "status-atrasado";

    return <span className={cls}>{status}</span>;
}

function buildTableHeader() {
    return (
        <TableRow className="bg-muted/50">
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
        </TableRow>
    );
}

export default function ReceivableTable({ receivables, selectedId, functionWhenClickingReceivable }: Props) {
    return (
        <div className="finance-card overflow-hidden p-0">
            <Table>
                <TableHeader>
                    {buildTableHeader()}
                </TableHeader>
                <TableBody>
                    {receivables.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                Nenhum registro encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        receivables.map((receivable) => (
                            <TableRow
                                key={receivable.idaccount_receivable}
                                onClick={() => functionWhenClickingReceivable(receivable.idaccount_receivable)}
                                className={`cursor-pointer transition-colors ${selectedId === receivable.idaccount_receivable ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/30"}`}>
                                <TableCell className="font-medium">{receivable.description}</TableCell>
                                <TableCell>R$ {receivable.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                                <TableCell>{receivable.category}</TableCell>
                                <TableCell>{new Date(receivable.creation_date).toLocaleDateString("pt-BR")}</TableCell>
                                <TableCell><StatusBadge status={receivable.status} /></TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
