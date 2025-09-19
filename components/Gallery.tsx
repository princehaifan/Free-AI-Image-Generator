import React, { useState } from 'react';
import type { GeneratedImage } from '../types';
import { ImageCard, SkeletonCard } from './ImageCard';

interface GalleryProps {
    myImages: GeneratedImage[];
    publicImages: GeneratedImage[];
    isLoading: boolean;
    loadingCount: number;
    activeTab: 'myImages' | 'publicGallery';
    setActiveTab: (tab: 'myImages' | 'publicGallery') => void;
}

export const Gallery: React.FC<GalleryProps> = ({ myImages, publicImages, isLoading, loadingCount, activeTab, setActiveTab }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const imagesToShow = activeTab === 'myImages' ? myImages : publicImages;
    
    const filteredImages = imagesToShow.filter(image => 
        image.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 min-h-[500px]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                 <div className="flex border-b border-slate-600">
                    <TabButton label="My Images" active={activeTab === 'myImages'} onClick={() => setActiveTab('myImages')} />
                    <TabButton label="Public Gallery" active={activeTab === 'publicGallery'} onClick={() => setActiveTab('publicGallery')} />
                </div>
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search by prompt..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 bg-slate-900/70 border border-slate-600 rounded-lg py-2 pl-10 pr-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    />
                     <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
                {isLoading && activeTab === 'myImages' && Array.from({ length: loadingCount }).map((_, i) => <SkeletonCard key={i} />)}
                
                {filteredImages.length > 0 ? (
                    filteredImages.map(image => <ImageCard key={image.id} image={image} />)
                ) : (
                    !isLoading && (
                        <div className="md:col-span-2 text-center py-16">
                            <h3 className="text-xl font-semibold text-slate-300">No Images Found</h3>
                            <p className="text-slate-400 mt-2">
                                {activeTab === 'myImages' ? 'Generate an image to see it here.' : 'Try a different search term.'}
                            </p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

interface TabButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 -mb-px border-b-2 ${
            active
                ? 'text-indigo-400 border-indigo-500'
                : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-400'
        }`}
    >
        {label}
    </button>
);
