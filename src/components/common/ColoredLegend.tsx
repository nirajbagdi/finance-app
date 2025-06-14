type ColoredLegendProps = {
    label: string;
    value: number;
    theme: string;
};

const ColoredLegend = ({ label, value, theme }: ColoredLegendProps) => (
    <div
        className="relative pl-4"
        style={{ '--legend-theme': theme } as React.CSSProperties}
    >
        <div className="absolute top-1 sm:top-0 left-0 w-1 h-full rounded-full bg-[var(--legend-theme)]" />
        <p className="text-secondary-foreground text-xs mb-1">{label}</p>
        <p className="font-bold text-sm">${value}</p>
    </div>
);

export default ColoredLegend;
