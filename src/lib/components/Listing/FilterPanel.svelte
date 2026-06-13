<script lang="ts">
	import { X } from '@lucide/svelte';
	import FilterSection from './FilterSection.svelte';
	import type { FilterCategory, FilterOptions, ProductFilters } from '$lib/types/filters';
	import { clickOutside } from '$lib/actions/attachment';
	import { buildFilterPanelSections, toggleProductFilter } from '$lib/utils/product-filters';

	interface Props {
		open: boolean;
		activeFilterCount: number;
		filterOptions: FilterOptions;
		filters: ProductFilters;
		onClose: () => void;
	}

	let {
		open,
		activeFilterCount,
		filterOptions,
		filters = $bindable(),
		onClose
	}: Props = $props();

	let panelEl = $state<HTMLElement | null>(null);
	let closeButtonEl = $state<HTMLButtonElement | null>(null);
	let previouslyFocusedEl = $state<HTMLElement | null>(null);

	const filterSections = $derived(buildFilterPanelSections(filterOptions, filters));

	function toggleFilter(category: FilterCategory, value: string) {
		filters = toggleProductFilter(filters, category, value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open) {
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			onClose();
		}

		if (event.key !== 'Tab' || !panelEl) {
			return;
		}

		const focusable = panelEl.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		if (focusable.length === 0) {
			return;
		}

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
			return;
		}

		if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!open) {
			previouslyFocusedEl?.focus();
			return;
		}

		previouslyFocusedEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		closeButtonEl?.focus();
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div class="filter-panel-backdrop" aria-hidden="true"></div>

	<div
		id="filter-panel"
		class="filter-panel"
		bind:this={panelEl}
		role="dialog"
		aria-modal="true"
		aria-labelledby="filter-panel-title"
		{@attach clickOutside(onClose)}
	>
		<header class="filter-panel-header">
			<h2 id="filter-panel-title" class="filter-panel-title">Filters ({activeFilterCount})</h2>
			<button
				bind:this={closeButtonEl}
				class="filter-panel-close"
				type="button"
				aria-label="Close filters"
				onclick={onClose}
			>
				<X aria-hidden="true" />
			</button>
		</header>

		<div class="filter-panel-body">
			{#each filterSections as section (section.titleId)}
				<FilterSection
					title={section.title}
					titleId={section.titleId}
					options={section.options}
					onToggle={(value) => toggleFilter(section.category, value)}
					scrollable={section.scrollable}
				/>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.filter-panel-backdrop {
		position: fixed;
		inset: 0;
		z-index: 40;
		background-color: rgb(15 23 42 / 45%);
	}

	.filter-panel {
		position: fixed;
		inset-block: 0;
		inset-inline-start: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		width: min(100%, 360px);
		background-color: $color-card;
		box-shadow: 8px 0 24px rgb(15 23 42 / 12%);
	}

	.filter-panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 20px 20px 16px;
		border-bottom: 1px solid $color-border;
	}

	.filter-panel-title {
		font-size: 18px;
		font-weight: 600;
		line-height: 1.2;
	}

	.filter-panel-close {
		@include flex-center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 0;
		border-radius: $border-radius-md;
		background-color: transparent;
		color: inherit;
		cursor: pointer;

		&:hover {
			background-color: $color-bg-main;
		}

		:global(svg) {
			width: 20px;
			height: 20px;
		}
	}

	.filter-panel-body {
		flex: 1;
		overflow-y: auto;
		padding: 8px 20px 24px;
	}
</style>
