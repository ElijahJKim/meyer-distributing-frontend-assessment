import { s as spread_props } from "../../chunks/index.js";
import { I as Icon } from "../../chunks/Icon.js";
function Shopping_cart($$renderer, $$props) {
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["circle", { "cx": "8", "cy": "21", "r": "1" }],
    ["circle", { "cx": "19", "cy": "21", "r": "1" }],
    [
      "path",
      {
        "d": "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
      }
    ]
  ];
  Icon($$renderer, spread_props([{ name: "shopping-cart" }, props, { iconNode }]));
}
function Darkmode($$renderer) {
  $$renderer.push(`<label class="switch svelte-1rkridt"><span class="switch__track svelte-1rkridt"><input class="switch__input svelte-1rkridt" type="checkbox" role="switch"/> <span class="switch__icon svelte-1rkridt" aria-hidden="true"><span class="switch__icon-part switch__icon-part--1 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--2 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--3 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--4 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--5 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--6 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--7 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--8 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--9 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--10 svelte-1rkridt"></span> <span class="switch__icon-part switch__icon-part--11 svelte-1rkridt"></span></span></span> <span class="switch__sr svelte-1rkridt">Dark Mode</span></label>`);
}
function Header($$renderer) {
  $$renderer.push(`<header class="header svelte-1elxaub"><div class="container header-inner svelte-1elxaub"><h1 class="svelte-1elxaub">Meyer Distributing</h1> <div class="header-actions svelte-1elxaub">`);
  Darkmode($$renderer);
  $$renderer.push(`<!----> <button type="button" class="cart-button svelte-1elxaub" aria-label="Shopping cart">`);
  Shopping_cart($$renderer, { strokeWidth: 1.75, "aria-hidden": "true" });
  $$renderer.push(`<!----></button></div></div></header>`);
}
function _layout($$renderer, $$props) {
  let { children } = $$props;
  $$renderer.push(`<div class="site svelte-12qhfyh">`);
  Header($$renderer);
  $$renderer.push(`<!----> `);
  children($$renderer);
  $$renderer.push(`<!----> `);
  $$renderer.push(`<!----></div>`);
}
export {
  _layout as default
};
