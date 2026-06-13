<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
</script>

<button class="sort-button" type="button" disabled aria-disabled="true">
	SORT
	<ChevronDown aria-hidden="true" />
</button>

<style lang="scss">
	.sort-button {
		@include flex-center;
		gap: 8px;
		height: 100%;
		padding: 0;
		border: 0;
		border-left: 1px solid $color-border;
		background-color: transparent;
		color: inherit;
		text-align: center;
		cursor: pointer;

		&:disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}
</style>
