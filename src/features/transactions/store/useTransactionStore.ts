import { create } from 'zustand';

import type { Transaction } from '@/types/finance';

import { transactions } from '../mockData';

type TransactionState = {
    transactions: Transaction[];
};

const useTransactionStore = create<TransactionState>(() => ({
    transactions,
}));

export default useTransactionStore;
