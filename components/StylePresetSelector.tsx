import React from 'react';
import { STYLE_PRESETS } from '../constants';

interface StylePresetSelectorProps {
    selectedStyle: string;
    onSelect: (styleId: string) => void;
}

export const StylePresetSelector: React.FC<StylePresetSelectorProps> = ({ selectedStyle, onSelect }) => {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {STYLE_PRESETS.map((preset) => (
                <button
                    key={preset.id}
                    onClick={() => onSelect(preset.id)}
                    className={`group relative aspect-square rounded-lg overflow-hidden border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-200 ${
                        selectedStyle === preset.id ? 'border-indigo-500' : 'border-transparent hover:border-slate-500'
                    }`}
                >
                    <img src={preset.imageUrl} alt={preset.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute bottom-1 left-0 right-0 text-center text-xs font-medium text-white px-1">{preset.name}</span>
                    {selectedStyle === preset.id && (
                        <div className="absolute inset-0 bg-indigo-500/30" />
                    )}
                </button>
            ))}
        </div>
    );
};