// Utils
import { cn, formatDate } from '@/utils';

// Types
import type { Transaction } from '@/types/finance';

type TransactionTableProps = {
    transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
    const transactionColumns = [
        {
            header: 'Recipient / Sender',
            render: (tx: Transaction) => (
                <div className="flex items-center space-x-4 py-4 pl-4">
                    <img
                        src={tx.avatar}
                        alt={tx.name}
                        width={38}
                        height={38}
                        className="rounded-full"
                    />
                    <span className="font-bold text-gray-800">{tx.name}</span>
                </div>
            ),
        },

        {
            header: 'Category',
            render: (tx: Transaction) => (
                <div className="text-gray-600">{tx.category}</div>
            ),
        },

        {
            header: 'Transaction Date',
            render: (tx: Transaction) => (
                <div className="text-gray-600">{formatDate(tx.date)}</div>
            ),
        },

        {
            header: 'Amount',
            render: (tx: Transaction) => (
                <div
                    className={cn(
                        'text-right pr-4 font-bold',
                        tx.amount > 0 && 'text-green'
                    )}
                >
                    {tx.amount < 0
                        ? `-$${Math.abs(tx.amount).toFixed(2)}`
                        : `+$${tx.amount.toFixed(2)}`}
                </div>
            ),
        },
    ];

    return (
        <table className="min-w-full border-separate border-spacing-y-4">
            <thead>
                <tr className="text-left text-gray-500 text-xs *:font-normal">
                    {transactionColumns.map((col, i) => (
                        <th key={i} className="first:pl-4 last:pr-4 last:text-right">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {transactions.map((transaction, idx) => (
                    <tr
                        key={idx}
                        className="bg-white shadow-[0px_2px_0px_rgba(0,0,0,0.05)] last:shadow-[0_0_0_rgba(0,0,0,0)] rounded-lg text-sm"
                    >
                        {transactionColumns.map((col, i) => (
                            <td key={i}>
                                {col.render ? col.render(transaction) : null}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
