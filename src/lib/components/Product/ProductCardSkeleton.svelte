<article class="product-card-skeleton" aria-hidden="true">
  <div class="product-card-skeleton-media skeleton-shimmer"></div>

  <div
    class="product-card-skeleton-line product-card-skeleton-line--title skeleton-shimmer"
  ></div>
  <div
    class="product-card-skeleton-line product-card-skeleton-line--title-short skeleton-shimmer"
  ></div>

  <div class="product-card-skeleton-meta">
    <div
      class="product-card-skeleton-line product-card-skeleton-line--price skeleton-shimmer"
    ></div>
    <div class="product-card-skeleton-rating skeleton-shimmer"></div>
  </div>

  <div class="product-card-skeleton-colors">
    {#each Array.from({ length: 4 }) as _, index (index)}
      <span class="product-card-skeleton-color skeleton-shimmer"></span>
    {/each}
  </div>

  <div class="product-card-skeleton-button skeleton-shimmer"></div>
</article>

<style lang="scss">
  .product-card-skeleton {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    width: 100%;
    min-width: 0;
    height: 100%;
    min-height: 416px;
  }

  .product-card-skeleton-media {
    width: 100%;
    height: 184px;
    border: 1px solid $color-border;
    border-radius: $border-radius-sm;
  }

  .product-card-skeleton-line {
    border-radius: $border-radius-sm;

    &--title {
      width: 100%;
      height: 21px;
    }

    &--title-short {
      width: 72%;
      height: 21px;
    }

    &--price {
      width: 40%;
      height: 21px;
    }
  }

  .product-card-skeleton-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-width: 0;
  }

  .product-card-skeleton-rating {
    flex-shrink: 0;
    width: 88px;
    height: 16px;
    border-radius: $border-radius-sm;
  }

  .product-card-skeleton-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    min-height: 16px;
  }

  .product-card-skeleton-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
  }

  .product-card-skeleton-button {
    width: 100%;
    height: 48px;
    margin-top: auto;
    border-radius: $border-radius-md;
  }

  .skeleton-shimmer {
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, $color-border 88%, transparent) 0%,
        color-mix(in srgb, $color-card 55%, $color-border) 50%,
        color-mix(in srgb, $color-border 88%, transparent) 100%
      ),
      $color-border;
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.4s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  @keyframes skeleton-shimmer {
    from {
      background-position: 200% 0;
    }

    to {
      background-position: -200% 0;
    }
  }
</style>
