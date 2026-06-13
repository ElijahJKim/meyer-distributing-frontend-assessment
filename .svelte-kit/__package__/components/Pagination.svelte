<script lang="ts">
	let {
		currentPage,
		totalPages,
		onPageChange
	}: {
		currentPage: number;
		totalPages: number;
		onPageChange?: (page: number) => void | Promise<void>;
	} = $props();

	function goToPage(page: number) {
		if (page < 1 || page > totalPages || page === currentPage) {
			return;
		}

		void onPageChange?.(page);
	}

	const pages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1));
</script>

{#if totalPages > 1}
	<nav class="pagination" aria-label="Pagination">
		<button
			class="pagination-button"
			type="button"
			disabled={currentPage === 1}
			aria-label="Go to previous page"
			onclick={() => goToPage(currentPage - 1)}
		>
			Previous
		</button>

		<ul class="pagination-list">
			{#each pages as page (page)}
				<li class="pagination-item">
					<button
						class="pagination-page"
						class:pagination-page-active={page === currentPage}
						type="button"
						aria-label="Go to page {page}"
						aria-current={page === currentPage ? 'page' : undefined}
						onclick={() => goToPage(page)}
					>
						{page}
					</button>
				</li>
			{/each}
		</ul>

		<button
			class="pagination-button"
			type="button"
			disabled={currentPage === totalPages}
			aria-label="Go to next page"
			onclick={() => goToPage(currentPage + 1)}
		>
			Next
		</button>
	</nav>
{/if}

<style>.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-bottom: 64px;
}

.pagination-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination-button,
.pagination-page {
  min-width: 40px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: transparent;
  color: inherit;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.pagination-button:hover:not(:disabled),
.pagination-page:hover:not(:disabled) {
  background-color: #e2e8f0;
}
.pagination-button:disabled,
.pagination-page:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-page-active {
  border-color: #1e3a8a;
  background-color: #1e3a8a;
  color: #fff;
}</style>
