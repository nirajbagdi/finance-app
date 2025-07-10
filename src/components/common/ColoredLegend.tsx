import { cn } from '@/utils';

type ColoredLegendProps = {
    label: string;
    value: number | string;
    theme?: string;
};

const ColoredLegend = ({ label, value, theme }: ColoredLegendProps) => (
    <div
        className="relative pl-4"
        style={{ '--legend-theme': theme ?? '' } as React.CSSProperties}
    >
        <div
            className={cn(
                'absolute top-1 sm:top-0 left-0 w-1 h-full rounded-full',
                theme ? 'bg-[var(--legend-theme)]' : 'bg-background'
            )}
        />
        <p
            className="text-secondary-foreground text-xs mb-1 truncate max-w-[200px]"
            title={label}
        >
            {label}
        </p>
        <p className="font-bold text-sm">
            {typeof value === 'number' ? '$' : ''}
            {value}
        </p>
    </div>
);

export default ColoredLegend;
