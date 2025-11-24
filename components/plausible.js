'use client';

import { useEffect } from 'react';

function initPlausible() {
    window.plausible = window.plausible || function () { (plausible.q = plausible.q || []).push(arguments) };
    plausible.init = plausible.init || function (i) { plausible.o = i || {} };
    plausible.init();
}

export default function Plausible() {
    useEffect(() => {
        // Wait for the script to load before initializing
        const checkPlausible = () => {
            if (typeof window !== 'undefined' && window.plausible) {
                initPlausible();
            } else {
                // Retry after a short delay if script hasn't loaded yet
                setTimeout(checkPlausible, 100);
            }
        };
        
        checkPlausible();
    }, []);

    return null;
}

