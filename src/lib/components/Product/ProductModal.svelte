<script lang="ts">
  import { X } from "@lucide/svelte";
  import RatingStars from "./RatingStars.svelte";
  import { portal } from "$lib/actions/attachment";
  import type { Product, ProductColor } from "$lib/types/product";
  import {
    formatProductDescription,
    formatProductPrice,
  } from "$lib/utils/product-format";
  import { getProductImageSources } from "$lib/utils/product-image";
  import { handleDialogKeydown } from "$lib/utils/a11y";

  interface Props {
    product: Product;
    onClose: () => void;
  }

  let { product, onClose }: Props = $props();

  let dialogEl = $state<HTMLElement | null>(null);
  let closeButtonEl = $state<HTMLButtonElement | null>(null);
  let previouslyFocusedEl = $state<HTMLElement | null>(null);

  const imageSources = $derived(getProductImageSources(product));
  const formattedDescription = $derived(
    formatProductDescription(product.description),
  );
  const visibleColors = $derived(getVisibleColors(product.product_colors));

  function getVisibleColors(colors: ProductColor[]): ProductColor[] {
    return colors.filter((color) => color.hex_value || color.colour_name);
  }

  function handleImageError(event: Event, fallback: string | null) {
    const image = event.currentTarget;

    if (
      !(image instanceof HTMLImageElement) ||
      !fallback ||
      image.src === fallback
    ) {
      return;
    }

    image.src = fallback;
  }

  function handleKeydown(event: KeyboardEvent) {
    handleDialogKeydown(dialogEl, event, onClose);
  }

  $effect(() => {
    previouslyFocusedEl =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonEl?.focus();

    return () => {
      previouslyFocusedEl?.focus();
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="product-modal-root" {@attach portal()}>
  <button
    class="product-modal-backdrop"
    type="button"
    aria-label="Close product details"
    onclick={onClose}
  ></button>

  <div
    class="product-modal"
    bind:this={dialogEl}
    role="dialog"
    aria-modal="true"
    aria-labelledby="product-modal-title"
  >
    <header class="product-modal-header">
      <h2 id="product-modal-title" class="product-modal-title">
        {product.name}
      </h2>
      <button
        bind:this={closeButtonEl}
        class="product-modal-close"
        type="button"
        aria-label="Close product details"
        onclick={onClose}
      >
        <X aria-hidden="true" />
      </button>
    </header>

    <div class="product-modal-body">
      <div class="product-modal-media">
        {#if imageSources.primary}
          <img
            class="product-modal-image"
            src={imageSources.primary}
            alt={product.name}
            width="320"
            height="320"
            onerror={(event) => handleImageError(event, imageSources.fallback)}
          />
        {:else}
          <div
            class="product-modal-image product-modal-image-placeholder"
            aria-hidden="true"
          ></div>
        {/if}
      </div>

      <div class="product-modal-details">
        <div class="product-modal-meta">
          <p class="product-modal-price">{formatProductPrice(product.price)}</p>
          <RatingStars rating={product.rating} />
        </div>

        {#if formattedDescription}
          <p class="product-modal-description">{formattedDescription}</p>
        {:else}
          <p class="product-modal-description product-modal-description-empty">
            No description available.
          </p>
        {/if}

        <section
          class="product-modal-colors"
          aria-labelledby="product-modal-colors-title"
        >
          <h3
            id="product-modal-colors-title"
            class="product-modal-colors-title"
          >
            Colors
          </h3>
          {#if visibleColors.length > 0}
            <ul class="product-modal-color-list">
              {#each visibleColors as color, index (index)}
                <li class="product-modal-color-item">
                  {#if color.hex_value}
                    <span
                      class="product-modal-color-swatch"
                      style:background-color={color.hex_value}
                      aria-hidden="true"
                    ></span>
                  {/if}
                  <span class="product-modal-color-name">
                    {color.colour_name ?? "Unnamed color"}
                  </span>
                </li>
              {/each}
            </ul>
          {:else}
            <p class="product-modal-colors-empty">
              No color options available.
            </p>
          {/if}
        </section>

        <a
          class="product-modal-link"
          href={product.product_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Product Page
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .product-modal-root {
    position: fixed;
    z-index: 60;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 24px 16px;
  }

  .product-modal-backdrop {
    position: absolute;
    inset: 0;
    border: 0;
    background-color: rgb(15 23 42 / 55%);
    cursor: pointer;
  }

  .product-modal {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: min(100%, 960px);
    height: min(90vh, 640px);
    border: 1px solid $color-border;
    border-radius: $border-radius-lg;
    box-shadow: 0 24px 48px rgb(15 23 42 / 20%);
    background-color: $color-card;
  }

  .product-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 20px 16px;
    border-bottom: 1px solid $color-border;
  }

  .product-modal-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
  }

  .product-modal-close {
    @include flex-center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: $border-radius-md;
    background-color: transparent;
    color: inherit;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: $color-bg-main;
    }

    :global(svg) {
      width: 20px;
      height: 20px;
    }
  }

  .product-modal-body {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    flex: 1;
    gap: 20px;
    overflow: hidden;
    min-height: 0;
    padding: 20px;

    @media (width <= 767px) {
      grid-template-columns: 1fr;
      grid-template-rows: minmax(0, 220px) minmax(0, 1fr);
    }
  }

  .product-modal-media {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    min-width: 0;
    min-height: 0;
    max-height: 100%;
    padding: 16px;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    background-color: $color-bg-main;
  }

  .product-modal-image {
    display: block;
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
  }

  .product-modal-image-placeholder {
    width: 100%;
    height: 100%;
  }

  .product-modal-details {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) 140px auto;
    gap: 14px;
    overflow: hidden;
    min-width: 0;
    height: 100%;
    min-height: 0;
  }

  .product-modal-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .product-modal-price {
    color: $color-price-text;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
  }

  .product-modal-description {
    overflow-y: auto;
    min-height: 0;
    margin: 0;
    color: $color-text-main;
    font-size: 15px;
    line-height: 1.6;
  }

  .product-modal-description-empty {
    color: $color-text-muted;
  }

  .product-modal-colors {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .product-modal-colors-title {
    flex-shrink: 0;
    margin: 0 0 8px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .product-modal-color-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    flex: 1;
    gap: 8px 16px;
    overflow-y: auto;
    min-height: 0;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .product-modal-color-item {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
    font-size: 14px;
    line-height: 1.4;
  }

  .product-modal-color-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product-modal-colors-empty {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0;
    color: $color-text-muted;
    font-size: 14px;
  }

  .product-modal-color-swatch {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border: 1px solid $color-border;
    border-radius: 50%;
  }

  .product-modal-link {
    @include flex-center;
    align-self: flex-start;
    min-height: 48px;
    padding: 12px 20px;
    border-radius: $border-radius-md;
    background-color: $color-primary;
		color: $color-on-primary;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;

    &:hover,
    &:focus-visible {
      background-color: $color-primary-hover;
    }

    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }
  }
</style>
