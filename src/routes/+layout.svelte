<script lang="ts">
  import { browser } from "$app/environment";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import { themeStore } from "$lib/state/theme.svelte";
  import "../lib/styles/app.scss";

  let { data, children } = $props();

  themeStore.init(data.theme);

  $effect(() => {
    themeStore.init(data.theme);
  });

  $effect(() => {
    if (!browser) {
      return;
    }

    document.documentElement.dataset.theme = themeStore.value;
  });
</script>

<div class="site">
  <Header />
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
