export declare function parsePageParam(value: string | null, maxPages: number): number;
export declare function getUrlHref(url: URL): string;
export declare function setPageParam(url: URL, nextPage: number): void;
export declare function buildUrlWithPage(baseUrl: URL, nextPage: number): string;
export declare function syncPageToUrl(baseUrl: URL, nextPage: number): Promise<void>;
