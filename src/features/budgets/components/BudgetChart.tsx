// External imports
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Utils
import { getBudgetUsage } from '../lib/utils';

// Types
import type { Budget, Transaction } from '@/types/finance';

type BudgetChartProps = {
    budgets: Budget[];
    transactions: Transaction[];
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: {
        payload: Budget;
    }[];
    coordinate?: { x: number; y: number };
};

const BudgetChart = ({ budgets, transactions }: BudgetChartProps) => {
    const { budgetLimit, totalSpent } = getBudgetUsage(budgets, transactions);

    const renderPieLayer = (
        innerRadius: string,
        outerRadius: string,
        isOuterLayer = false
    ) => (
        <Pie
            data={budgets}
            dataKey="value"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            stroke="none"
        >
            {budgets.map((item, idx) => (
                <Cell
                    key={`${isOuterLayer ? 'outer' : 'inner'}-${idx}`}
                    fill={item.theme}
                    style={isOuterLayer ? undefined : { opacity: 0.7 }}
                />
            ))}
        </Pie>
    );

    return (
        <div className="relative w-60 h-60 flex-1">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Tooltip content={<CustomTooltip />} />

                    {renderPieLayer('65%', '80%')}
                    {renderPieLayer('80%', '100%', true)}
                </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-3xl font-bold text-foreground">
                    ${Math.round(totalSpent)}
                </p>
                <p className="text-xs mt-1 text-secondary-foreground">
                    of ${budgetLimit} limit
                </p>
            </div>
        </div>
    );
};

const CustomTooltip = ({ active, payload, coordinate }: CustomTooltipProps) => {
    if (!active || !coordinate || !payload || payload.length === 0) return null;

    const { x, y } = coordinate;
    const budget = payload[0].payload;
    const budgetTheme = budget.theme || '#000';

    return (
        <div
            className="flex items-center z-50 w-30"
            style={{
                left: x + 10,
                top: y - 15,
                pointerEvents: 'none',
                position: 'absolute',
                transition: 'top 0.5s ease, left 0.5s ease',
            }}
        >
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-foreground" />
            <div className="bg-foreground rounded-lg shadow-lg px-2 py-1 text-xs text-white border border-foreground flex items-center gap-1">
                <div
                    className="w-3.5 h-3.5 rounded-xs border-2 border-white"
                    style={{ backgroundColor: budgetTheme }}
                />
                <p>{budget.category || ''}</p>
            </div>
        </div>
    );
};

export default BudgetChart;
