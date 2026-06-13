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

<style>.header {
  background-color: #1e3a8a;
  color: #fff;
}

.header-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 64px;
  padding: 6px 16px;
}
@media (min-width: 768px) {
  .header-inner {
    height: 100px;
    padding: 8px 24px;
  }
}
.header-inner h1 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
}
@media (min-width: 768px) {
  .header-inner h1 {
    font-size: 24px;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.header-actions :global(.switch) {
  font-size: 16px;
}
@media (min-width: 768px) {
  .header-actions {
    gap: 20px;
  }
  .header-actions :global(.switch) {
    font-size: 22px;
  }
}

.cart-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
}
.cart-button :global(svg) {
  width: 22px;
  height: 22px;
}
@media (min-width: 768px) {
  .cart-button {
    width: 48px;
    height: 48px;
  }
  .cart-button :global(svg) {
    width: 32px;
    height: 32px;
  }
}</style>
