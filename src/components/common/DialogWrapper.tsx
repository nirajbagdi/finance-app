// UI/Shared Components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type DialogWrapperProps = {
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
};

const DialogWrapper = ({
    title,
    description,
    trigger,
    children,
}: DialogWrapperProps) => (
    <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {children}
        </DialogContent>
    </Dialog>
);

export default DialogWrapper;
