import { Link, useMatches } from '@tanstack/react-router';

import { cn } from '@/utils';

type NavItemProps = {
    name: string;
    path: string;
    icon: React.ReactNode;
};

const NavItem = ({ name, path, icon }: NavItemProps) => {
    const matches = useMatches();
    const isActive = matches.some((match) => match.pathname === path);

    return (
        <li className="flex-1 md:flex-none">
            <Link
                to={path}
                className={cn(
                    'flex flex-col xl:flex-row items-center gap-x-4 text-sm xl:text-base font-bold md:px-8 xl:px-8 py-2 xl:py-4 rounded-tl-xl rounded-tr-xl xl:rounded-br-xl xl:rounded-tl-none xl:border-b-0 border-b-4 xl:border-l-4 outline-style',

                    isActive
                        ? 'bg-card fill-green border-green'
                        : 'text-muted-foreground fill-muted-foreground hover:text-card hover:fill-card border-transparent'
                )}
                aria-current={isActive ? 'page' : undefined}
            >
                {icon} <span className="hidden md:block">{name}</span>
            </Link>
        </li>
    );
};

export default NavItem;
