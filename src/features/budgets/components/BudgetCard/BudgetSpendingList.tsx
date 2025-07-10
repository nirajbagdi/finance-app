// External imports
import { Link } from '@tanstack/react-router';

// Icons
import RightArrowIcon from '@/icons/common/right-arrow.svg?react';

// Components
import TransactionList from '@/features/transactions/components/TransactionList';

// Types
import type { Transaction } from '@/types/finance';

type BudgetSpendingListProps = {
    category: string;
    transactions: Transaction[];
};

const BudgetSpendingList = ({ category, transactions }: BudgetSpendingListProps) => (
    <div className="bg-background rounded-xl px-4 py-6 mt-6">
        <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-bold">Latest Spending</h3>

            <Link
                to="/transactions"
                search={{
                    query: '',
                    page: 1,
                    sort: 'Latest',
                    category,
                }}
                className="flex items-center gap-2 text-[13px] text-secondary-foreground fill-secondary-foreground hover:text-primary-foreground hover:fill-primary-foreground"
            >
                <span>See All</span>
                <RightArrowIcon className="fill-inherit -mt-0.5" />
            </Link>
        </div>

        <TransactionList transactions={transactions} compact />
    </div>
);

export default BudgetSpendingList;
