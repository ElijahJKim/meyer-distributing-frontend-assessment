import { getProducts } from '$lib/server/products';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const products = await getProducts();

		return {
			products,
			error: null
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Failed to load products';

		return {
			products: [],
			error: message
		};
	}
};
