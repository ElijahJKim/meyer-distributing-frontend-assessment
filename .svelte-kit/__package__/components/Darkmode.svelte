<label class="switch">
  <span class="switch__track">
    <input class="switch__input" type="checkbox" role="switch" />
    <span class="switch__icon" aria-hidden="true">
      <span class="switch__icon-part switch__icon-part--1"></span>
      <span class="switch__icon-part switch__icon-part--2"></span>
      <span class="switch__icon-part switch__icon-part--3"></span>
      <span class="switch__icon-part switch__icon-part--4"></span>
      <span class="switch__icon-part switch__icon-part--5"></span>
      <span class="switch__icon-part switch__icon-part--6"></span>
      <span class="switch__icon-part switch__icon-part--7"></span>
      <span class="switch__icon-part switch__icon-part--8"></span>
      <span class="switch__icon-part switch__icon-part--9"></span>
      <span class="switch__icon-part switch__icon-part--10"></span>
      <span class="switch__icon-part switch__icon-part--11"></span>
    </span>
  </span>
  <span class="switch__sr">Dark Mode</span>
</label>

<style>
  /* stylelint-disable selector-class-pattern -- BEM naming from original switch */
  .switch {
    --hue: 223;
    --trans-dur: 0.4s;
    --trans-timing: cubic-bezier(0.65, 0, 0.35, 1);
    --thumb: 1.25em;
    --pad: 0.125em;
    display: inline-block;
    font-size: 1rem;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
  }

  .switch__track {
    position: relative;
    display: block;
    width: 3em;
    height: 1.5em;
    font-size: inherit;
  }

  .switch__input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0.75em;
    background-color: hsl(var(--hue) 10% 10%);
    color: inherit;
    font: inherit;
    cursor: pointer;
    transition: background-color var(--trans-dur) var(--trans-timing);
    appearance: none;
    appearance: none;
  }

  .switch__input::before {
    position: absolute;
    top: var(--pad);
    left: var(--pad);
    width: var(--thumb);
    height: var(--thumb);
    border-radius: 50%;
    background-color: hsl(var(--hue) 10% 10%);
    content: "";
    transition:
      background-color var(--trans-dur) var(--trans-timing),
      left var(--trans-dur) var(--trans-timing);
  }

  .switch__icon,
  .switch__icon-part {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }

  .switch__icon {
    top: var(--pad);
    left: var(--pad);
    overflow: hidden;
    width: var(--thumb);
    height: var(--thumb);
    border-radius: 50%;
    background-color: hsl(var(--hue) 10% 90%);
    pointer-events: none;
    transition: left var(--trans-dur) var(--trans-timing);
  }

  .switch__icon-part {
    transition:
      box-shadow var(--trans-dur) var(--trans-timing),
      transform var(--trans-dur) var(--trans-timing);
  }

  .switch__icon-part--1,
  .switch__icon-part--2,
  .switch__icon-part--3 {
    border-radius: 50%;
  }

  .switch__icon-part--1 {
    top: calc(50% - 0.375em);
    left: calc(50% - 0.375em);
    width: 0.75em;
    height: 0.75em;
    background-color: hsl(var(--hue) 10% 90%);
  }

  .switch__icon-part--2 {
    top: calc(50% - 0.4375em);
    left: calc(50% - 0.0625em);
    transform: translate(-0.1875em, 0.1875em) scale(0.2);
    width: 0.5em;
    height: 0.5em;
    background-color: hsl(var(--hue) 10% 10%);
  }

  .switch__icon-part--3 {
    transform: scale(0.25);
    width: 1.25em;
    height: 1.25em;
    box-shadow: 0 0 0 0.625em hsl(var(--hue) 10% 10%) inset;
  }

  .switch__icon-part--3 ~ .switch__icon-part {
    top: 50%;
    left: 50%;
    transform-origin: 50% 0;
    width: 0.125em;
    height: 0.1875em;
    border-radius: 0.0625em;
    background-color: hsl(var(--hue) 10% 10%);
  }

  .switch__icon-part--4 {
    transform: translateX(-50%) rotate(0deg) translateY(0.25em);
  }

  .switch__icon-part--5 {
    transform: translateX(-50%) rotate(45deg) translateY(0.25em);
  }

  .switch__icon-part--6 {
    transform: translateX(-50%) rotate(90deg) translateY(0.25em);
  }

  .switch__icon-part--7 {
    transform: translateX(-50%) rotate(135deg) translateY(0.25em);
  }

  .switch__icon-part--8 {
    transform: translateX(-50%) rotate(180deg) translateY(0.25em);
  }

  .switch__icon-part--9 {
    transform: translateX(-50%) rotate(225deg) translateY(0.25em);
  }

  .switch__icon-part--10 {
    transform: translateX(-50%) rotate(270deg) translateY(0.25em);
  }

  .switch__icon-part--11 {
    transform: translateX(-50%) rotate(315deg) translateY(0.25em);
  }

  .switch__sr {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .switch__input:checked {
    background-color: hsl(var(--hue) 10% 90%);
  }

  .switch__input:checked::before,
  .switch__input:checked ~ .switch__icon {
    left: calc(100% - var(--thumb) - var(--pad));
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--2 {
    transform: translate(0, 0) scale(1);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--3 {
    transform: scale(1);
    box-shadow: 0 0 0 0.25em hsl(var(--hue) 10% 10%) inset;
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--4 {
    transform: translateX(-50%) rotate(0deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--5 {
    transform: translateX(-50%) rotate(45deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--6 {
    transform: translateX(-50%) rotate(90deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--7 {
    transform: translateX(-50%) rotate(135deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--8 {
    transform: translateX(-50%) rotate(180deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--9 {
    transform: translateX(-50%) rotate(225deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--10 {
    transform: translateX(-50%) rotate(270deg) translateY(0.625em) scale(0);
  }

  .switch__input:checked ~ .switch__icon .switch__icon-part--11 {
    transform: translateX(-50%) rotate(315deg) translateY(0.625em) scale(0);
  }
</style>
