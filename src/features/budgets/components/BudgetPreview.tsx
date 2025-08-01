// UI/Shared components
import BudgetChart from './BudgetChart';
import ColoredLegend from '@/components/common/ColoredLegend';

// Utils
import { formatAmount } from '@/utils';

// Types
import type { Transaction, Budget } from '@/types/finance';

type BudgetPreviewProps = {
    budgets: Budget[];
    transactions: Transaction[];
};

const BudgetPreview = ({ budgets, transactions }: BudgetPreviewProps) => (
    <div className="grid md:grid-cols-2 gap-12 md:gap-3 items-center justify-items-center h-[80%]">
        <div className="lg:ml-15">
            <BudgetChart budgets={budgets} transactions={transactions} />
        </div>

        <div className="md:flex md:flex-col gap-x-20 gap-y-5 md:gap-6 grid grid-cols-2">
            {budgets.map((budget, idx) => (
                <ColoredLegend
                    key={idx}
                    label={budget.category}
                    value={formatAmount(budget.value)}
                    theme={budget.theme || '#000'}
                />
            ))}
        </div>
    </div>
);

export default BudgetPreview;
