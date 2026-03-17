import { useState, useEffect } from "react";
import { PayableCategory } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator
} from "@/shared/components/ui/select";

interface PayableCategoryProps {
    open: boolean;
    onClose: () => void;
    onSave: (newCategory: PayableCategory) => void;
}

export default function PayableCategoryDialog({
    open,
    onClose,
    onSave,
}: PayableCategoryProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {

        setName("");
        setDescription("");
        setColor("");

    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const payload: any = {
            name: name,
            description: description,
            color: String(color),
        };

        onSave(payload);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>Nova Categoria</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Salário"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição da categoria"
                        />
                    </div>

                    <div className="flex gap-3 items-end">

                        <div className="flex flex-col">
                            <Label htmlFor="color">Cor</Label>
                            <Input
                                id="color"
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-16 h-10 p-1"
                            />
                        </div>

                        <div className="flex-1">
                            <Label htmlFor="colorHex">Hex</Label>
                            <Input
                                id="colorHex"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                placeholder="#ff0000"
                            />
                        </div>

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