import SignUpForm from '@/features/auth/components/SignUpForm';

export const Route = createFileRoute({
    component: SignUpPage,
});

function SignUpPage() {
    return (
        <div className="container min-h-screen grid place-items-center">
            <SignUpForm />
        </div>
    );
}
