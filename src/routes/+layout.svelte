<script>
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import "../lib/styles/app.scss";

  let { children } = $props();
</script>

<div class="site">
  <Header />
  {@render children()}
  <Footer />
</div>

<style lang="scss">
  .site {
    min-height: 100vh;
  }
</style>
