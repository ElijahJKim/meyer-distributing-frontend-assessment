<script lang="ts">
  import RatingStars from "./RatingStars.svelte";
  import type { Product } from "$lib/types/product";
  import { getProductImageSources } from "$lib/utils/product-image";

  let { product }: { product: Product } = $props();

  const imageSources = $derived(getProductImageSources(product));

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

  function formatPrice(price: string): string {
    return price.startsWith("$") ? price : `$${price}`;
  }
</script>

<article class="product-card">
  <div class="product-card-media">
    {#if imageSources.primary}
      <img
        class="product-card-image"
        src={imageSources.primary}
        alt={product.name}
        loading="lazy"
        width="158"
        height="184"
        onerror={(event) => handleImageError(event, imageSources.fallback)}
      />
    {:else}
      <div
        class="product-card-image product-card-image-placeholder"
        aria-hidden="true"
      ></div>
    {/if}
  </div>

  <h3 class="product-card-name">{product.name}</h3>

  <div class="product-card-meta">
    <p class="product-card-price">{formatPrice(product.price)}</p>
    <RatingStars rating={product.rating} />
  </div>

  <div
    class="product-card-colors"
    class:product-card-colors-empty={product.product_colors.length === 0}
  >
    {#each product.product_colors as color, index (index)}
      {#if color.hex_value}
        <span
          class="product-card-color"
          style:background-color={color.hex_value}
          title={color.colour_name ?? undefined}
          aria-label={color.colour_name ?? "Product color"}
        ></span>
      {/if}
    {/each}
  </div>

  <button class="product-card-view-more" type="button">View More</button>
</article>

<style lang="scss">
  .product-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    width: 100%;
    min-width: 0;
    height: 100%;
    min-height: 416px;
  }

  .product-card-media {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 184px;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
  }

  .product-card-image {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .product-card-image-placeholder {
    width: 100%;
    height: 100%;
  }

  .product-card-name {
    display: -webkit-box;
    overflow: hidden;
    width: 100%;
    min-width: 0;
    min-height: 42px;
    font-size: 15px;
    line-height: 21px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .product-card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-width: 0;
  }

  .product-card-price {
    flex-shrink: 1;
    overflow: hidden;
    min-width: 0;
    color: $color-price-text;
    font-size: 15px;
    font-weight: 600;
    line-height: 21px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .product-card-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    min-width: 0;
    min-height: 16px;
  }

  .product-card-colors-empty {
    visibility: hidden;
  }

  .product-card-color {
    width: 16px;
    height: 16px;
    border: 1px solid $color-border;
    border-radius: 50%;
  }

  .product-card-view-more {
    width: 100%;
    height: 48px;
    margin-top: auto;
    padding: 12px 16px;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    background-color: transparent;
    color: inherit;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: $color-border;
    }
  }
</style>
