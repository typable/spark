// @ts-check

import { html } from '../deps.js';

export default function WireElement(props) {

  function evalPath() {
    const { start, end } = props ?? {};
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  
  return html`
    <path
      d=${evalPath()}
      fill="none"
      stroke="black"
      stroke-width="1"
    >
    </path>
  `;
}
