import React from 'react';
import type { AspectRatio } from '../types';
import { StylePresetSelector } from './StylePresetSelector';
import { AspectRatioIcon, WandIcon } from './Icons';

interface ControlPanelProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    negativePrompt: string;
    setNegativePrompt: (prompt: string) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    numberOfImages: number;
    setNumberOfImages: (num: number) => void;
    isLoading: boolean;
    onGenerate: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    prompt,
    setPrompt,
    negativePrompt,
    setNegativePrompt,
    aspectRatio,
    setAspectRatio,
    selectedStyle,
    setSelectedStyle,
    numberOfImages,
    setNumberOfImages,
    isLoading,
    onGenerate
}) => {
    const cost = 50 * numberOfImages;

    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-6 sticky top-8">
            <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
                    Describe the image you want to create...
                </label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A cute cat astronaut on the moon, cinematic lighting"
                    className="w-full h-32 bg-slate-900/70 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                />
            </div>

            <div>
                <label htmlFor="negative-prompt" className="block text-sm font-medium text-slate-300 mb-2">
                    Negative Prompt (what to avoid)
                </label>
                <textarea
                    id="negative-prompt"
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder="e.g., text, watermark, blurry, extra limbs"
                    className="w-full h-20 bg-slate-900/70 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none"
                />
            </div>

            <div>
                 <label className="block text-sm font-medium text-slate-300 mb-2">Aspect Ratio</label>
                 <div className="grid grid-cols-2 gap-3">
                     <AspectRatioButton format="16:9" label="Landscape" active={aspectRatio === '16:9'} onClick={() => setAspectRatio('16:9')} />
                     <AspectRatioButton format="9:16" label="Portrait" active={aspectRatio === '9:16'} onClick={() => setAspectRatio('9:16')} />
                 </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Choose a style</label>
                <StylePresetSelector selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
            </div>

            <div>
                <label htmlFor="num-images" className="block text-sm font-medium text-slate-300 mb-2">Number of Images</label>
                <div className="flex items-center bg-slate-900/70 border border-slate-600 rounded-lg px-3">
                    <span className="text-slate-400">{numberOfImages} Image{numberOfImages > 1 ? 's' : ''}</span>
                    <input
                        id="num-images"
                        type="range"
                        min="1"
                        max="2"
                        value={numberOfImages}
                        onChange={(e) => setNumberOfImages(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mx-4 accent-indigo-500"
                    />
                </div>
            </div>
            
            <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded-lg">
                <span className="font-medium text-slate-400">Cost</span>
                <span className="text-indigo-400 font-semibold">{cost} tokens</span>
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !prompt}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 disabled:bg-slate-700 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
                {isLoading ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : (
                    <>
                        <WandIcon className="w-5 h-5 mr-2" />
                        Generate
                    </>
                )}
            </button>
        </div>
    );
};

interface AspectRatioButtonProps {
    format: AspectRatio;
    label: string;
    active: boolean;
    onClick: () => void;
}

const AspectRatioButton: React.FC<AspectRatioButtonProps> = ({ format, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-colors duration-200 ${
            active ? 'bg-indigo-500/20 border-indigo-500' : 'bg-slate-900/50 border-slate-600 hover:border-slate-500'
        }`}
    >
        <AspectRatioIcon format={format} className="w-8 h-8 mb-1" />
        <span className={`text-xs font-medium ${active ? 'text-indigo-300' : 'text-slate-400'}`}>{label}</span>
    </button>
);