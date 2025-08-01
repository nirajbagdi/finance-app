// External imports
import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
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

// Utils
import { formatAmount } from '@/utils';

// Types
import { MoneyActionTypes } from '@/features/pots/lib/types';

type FormFields = {
    amount: string;
};

type PotMoneyFormProps = {
    defaultValues: FormFields;
    maxAmount: number;
    actionType: MoneyActionTypes;

    isLoading: boolean;

    onSubmit: (data: FormFields) => void;
    onAmountChange?: (data: FormFields) => void;
};

const PotMoneyForm = ({
    defaultValues,
    maxAmount,
    actionType,
    isLoading = false,
    onSubmit,
    onAmountChange,
}: PotMoneyFormProps) => {
    const formSchema = z.object({
        amount: z
            .string()
            .refine(
                (val) => {
                    const parsed = parseInt(val, 10);
                    return !isNaN(parsed) && parsed > 0;
                },
                {
                    message: 'Amount must be greater than 0',
                }
            )
            .refine(
                (val) => {
                    if (!maxAmount) return true;
                    const parsed = parseInt(val, 10);
                    return parsed <= maxAmount;
                },
                {
                    message:
                        actionType === MoneyActionTypes.Add
                            ? `Amount cannot exceed the target`
                            : `You can't withdraw amount more than your current balance (${formatAmount(maxAmount)})`,
                }
            ),
    });

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
                            <FormLabel>Amount to {actionType}</FormLabel>

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

                <Button size="lg" className="w-full mt-2" disabled={isLoading}>
                    <div className="flex items-center gap-2">
                        {isLoading && <Loader2Icon className="animate-spin" />}
                        {actionType === MoneyActionTypes.Add
                            ? 'Confirm Addition'
                            : 'Confirm Withdrawal'}
                    </div>
                </Button>
            </form>
        </Form>
    );
};

export default PotMoneyForm;
