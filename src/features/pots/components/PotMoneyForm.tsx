// External imports
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// UI compoonents
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    amount: z
        .string()
        .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val) > 0, {
            message: 'Amount must be greater than 0',
        }),
});

type FormFields = z.infer<typeof formSchema>;

type PotMoneyFormProps = {
    defaultValues: FormFields;

    action: 'Add' | 'Withdraw';

    onSubmit: (data: FormFields) => void;
    onAmountChange?: (data: FormFields) => void;
};

const PotMoneyForm = ({
    defaultValues,
    action,
    onSubmit,
    onAmountChange,
}: PotMoneyFormProps) => {
    const form = useForm<FormFields>({
        defaultValues,
        resolver: zodResolver(formSchema),
    });

    const watchedAmount = form.watch('amount');

    useEffect(() => {
        if (onAmountChange) onAmountChange({ amount: watchedAmount });
    }, [watchedAmount, onAmountChange]);

    function handleSubmit(data: FormFields) {
        onSubmit(data);
        form.reset();

        // Find and click the close button to close the dialog
        const closeButton = document.querySelector(
            '[data-slot="dialog-close"]'
        ) as HTMLButtonElement;
        if (closeButton) closeButton.click();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-y-4"
            >
                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount to {action}</FormLabel>

                            <FormControl>
                                <Input
                                    type="number"
                                    variant="currency"
                                    placeholder="eg. 2000"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size="lg" className="w-full mt-2">
                    {action === 'Add' ? 'Confirm Addition' : 'Confirm Withdrawal'}
                </Button>
            </form>
        </Form>
    );
};

export default PotMoneyForm;
