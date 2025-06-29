import { queryOptions } from '@tanstack/react-query';

import { fetchBudgets } from './api';

export const budgetsQueryOptions = queryOptions({
    queryKey: ['budgets'],
    queryFn: () => fetchBudgets(),
});
