// Utils
import { getBillStatus } from '../utils';

// Types
import type { Transaction } from '@/types/finance';

export default function useBillSummaries(bills: Transaction[]) {
    const initialSummary: {
        paid: Transaction[];
        upcoming: Transaction[];
        dueSoon: Transaction[];

        totals: {
            paid: number;
            upcoming: number;
            dueSoon: number;
        };
    } = {
        paid: [],
        upcoming: [],
        dueSoon: [],

        totals: {
            paid: 0,
            upcoming: 0,
            dueSoon: 0,
        },
    };

    return bills.reduce((summary, bill) => {
        const status = getBillStatus(bill);
        const amount = Math.abs(bill.amount);

        if (status in summary) {
            summary[status].push(bill);
            summary.totals[status] += amount;
        }

        return summary;
    }, initialSummary);
}
