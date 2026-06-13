import type { Attachment } from 'svelte/attachments';

/**
 * portal(): Attaches element to document body
 * clickOutside(onClose): Closes element when clicking outside it
 * anchorTo(anchorNode, width?, align?): Positions element below anchor node
 */

export function portal(): Attachment<Element> {
	return (element) => {
		document.body.appendChild(element as Node);

		return () => {
			if (element.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	};
}

export function clickOutside(onClose: () => void): Attachment {
	return (element) => {
		const handleClick = (event: MouseEvent) => {
			if (!element.contains(event.target as Node)) {
				onClose();
			}
		};

		const timeoutId = setTimeout(() => document.addEventListener('click', handleClick), 0);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener('click', handleClick);
		};
	};
}

type AnchorAlign = 'left' | 'right' | 'auto';

export function anchorTo(
	anchorNode: HTMLElement,
	width?: number,
	align: AnchorAlign = 'left'
): Attachment {
	return (dropdown) => {
		function updatePosition() {
			if (!anchorNode) {
				return;
			}

			const rect = anchorNode.getBoundingClientRect();
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			const dropdownEl = dropdown as HTMLElement;
			const dropdownWidth = width || dropdownEl.offsetWidth || 120;
			const dropdownHeight = dropdownEl.offsetHeight || 210;

			dropdownEl.style.position = 'absolute';
			dropdownEl.style.zIndex = '60';

			const spaceBelow = screenHeight - rect.bottom;

			if (spaceBelow < dropdownHeight + 8) {
				dropdownEl.style.top = `${rect.top + window.scrollY - dropdownHeight - 8}px`;
			} else {
				dropdownEl.style.top = `${rect.bottom + window.scrollY + 8}px`;
			}

			const shouldAlignRight =
				align === 'right' || (align === 'auto' && rect.left + rect.width / 2 > screenWidth / 2);

			if (shouldAlignRight) {
				dropdownEl.style.left = `${rect.right + window.scrollX - dropdownWidth}px`;
			} else {
				dropdownEl.style.left = `${rect.left + window.scrollX}px`;
			}

			if (width) {
				dropdownEl.style.width = `${dropdownWidth}px`;
			}
		}

		requestAnimationFrame(updatePosition);

		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition, true);

		return () => {
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition, true);
		};
	};
}
