import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import './styles/index.css';

import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});
const router = createRouter({ routeTree, context: { queryClient } });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
