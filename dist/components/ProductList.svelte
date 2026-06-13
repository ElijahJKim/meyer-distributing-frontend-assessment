<script lang="ts">
	import Card from './Card.svelte';
	import Pagination from './Pagination.svelte';
	import type { Product } from '../types/product';
	import { parsePageParam, syncPageToUrl } from '../utils/url-params';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { tick } from 'svelte';

	const PAGE_SIZE_BY_BREAKPOINT = {
		mobile: 8,
		tablet: 12,
		desktop: 16
	} as const;

	let {
		products,
		error = null
	}: {
		products: Product[];
		error?: string | null;
	} = $props();

	let innerWidth = $state(0);
	const isTablet = $derived(innerWidth >= 768);
	const isDesktop = $derived(innerWidth >= 1200);

	let currentPage = $state(1);
	let productGridEl = $state<HTMLElement | null>(null);
	let previousProductCount = $state(-1);
	let previousPageSize = $state(0);

	const pageSize = $derived(
		isDesktop
			? PAGE_SIZE_BY_BREAKPOINT.desktop
			: isTablet
				? PAGE_SIZE_BY_BREAKPOINT.tablet
				: PAGE_SIZE_BY_BREAKPOINT.mobile
	);

	const totalPages = $derived(Math.max(1, Math.ceil(products.length / pageSize)));

	const paginatedProducts = $derived(
		products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);

	function syncCurrentPageFromUrl() {
		currentPage = parsePageParam(page.url.searchParams.get('page'), totalPages);
	}

	async function setPage(nextPage: number, scroll = false) {
		currentPage = nextPage;
		await syncPageToUrl(page.url, nextPage);

		if (!scroll) {
			return;
		}

		await tick();
		productGridEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	async function handlePageChange(nextPage: number) {
		await setPage(nextPage, true);
	}

	afterNavigate(() => {
		syncCurrentPageFromUrl();
	});

	$effect(() => {
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

<svelte:window bind:innerWidth />

<section class="product-list" aria-live="polite">
	<div class="container product-list-container">
		{#if error}
			<p class="product-list-message product-list-message-error" role="alert">{error}</p>
		{:else if products.length === 0}
			<p class="product-list-message">No products found.</p>
		{:else}
			<ul class="product-grid" bind:this={productGridEl}>
				{#each paginatedProducts as product (product.id)}
					<li class="product-grid-item">
						<Card {product} />
					</li>
				{/each}
			</ul>

			<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
		{/if}
	</div>
</section>

<style>.product-list-container {
  box-sizing: border-box;
  padding: 0 12px;
}

.product-list-message {
  padding: 32px 0;
  text-align: center;
}

.product-list-message-error {
  color: #dc2626;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 24px;
  padding: 32px 0;
  scroll-margin-top: 16px;
  list-style: none;
}
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (min-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.product-grid-item {
  display: flex;
  width: 100%;
  min-width: 0;
}</style>
