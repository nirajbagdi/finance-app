// Components
import BudgetCardHeader from './BudgetCardHeader';
import BudgetSummary from './BudgetSummary';
import BudgetSpendingList from './BudgetSpendingList';

// Types
import type { Budget, Transaction } from '@/types/finance';
import type { BudgetFormFields } from '../../lib/types';

type BudgetCardProps = {
    budget: Budget;
    transactions: Transaction[];

    spent: number;

    isEditing: boolean;
    isDeleting: boolean;

    onEditBudget: (data: BudgetFormFields) => void;
    onDeleteBudget: (category: string | null) => void;
};

const BudgetCard = ({
    budget,
    transactions,
    spent,
    isEditing,
    isDeleting,
    onEditBudget,
    onDeleteBudget,
}: BudgetCardProps) => (
    <div className="bg-card p-8 rounded-xl shadow-2xs mb-4 lg:mb-6 last:mb-0">
        <BudgetCardHeader
            budget={budget}
            onEditBudget={onEditBudget}
            onDeleteBudget={onDeleteBudget}
            isEditing={isEditing}
            isDeleting={isDeleting}
        />

        <BudgetSummary
            spent={spent}
            limit={budget.value}
            theme={budget.theme || '#000'}
        />

        <BudgetSpendingList category={budget.category} transactions={transactions} />
    </div>
);

export default BudgetCard;
