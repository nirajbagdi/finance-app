import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute({
    beforeLoad: () => redirect({ to: '/overview' }),
});
