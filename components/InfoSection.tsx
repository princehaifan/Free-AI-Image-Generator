import React from 'react';
import { CheckCircleIcon } from './Icons';

export const InfoSection: React.FC = () => {
    return (
        <section className="py-16 mt-8 border-t border-slate-800">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Why Choose Our Generator?</h2>
                    <ul className="space-y-3 text-slate-400">
                        <FeatureItem text="Portrait & Landscape (16:9 and 9:16)" />
                        <FeatureItem text="18 Style Presets from photographic to anime" />
                        <FeatureItem text="High Resolution up to 1536x640 pixels" />
                        <FeatureItem text="Batch Generation up to 2 images at once" />
                    </ul>
                </div>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">How to Use</h2>
                    <ol className="space-y-3 text-slate-400 list-decimal list-inside">
                        <li>Write a detailed prompt describing your desired image.</li>
                        <li>Choose landscape (16:9) or portrait (9:16) format.</li>
                        <li>Select a style preset to match your vision.</li>
                        <li>Click 'Generate' to create your artwork.</li>
                        <li>Download your image in high quality.</li>
                    </ol>
                </div>
                <div className="space-y-4 md:col-span-2 lg:col-span-1">
                    <h2 className="text-2xl font-bold text-white">Pro Tips for Better Results</h2>
                     <ul className="space-y-3 text-slate-400">
                        <FeatureItem text="Be specific with details: mention colors, lighting, mood." />
                        <FeatureItem text="Use style presets to achieve consistent artistic looks." />
                        <FeatureItem text="Combine concepts with 'and' for complex scenes." />
                        <FeatureItem text="Generate multiple variations to find the perfect image." />
                    </ul>
                </div>
            </div>
        </section>
    );
};

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
    <li className="flex items-start">
        <CheckCircleIcon className="w-5 h-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
        <span>{text}</span>
    </li>
);