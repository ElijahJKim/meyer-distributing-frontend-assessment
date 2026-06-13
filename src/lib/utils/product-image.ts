import type { Product } from '$lib/types/product';

export function normalizeImageUrl(url: string): string {
	if (!url) {
		return '';
	}

	if (url.startsWith('//')) {
		return `https:${url}`;
	}

	return url;
}

export function getProductImageSources(product: Product): {
	primary: string;
	fallback: string | null;
} {
	const imageLink = normalizeImageUrl(product.image_link);
	const featuredImage = product.api_featured_image
		? normalizeImageUrl(product.api_featured_image)
		: null;

	if (imageLink) {
		return {
			primary: imageLink,
			fallback: featuredImage && featuredImage !== imageLink ? featuredImage : null
		};
	}

	return {
		primary: featuredImage ?? '',
		fallback: null
	};
}
