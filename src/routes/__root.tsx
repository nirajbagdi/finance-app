import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import Sidebar from '@/components/layout/sidebar';

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: () => (
        <>
            <Sidebar />

            <main className="order-1 xl:order-2 xl:ml-[300px]">
                <Outlet />
            </main>
        </>
    ),
});
