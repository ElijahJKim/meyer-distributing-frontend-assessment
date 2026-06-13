<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
  import ProductCatalog from "$lib/components/Listing/ProductCatalog.svelte";
  import ProductList from "$lib/components/Product/ProductList.svelte";
  import type { Product } from "$lib/types/product";

  let { data } = $props<{
    data: {
      products: Promise<Product[]>;
    };
  }>();

  function getLoadErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Failed to load products";
  }
</script>

<main>
  <Hero />

  {#await data.products}
    <ProductList loading />
  {:then products}
    <ProductCatalog {products} />
  {:catch error}
    <section class="catalog-error" aria-live="polite">
      <div class="container catalog-error-container">
        <p class="catalog-error-message" role="alert">
          {getLoadErrorMessage(error)}
        </p>
      </div>
    </section>
  {/await}
</main>

<style lang="scss">
  .catalog-error-container {
    box-sizing: border-box;
    padding: 0 12px;
  }

  .catalog-error-message {
    padding: 32px 0;
    color: $color-error;
    text-align: center;
  }
</style>
