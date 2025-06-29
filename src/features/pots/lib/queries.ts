import { queryOptions } from '@tanstack/react-query';

import { fetchPots } from './api';

export const potsQueryOptions = queryOptions({
    queryKey: ['pots'],
    queryFn: () => fetchPots(),
});
