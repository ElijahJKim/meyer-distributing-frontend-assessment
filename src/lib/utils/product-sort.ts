import type { Product } from "$lib/types/product";
import type {
  ProductSortId,
  ProductSortOption,
  ProductSortState,
} from "$lib/types/sort";

export const PRODUCT_SORT_OPTIONS: ProductSortOption[] = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "rating-desc", label: "Rating: High to Low" },
  { id: "newest", label: "Newest" },
];

export function createDefaultProductSort(): ProductSortState {
  return null;
}

function parseProductPrice(price: string): number {
  const parsed = Number.parseFloat(price);

  return Number.isFinite(parsed) ? parsed : 0;
}

function compareRating(a: Product, b: Product): number {
  if (a.rating === null && b.rating === null) {
    return 0;
  }

  if (a.rating === null) {
    return 1;
  }

  if (b.rating === null) {
    return -1;
  }

  return b.rating - a.rating;
}

export function applyProductSort(
  products: Product[],
  sortId: ProductSortState,
): Product[] {
  if (sortId === null) {
    return products;
  }

  const sorted = [...products];

  switch (sortId) {
    case "price-asc":
      return sorted.sort(
        (a, b) => parseProductPrice(a.price) - parseProductPrice(b.price),
      );
    case "price-desc":
      return sorted.sort(
        (a, b) => parseProductPrice(b.price) - parseProductPrice(a.price),
      );
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "rating-desc":
      return sorted.sort(compareRating);
    case "newest":
      return sorted.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
      );
    default: {
      const _exhaustive: never = sortId;
      return _exhaustive;
    }
  }
}

export function getProductSortLabel(sortId: ProductSortState): string {
  return (
    PRODUCT_SORT_OPTIONS.find((option) => option.id === sortId)?.label ?? "Sort"
  );
}
