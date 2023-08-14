// @ts-check

import { React, html } from '../deps.js';

const { useState } = React;

export default function ButtonElement(props) {
  const [active, setActive] = useState(false);
  
  return html`
    <g transform="translate(${props?.x ?? 0}, ${props?.y ?? 0})">
      <rect
        x="0"
        y="0"
        rx="1"
        width="40"
        height="40"
        fill="#CCC"
        stroke="black"
        stroke-width="1"
        on:mousedown=${() => setActive(true)}
        on:mouseup=${() => setActive(false)}
      >
      </rect>
      <circle
        cx="20"
        cy="20"
        r=${active ? 8 : 10}
        fill="#AAA"
        stroke="black"
        stroke-width="1"
        style=${{ 'pointer-events': 'none' }}
      >
      </circle>
      <element:node
        x="40"
        y="20"
        active=${active}
      >
      </element:node>
    </g>
  `;
}
