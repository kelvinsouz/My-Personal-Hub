import { useState, useEffect } from "react";
import { FinanceRecord, ReceivableRecord, STATUS_OPTIONS } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SaveEditReceivableDialog {
    open: boolean;
    onClose: () => void;
    onSave: (receivable: ReceivableRecord) => void;
    receivable?: ReceivableRecord | null;
    categorias: readonly string[];
    title: string;
}

export default function SaveEditReceivableDialog({ open, onClose, onSave, receivable, categorias, title }: SaveEditReceivableDialog) {

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [categoria, setCategoria] = useState(categorias[0]);
    const [data, setData] = useState("");
    const [status, setStatus] = useState<FinanceRecord["status"]>("pendente");

    useEffect(() => {

        if (receivable) {
            setDescription(receivable.description);
            setValue(String(receivable.value));
            setCategoria(receivable.category);
            setStatus(receivable.status);
            return;
        }

        setDescription("");
        setValue("");
        setCategoria(categorias[0]);
        setData(new Date().toISOString().slice(0, 10));
        setStatus("pendente");
    }, [receivable, open, categorias]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: any = {
            description: description,
            value: parseFloat(value) || 0,
            category: categoria,
            status: status
        };

        if (receivable) {
            payload.idaccount_receivable = receivable.idaccount_receivable;
        }

        onSave(payload);

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="value">Valor (R$)</Label>
                        <Input id="value" type="number" step="0.01" min="0" value={value} onChange={(e) => setValue(e.target.value)} required />
                    </div>
                    <div>
                        <Label>Categoria</Label>
                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {categorias.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="data">Data</Label>
                        <Input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} required />
                    </div>
                    <div>
                        <Label>Status</Label>
                        <Select value={status} onValueChange={(v) => setStatus(v as FinanceRecord["status"])}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map((s) => (
                                    <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}
