// External imports
import { create } from 'zustand';

// Constants
import { transactions } from '../mockData';

// Types
import type { Transaction } from '@/types/finance';

type TransactionState = {
    transactions: Transaction[];
};

const useTransactionStore = create<TransactionState>(() => ({
    transactions,
}));

export default useTransactionStore;
