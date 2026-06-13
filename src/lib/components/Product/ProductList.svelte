<script lang="ts">
  import ProductCard from "$lib/components/Product/ProductCard.svelte";
  import ProductCardSkeleton from "$lib/components/Product/ProductCardSkeleton.svelte";
  import ProductModal from "$lib/components/Product/ProductModal.svelte";
  import PageSizeSelect from "$lib/components/PageSizeSelect.svelte";
  import Pagination from "$lib/components/Pagination.svelte";
  import type { PageSize } from "$lib/types/pagination";
  import type { Product } from "$lib/types/product";
  import { parsePageParam, syncPageToUrl } from "$lib/utils/url-params";
  import { page } from "$app/state";
  import { tick } from "svelte";

  let {
    products = [],
    error = null,
    loading = false,
  }: {
    products?: Product[];
    error?: string | null;
    loading?: boolean;
  } = $props();

  let pageSize = $state<PageSize>(12);
  let currentPage = $state(1);
  let selectedProduct = $state<Product | null>(null);
  let productGridEl = $state<HTMLElement | null>(null);
  let previousProductCount = $state(-1);
  let previousPageSize = $state<PageSize | 0>(0);

  const totalPages = $derived(
    Math.max(1, Math.ceil(products.length / pageSize)),
  );

  const paginatedProducts = $derived(
    products.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  );

  function syncCurrentPageFromUrl() {
    currentPage = parsePageParam(page.url.searchParams.get("page"), totalPages);
  }

  async function setPage(nextPage: number, scroll = false) {
    currentPage = nextPage;
    await syncPageToUrl(page.url, nextPage);

    if (!scroll) {
      return;
    }

    await tick();
    productGridEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handlePageChange(nextPage: number) {
    await setPage(nextPage, true);
  }

  function openProductModal(product: Product) {
    selectedProduct = product;
  }

  function closeProductModal() {
    selectedProduct = null;
  }

  $effect(() => {
    page.url.searchParams.get("page");
    totalPages;
    syncCurrentPageFromUrl();
  });

  $effect(() => {
    const count = products.length;

    if (previousProductCount === -1) {
      previousProductCount = count;
      return;
    }

    if (count === previousProductCount) {
      return;
    }

    previousProductCount = count;
    void setPage(1);
  });

  $effect(() => {
    if (previousPageSize === 0) {
      previousPageSize = pageSize;
      return;
    }

    if (pageSize === previousPageSize) {
      return;
    }

    previousPageSize = pageSize;
    void setPage(1);
  });

  $effect(() => {
    if (currentPage > totalPages) {
      void setPage(totalPages);
    }
  });
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
    {:else if error}
      <p class="product-list-message" role="alert">
        {error}
      </p>
    {:else if products.length === 0}
      <p class="product-list-message">No products found.</p>
    {:else}
      <ul class="product-grid" bind:this={productGridEl}>
        {#each paginatedProducts as product (product.id)}
          <li class="product-grid-item">
            <ProductCard {product} onViewMore={openProductModal} />
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

{#if selectedProduct}
  <ProductModal product={selectedProduct} onClose={closeProductModal} />
{/if}

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
