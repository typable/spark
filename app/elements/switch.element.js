// @ts-check

import { React, html } from '../deps.js';

const { useState } = React;

export default function SwitchElement(props) {
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
      <path
        d=${active ? 'M 10 10 L 30 10 L 28 30 L 12 30 Z' : 'M 12 10 L 28 10 L 30 30 L 10 30 Z'}
        fill="#AAA"
        stroke="black"
        stroke-width="1"
        style=${{ 'pointer-events': 'none' }}
      >
      </path>
      <element:node
        x="${40}"
        y="${20}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
    </g>
  `;
}
