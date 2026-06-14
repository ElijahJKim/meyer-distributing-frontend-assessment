<script lang="ts">
  import ProductCard from "$lib/components/Product/ProductCard.svelte";
  import ProductCardSkeleton from "$lib/components/Product/ProductCardSkeleton.svelte";
  import PageSizeSelect from "$lib/components/PageSizeSelect.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import type { PageSize } from "$lib/types/pagination";
  import type { Product } from "$lib/types/product";
  import { tick } from "svelte";

  let {
    products = [],
    loading = false,
    onViewProduct = undefined,
    pageSize = $bindable(12 as PageSize),
    currentPage = $bindable(1),
    totalPages = 1,
  }: {
    products?: Product[];
    loading?: boolean;
    onViewProduct?: (product: Product) => void;
    pageSize?: PageSize;
    currentPage?: number;
    totalPages?: number;
  } = $props();

  let productGridEl = $state<HTMLElement | null>(null);

  const paginatedProducts = $derived(
    products.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  );

  async function setPage(nextPage: number, scroll = false) {
    currentPage = nextPage;

    if (!scroll) {
      return;
    }

    await tick();
    productGridEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handlePageChange(nextPage: number) {
    await setPage(nextPage, true);
  }
</script>

<section class="product-list" aria-live="polite">
  <div class="container product-list-container">
    {#if loading}
      <ul class="product-grid" aria-busy="true" aria-label="Loading products">
        {#each Array.from({ length: pageSize }, (_, index) => index) as index (index)}
          <li class="product-grid-item">
            <ProductCardSkeleton />
          </li>
        {/each}
      </ul>
    {:else if products.length === 0}
      <p class="product-list-message">No products found.</p>
    {:else}
      <ul class="product-grid" bind:this={productGridEl}>
        {#each paginatedProducts as product (product.id)}
          <li class="product-grid-item">
            <ProductCard {product} onViewMore={onViewProduct} />
          </li>
        {/each}
      </ul>

      <div class="product-list-footer">
        <PageSizeSelect bind:pageSize />
        <Pagination
          {currentPage}
          {totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  .product-list-container {
    box-sizing: border-box;
    padding: 0 12px;
  }

  .product-list-message {
    padding: 32px 0;
    text-align: center;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: 24px;
    padding: 32px 0;
    scroll-margin-top: 16px;
    list-style: none;

    @include tablet-up {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @include desktop-up {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .product-grid-item {
    display: flex;
    width: 100%;
    min-width: 0;
  }

  .product-list-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 64px;
  }
</style>
