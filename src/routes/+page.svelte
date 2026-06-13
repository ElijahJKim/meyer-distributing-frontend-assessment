<script lang="ts">
  import Listing from "$lib/components/Listing/Listing.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import ProductList from "$lib/components/Product/ProductList.svelte";
  import type { Product } from "$lib/types/product";
  import {
    applyProductFilters,
    buildFilterOptions,
    createEmptyProductFilters,
  } from "$lib/utils/product-filters";
  import {
    applyProductSort,
    createDefaultProductSort,
  } from "$lib/utils/product-sort";

  let { data } = $props<{
    data: {
      products: Product[];
      error: string | null;
    };
  }>();

  let filters = $state(createEmptyProductFilters());
  let sort = $state(createDefaultProductSort());

  const filterOptions = $derived(buildFilterOptions(data.products));
  const filteredProducts = $derived(
    applyProductFilters(data.products, filters),
  );
  const displayedProducts = $derived(applyProductSort(filteredProducts, sort));
</script>

<main>
  <Hero />
  <Listing
    productCount={displayedProducts.length}
    {filterOptions}
    bind:filters
    bind:sort
  />
  <ProductList products={displayedProducts} error={data.error} />
</main>
