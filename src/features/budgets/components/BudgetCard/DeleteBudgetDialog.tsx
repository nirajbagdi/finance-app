// UI/Shared components
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import DialogWrapper from '@/components/common/DialogWrapper';

type DeleteBudgetDialogProps = {
    budgetName: string;
    onDelete: (name: string | null) => void;
};

const DeleteBudgetDialog = ({ budgetName, onDelete }: DeleteBudgetDialogProps) => (
    <DialogWrapper
        title={`Delete '${budgetName}'?`}
        description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
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
                onClick={() => onDelete(budgetName)}
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

export default DeleteBudgetDialog;
