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

  let { data } = $props<{
    data: {
      products: Product[];
      error: string | null;
    };
  }>();

  let filters = $state(createEmptyProductFilters());

  const filterOptions = $derived(buildFilterOptions(data.products));
  const filteredProducts = $derived(
    applyProductFilters(data.products, filters),
  );
</script>

<main>
  <Hero />
  <Listing
    productCount={filteredProducts.length}
    {filterOptions}
    bind:filters
  />
  <ProductList products={filteredProducts} error={data.error} />
</main>
