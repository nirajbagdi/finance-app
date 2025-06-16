import { sortBy } from '@/utils/array';
import { formatAmount } from '@/utils/formatting';

import BudgetChart from './BudgetChart';
import ColoredLegend from '@/components/common/ColoredLegend';

import type { Transaction, Budget } from '@/types/finance';

type BudgetPreviewProps = {
    budgets: Budget[];
    transactions: Transaction[];
};

const BudgetPreview = ({ budgets, transactions }: BudgetPreviewProps) => (
    <div className="grid md:grid-cols-2 gap-12 md:gap-3 items-center justify-items-center h-[80%]">
        <BudgetChart budgets={budgets} transactions={transactions} />

        <div className="md:flex md:flex-col gap-x-20 gap-y-5 md:gap-6 grid grid-cols-2">
            {sortBy(budgets, 'value', 'desc').map((budget, idx) => (
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
