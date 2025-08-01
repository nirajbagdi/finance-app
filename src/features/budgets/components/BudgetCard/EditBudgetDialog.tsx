// UI/Shared components
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import DialogWrapper from '@/components/common/DialogWrapper';

// Feature components
import BudgetForm from '../BudgetForm';

// Types
import type { Budget } from '@/types/finance';
import type { BudgetFormFields } from '@/features/budgets/lib/types';

type EditBudgetDialogProps = {
    budget: Budget;
    isEditing: boolean;
    onSubmit: (data: BudgetFormFields) => void;
};

const EditBudgetDialog = ({
    budget,
    isEditing,
    onSubmit,
}: EditBudgetDialogProps) => (
    <DialogWrapper
        title="Edit Budget"
        description="As your budgets change, feel free to update your spending limits."
        trigger={
            <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-foreground"
            >
                Edit
            </DropdownMenuItem>
        }
    >
        <BudgetForm
            defaultValues={{
                category: budget.category,
                theme: budget.theme || '#000',
                maxSpend: budget.value + '',
            }}
            actionLabel="Edit Budget"
            onSubmit={onSubmit}
            isLoading={isEditing}
        />
    </DialogWrapper>
);

export default EditBudgetDialog;
