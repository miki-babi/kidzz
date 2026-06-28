import { useEffect, useRef } from 'react';

export function useGameStartTime(): React.RefObject<number> {
    const startTime = useRef(0);

    useEffect(() => {
        startTime.current = Date.now();
    }, []);

    return startTime;
}

export function elapsedGameSeconds(startTimeMs: number): number {
    return Math.round((Date.now() - startTimeMs) / 1000);
}
