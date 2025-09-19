export type AspectRatio = '16:9' | '9:16';

export interface StylePreset {
  id: string;
  name: string;
  imageUrl: string;
}

export interface GeneratedImage {
    id: string;
    src: string;
    prompt: string;
    style: string;
}
