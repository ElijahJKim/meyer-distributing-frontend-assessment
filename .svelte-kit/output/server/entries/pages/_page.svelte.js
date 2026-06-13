import { e as escape_html } from "../../chunks/context.js";
import { s as spread_props, d as attr, f as attr_style, e as ensure_array_like, g as stringify, h as attr_class } from "../../chunks/index.js";
import { I as Icon } from "../../chunks/Icon.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/client.js";
function Chevron_down($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$renderer, spread_props([{ name: "chevron-down" }, props, { iconNode }]));
}
function Funnel($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "funnel" }, props, { iconNode }]));
}
function Star($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    [
      "path",
      {
        "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "star" }, props, { iconNode }]));
}
function Filter($$renderer, $$props) {
  let { productCount = 0 } = $$props;
  $$renderer.push(`<section class="filter-bar svelte-o6zeoq"><div class="container filter-bar-inner svelte-o6zeoq"><button class="filter-button svelte-o6zeoq" type="button">`);
  Funnel($$renderer, {});
  $$renderer.push(`<!----> FILTERS</button> <h2 class="products-count svelte-o6zeoq">Showing <span>${escape_html(productCount)}</span> products</h2> <button class="sort-button svelte-o6zeoq" type="button">SORT `);
  Chevron_down($$renderer, {});
  $$renderer.push(`<!----></button></div></section> <div class="mobile-products-count svelte-o6zeoq"><h2>Showing <span>${escape_html(productCount)}</span> products</h2></div>`);
}
function Hero($$renderer) {
  $$renderer.push(`<section class="hero svelte-1q37ri0"><h1 class="svelte-1q37ri0">Find products, Check availability, Order faster</h1> <p class="svelte-1q37ri0">Browse Meyer's catalog with real-time stock and account pricing.</p></section>`);
}
function RatingStars($$renderer, $$props) {
  let { rating, max = 5 } = $$props;
  const normalizedRating = rating === null ? 0 : Math.max(0, Math.min(max, rating));
  const fillPercent = normalizedRating / max * 100;
  const label = rating === null ? "No rating" : `${rating} out of ${max} stars`;
  $$renderer.push(`<div class="rating-stars svelte-j68xmq" role="img"${attr("aria-label", label)}${attr_style("", { "--rating-fill": `${stringify(fillPercent)}%` })}><div class="rating-stars-track svelte-j68xmq" aria-hidden="true"><!--[-->`);
  const each_array = ensure_array_like(Array(max));
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    each_array[index];
    $$renderer.push(`<span class="rating-star rating-star-empty svelte-j68xmq">`);
    Star($$renderer, { size: 14, "aria-hidden": "true" });
    $$renderer.push(`<!----></span>`);
  }
  $$renderer.push(`<!--]--></div> <div class="rating-stars-fill svelte-j68xmq" aria-hidden="true"><div class="rating-stars-track svelte-j68xmq"><!--[-->`);
  const each_array_1 = ensure_array_like(Array(max));
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    each_array_1[index];
    $$renderer.push(`<span class="rating-star rating-star-filled svelte-j68xmq">`);
    Star($$renderer, { size: 14, "aria-hidden": "true" });
    $$renderer.push(`<!----></span>`);
  }
  $$renderer.push(`<!--]--></div></div></div>`);
}
function normalizeImageUrl(url) {
  if (!url) {
    return "";
  }
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return url;
}
function getProductImageSources(product) {
  const imageLink = normalizeImageUrl(product.image_link);
  const featuredImage = product.api_featured_image ? normalizeImageUrl(product.api_featured_image) : null;
  if (imageLink) {
    return {
      primary: imageLink,
      fallback: featuredImage && featuredImage !== imageLink ? featuredImage : null
    };
  }
  return {
    primary: featuredImage ?? "",
    fallback: null
  };
}
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { product } = $$props;
    const imageSources = getProductImageSources(product);
    function formatPrice(price) {
      return price.startsWith("$") ? price : `$${price}`;
    }
    $$renderer2.push(`<article class="product-card svelte-1udyrqm"><div class="product-card-media svelte-1udyrqm">`);
    if (imageSources.primary) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img class="product-card-image svelte-1udyrqm"${attr("src", imageSources.primary)}${attr("alt", product.name)} loading="lazy" width="158" height="184" onerror="this.__e=event"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="product-card-image product-card-image-placeholder svelte-1udyrqm" aria-hidden="true"></div>`);
    }
    $$renderer2.push(`<!--]--></div> <h3 class="product-card-name svelte-1udyrqm">${escape_html(product.name)}</h3> <div class="product-card-meta svelte-1udyrqm"><p class="product-card-price svelte-1udyrqm">${escape_html(formatPrice(product.price))}</p> `);
    RatingStars($$renderer2, { rating: product.rating });
    $$renderer2.push(`<!----></div> <div${attr_class("product-card-colors svelte-1udyrqm", void 0, {
      "product-card-colors-empty": product.product_colors.length === 0
    })}><!--[-->`);
    const each_array = ensure_array_like(product.product_colors);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let color = each_array[$$index];
      $$renderer2.push(`<span class="product-card-color svelte-1udyrqm"${attr("title", color.colour_name)}${attr("aria-label", color.colour_name)}${attr_style("", { "background-color": color.hex_value })}></span>`);
    }
    $$renderer2.push(`<!--]--></div> <button class="product-card-view-more svelte-1udyrqm" type="button">View More</button></article>`);
  });
}
function Pagination($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { currentPage, totalPages } = $$props;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    if (totalPages > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<nav class="pagination svelte-14nrfpk" aria-label="Pagination"><button class="pagination-button svelte-14nrfpk" type="button"${attr("disabled", currentPage === 1, true)} aria-label="Go to previous page">Previous</button> <ul class="pagination-list svelte-14nrfpk"><!--[-->`);
      const each_array = ensure_array_like(pages);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let page = each_array[$$index];
        $$renderer2.push(`<li class="pagination-item"><button${attr_class("pagination-page svelte-14nrfpk", void 0, { "pagination-page-active": page === currentPage })} type="button"${attr("aria-label", `Go to page ${stringify(page)}`)}${attr("aria-current", page === currentPage ? "page" : void 0)}>${escape_html(page)}</button></li>`);
      }
      $$renderer2.push(`<!--]--></ul> <button class="pagination-button svelte-14nrfpk" type="button"${attr("disabled", currentPage === totalPages, true)} aria-label="Go to next page">Next</button></nav>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function ProductList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const PAGE_SIZE_BY_BREAKPOINT = { mobile: 8 };
    let { products, error = null } = $$props;
    let currentPage = 1;
    const pageSize = PAGE_SIZE_BY_BREAKPOINT.mobile;
    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
    const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    $$renderer2.push(`<section class="product-list" aria-live="polite"><div class="container product-list-container svelte-1xfarkz">`);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="product-list-message product-list-message-error svelte-1xfarkz" role="alert">${escape_html(error)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (products.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="product-list-message svelte-1xfarkz">No products found.</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<ul class="product-grid svelte-1xfarkz"><!--[-->`);
        const each_array = ensure_array_like(paginatedProducts);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let product = each_array[$$index];
          $$renderer2.push(`<li class="product-grid-item svelte-1xfarkz">`);
          Card($$renderer2, { product });
          $$renderer2.push(`<!----></li>`);
        }
        $$renderer2.push(`<!--]--></ul> `);
        Pagination($$renderer2, { currentPage, totalPages });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    $$renderer2.push(`<main>`);
    Hero($$renderer2);
    $$renderer2.push(`<!----> `);
    Filter($$renderer2, { productCount: data.products.length });
    $$renderer2.push(`<!----> `);
    ProductList($$renderer2, { products: data.products, error: data.error });
    $$renderer2.push(`<!----></main>`);
  });
}
export {
  _page as default
};
