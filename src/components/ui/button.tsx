import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';

const buttonVariants = cva(
    "inline-flex border cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-style",
    {
        variants: {
            variant: {
                default:
                    'bg-foreground text-background border-foreground hover:bg-foreground/90',
                secondary:
                    'bg-background text-foreground border-background hover:border-foreground hover:bg-card',
                outline:
                    'border-secondary-foreground text-foreground hover:bg-beige-500 hover:border-beige-500 hover:text-background',
                destructive:
                    'bg-destructive text-background border-destructive hover:bg-destructive/90',
                ghost: 'border-none bg-transparent text-secondary-foreground hover:text-primary-foreground outline-none',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-4 py-2 has-[>svg]:px-3',
                sm: 'h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
