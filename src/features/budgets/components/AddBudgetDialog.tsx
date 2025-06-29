// External imports
import { Plus } from 'lucide-react';

// UI/Shared Components
import { Button } from '@/components/ui/button';
import DialogWrapper from '@/components/common/DialogWrapper';

// Components
import BudgetForm from '@/features/budgets/components/BudgetForm';

// Types
import type { BudgetFormFields } from '../lib/types';

type AddBudgetDialogProps = {
    categoryOptions: string[];
    onAddBudget: (data: BudgetFormFields) => void;
};

const AddBudgetDialog = ({ categoryOptions, onAddBudget }: AddBudgetDialogProps) => (
    <DialogWrapper
        title="Add New Budget"
        description="Choose a category to set a spending budget. These categories can help you monitor spending."
        trigger={
            <Button size="lg">
                <Plus className="-mr-0.5" />
                Add New Budget
            </Button>
        }
    >
        <BudgetForm
            defaultValues={{
                category: '',
                theme: '',
                maxSpend: '',
            }}
            categoryOptions={categoryOptions}
            actionLabel="Add Budget"
            onSubmit={onAddBudget}
        />
    </DialogWrapper>
);

export default AddBudgetDialog;
