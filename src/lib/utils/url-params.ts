import { goto } from '$app/navigation';
import type { PriceRangeId, ProductFilters } from '$lib/types/filters';
import { PAGE_SIZE_OPTIONS, type PageSize } from '$lib/types/pagination';
import type { ProductSortId, ProductSortState } from '$lib/types/sort';
import { createEmptyProductFilters } from '$lib/utils/product-filters';
import { PRODUCT_SORT_OPTIONS } from '$lib/utils/product-sort';

const PRICE_RANGE_IDS = new Set<PriceRangeId>(['under-5', '5-10', '10-15', '15-plus']);
const SORT_IDS = new Set<ProductSortId>(PRODUCT_SORT_OPTIONS.map((option) => option.id));
const PAGE_SIZE_SET = new Set<PageSize>(PAGE_SIZE_OPTIONS);

const DEFAULT_PAGE_SIZE: PageSize = 12;

export interface ListingQueryState {
	filters: ProductFilters;
	sort: ProductSortState;
	page: number;
	pageSize: PageSize;
}

export function parsePageParam(value: string | null, maxPages: number): number {
	if (!value) {
		return 1;
	}

	const parsed = Number.parseInt(value, 10);

	if (!Number.isFinite(parsed) || parsed < 1) {
		return 1;
	}

	return Math.min(parsed, Math.max(1, maxPages));
}

function parseCsvParam(value: string | null): string[] {
	if (!value) {
		return [];
	}

	return value
		.split(',')
		.map((entry) => decodeURIComponent(entry.trim()))
		.filter(Boolean);
}

function parsePriceRangesParam(value: string | null): PriceRangeId[] {
	return parseCsvParam(value).filter((entry): entry is PriceRangeId =>
		PRICE_RANGE_IDS.has(entry as PriceRangeId)
	);
}

function parseRatingsParam(value: string | null): number[] {
	return parseCsvParam(value)
		.map((entry) => Number.parseInt(entry, 10))
		.filter((entry) => Number.isFinite(entry) && entry >= 1 && entry <= 5);
}

function parseSortParam(value: string | null): ProductSortState {
	if (!value || !SORT_IDS.has(value as ProductSortId)) {
		return null;
	}

	return value as ProductSortId;
}

function parsePageSizeParam(value: string | null): PageSize {
	if (!value) {
		return DEFAULT_PAGE_SIZE;
	}

	const parsed = Number.parseInt(value, 10);

	if (!PAGE_SIZE_SET.has(parsed as PageSize)) {
		return DEFAULT_PAGE_SIZE;
	}

	return parsed as PageSize;
}

export function parseListingQueryState(url: URL, maxPages = Number.MAX_SAFE_INTEGER): ListingQueryState {
	return {
		filters: {
			priceRanges: parsePriceRangesParam(url.searchParams.get('price')),
			productTypes: parseCsvParam(url.searchParams.get('type')),
			ratings: parseRatingsParam(url.searchParams.get('rating')),
			colors: parseCsvParam(url.searchParams.get('color'))
		},
		sort: parseSortParam(url.searchParams.get('sort')),
		page: parsePageParam(url.searchParams.get('page'), maxPages),
		pageSize: parsePageSizeParam(url.searchParams.get('size'))
	};
}

function setCsvParam(url: URL, key: string, values: string[]): void {
	if (values.length === 0) {
		url.searchParams.delete(key);
		return;
	}

	url.searchParams.set(key, values.map((value) => encodeURIComponent(value)).join(','));
}

function setNumericCsvParam(url: URL, key: string, values: number[]): void {
	setCsvParam(
		url,
		key,
		values.map((value) => String(value))
	);
}

export function applyListingQueryToUrl(url: URL, state: ListingQueryState, maxPages: number): void {
	const nextPage = parsePageParam(String(state.page), maxPages);

	if (nextPage <= 1) {
		url.searchParams.delete('page');
	} else {
		url.searchParams.set('page', String(nextPage));
	}

	if (state.pageSize === DEFAULT_PAGE_SIZE) {
		url.searchParams.delete('size');
	} else {
		url.searchParams.set('size', String(state.pageSize));
	}

	if (state.sort) {
		url.searchParams.set('sort', state.sort);
	} else {
		url.searchParams.delete('sort');
	}

	setCsvParam(url, 'price', state.filters.priceRanges);
	setCsvParam(url, 'type', state.filters.productTypes);
	setNumericCsvParam(url, 'rating', state.filters.ratings);
	setCsvParam(url, 'color', state.filters.colors);
}

export function buildListingHref(baseUrl: URL, state: ListingQueryState, maxPages: number): string {
	const url = new URL(baseUrl);
	applyListingQueryToUrl(url, state, maxPages);
	return getUrlHref(url);
}

export function getUrlHref(url: URL): string {
	return `${url.pathname}${url.search}${url.hash}`;
}

export function createDefaultListingQueryState(): ListingQueryState {
	return {
		filters: createEmptyProductFilters(),
		sort: null,
		page: 1,
		pageSize: DEFAULT_PAGE_SIZE
	};
}

export async function syncListingToUrl(
	baseUrl: URL,
	state: ListingQueryState,
	maxPages: number
): Promise<void> {
	const nextHref = buildListingHref(baseUrl, state, maxPages);

	if (nextHref === getUrlHref(baseUrl)) {
		return;
	}

	await goto(nextHref, { keepFocus: true, noScroll: true });
}

// Backward-compatible helpers used during migration.
export function setPageParam(url: URL, nextPage: number): void {
	if (nextPage <= 1) {
		url.searchParams.delete('page');
		return;
	}

	url.searchParams.set('page', String(nextPage));
}

export function buildUrlWithPage(baseUrl: URL, nextPage: number): string {
	const url = new URL(baseUrl);
	setPageParam(url, nextPage);
	return getUrlHref(url);
}

export async function syncPageToUrl(baseUrl: URL, nextPage: number): Promise<void> {
	const nextHref = buildUrlWithPage(baseUrl, nextPage);

	if (nextHref === getUrlHref(baseUrl)) {
		return;
	}

	await goto(nextHref, { keepFocus: true, noScroll: true });
}
