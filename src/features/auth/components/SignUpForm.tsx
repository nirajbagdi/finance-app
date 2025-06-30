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

const formSchema = z
    .object({
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(50, 'Password must not exceed 50 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type FormFields = z.infer<typeof formSchema>;

export default function SignUpForm() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: FormFields) => {
        try {
            await signUp(data.email, data.password);
            navigate({ to: '/overview' });
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-muted-foreground">
                    Enter your details to create your account
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

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                    to="/signin"
                    className="font-medium underline underline-offset-4 hover:text-primary"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
}
