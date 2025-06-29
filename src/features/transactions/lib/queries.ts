import { queryOptions } from '@tanstack/react-query';

import { fetchTransactions } from './api';

export const transactionsQueryOptions = queryOptions({
    queryKey: ['transactions'],
    queryFn: () => fetchTransactions(),
});
