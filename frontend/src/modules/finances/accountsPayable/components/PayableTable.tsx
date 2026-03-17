import { FinanceRecord, PayableRecord } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

interface Props {
    payables: PayableRecord[];
    selectedId: string | null;
    onSelect: (account_payable_id: string) => void;
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
    payables: PayableRecord[],
    selectedId: string | null,
    functionWhenClickingPayable: (id: string) => void
) {

    if (payables.length === 0) {
        return (
            <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Nenhum registro encontrado
                </TableCell>
            </TableRow>
        );
    }

    return payables.map((payable) => {

        let rowClass = "cursor-pointer transition-colors hover:bg-muted/30";

        if (selectedId === payable.account_payable_id) {
            rowClass = "cursor-pointer transition-colors bg-primary/5 border-l-2 border-l-primary";
        }

        return (
            <TableRow
                key={payable.account_payable_id}
                onClick={() => functionWhenClickingPayable(payable.account_payable_id)}
                className={rowClass}
            >
                <TableCell className="font-medium">{payable.description}</TableCell>
                <TableCell>
                    R$ {payable.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>{payable.category.name}</TableCell>
                <TableCell>{new Date(payable.creation_date).toLocaleDateString("pt-BR")}</TableCell>
                <TableCell>
                    <StatusBadge status={payable.status} />
                </TableCell>
            </TableRow>
        );
    });
}

export default function PayableTable({ payables, selectedId, functionWhenClickingPayable }: Props) {
    return (
        <div className="finance-card overflow-hidden p-0">
            <Table>
                <TableHeader>
                    {buildTableHeader()}
                </TableHeader>
                <TableBody>
                    {buildTableBody(payables, selectedId, functionWhenClickingPayable)}
                </TableBody>
            </Table>
        </div>
    );
}
