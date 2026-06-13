import { getProducts } from "$lib/server/products";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    products: getProducts(),
  };
};
