import { forwardRef } from 'react';

import { cn } from '@/utils';

import SearchIcon from '@/icons/common/search.svg?react';

type InputProps = React.ComponentProps<'input'> & {
    variant?: 'default' | 'currency' | 'search';
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant = 'default', ...props }, ref) => {
        return (
            <div className="w-full h-11 px-5 py-2 flex items-center gap-3 rounded-lg border border-grey-500 outline-style">
                {variant === 'currency' && (
                    <span className="select-none text-sm text-secondary-foreground">
                        $
                    </span>
                )}

                <input
                    type={type}
                    data-slot="input"
                    className={cn(
                        'w-full text-sm text-primary-foreground placeholder:text-secondary-foreground',
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                {variant === 'search' && (
                    <div className="text-secondary-foreground">
                        <SearchIcon />
                    </div>
                )}
            </div>
        );
    }
);

export { Input };
