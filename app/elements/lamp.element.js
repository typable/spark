// @ts-check

import { React, html } from '../deps.js';

const { useState } = React;

export default function LampElement(props) {
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
        on:click=${() => setActive(!active)}

      >
      </rect>
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="${active ? '#eeee22' : '#AAA'}"
        stroke="black"
        stroke-width="1"
        style=${{ 'pointer-events': 'none' }}
      >
      </circle>
      <path
        d="M 10 10 L 30 30 M 30 10 L 10 30"
        fill="none"
        stroke="black"
        stroke-width="1"
      >
      </path>
      <element:node
        x="40"
        y="20"
        active=${active}
      >
      </element:node>
    </g>
  `;
}
