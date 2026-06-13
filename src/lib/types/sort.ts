export type ProductSortId =
	| 'price-asc'
	| 'price-desc'
	| 'name-asc'
	| 'rating-desc'
	| 'newest';

export type ProductSortState = ProductSortId | null;

export interface ProductSortOption {
	id: ProductSortId;
	label: string;
}
