<script lang="ts">
  import type { FilterSectionOption } from "$lib/types/filters";

  interface Props {
    title: string;
    titleId: string;
    options: FilterSectionOption[];
    onToggle: (value: string) => void;
    scrollable?: boolean;
  }

  let {
    title,
    titleId,
    options,
    onToggle,
    scrollable = false,
  }: Props = $props();
</script>

<section class="filter-section" aria-labelledby={titleId}>
  <h3 id={titleId} class="filter-section-title">{title}</h3>
  <ul
    class="filter-option-list"
    class:filter-option-list-scrollable={scrollable}
  >
    {#each options as option (option.value)}
      <li>
        <label
          class="filter-option"
          class:filter-option-color={option.leadingHex !== undefined}
        >
          <input
            type="checkbox"
            checked={option.checked}
            onchange={() => onToggle(option.value)}
          />
          {#if option.leadingHex !== undefined}
            <span
              class="filter-color-swatch"
              style={`background-color: ${option.leadingHex}`}
              aria-hidden="true"
            ></span>
          {/if}
          <span>{option.label}</span>
        </label>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  .filter-section {
    padding-block: 16px;
    border-bottom: 1px solid $color-border;

    &:last-child {
      border-bottom: 0;
    }
  }

  .filter-section-title {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .filter-option-list {
    display: grid;
    gap: 8px;
    list-style: none;
  }

  .filter-option-list-scrollable {
    overflow-y: auto;
    max-height: 240px;
    padding-right: 4px;
  }

  .filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 32px;
    font-size: 15px;
    line-height: 1.4;
    cursor: pointer;

    input {
      width: 16px;
      height: 16px;
      margin: 0;
      accent-color: $color-primary;
      cursor: pointer;
    }
  }

  .filter-option-color {
    align-items: flex-start;
  }

  .filter-color-swatch {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-top: 2px;
    border: 1px solid $color-border;
    border-radius: 50%;
  }
</style>
