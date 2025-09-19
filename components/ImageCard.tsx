import React from 'react';
import type { GeneratedImage } from '../types';
import { DownloadIcon } from './Icons';

interface ImageCardProps {
    image: GeneratedImage;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `${image.prompt.substring(0, 30).replace(/\s/g, '_')}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="group relative rounded-lg overflow-hidden border border-slate-700 aspect-w-16 aspect-h-9 bg-slate-900">
            <img src={image.src} alt={image.prompt} className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-4 absolute bottom-0 left-0 right-0 text-white">
                    <p className="text-sm font-medium line-clamp-2">{image.prompt}</p>
                    <p className="text-xs text-slate-400 mt-1">{image.style}</p>
                </div>
                <div className="absolute top-2 right-2">
                    <button onClick={handleDownload} className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors">
                        <DownloadIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const SkeletonCard: React.FC = () => (
    <div className="rounded-lg border border-slate-700 aspect-w-16 aspect-h-9 bg-slate-800 animate-pulse"></div>
);
