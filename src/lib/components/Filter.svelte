<script lang="ts">
	import { ChevronDown, Funnel } from '@lucide/svelte';

	let { productCount = 0 }: { productCount?: number } = $props();
</script>

<section class="filter-bar">
	<div class="container filter-bar-inner">
		<button class="filter-button" type="button">
			<Funnel />
			FILTERS
		</button>
		<h2 class="products-count">
			Showing <span>{productCount}</span> products
		</h2>

		<button class="sort-button" type="button">
			SORT
			<ChevronDown />
		</button>
	</div>
</section>
<div class="mobile-products-count">
	<h2>
		Showing <span>{productCount}</span> products
	</h2>
</div>

<style lang="scss">
  .filter-bar {
    border-top: 1px solid $color-border;
    border-bottom: 1px solid $color-border;
  }

  .filter-bar-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 64px;

    @include tablet-up {
      grid-template-columns: 1fr 2fr 1fr;
    }
  }

  .mobile-products-count,
  .filter-button,
  .products-count,
  .sort-button {
    height: 100%;
    text-align: center;
  }

  .filter-button,
  .sort-button {
    @include flex-center;
    gap: 8px;
    padding: 0;
    border: 0;
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

  .filter-button {
    border-right: 1px solid $color-border;
  }

  .sort-button {
    border-left: 1px solid $color-border;
  }

  .mobile-products-count {
    @include tablet-up {
      display: none;
    }
  }
</style>
