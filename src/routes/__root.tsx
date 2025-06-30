import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';

import { useAuth } from '@/context/AuthContext';
import { supabaseProjectId } from '@/constants';

import Sidebar from '@/components/layout/sidebar';

const PUBLIC_ROUTES = ['/signin', '/signup'];
const AUTH_TOKEN_KEY = `sb-${supabaseProjectId}-auth-token`;

const isAuthenticated = () => !!localStorage.getItem(AUTH_TOKEN_KEY);
const isPublicRoute = (pathname: string) => PUBLIC_ROUTES.includes(pathname);

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: RootComponent,

    beforeLoad: ({ location }) => {
        const sessionExists = isAuthenticated();
        const isPublic = isPublicRoute(location.pathname);

        if (!sessionExists && !isPublic) throw redirect({ to: '/signin' });
        if (sessionExists && isPublic) throw redirect({ to: '/overview' });
    },
});

function RootComponent() {
    const { user } = useAuth();
    const hasSession = !!user;

    return (
        <>
            {hasSession && <Sidebar />}
            <main className={hasSession ? 'order-1 xl:order-2 xl:ml-[300px]' : ''}>
                <Outlet />
            </main>
        </>
    );
}
