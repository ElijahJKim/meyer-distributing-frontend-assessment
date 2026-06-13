export type PriceRangeId = "under-5" | "5-10" | "10-15" | "15-plus";

export type FilterCategory = "price" | "type" | "rating" | "color";

export interface ProductFilters {
  priceRanges: PriceRangeId[];
  productTypes: string[];
  ratings: number[];
  colors: string[];
}

export interface PriceRangeOption {
  id: PriceRangeId;
  label: string;
}

export interface RatingFilterOption {
  value: number;
  label: string;
}

export interface ColorFilterOption {
  name: string;
  hex: string;
}

export interface FilterOptions {
  priceRanges: PriceRangeOption[];
  productTypes: string[];
  ratings: RatingFilterOption[];
  colors: ColorFilterOption[];
}

export interface FilterChip {
  category: FilterCategory;
  value: string;
  label: string;
}

export interface FilterSectionOption {
  value: string;
  label: string;
  checked: boolean;
  leadingHex?: string;
}

export interface FilterPanelSection {
  category: FilterCategory;
  title: string;
  titleId: string;
  options: FilterSectionOption[];
  scrollable?: boolean;
}
