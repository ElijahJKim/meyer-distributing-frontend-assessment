import { env } from '$env/dynamic/private';
import type { Product } from '$lib/types/product';

function getProductsUrl(): string {
	const url = env.PRODUCTS_URL;

	if (!url) {
		throw new Error('PRODUCTS_URL is not set');
	}

	return url;
}

export async function getProducts(): Promise<Product[]> {
	const response = await fetch(getProductsUrl());

	if (!response.ok) {
		throw new Error(`Failed to fetch products: ${response.status}`);
	}

	const data: unknown = await response.json();

	if (!Array.isArray(data)) {
		throw new Error('Products response is not an array');
	}

	return data as Product[];
}
