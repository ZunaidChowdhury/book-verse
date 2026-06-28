'use client'

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Fireworks = () => {
    useEffect(() => {
        const duration = 5 * 1000; // 5 seconds
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Left side burst (shooting slightly right and up)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 0, y: 0.5 },
                angle: randomInRange(315, 345)
            });

            // Right side burst (shooting slightly left and up)
            confetti({
                ...defaults,
                particleCount,
                origin: { x: 1, y: 0.5 },
                angle: randomInRange(195, 225)
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return null; // This component handles the effect and renders no HTML
};

export default Fireworks;
