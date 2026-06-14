<script lang="ts">
  import type { RecentlyViewedItem } from "$lib/types/recently-viewed";
  import { formatProductPrice } from "$lib/utils/product-format";
  import { getProductImageSources } from "$lib/utils/product-image";

  interface Props {
    item: RecentlyViewedItem;
    onSelect: (item: RecentlyViewedItem) => void;
  }

  let { item, onSelect }: Props = $props();

  const imageSources = $derived(getProductImageSources(item));

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
</script>

<button
  class="recently-viewed-card"
  type="button"
  onclick={() => onSelect(item)}
>
  <span class="recently-viewed-card-media">
    {#if imageSources.primary}
      <img
        class="recently-viewed-card-image"
        src={imageSources.primary}
        alt=""
        loading="lazy"
        width="120"
        height="120"
        onerror={(event) => handleImageError(event, imageSources.fallback)}
      />
    {:else}
      <span class="recently-viewed-card-image-placeholder" aria-hidden="true"></span>
    {/if}
  </span>
  <span class="recently-viewed-card-name">{item.name}</span>
  <span class="recently-viewed-card-price">{formatProductPrice(item.price)}</span>
</button>

<style lang="scss">
  .recently-viewed-card {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 8px;
    width: 148px;
    min-width: 148px;
    padding: 0;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    background-color: $color-card;
    color: inherit;
    text-align: left;
    cursor: pointer;
    scroll-snap-align: start;
    transition: border-color 0.2s ease;

    &:hover,
    &:focus-visible {
      border-color: $color-primary;
    }

    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }

    @include tablet-up {
      width: 180px;
      min-width: 180px;
    }
  }

  .recently-viewed-card-media {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 120px;
    border-bottom: 1px solid $color-border;
  }

  .recently-viewed-card-image {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .recently-viewed-card-image-placeholder {
    width: 100%;
    height: 100%;
    background-color: $color-bg-main;
  }

  .recently-viewed-card-name {
    display: -webkit-box;
    overflow: hidden;
    min-height: 36px;
    padding: 0 10px;
    font-size: 13px;
    line-height: 18px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .recently-viewed-card-price {
    padding: 0 10px 12px;
    color: $color-price-text;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
  }
</style>
