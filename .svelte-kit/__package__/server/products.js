import { env } from '$env/dynamic/private';
function getProductsUrl() {
    const url = env.PRODUCTS_URL;
    if (!url) {
        throw new Error('PRODUCTS_URL is not set');
    }
    return url;
}
export async function getProducts() {
    const response = await fetch(getProductsUrl());
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
        throw new Error('Products response is not an array');
    }
    return data;
}
