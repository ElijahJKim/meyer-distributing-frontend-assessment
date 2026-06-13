export function formatProductPrice(price: string): string {
  return price.startsWith("$") ? price : `$${price}`;
}

export function formatProductDescription(description: string): string {
  return description.replace(/\s+/g, " ").trim();
}
