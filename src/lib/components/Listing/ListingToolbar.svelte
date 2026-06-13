<script lang="ts">
  import { Funnel } from "@lucide/svelte";
  import ProductSort from "./ProductSort.svelte";
  import type { ProductSortState } from "$lib/types/sort";

  interface Props {
    productCount?: number;
    panelOpen?: boolean;
    onOpenFilters: () => void;
    filterButton?: HTMLButtonElement | null;
    sort: ProductSortState;
  }

  let {
    productCount = 0,
    panelOpen = false,
    onOpenFilters,
    filterButton = $bindable(null),
    sort = $bindable(),
  }: Props = $props();
</script>

<section class="listing-toolbar">
  <div class="container listing-toolbar-inner">
    <button
      bind:this={filterButton}
      class="filter-button"
      type="button"
      aria-expanded={panelOpen}
      aria-controls="filter-panel"
      onclick={onOpenFilters}
    >
      <Funnel aria-hidden="true" />
      FILTERS
    </button>

    <h2 class="products-count">
      Showing <span>{productCount}</span> products
    </h2>

    <ProductSort bind:sort />
  </div>
</section>

<div class="mobile-products-count">
  <h2>
    Showing <span>{productCount}</span> products
  </h2>
</div>

<style lang="scss">
  .listing-toolbar {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
  }

  .listing-toolbar-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 64px;

    @include tablet-up {
      grid-template-columns: 1fr 2fr 1fr;
    }
  }

  .mobile-products-count,
  .filter-button,
  .products-count {
    height: 100%;
    text-align: center;
  }

  .filter-button {
    @include flex-center;
    gap: 8px;
    padding: 0;
    border: 0;
    border-right: 1px solid $color-border;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
  }

  .products-count {
    display: none;

    @include tablet-up {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }

  .mobile-products-count {
    margin-top: 24px;

    @include tablet-up {
      display: none;
    }
  }
</style>
