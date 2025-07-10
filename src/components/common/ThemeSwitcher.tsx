// External imports
import chroma from 'chroma-js';

// UI Components
import { Button } from '@/components/ui/button';
import { PaletteIcon } from 'lucide-react';

function generateRandomTheme() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 0.45 + Math.random() * 0.3;
    const base = chroma.hsl(hue, saturation, 0.5);

    return {
        '--background': base.brighten(3).hex(),
        '--foreground': base.darken(3).hex(),
        '--card': base.brighten(2.7).hex(),
        '--popover': base.brighten(2.5).hex(),
        '--muted-foreground': base.brighten(0.5).desaturate(1.5).hex(),
        '--secondary-foreground': base.darken(1.5).desaturate(1.2).hex(),
        '--sidebar-accent': base.set('hsl.h', '+60').darken(0.5).hex(),
        '--accent': base.brighten(2).hex(),
        '--color-scrollbar': base.darken(0.3).hex(),
        '--color-ring': base.brighten(0.2).hex(),
    };
}

const ThemeSwitcher = () => {
    const applyTheme = (theme: ReturnType<typeof generateRandomTheme>) => {
        const root = document.documentElement;

        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    };

    const handleRandomTheme = () => {
        const randomTheme = generateRandomTheme();
        applyTheme(randomTheme);
    };

    return (
        <Button
            onClick={handleRandomTheme}
            variant="outline"
            size="icon"
            className="rounded-full bg-accent hover:bg-accent/80 border-2 border-foreground hover:border-foreground/80 shadow-sm transition-colors duration-150 p-2"
            aria-label="Randomize Theme"
            title="Randomize Theme"
        >
            <PaletteIcon className="size-5 text-primary stroke-foreground" />
        </Button>
    );
};

export default ThemeSwitcher;
