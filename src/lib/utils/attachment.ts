import type { Attachment } from "svelte/attachments";

export function clickOutside(onClose: () => void): Attachment {
  return (element) => {
    const handleClick = (event: MouseEvent) => {
      if (!element.contains(event.target as Node)) {
        onClose();
      }
    };

    // Delaying the listener registration with setTimeout prevents it from catching the initial trigger click
    const timeoutId = setTimeout(
      () => document.addEventListener("click", handleClick),
      0,
    );

    // Cleanup the event listener when the element is unmounted
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  };
}
