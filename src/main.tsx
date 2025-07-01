import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import AuthProvider from '@/context/AuthContext';
import { routeTree } from './routeTree.gen';

import './styles/index.css';

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

// Remove the static loader after React mounts
function removeAppLoader() {
    const loader = document.getElementById('app-loader');
    if (loader) loader.remove();
}

root.render(
    <StrictMode>
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    </StrictMode>
);

removeAppLoader();
