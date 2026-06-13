<script lang="ts">
  import FilterChips from "./FilterChips.svelte";
  import FilterPanel from "./FilterPanel.svelte";
  import ListingToolbar from "./ListingToolbar.svelte";
  import type { FilterOptions, ProductFilters } from "$lib/types/filters";
  import type { ProductSortState } from "$lib/types/sort";
  import { countActiveFilters } from "$lib/utils/product-filters";

  interface Props {
    productCount?: number;
    filterOptions: FilterOptions;
    filters: ProductFilters;
    sort: ProductSortState;
  }

  let {
    productCount = 0,
    filterOptions,
    filters = $bindable(),
    sort = $bindable(),
  }: Props = $props();

  let panelOpen = $state(false);
  let filterButtonEl = $state<HTMLButtonElement | null>(null);

  const activeFilterCount = $derived(countActiveFilters(filters));

  function openPanel() {
    panelOpen = true;
  }

  function closePanel() {
    panelOpen = false;
    filterButtonEl?.focus();
  }
</script>

<ListingToolbar
  {productCount}
  {panelOpen}
  onOpenFilters={openPanel}
  bind:filterButton={filterButtonEl}
  bind:sort
/>

<FilterChips bind:filters />

<FilterPanel
  open={panelOpen}
  {activeFilterCount}
  {filterOptions}
  bind:filters
  onClose={closePanel}
/>
