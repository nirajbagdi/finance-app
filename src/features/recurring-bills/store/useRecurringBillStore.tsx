// External imports
import { create } from 'zustand';

// Constants
import { transactions } from '@/features/transactions/mockData';

// Types
import type { Transaction } from '@/types/finance';

type RecurringBillStore = {
    recurringBills: Transaction[];
};

const useRecurringBillStore = create<RecurringBillStore>(() => ({
    recurringBills: transactions.filter((tx) => tx.recurring),
}));

export default useRecurringBillStore;
