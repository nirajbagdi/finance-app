// Utils
import { cn, getDayWithSuffix } from '@/utils';

// Types
import type { Transaction } from '@/types/finance';

type RecurringBillTableProps = {
    recurringBills: Transaction[];
};

const RecurringBillTable = ({ recurringBills }: RecurringBillTableProps) => {
    const recurringBillColumns = [
        {
            header: 'Bill Title',
            render: (bill: Transaction) => (
                <div className="flex items-center space-x-4 py-4 pl-4">
                    <img
                        src={bill.avatar}
                        alt={bill.name}
                        width={38}
                        height={38}
                        className="rounded-full"
                    />
                    <span className="font-bold text-gray-800">{bill.name}</span>
                </div>
            ),
        },

        {
            header: 'Due Date',
            render: (bill: Transaction) => (
                <div className="text-gray-600">{`Monthly - ${getDayWithSuffix(bill.date)}`}</div>
            ),
        },

        {
            header: 'Amount',
            render: (bill: Transaction) => (
                <div
                    className={cn(
                        'text-right pr-4 font-bold',
                        bill.amount > 0 && 'text-green'
                    )}
                >
                    {bill.amount < 0
                        ? `-$${Math.abs(bill.amount).toFixed(2)}`
                        : `+$${bill.amount.toFixed(2)}`}
                </div>
            ),
        },
    ];

    return (
        <table className="min-w-full border-separate border-spacing-y-4">
            <thead>
                <tr className="text-left text-gray-500 text-xs *:font-normal">
                    {recurringBillColumns.map((col, i) => (
                        <th key={i} className="first:pl-4 last:pr-4 last:text-right">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {recurringBills.map((transaction, idx) => (
                    <tr
                        key={idx}
                        className="bg-white shadow-[0px_2px_0px_rgba(0,0,0,0.05)] last:shadow-[0_0_0_rgba(0,0,0,0)] rounded-lg text-sm"
                    >
                        {recurringBillColumns.map((col, i) => (
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

export default RecurringBillTable;
