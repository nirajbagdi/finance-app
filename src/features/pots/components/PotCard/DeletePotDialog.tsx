// External imports
import { Loader2Icon } from 'lucide-react';

// UI/Shared components
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import DialogWrapper from '@/components/common/DialogWrapper';

type DeletePotDialogProps = {
    potName: string;
    isDeleting: boolean;
    onDelete: (name: string | null) => void;
};

const DeletePotDialog = ({
    potName,
    isDeleting,
    onDelete,
}: DeletePotDialogProps) => (
    <DialogWrapper
        title={`Delete '${potName}'?`}
        description="Are you sure you want to delete this pot? This action cannot be reversed."
        trigger={
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red focus:bg-red/80 focus:text-card"
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
                disabled={isDeleting}
            >
                <div className="flex items-center gap-2">
                    {isDeleting && <Loader2Icon className="animate-spin" />}
                    Yes, Confirm Deletion
                </div>
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
