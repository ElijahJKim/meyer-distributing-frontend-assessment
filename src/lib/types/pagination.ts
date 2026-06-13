export const PAGE_SIZE_OPTIONS = [8, 12, 16, 24] as const;

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];
