import { persistedState } from 'svelte5-rune-storage';
import type { Product } from '$lib/types/product';
import {
	RECENTLY_VIEWED_MAX_ITEMS,
	type RecentlyViewedItem
} from '$lib/types/recently-viewed';

let store: { value: RecentlyViewedItem[] } | null = null;

function trimItems(items: RecentlyViewedItem[]): RecentlyViewedItem[] {
	return items.slice(0, RECENTLY_VIEWED_MAX_ITEMS);
}

export function initRecentlyViewed(): void {
	if (typeof window === 'undefined' || store) {
		return;
	}

	store = persistedState<RecentlyViewedItem[]>('recently-viewed', []);

	if (store.value.length > RECENTLY_VIEWED_MAX_ITEMS) {
		store.value = trimItems(store.value);
	}
}

export function getRecentlyViewedItems(): RecentlyViewedItem[] {
	return store?.value ?? [];
}

export function trackRecentlyViewed(product: Product): void {
	initRecentlyViewed();

	if (!store) {
		return;
	}

	const snapshot: RecentlyViewedItem = {
		id: product.id,
		name: product.name,
		price: product.price,
		image_link: product.image_link,
		api_featured_image: product.api_featured_image
	};

	store.value = trimItems([
		snapshot,
		...store.value.filter((item) => item.id !== product.id)
	]);
}
