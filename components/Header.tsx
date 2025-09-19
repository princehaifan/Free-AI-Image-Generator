import React from 'react';
import { WandIcon } from './Icons';

export const Header: React.FC = () => {
    return (
        <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                     <WandIcon className="w-8 h-8 text-indigo-400" />
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        Free AI Image Generator
                    </h1>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="text-slate-300 font-medium">50 tokens</span>
                </div>
            </div>
        </header>
    );
};
