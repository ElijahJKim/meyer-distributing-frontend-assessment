import { goto } from '$app/navigation';
export function parsePageParam(value, maxPages) {
    if (!value) {
        return 1;
    }
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return 1;
    }
    return Math.min(parsed, maxPages);
}
export function getUrlHref(url) {
    return `${url.pathname}${url.search}${url.hash}`;
}
export function setPageParam(url, nextPage) {
    if (nextPage <= 1) {
        url.searchParams.delete('page');
        return;
    }
    url.searchParams.set('page', String(nextPage));
}
export function buildUrlWithPage(baseUrl, nextPage) {
    const url = new URL(baseUrl);
    setPageParam(url, nextPage);
    return getUrlHref(url);
}
export async function syncPageToUrl(baseUrl, nextPage) {
    const nextHref = buildUrlWithPage(baseUrl, nextPage);
    if (nextHref === getUrlHref(baseUrl)) {
        return;
    }
    await goto(nextHref, { keepFocus: true, noScroll: true });
}
