import type { Product } from "$lib/types/product";
import type {
  ColorFilterOption,
  FilterChip,
  FilterCategory,
  FilterOptions,
  FilterPanelSection,
  PriceRangeId,
  ProductFilters,
} from "$lib/types/filters";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PRICE_RANGE_DEFINITIONS: Record<
  PriceRangeId,
  { label: string; matches: (price: number) => boolean }
> = {
  "under-5": {
    label: "Under $5",
    matches: (price) => price < 5,
  },
  "5-10": {
    label: "$5 – $10",
    matches: (price) => price >= 5 && price < 10,
  },
  "10-15": {
    label: "$10 – $15",
    matches: (price) => price >= 10 && price < 15,
  },
  "15-plus": {
    label: "$15 & up",
    matches: (price) => price >= 15,
  },
};

const RATING_OPTIONS = [
  { value: 4, label: "4★ & up" },
  { value: 3, label: "3★ & up" },
  { value: 2, label: "2★ & up" },
] as const;

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function parseProductPrice(price: string): number | null {
  const parsed = Number.parseFloat(price);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function normalizeColorName(name: string | null | undefined): string {
  if (!name) {
    return "";
  }

  return name.trim();
}

function formatProductType(productType: string): string {
  return productType
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function removeFromFilterList<T>(values: T[], value: T): T[] {
  return values.filter((entry) => entry !== value);
}

// ---------------------------------------------------------------------------
// Match predicates
// ---------------------------------------------------------------------------

function matchesPriceRanges(
  product: Product,
  priceRanges: PriceRangeId[],
): boolean {
  if (priceRanges.length === 0) {
    return true;
  }

  const price = parseProductPrice(product.price);

  if (price === null) {
    return false;
  }

  return priceRanges.some((rangeId) =>
    PRICE_RANGE_DEFINITIONS[rangeId].matches(price),
  );
}

function matchesProductTypes(
  product: Product,
  productTypes: string[],
): boolean {
  if (productTypes.length === 0) {
    return true;
  }

  if (!product.product_type) {
    return false;
  }

  return productTypes.includes(product.product_type);
}

function matchesRatings(product: Product, ratings: number[]): boolean {
  if (ratings.length === 0) {
    return true;
  }

  if (product.rating === null) {
    return false;
  }

  const minimumRating = Math.min(...ratings);

  return product.rating >= minimumRating;
}

function matchesColors(product: Product, colors: string[]): boolean {
  if (colors.length === 0) {
    return true;
  }

  if (product.product_colors.length === 0) {
    return false;
  }

  const productColorNames = product.product_colors
    .map((color) => normalizeColorName(color.colour_name))
    .filter(Boolean);

  return colors.some((colorName) => productColorNames.includes(colorName));
}

// ---------------------------------------------------------------------------
// Filter options (products → selectable choices)
// ---------------------------------------------------------------------------

export function buildFilterOptions(products: Product[]): FilterOptions {
  const productTypes = [
    ...new Set(
      products
        .map((product) => product.product_type)
        .filter(Boolean) as string[],
    ),
  ].sort();

  const colorMap = new Map<string, ColorFilterOption>();

  for (const product of products) {
    for (const color of product.product_colors) {
      const name = normalizeColorName(color.colour_name);

      if (!name || colorMap.has(name)) {
        continue;
      }

      colorMap.set(name, {
        name,
        hex: color.hex_value ?? "#e2e8f0",
      });
    }
  }

  const colors = [...colorMap.values()].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return {
    priceRanges: (Object.keys(PRICE_RANGE_DEFINITIONS) as PriceRangeId[]).map(
      (id) => ({
        id,
        label: PRICE_RANGE_DEFINITIONS[id].label,
      }),
    ),
    productTypes,
    ratings: RATING_OPTIONS.map((option) => ({ ...option })),
    colors,
  };
}

// ---------------------------------------------------------------------------
// Apply filters (products → filtered products)
// ---------------------------------------------------------------------------

export function applyProductFilters(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  return products.filter(
    (product) =>
      matchesPriceRanges(product, filters.priceRanges) &&
      matchesProductTypes(product, filters.productTypes) &&
      matchesRatings(product, filters.ratings) &&
      matchesColors(product, filters.colors),
  );
}

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------

export function createEmptyProductFilters(): ProductFilters {
  return {
    priceRanges: [],
    productTypes: [],
    ratings: [],
    colors: [],
  };
}

export function countActiveFilters(filters: ProductFilters): number {
  return (
    filters.priceRanges.length +
    filters.productTypes.length +
    filters.ratings.length +
    filters.colors.length
  );
}

export function toggleFilterValue<T>(values: T[], value: T): T[] {
  if (values.includes(value)) {
    return removeFromFilterList(values, value);
  }

  return [...values, value];
}

export function toggleProductFilter(
  filters: ProductFilters,
  category: FilterCategory,
  value: string,
): ProductFilters {
  switch (category) {
    case "price":
      return {
        ...filters,
        priceRanges: toggleFilterValue(
          filters.priceRanges,
          value as PriceRangeId,
        ),
      };
    case "type":
      return {
        ...filters,
        productTypes: toggleFilterValue(filters.productTypes, value),
      };
    case "rating":
      return {
        ...filters,
        ratings: toggleFilterValue(filters.ratings, Number(value)),
      };
    case "color":
      return {
        ...filters,
        colors: toggleFilterValue(filters.colors, value),
      };
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

export function removeFilterChip(
  filters: ProductFilters,
  chip: FilterChip,
): ProductFilters {
  switch (chip.category) {
    case "price":
      return {
        ...filters,
        priceRanges: removeFromFilterList(
          filters.priceRanges,
          chip.value as PriceRangeId,
        ),
      };
    case "type":
      return {
        ...filters,
        productTypes: removeFromFilterList(filters.productTypes, chip.value),
      };
    case "rating":
      return {
        ...filters,
        ratings: removeFromFilterList(filters.ratings, Number(chip.value)),
      };
    case "color":
      return {
        ...filters,
        colors: removeFromFilterList(filters.colors, chip.value),
      };
    default: {
      const _exhaustive: never = chip.category;
      return _exhaustive;
    }
  }
}

export function clearFilterCategory(
  filters: ProductFilters,
  category: FilterCategory,
): ProductFilters {
  switch (category) {
    case "price":
      return { ...filters, priceRanges: [] };
    case "type":
      return { ...filters, productTypes: [] };
    case "rating":
      return { ...filters, ratings: [] };
    case "color":
      return { ...filters, colors: [] };
    default: {
      const _exhaustive: never = category;
      return _exhaustive;
    }
  }
}

// ---------------------------------------------------------------------------
// UI presenters (filter state → display models)
// ---------------------------------------------------------------------------

export function buildFilterChips(filters: ProductFilters): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const rangeId of filters.priceRanges) {
    chips.push({
      category: "price",
      value: rangeId,
      label: PRICE_RANGE_DEFINITIONS[rangeId].label,
    });
  }

  for (const productType of filters.productTypes) {
    chips.push({
      category: "type",
      value: productType,
      label: formatProductType(productType),
    });
  }

  for (const rating of filters.ratings) {
    const option = RATING_OPTIONS.find((entry) => entry.value === rating);

    chips.push({
      category: "rating",
      value: String(rating),
      label: option?.label ?? `${rating}★ & up`,
    });
  }

  for (const colorName of filters.colors) {
    chips.push({
      category: "color",
      value: colorName,
      label: colorName,
    });
  }

  return chips;
}

export function buildFilterPanelSections(
  filterOptions: FilterOptions,
  filters: ProductFilters,
): FilterPanelSection[] {
  return [
    {
      category: "price",
      title: "Price range",
      titleId: "filter-price-heading",
      options: filterOptions.priceRanges.map((range) => ({
        value: range.id,
        label: range.label,
        checked: filters.priceRanges.includes(range.id),
      })),
    },
    {
      category: "type",
      title: "Product type",
      titleId: "filter-type-heading",
      options: filterOptions.productTypes.map((productType) => ({
        value: productType,
        label: formatProductType(productType),
        checked: filters.productTypes.includes(productType),
      })),
    },
    {
      category: "rating",
      title: "Rating",
      titleId: "filter-rating-heading",
      options: filterOptions.ratings.map((rating) => ({
        value: String(rating.value),
        label: rating.label,
        checked: filters.ratings.includes(rating.value),
      })),
    },
    {
      category: "color",
      title: "Product color",
      titleId: "filter-color-heading",
      scrollable: true,
      options: filterOptions.colors.map((color) => ({
        value: color.name,
        label: color.name,
        checked: filters.colors.includes(color.name),
        leadingHex: color.hex,
      })),
    },
  ];
}
