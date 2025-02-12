'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
const styles = {
    button: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        marginLeft: '0.5rem',
        background: 'transparent',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    icon: {
        width: '1rem',
        height: '1rem',
        color: '#9B87F5'
    }
} as const;

interface CopyButtonProps {
    text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button onClick={copyToClipboard} style={styles.button} aria-label="Copiar URL">
            {copied ? <Check style={styles.icon} /> : <Copy style={styles.icon} />}
        </button>
    );
};
