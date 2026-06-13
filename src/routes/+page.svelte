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
      products: Promise<Product[]>;
    };
  }>();

  let filters = $state(createEmptyProductFilters());
  let sort = $state(createDefaultProductSort());

  function getLoadErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Failed to load products";
  }
</script>

<main>
  <Hero />

  {#await data.products}
    <ProductList loading />
  {:then products}
    {@const filterOptions = buildFilterOptions(products)}
    {@const filteredProducts = applyProductFilters(products, filters)}
    {@const displayedProducts = applyProductSort(filteredProducts, sort)}

    <Listing
      productCount={displayedProducts.length}
      {filterOptions}
      bind:filters
      bind:sort
    />
    <ProductList products={displayedProducts} />
  {:catch error}
    <ProductList products={[]} error={getLoadErrorMessage(error)} />
  {/await}
</main>
