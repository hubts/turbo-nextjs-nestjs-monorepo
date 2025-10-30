export interface ImageLoaderProps {
    src: string;
    width: number;
    quality?: number;
}

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
    const cleanSrc = src.startsWith("/") ? src.replace("/", "") : src;
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${cleanSrc}?w=${width}&q=${quality || 100}`;
};

export default imageLoader;
