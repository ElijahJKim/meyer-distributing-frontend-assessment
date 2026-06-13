<script lang="ts">
  import { Star } from "@lucide/svelte";

  let {
    rating,
    max = 5,
  }: {
    rating: number | null;
    max?: number;
    size?: number;
  } = $props();

  const normalizedRating = $derived(
    rating === null ? 0 : Math.max(0, Math.min(max, rating)),
  );

  const fillPercent = $derived((normalizedRating / max) * 100);

  const label = $derived(
    rating === null ? "No rating" : `${rating} out of ${max} stars`,
  );
</script>

<div
  class="rating-stars"
  role="img"
  aria-label={label}
  style:--rating-fill="{fillPercent}%"
>
  <div class="rating-stars-track" aria-hidden="true">
    {#each Array(max) as _, index (index)}
      <span class="rating-star rating-star-empty">
        <Star size={14} aria-hidden="true" />
      </span>
    {/each}
  </div>

  <div class="rating-stars-fill" aria-hidden="true">
    <div class="rating-stars-track">
      {#each Array(max) as _, index (index)}
        <span class="rating-star rating-star-filled">
          <Star size={14} aria-hidden="true" />
        </span>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .rating-stars {
    --rating-yellow: #fbbf24;
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    line-height: 0;
  }

  .rating-stars-track {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .rating-stars-fill {
    position: absolute;
    inset: 0 auto 0 0;
    overflow: hidden;
    width: var(--rating-fill);
  }

  .rating-star {
    display: inline-flex;
    line-height: 0;
  }

  .rating-star-empty {
    color: $color-border;

    :global(svg) {
      stroke: currentcolor;
      fill: transparent;
    }
  }

  .rating-star-filled {
    color: var(--rating-yellow);

    :global(svg) {
      stroke: currentcolor;
      fill: currentcolor;
    }
  }
</style>
