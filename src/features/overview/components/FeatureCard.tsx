// External imports
import { Link } from '@tanstack/react-router';

// Icons
import RightArrowIcon from '@/icons/common/right-arrow.svg?react';

// Utils
import { cn } from '@/utils';

type FeatureCardProps = {
    title: string;

    link?: {
        label: string;
        href: string;
    };

    className?: string;
    children: React.ReactNode;
};

const FeatureCard = ({ title, link, className, children }: FeatureCardProps) => (
    <section className={cn('bg-card p-8 rounded-xl shadow-2xs', className)}>
        <header className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl">{title}</h2>

            {link && (
                <Link
                    to={link.href}
                    className="flex items-center gap-2 text-sm text-secondary-foreground fill-secondary-foreground hover:text-primary-foreground hover:fill-primary-foreground"
                >
                    <span>{link.label}</span>
                    <RightArrowIcon className="mt-0.5 fill-inherit" />
                </Link>
            )}
        </header>

        {children}
    </section>
);

export default FeatureCard;
