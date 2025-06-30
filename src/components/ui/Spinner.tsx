import { cn } from '@/utils';

type SpinnerProps = {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
};

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => (
    <div
        className={cn(
            'animate-spin rounded-full border-2 border-current border-t-transparent',
            sizeClasses[size],
            className
        )}
    />
);

export default Spinner;
