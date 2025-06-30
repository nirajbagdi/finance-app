import SignInForm from '@/features/auth/components/SignInForm';

export const Route = createFileRoute({
    component: SignInPage,
});

function SignInPage() {
    return (
        <div className="container min-h-screen grid place-items-center">
            <SignInForm />
        </div>
    );
}
