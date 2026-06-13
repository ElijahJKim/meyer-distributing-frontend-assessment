<script lang="ts">
  import { ChevronDown } from "@lucide/svelte";
  import { anchorTo, clickOutside, portal } from "$lib/actions/attachment";
  import type { ProductSortId, ProductSortState } from "$lib/types/sort";
  import { PRODUCT_SORT_OPTIONS } from "$lib/utils/product-sort";

  interface Props {
    sort: ProductSortState;
  }

  let { sort = $bindable() }: Props = $props();

  let sortButtonEl = $state<HTMLButtonElement | null>(null);
  let menuOpen = $state(false);

  const selectedLabel = $derived(
    PRODUCT_SORT_OPTIONS.find((option) => option.id === sort)?.label ?? "Sort",
  );

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

  function selectSort(nextSort: ProductSortId | null) {
    sort = nextSort;
    closeMenu();
    sortButtonEl?.focus();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!menuOpen) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      sortButtonEl?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="product-sort">
  <button
    bind:this={sortButtonEl}
    class="sort-button"
    type="button"
    aria-haspopup="menu"
    aria-expanded={menuOpen}
    aria-controls="product-sort-menu"
    data-open={menuOpen}
    onclick={toggleMenu}
  >
    <span class="sort-button-label">{selectedLabel}</span>
    <ChevronDown aria-hidden="true" />
  </button>
</div>

{#if menuOpen && sortButtonEl}
  <div
    id="product-sort-menu"
    class="sort-menu"
    role="menu"
    aria-label="Sort products"
    {@attach portal()}
    {@attach anchorTo(sortButtonEl, 240, "left")}
    {@attach clickOutside(closeMenu)}
  >
    <button
      class="sort-menu-item"
      class:sort-menu-item-selected={sort === null}
      type="button"
      role="menuitemradio"
      aria-checked={sort === null}
      onclick={() => selectSort(null)}
    >
      Default
    </button>

    {#each PRODUCT_SORT_OPTIONS as option (option.id)}
      <button
        class="sort-menu-item"
        class:sort-menu-item-selected={sort === option.id}
        type="button"
        role="menuitemradio"
        aria-checked={sort === option.id}
        onclick={() => selectSort(option.id)}
      >
        {option.label}
      </button>
    {/each}
  </div>
{/if}

<style lang="scss">
  .product-sort {
    height: 100%;
  }

  .sort-button {
    @include flex-center;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    border: 0;
    border-left: 1px solid $color-border;
    background-color: transparent;
    color: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: $color-bg-main;
    }

    :global(svg) {
      width: 16px;
      height: 16px;
      transition: transform 0.15s ease;
    }
  }

  .sort-button[data-open="true"] :global(svg) {
    transform: rotate(180deg);
  }

  .sort-button-label {
    overflow: hidden;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sort-menu {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    box-shadow: 0 12px 28px rgb(15 23 42 / 12%);
    background-color: $color-card;
  }

  .sort-menu-item {
    width: 100%;
    min-height: 40px;
    padding: 10px 12px;
    border: 0;
    border-radius: $border-radius-sm;
    background-color: transparent;
    color: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: $color-bg-main;
    }

    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 1px;
    }
  }

  .sort-menu-item-selected {
    background-color: $color-bg-main;
    color: $color-primary;
  }
</style>
