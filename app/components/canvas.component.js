// @ts-check

import { React, html } from '../deps.js';

const { forwardRef } = React;

export default forwardRef(function CanvasComponent(props, ref) {
  return html`
    <app-canvas $props=${props}>
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
        <rect
          ref=${ref}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-circles)"
        >
        </rect>
        ${props?.children}
      </svg>
    </app-canvas>
  `;
})
