// @ts-check

import { React, html } from '../deps.js';

const { forwardRef, useState } = React;

export default forwardRef(function CanvasComponent(props, ref) {
  const [active, setActive] = useState(false);

  return html`
    <app-canvas
      $props=${props}
      on:click=${() => setActive(!active)}
    >
      <svg>
        <pattern
          id="pattern-circles"
          x="10"
          y="10"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            cx="10"
            cy="10"
            r="1"
            fill="#DDD"
          >
          </circle>
        </pattern>
        <pattern
          id="pattern-rects"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <rect
            x="0"
            y="0"
            width="20"
            height="20"
            fill="none"
            stroke="#DDD"
            stroke-width="2"
          >
          </rect>
        </pattern>
        <rect
          ref=${ref}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-${active ? 'circles' : 'rects' })"
        >
        </rect>
        ${props?.children}
      </svg>
    </app-canvas>
  `;
})
