// UI/Shared components
import TransactionList from './TransactionList';

// Types
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
