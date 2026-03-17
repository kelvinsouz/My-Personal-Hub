import { FinanceRecord, ReceivableRecord } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

interface Props {
    receivables: ReceivableRecord[];
    selectedId: string | null;
    onSelect: (account_receivable_id: string) => void;
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

function buildTableBody(
    receivables: ReceivableRecord[],
    selectedId: string | null,
    functionWhenClickingReceivable: (id: string) => void
) {

    if (receivables.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Nenhum registro encontrado
                </TableCell>
            </TableRow>
        );
    }

    return receivables.map((receivable) => {

        let rowClass = "cursor-pointer transition-colors hover:bg-muted/30";

        if (selectedId === receivable.account_receivable_id) {
            rowClass = "cursor-pointer transition-colors bg-primary/5 border-l-2 border-l-primary";
        }

        return (
            <TableRow
                key={receivable.account_receivable_id}
                onClick={() => functionWhenClickingReceivable(receivable.account_receivable_id)}
                className={rowClass}
            >
                <TableCell className="font-medium">{receivable.description}</TableCell>
                <TableCell>
                    R$ {receivable.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>{receivable.category.name}</TableCell>
                <TableCell>{new Date(receivable.creation_date).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                    <StatusBadge status={receivable.status} />
                </TableCell>
            </TableRow>
        );
    });
}

export default function ReceivableTable({ receivables, selectedId, functionWhenClickingReceivable }: Props) {
    return (
        <div className="finance-card overflow-hidden p-0">
            <Table>
                <TableHeader>
                    {buildTableHeader()}
                </TableHeader>
                <TableBody>
                    {buildTableBody(receivables, selectedId, functionWhenClickingReceivable)}
                </TableBody>
            </Table>
        </div>
    );
}
