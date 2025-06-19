import { Link } from '@tanstack/react-router';

import { cn } from '@/utils';

import NavItem from './NavItem';

import OverviewIcon from '@/icons/navigation/overview.svg?react';
import TransactionsIcon from '@/icons/navigation/transactions.svg?react';
import BudgetsIcon from '@/icons/navigation/budgets.svg?react';
import PotsIcon from '@/icons/navigation/pots.svg?react';
import RecurringBillIcon from '@/icons/navigation/recurring.svg?react';
import FinanceIcon from '@/icons/common/finance.svg?react';

const navItems = [
    {
        name: 'Overview',
        path: '/overview',
        icon: OverviewIcon,
    },
    {
        name: 'Transactions',
        path: '/transactions',
        icon: TransactionsIcon,
    },
    {
        name: 'Budgets',
        path: '/budgets',
        icon: BudgetsIcon,
    },
    {
        name: 'Pots',
        path: '/pots',
        icon: PotsIcon,
    },
    {
        name: 'Recurring Bills',
        path: '/recurring-bills',
        icon: RecurringBillIcon,
    },
];

const Sidebar = () => (
    <aside
        className={cn(
            'bg-foreground pt-3 xl:py-8 xl:pr-6 rounded-tl-3xl xl:rounded-tl-none rounded-tr-3xl order-2 xl:order-1',
            'fixed bottom-0 w-full xl:w-[300px] xl:h-screen z-10'
        )}
    >
        <div className="mt-3 mb-16 w-80 mr-auto hidden xl:block">
            <Link to="/">
                <FinanceIcon className="w-30 ml-8" />
            </Link>
        </div>

        <nav aria-label="App Navigation">
            <ul className="flex xl:flex-col justify-around px-3 md:px-0 lg:gap-1.5">
                {navItems.map(({ name, path, icon: Icon }) => (
                    <NavItem
                        key={name}
                        name={name}
                        path={path}
                        icon={<Icon className="w-6 h-6 fill-inherit" />}
                    />
                ))}
            </ul>
        </nav>
    </aside>
);

export default Sidebar;
