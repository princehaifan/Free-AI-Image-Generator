import React from 'react';
import type { AspectRatio } from '../types';

export const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4V2"/>
        <path d="M15 8V6"/>
        <path d="M15 12V10"/>
        <path d="M15 16V14"/>
        <path d="M15 20V18"/>
        <path d="M18 7H12"/>
        <path d="M21 4H9"/>
        <path d="M21 20H9"/>
        <path d="M12 17H6"/>
        <path d="m3 4 1.6 1.6"/>
        <path d="m6 8 1.6-1.6"/>
        <path d="m3 20 1.6-1.6"/>
        <path d="m6 16 1.6 1.6"/>
    </svg>
);

export const AspectRatioIcon: React.FC<{ format: AspectRatio; className?: string }> = ({ format, className }) => {
    const isLandscape = format === '16:9';
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x={isLandscape ? "2" : "5"} y={isLandscape ? "5" : "2"} width={isLandscape ? "20" : "14"} height={isLandscape ? "14" : "20"} rx="2" />
        </svg>
    );
};

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);
