// @ts-check

import { React, html } from '../deps.js';
import { useTheme } from '../hooks.js';

const { useState } = React;

export default function ButtonElement(props) {
  const [active, setActive] = useState(false);
  const theme = useTheme();
  
  return html`
    <g transform="translate(${props?.x ?? 0}, ${props?.y ?? 0})">
      <rect
        x="0"
        y="0"
        rx="1"
        width="40"
        height="40"
        fill="${theme.element.background}"
        stroke="${theme.element.border}"
        stroke-width="1"
        on:pointerdown=${() => setActive(true)}
        on:pointerup=${() => setActive(false)}
        on:pointerleave=${() => setActive(false)}
      >
      </rect>
      <circle
        cx="20"
        cy="20"
        r=${active ? 8 : 10}
        fill="${theme.element.action}"
        stroke="${theme.element.border}"
        stroke-width="1"
        style=${{ 'pointer-events': 'none' }}
      >
      </circle>
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
