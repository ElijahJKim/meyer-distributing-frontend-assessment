<script lang="ts">
  import { browser } from "$app/environment";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import { themeStore } from "$lib/state/theme.svelte";
  import "../lib/styles/app.scss";

  let { data, children } = $props();

  $effect(() => {
    if (!browser) {
      return;
    }

    document.documentElement.dataset.theme = themeStore.value;
  });
</script>

<svelte:head>
  <title>Meyer Distributing</title>
  <meta
    name="description"
    content="Browse Meyer's catalog with real-time stock and account pricing."
  />
</svelte:head>

<div class="site">
  <Header theme={data.theme} />
  {@render children()}
  <Footer />
</div>

<style lang="scss">
  .site {
    min-height: 100vh;
    background-color: $color-bg-main;
    color: $color-text-main;
  }
</style>
