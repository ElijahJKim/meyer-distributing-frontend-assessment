<script>
  import { ShoppingCart } from "@lucide/svelte";
  import Darkmode from "./Darkmode.svelte";
</script>

<header class="header">
  <div class="container header-inner">
    <h1>Meyer Distributing</h1>
    <div class="header-actions">
      <Darkmode />
      <button type="button" class="cart-button" aria-label="Shopping cart">
        <ShoppingCart strokeWidth={1.75} aria-hidden="true" />
      </button>
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

  .cart-button {
    @include flex-center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    color: inherit;
    cursor: pointer;

    :global(svg) {
      width: 22px;
      height: 22px;
    }

    @include tablet-up {
      width: 48px;
      height: 48px;

      :global(svg) {
        width: 32px;
        height: 32px;
      }
    }
  }
</style>
