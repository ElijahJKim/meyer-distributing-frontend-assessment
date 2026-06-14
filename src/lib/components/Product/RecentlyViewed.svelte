<script lang="ts">
  import { onMount } from "svelte";
  import RecentlyViewedCard from "$lib/components/Product/RecentlyViewedCard.svelte";
  import {
    getRecentlyViewedItems,
    initRecentlyViewed,
  } from "$lib/state/recently-viewed.svelte";
  import type { RecentlyViewedItem } from "$lib/types/recently-viewed";

  interface Props {
    onSelect: (item: RecentlyViewedItem) => void;
  }

  let { onSelect }: Props = $props();

  let ready = $state(false);
  const items = $derived(getRecentlyViewedItems());

  onMount(() => {
    initRecentlyViewed();
    ready = true;
  });
</script>

{#if ready && items.length > 0}
  <section class="recently-viewed" aria-labelledby="recently-viewed-title">
    <div class="container recently-viewed-container">
      <h2 id="recently-viewed-title" class="recently-viewed-title">
        Recently Viewed
      </h2>

      <ul class="recently-viewed-track" aria-label="Recently viewed products">
        {#each items as item (item.id)}
          <li class="recently-viewed-item">
            <RecentlyViewedCard {item} {onSelect} />
          </li>
        {/each}
      </ul>
    </div>
  </section>
{/if}

<style lang="scss">
  .recently-viewed-container {
    box-sizing: border-box;
    padding: 0 12px;
  }

  .recently-viewed-title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;

    @include tablet-up {
      font-size: 20px;
    }
  }

  .recently-viewed-track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    margin: 0;
    padding: 4px 2px 24px;
    list-style: none;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;

    @include tablet-up {
      gap: 16px;
      padding-bottom: 32px;
    }
  }

  .recently-viewed-item {
    display: flex;
  }
</style>
