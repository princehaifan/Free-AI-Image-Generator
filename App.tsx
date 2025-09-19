import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { InfoSection } from './components/InfoSection';
import { FaqSection } from './components/FaqSection';
import type { AspectRatio, StylePreset, GeneratedImage } from './types';
import { generateImages as generateImagesApi } from './services/geminiService';
import { STYLE_PRESETS, GALLERY_IMAGES } from './constants';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [negativePrompt, setNegativePrompt] = useState<string>('');
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
    const [selectedStyle, setSelectedStyle] = useState<string>(STYLE_PRESETS[0].id);
    const [numberOfImages, setNumberOfImages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [myImages, setMyImages] = useState<GeneratedImage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'myImages' | 'publicGallery'>('myImages');

    const handleGenerate = useCallback(async () => {
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const currentStyle = STYLE_PRESETS.find(p => p.id === selectedStyle);
            if (!currentStyle) {
                throw new Error("Selected style not found");
            }

            const imageSrcs = await generateImagesApi(prompt, currentStyle.name, aspectRatio, numberOfImages, negativePrompt);
            const newImages: GeneratedImage[] = imageSrcs.map(src => ({
                id: `img-${Date.now()}-${Math.random()}`,
                src,
                prompt,
                style: currentStyle.name,
            }));
            
            setMyImages(prev => [...newImages, ...prev]);
            setActiveTab('myImages');

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt, negativePrompt, isLoading, selectedStyle, aspectRatio, numberOfImages]);
    
    return (
        <div className="min-h-screen bg-slate-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                        <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                           <svg className="fill-current h-6 w-6 text-red-400" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ControlPanel
                            prompt={prompt}
                            setPrompt={setPrompt}
                            negativePrompt={negativePrompt}
                            setNegativePrompt={setNegativePrompt}
                            aspectRatio={aspectRatio}
                            setAspectRatio={setAspectRatio}
                            selectedStyle={selectedStyle}
                            setSelectedStyle={setSelectedStyle}
                            numberOfImages={numberOfImages}
                            setNumberOfImages={setNumberOfImages}
                            isLoading={isLoading}
                            onGenerate={handleGenerate}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <Gallery
                            myImages={myImages}
                            publicImages={GALLERY_IMAGES}
                            isLoading={isLoading}
                            loadingCount={numberOfImages}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </div>
                <InfoSection />
                <FaqSection />
            </main>
        </div>
    );
};

export default App;