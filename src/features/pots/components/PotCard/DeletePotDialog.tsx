// UI/Shared components
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import DialogWrapper from '@/components/common/DialogWrapper';

type DeletePotDialogProps = {
    potName: string;
    onDelete: (name: string | null) => void;
};

const DeletePotDialog = ({ potName, onDelete }: DeletePotDialogProps) => (
    <DialogWrapper
        title={`Delete '${potName}'?`}
        description="Are you sure you want to delete this pot? This action cannot be reversed."
        trigger={
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red"
            >
                Delete
            </DropdownMenuItem>
        }
    >
        <div className="mt-2 space-y-2">
            <Button
                variant="destructive"
                className="w-full"
                onClick={() => onDelete(potName)}
            >
                Yes, Confirm Deletion
            </Button>
            <Button
                variant="ghost"
                className="w-full"
                onClick={() => onDelete(null)}
            >
                No, Go Back
            </Button>
        </div>
    </DialogWrapper>
);

export default DeletePotDialog;
