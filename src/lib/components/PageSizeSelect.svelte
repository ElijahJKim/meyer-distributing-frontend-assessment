<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import { anchorTo, clickOutside, portal } from '$lib/actions/attachment';
	import { PAGE_SIZE_OPTIONS, type PageSize } from '$lib/types/pagination';

	interface Props {
		pageSize: PageSize;
	}

	let { pageSize = $bindable() }: Props = $props();

	let triggerEl = $state<HTMLButtonElement | null>(null);
	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	function selectPageSize(nextPageSize: PageSize) {
		pageSize = nextPageSize;
		closeMenu();
		triggerEl?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!menuOpen) {
			return;
		}

		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
			triggerEl?.focus();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="page-size-select">
	<span class="page-size-label" id="page-size-label">Show</span>
	<button
		bind:this={triggerEl}
		class="page-size-button"
		type="button"
		aria-haspopup="menu"
		aria-expanded={menuOpen}
		aria-controls="page-size-menu"
		aria-labelledby="page-size-label page-size-value"
		data-open={menuOpen}
		onclick={toggleMenu}
	>
		<span id="page-size-value">{pageSize}</span>
		<ChevronDown aria-hidden="true" />
	</button>
</div>

{#if menuOpen && triggerEl}
	<div
		id="page-size-menu"
		class="page-size-menu"
		role="menu"
		aria-label="Items per page"
		{@attach portal()}
		{@attach anchorTo(triggerEl, 120, 'left')}
		{@attach clickOutside(closeMenu)}
	>
		{#each PAGE_SIZE_OPTIONS as option (option)}
			<button
				class="page-size-menu-item"
				class:page-size-menu-item-selected={pageSize === option}
				type="button"
				role="menuitemradio"
				aria-checked={pageSize === option}
				onclick={() => selectPageSize(option)}
			>
				{option}
			</button>
		{/each}
	</div>
{/if}

<style lang="scss">
	.page-size-select {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.page-size-label {
		font-size: 14px;
		font-weight: 500;
	}

	.page-size-button {
		@include flex-center;
		gap: 6px;
		min-width: 72px;
		height: 40px;
		padding: 0 12px;
		border: 1px solid $color-border;
		border-radius: $border-radius-sm;
		background-color: transparent;
		color: inherit;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			background-color: $color-bg-main;
		}

		&:focus-visible {
			outline: 2px solid $color-primary;
			outline-offset: 1px;
		}

		:global(svg) {
			width: 16px;
			height: 16px;
			transition: transform 0.15s ease;
		}
	}

	.page-size-button[data-open='true'] :global(svg) {
		transform: rotate(180deg);
	}

	.page-size-menu {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px;
		border: 1px solid $color-border;
		border-radius: $border-radius-md;
		background-color: $color-card;
		box-shadow: 0 12px 28px rgb(15 23 42 / 12%);
	}

	.page-size-menu-item {
		width: 100%;
		min-height: 40px;
		padding: 10px 12px;
		border: 0;
		border-radius: $border-radius-sm;
		background-color: transparent;
		color: inherit;
		font-size: 14px;
		font-weight: 500;
		text-align: left;
		cursor: pointer;

		&:hover,
		&:focus-visible {
			background-color: $color-bg-main;
		}

		&:focus-visible {
			outline: 2px solid $color-primary;
			outline-offset: 1px;
		}
	}

	.page-size-menu-item-selected {
		background-color: $color-bg-main;
		color: $color-primary;
	}
</style>
