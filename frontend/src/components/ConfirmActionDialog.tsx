import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmActionDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (itemToInteract: any) => void;
    itemToInteract: any;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmActionDialog({
    open,
    onClose,
    onConfirm,
    itemToInteract,
    title,
    message
}: ConfirmActionDialogProps) {

    const handleConfirm = () => {
        onConfirm(itemToInteract);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    <p>{message}</p>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        onClick={handleConfirm}
                    >
                        Sim
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Não
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}