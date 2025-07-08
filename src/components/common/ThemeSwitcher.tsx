// External imports
import { useState } from 'react';

// UI Components
import { Button } from '@/components/ui/button';

// Utility to generate a random color in hex
function getRandomColor() {
    const colors = ['#603808', '#013220', '#702963'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Utility to lighten or darken a hex color
function shadeColor(color: string, percent: number) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
    R = Math.min(255, Math.max(0, R + Math.round(255 * percent)));
    G = Math.min(255, Math.max(0, G + Math.round(255 * percent)));
    B = Math.min(255, Math.max(0, B + Math.round(255 * percent)));
    return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}

function generateRandomTheme() {
    const base = getRandomColor();
    return {
        background: shadeColor(base, 0.7),
        foreground: shadeColor(base, -0.7),
        card: shadeColor(base, 0.6),
        popover: shadeColor(base, 0.4),
        mutedForeground: shadeColor(base, 0.5),
        secondaryForeground: shadeColor(base, -0.5),
        accent: shadeColor(base, 0.6),
        sidebarAccent: shadeColor(base, -0.1),
    };
}

const ThemeSwitcher = () => {
    const [themeName, setThemeName] = useState('Random');

    const applyTheme = (theme: ReturnType<typeof generateRandomTheme>) => {
        const root = document.documentElement;

        root.style.setProperty('--background', theme.background);
        root.style.setProperty('--foreground', theme.foreground);
        root.style.setProperty('--card', theme.card);
        root.style.setProperty('--popover', theme.popover);
        root.style.setProperty('--muted-foreground', theme.mutedForeground);
        root.style.setProperty('--secondary-foreground', theme.secondaryForeground);
        root.style.setProperty('--accent', theme.accent);
        root.style.setProperty('--sidebar-accent', theme.sidebarAccent);

        setThemeName('Random');
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
