// External imports
import { Ellipsis } from 'lucide-react';

// UI/Shared Components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Components
import EditBudgetDialog from './EditBudgetDialog';
import DeleteBudgetDialog from './DeleteBudgetDialog';

// Utils
import { formatAmount } from '@/utils';

// Types
import type { Budget } from '@/types/finance';
import type { BudgetFormFields } from '@/features/budgets/lib/types';

type BudgetCardHeaderProps = {
    budget: Budget;

    isEditing: boolean;
    isDeleting: boolean;

    onEditBudget: (data: BudgetFormFields) => void;
    onDeleteBudget: (name: string | null) => void;
};

const BudgetCardHeader = ({
    budget,
    isEditing,
    isDeleting,
    onEditBudget,
    onDeleteBudget,
}: BudgetCardHeaderProps) => (
    <header className="mb-6">
        <div className="flex items-center gap-2.5 mb-2">
            <span
                className="inline-block w-4 h-4 rounded-full bg-[var(--budget-theme)]"
                style={{ '--budget-theme': budget.theme } as React.CSSProperties}
            />
            <h2 className="font-bold text-xl flex-1">{budget.category}</h2>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis className="text-grey-300 cursor-pointer" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <EditBudgetDialog
                        budget={budget}
                        isEditing={isEditing}
                        onSubmit={onEditBudget}
                    />
                    <DeleteBudgetDialog
                        budgetName={budget.category}
                        isDeleting={isDeleting}
                        onDelete={onDeleteBudget}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <p className="text-secondary-foreground text-sm">
            Maximum of {formatAmount(budget.value)}
        </p>
    </header>
);

export default BudgetCardHeader;
