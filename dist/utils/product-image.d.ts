import type { Product } from '../types/product';
export declare function normalizeImageUrl(url: string): string;
export declare function getProductImageSources(product: Product): {
    primary: string;
    fallback: string | null;
};
