import { p as private_env } from "../../chunks/shared-server.js";
function getProductsUrl() {
  const url = private_env.PRODUCTS_URL;
  if (!url) {
    throw new Error("PRODUCTS_URL is not set");
  }
  return url;
}
async function getProducts() {
  const response = await fetch(getProductsUrl());
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Products response is not an array");
  }
  return data;
}
const load = async () => {
  try {
    const products = await getProducts();
    return {
      products,
      error: null
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load products";
    return {
      products: [],
      error: message
    };
  }
};
export {
  load
};
