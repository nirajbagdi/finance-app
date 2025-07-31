// External imports
import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

// UI components
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Form validation
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Hooks
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters'),
});

type FormFields = z.infer<typeof formSchema>;

export default function SignInForm() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormFields) => {
        try {
            await signIn(data.email, data.password);
            navigate({ to: '/overview' });
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">
                    Enter your credentials to sign in
                </p>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            form.setValue('email', 'johndoe@example.com');
                            form.setValue('password', 'iamjohndoe123');
                            form.handleSubmit(onSubmit)();
                        }}
                    >
                        Continue with Demo Account
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                Don't have an account?{' '}
                <Link
                    to="/signup"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}
