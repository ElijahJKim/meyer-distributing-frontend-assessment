export function normalizeImageUrl(url) {
    if (!url) {
        return '';
    }
    if (url.startsWith('//')) {
        return `https:${url}`;
    }
    return url;
}
export function getProductImageSources(product) {
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
