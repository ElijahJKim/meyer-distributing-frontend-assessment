<script lang="ts">
  import type { Theme } from "$lib/utils/theme";
  import Darkmode from "./Darkmode.svelte";

  let { theme }: { theme: Theme } = $props();
</script>

<header class="header">
  <div class="container header-inner">
    <h1>Meyer Distributing</h1>
    <div class="header-actions">
      <Darkmode {theme} />
    </div>
  </div>
</header>

<style lang="scss">
  .header {
    background-color: $color-primary;
    color: $color-card;
  }

  .header-inner {
    @include flex-center;
    justify-content: space-between;
    box-sizing: border-box;
    height: 64px;
    padding: 6px 16px;

    @include tablet-up {
      height: 100px;
      padding: 8px 24px;
    }

    h1 {
      font-size: 18px;
      font-weight: 600;
      line-height: 1.2;

      @include tablet-up {
        font-size: 24px;
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;

    :global(.switch) {
      font-size: 16px;
    }

    @include tablet-up {
      gap: 20px;

      :global(.switch) {
        font-size: 22px;
      }
    }
  }
</style>
