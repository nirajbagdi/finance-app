import { calculateTotal } from '@/utils/math';

import ColoredLegend from '@/components/common/ColoredLegend';

import MoneyBagIcon from '@/icons/feature/overview/money-bag.svg?react';

import type { Pot } from '@/types/finance';

type PotPreviewProps = {
    pots: Pot[];
};

const PotPreview = ({ pots }: PotPreviewProps) => (
    <div className="grid [grid-template-columns:repeat(auto-fit,_minmax(230px,_auto))] gap-6 lg:gap-x-0">
        <div className="flex items-center gap-x-4 bg-background rounded-xl p-5">
            <MoneyBagIcon fontSize={40} />

            <div>
                <p className="text-secondary-foreground text-sm mb-2">Total Saved</p>
                <p className="text-3xl font-bold">
                    ${calculateTotal(pots.map((pot) => pot.total))}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-10 ml-2 md:ml-6">
            {pots.slice(0, 4).map((pot) => (
                <div key={pot.name}>
                    <ColoredLegend
                        label={pot.name}
                        value={pot.total}
                        theme={pot.theme}
                    />
                </div>
            ))}
        </div>
    </div>
);

export default PotPreview;
