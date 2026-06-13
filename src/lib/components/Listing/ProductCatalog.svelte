<script lang="ts">
  import Listing from "$lib/components/Listing/Listing.svelte";
  import ProductList from "$lib/components/Product/ProductList.svelte";
  import type { PageSize } from "$lib/types/pagination";
  import type { Product } from "$lib/types/product";
  import type { ProductSortState } from "$lib/types/sort";
  import type { ProductFilters } from "$lib/types/filters";
  import {
    applyProductFilters,
    buildFilterOptions,
  } from "$lib/utils/product-filters";
  import { applyProductSort } from "$lib/utils/product-sort";
  import {
    buildListingHref,
    getUrlHref,
    parseListingQueryState,
    syncListingToUrl,
  } from "$lib/utils/url-params";
  import { page } from "$app/state";

  interface Props {
    products: Product[];
  }

  let { products }: Props = $props();

  const initialQuery = parseListingQueryState(page.url);

  let filters = $state<ProductFilters>(initialQuery.filters);
  let sort = $state<ProductSortState>(initialQuery.sort);
  let pageSize = $state<PageSize>(initialQuery.pageSize);
  let currentPage = $state(initialQuery.page);
  let lastSyncedHref = $state(getUrlHref(page.url));

  const filterOptions = $derived(buildFilterOptions(products));
  const filteredProducts = $derived(applyProductFilters(products, filters));
  const displayedProducts = $derived(applyProductSort(filteredProducts, sort));
  const totalPages = $derived(
    Math.max(1, Math.ceil(displayedProducts.length / pageSize)),
  );

  function listingQueryWithoutPage(
    nextFilters: ProductFilters,
    nextSort: ProductSortState,
    nextPageSize: PageSize,
  ): string {
    return JSON.stringify({
      filters: nextFilters,
      sort: nextSort,
      pageSize: nextPageSize,
    });
  }

  $effect(() => {
    page.url.search;
    lastSyncedHref = getUrlHref(page.url);

    const parsed = parseListingQueryState(page.url, Number.MAX_SAFE_INTEGER);
    filters = parsed.filters;
    sort = parsed.sort;
    pageSize = parsed.pageSize;
    currentPage = parsed.page;
  });

  $effect(() => {
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  });

  $effect(() => {
    const parsedFromUrl = parseListingQueryState(page.url, totalPages);
    const queryChanged =
      listingQueryWithoutPage(
        parsedFromUrl.filters,
        parsedFromUrl.sort,
        parsedFromUrl.pageSize,
      ) !== listingQueryWithoutPage(filters, sort, pageSize);

    if (queryChanged && currentPage !== 1) {
      currentPage = 1;
      return;
    }

    const nextHref = buildListingHref(
      page.url,
      {
        filters,
        sort,
        page: currentPage,
        pageSize,
      },
      totalPages,
    );

    if (nextHref === lastSyncedHref) {
      return;
    }

    lastSyncedHref = nextHref;
    void syncListingToUrl(
      page.url,
      {
        filters,
        sort,
        page: currentPage,
        pageSize,
      },
      totalPages,
    );
  });
</script>

<Listing
  productCount={displayedProducts.length}
  {filterOptions}
  bind:filters
  bind:sort
/>
<ProductList
  products={displayedProducts}
  bind:pageSize
  bind:currentPage
  {totalPages}
/>
