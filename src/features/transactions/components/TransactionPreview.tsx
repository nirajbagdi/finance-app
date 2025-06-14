import TransactionList from './TransactionList';

import type { Transaction } from '@/types/finance';

type TransactionPreviewProps = {
    transactions: Transaction[];
};

const TransactionPreview = ({ transactions }: TransactionPreviewProps) => (
    <div className="mt-8">
        <TransactionList transactions={transactions.slice(0, 5)} />
    </div>
);

export default TransactionPreview;
