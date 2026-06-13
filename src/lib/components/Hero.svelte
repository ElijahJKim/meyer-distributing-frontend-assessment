<section class="hero">
  <h1>Find products, Check availability, Order faster</h1>
  <p>Browse Meyer's catalog with real-time stock and account pricing.</p>
</section>

<style lang="scss">
  .hero {
    flex-direction: column;
    gap: 16px;
    height: 300px;
    text-align: center;

    @include flex-center;
  }

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;

    @include tablet-up {
      font-size: 32px;
    }
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;

    @include tablet-up {
      font-size: 20px;
    }
  }
</style>
