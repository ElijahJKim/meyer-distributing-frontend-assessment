<script lang="ts">
  import Filter from "$lib/components/Filter.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import ProductList from "$lib/components/ProductList.svelte";
  import type { Product } from "$lib/types/product";

  let { data } = $props<{
    data: {
      products: Product[];
      error: string | null;
    };
  }>();
</script>

<main>
  <Hero />
  <Filter productCount={data.products.length} />
  <ProductList products={data.products} error={data.error} />
</main>
