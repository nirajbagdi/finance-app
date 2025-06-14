import { createRootRoute, Outlet } from '@tanstack/react-router';

import Sidebar from '@/components/layout/sidebar';

export const Route = createRootRoute({
    component: () => (
        <>
            <Sidebar />

            <main className="order-1 xl:order-2 xl:ml-[300px]">
                <Outlet />
            </main>
        </>
    ),
});
