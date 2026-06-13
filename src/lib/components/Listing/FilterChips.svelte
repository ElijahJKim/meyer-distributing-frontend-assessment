<script lang="ts">
	import { X } from '@lucide/svelte';
	import type { FilterChip, ProductFilters } from '$lib/types/filters';
	import {
		buildFilterChips,
		createEmptyProductFilters,
		removeFilterChip
	} from '$lib/utils/product-filters';

	interface Props {
		filters: ProductFilters;
	}

	let { filters = $bindable() }: Props = $props();

	const filterChips = $derived(buildFilterChips(filters));

	function removeChip(chip: FilterChip) {
		filters = removeFilterChip(filters, chip);
	}

	function clearAllFilters() {
		filters = createEmptyProductFilters();
	}
</script>

{#if filterChips.length > 0}
	<div class="filter-chips container">
		<ul class="filter-chip-list" aria-label="Active filters">
			{#each filterChips as chip (chip.category + chip.value)}
				<li>
					<button class="filter-chip" type="button" onclick={() => removeChip(chip)}>
						<span>{chip.label}</span>
						<X aria-hidden="true" />
						<span class="visually-hidden">Remove {chip.label} filter</span>
					</button>
				</li>
			{/each}
		</ul>
		<button class="filter-clear-all" type="button" onclick={clearAllFilters}>Clear all</button>
	</div>
{/if}

<style lang="scss">
	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		padding-block: 16px;
	}

	.filter-chip-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		list-style: none;
	}

	.filter-chip {
		@include flex-center;
		gap: 6px;
		min-height: 32px;
		padding: 6px 10px;
		border: 1px solid $color-border;
		border-radius: 999px;
		background-color: $color-bg-main;
		color: inherit;
		font-size: 14px;
		line-height: 1.2;
		cursor: pointer;

		&:hover {
			border-color: $color-primary;
		}

		:global(svg) {
			width: 14px;
			height: 14px;
		}
	}

	.filter-clear-all {
		padding: 0;
		border: 0;
		background: transparent;
		color: $color-primary;
		font-size: 14px;
		font-weight: 500;
		text-decoration: underline;
		cursor: pointer;

		&:hover {
			color: $color-primary-hover;
		}
	}

	.visually-hidden {
		position: absolute;
		overflow: hidden;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		border: 0;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}
</style>
