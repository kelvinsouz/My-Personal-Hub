import { useState, useEffect } from "react";
import { FinanceRecord, STATUS_OPTIONS } from "@/types";
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (record: FinanceRecord) => void;
  record?: FinanceRecord | null;
  categorias: readonly string[];
  title: string;
}

export default function RecordFormDialog({ open, onClose, onSave, record, categorias, title }: Props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);
  const [data, setData] = useState("");
  const [status, setStatus] = useState<FinanceRecord["status"]>("pendente");

  useEffect(() => {
    if (record) {
      setDescricao(record.descricao);
      setValor(String(record.valor));
      setCategoria(record.categoria);
      setData(record.data.slice(0, 10));
      setStatus(record.status);
    } else {
      setDescricao("");
      setValor("");
      setCategoria(categorias[0]);
      setData(new Date().toISOString().slice(0, 10));
      setStatus("pendente");
    }
  }, [record, open, categorias]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      descricao,
      valor: parseFloat(valor) || 0,
      categoria,
      status,
    });
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
            <Label htmlFor="descricao">Descrição</Label>
            <Input id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="valor">Valor (R$)</Label>
            <Input id="valor" type="number" step="0.01" min="0" value={valor} onChange={(e) => setValor(e.target.value)} required />
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
