type $$ComponentProps = {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void | Promise<void>;
};
declare const Pagination: import("svelte").Component<$$ComponentProps, {}, "">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
