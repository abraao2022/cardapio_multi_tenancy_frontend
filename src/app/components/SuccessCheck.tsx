'use client';
import { useEffect, useState } from 'react';

const styles = {
    container: {
        position: 'relative',
        width: '5rem',
        height: '5rem',
        margin: '0 auto 2rem'
    },
    circle: {
        fill: 'none',
        stroke: '#E5DEFF',
        strokeWidth: '8'
    },
    checkmark: {
        fill: 'none',
        stroke: '#9B87F5',
        strokeWidth: '8',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeDasharray: '100',
        strokeDashoffset: '100',
        animation: 'checkmark 0.8s ease-in-out forwards'
    }
} as const;

export const SuccessCheck = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={styles.container}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle style={styles.circle} cx="50" cy="50" r="45" />
                <path style={{ ...styles.checkmark, animation: animate ? styles.checkmark.animation : 'none' }} d="M25,50 L45,70 L75,30" />
            </svg>
        </div>
    );
};
