import { useState, useEffect } from "react";
import { FinanceRecord, ReceivableRecord, ReceivableCategory, STATUS_OPTIONS } from "@/types";
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
    SelectSeparator
} from "@/components/ui/select";

interface SaveEditReceivableDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (receivable: ReceivableRecord) => void;
    receivable?: ReceivableRecord | null;
    categories: ReceivableCategory[];
    title: string;
    onCategoryCreate: () => void;
}

export default function SaveEditReceivableDialog({
    open,
    onClose,
    onSave,
    receivable,
    categories,
    title,
    onCategoryCreate
}: SaveEditReceivableDialogProps) {

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [data, setData] = useState("");
    const [status, setStatus] = useState<FinanceRecord["status"]>("pendente");

    useEffect(() => {

        if (receivable) {
            setDescription(receivable.description);
            setValue(String(receivable.value));
            setCategoryId(receivable.category.account_receivable_category_id);
            setStatus(receivable.status);
            return;
        }

        setDescription("");
        setValue("");
        setCategoryId("");
        setData(new Date().toISOString().slice(0, 10));
        setStatus("pendente");

    }, [receivable, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: any = {
            description: description,
            value: parseFloat(value) || 0,
            account_receivable_category_id: Number(categoryId),
            status: status
        };

        if (receivable) {
            payload.account_receivable_id = receivable.account_receivable_id;
        }

        onSave(payload);
        onClose();
    };

    const handleCategoryChange = (value: string) => {

        if (value === "add_new") {
            onCategoryCreate();
            return;
        }

        setCategoryId(value);
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
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="value">Valor (R$)</Label>
                        <Input
                            id="value"
                            type="number"
                            step="0.01"
                            min="0"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Categoria</Label>
                        <Select value={categoryId} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.account_receivable_category_id}
                                        value={String(category.account_receivable_category_id)}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}

                                <SelectSeparator />

                                <SelectItem value="add_new">
                                    + Adicionar categoria
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="data">Data</Label>
                        <Input
                            id="data"
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label>Status</Label>
                        <Select
                            value={status}
                            onValueChange={(v) => setStatus(v as FinanceRecord["status"])}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {STATUS_OPTIONS.map((s) => (
                                    <SelectItem
                                        key={s}
                                        value={s}
                                        className="capitalize"
                                    >
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>

                </form>

            </DialogContent>
        </Dialog>
    );
}