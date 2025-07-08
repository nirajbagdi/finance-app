// External imports
import chroma from 'chroma-js';

// UI Components
import { Button } from '@/components/ui/button';

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
        '--color-scrollbar': base.brighten(2).hex(),
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
        <Button onClick={handleRandomTheme} className="gap-2" variant="outline">
            🎨 Random Theme
        </Button>
    );
};

export default ThemeSwitcher;
