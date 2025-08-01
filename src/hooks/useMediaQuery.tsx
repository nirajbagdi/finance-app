import { useEffect, useState } from 'react';

export default function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQueryList = window.matchMedia(query);

        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

        mediaQueryList.addEventListener('change', listener);
        setMatches(mediaQueryList.matches);
        return () => mediaQueryList.removeEventListener('change', listener);
    }, [query]);

    return matches;
}
