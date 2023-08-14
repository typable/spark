// @ts-check

import { React, html } from '../deps.js';

const { forwardRef, useState } = React;

const SIZE = 20;

export default forwardRef(function CanvasComponent(props, ref) {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState(null);

  function onPointerDown(event) {
    if (event.button === 1) {
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      setPointer({ dx, dy });
    }
  }

  function onPointerUp(event) {
    if (event.button === 1) {
      setPointer(null);
    }
  }

  function onPointerLeave() {
    setPointer(null);
  }

  function onPointerMove(event) {
    if (pointer) {
      const bounds = ref.current.getBoundingClientRect();
      const x = event.clientX - bounds.x - pointer.dx;
      const y = event.clientY - bounds.y - pointer.dy;
      setOrigin({ x, y });
    }
  }

  return html`
    <app-canvas
      $props=${props}
      on:pointerdown=${onPointerDown}
      on:pointerup=${onPointerUp}
      on:pointerleave=${onPointerLeave}
      on:pointermove=${onPointerMove}
    >
      <svg>
        <g transform="scale(${zoom})">
          <pattern
            id="pattern-circles"
            x="${SIZE * zoom / 2 + origin.x}"
            y="${SIZE * zoom / 2 + origin.y}"
            width="${SIZE * zoom}"
            height="${SIZE * zoom}"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="${SIZE * zoom / 2}"
              cy="${SIZE * zoom / 2}"
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
          <g transform="translate(${origin.x}, ${origin.y})">
            <path
              d="M -20 0 L 20 0 M 0 -20 L 0 20 M -6 0 a 6 6 0 1 1 0 1"
              stroke="#888"
              stroke-width="1"
              fill="none"
            >
            </path>
            ${props?.children}
          </g>
        </g>
      </svg>
    </app-canvas>
  `;
})
