import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

if (!process.env.API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we assume the key is set.
    console.warn("API_KEY environment variable not set. Using a placeholder. API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateImages = async (
    userPrompt: string,
    style: string,
    aspectRatio: AspectRatio,
    numberOfImages: number,
    negativePrompt: string
): Promise<string[]> => {
    
    // Enhance the prompt with style information for better results
    const fullPrompt = `${userPrompt}, in the style of ${style}.`;

    const config: {
        numberOfImages: number,
        outputMimeType: 'image/jpeg' | 'image/png',
        aspectRatio: AspectRatio,
        negativePrompt?: string,
    } = {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
    };

    if (negativePrompt.trim()) {
        config.negativePrompt = negativePrompt;
    }

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: fullPrompt,
            config: config,
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("API returned no images.");
        }

        return response.generatedImages.map(img => {
            const base64ImageBytes: string = img.image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        });

    } catch (error) {
        console.error("Error generating images:", error);
        // Provide a more user-friendly error message
        if (error instanceof Error && error.message.includes('API_KEY')) {
            throw new Error("Invalid or missing API key. Please check your configuration.");
        }
        if (error instanceof Error && error.message.includes('unsupported')) {
            throw new Error("The API does not support one of the provided parameters (e.g., negative prompt).");
        }
        throw new Error("Failed to generate images. The model may have refused the prompt.");
    }
};