// @ts-check

import { React, html } from '../deps.js';

const { useState } = React;

export default function SegmentDisplayElement(props) {
  const [active, setActive] = useState(false);
  
  return html`
    <g transform="translate(${props?.x ?? 0}, ${props?.y ?? 0})">
      <rect
        x="0"
        y="0"
        rx="1"
        width="60"
        height="80"
        fill="#CCC"
        stroke="black"
        stroke-width="1"
        on:click=${() => setActive(!active)}

      >
      </rect>
      <g transform="translate(8, 8)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(16, 8) rotate(90)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(44, 8) rotate(90)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(8, 36)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(16, 36) rotate(90)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(44, 36) rotate(90)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(8, 64)">
        <path
          d="M 4 4 L 8 0 L 28 0 L 32 4 L 28 8 L 8 8 z"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </path>
      </g>
      <g transform="translate(46, 64)">
        <circle
          cx="4"
          cy="4"
          r="4"
          fill="#AAA"
          stroke="black"
          stroke-width="1"
        >
        </circle>
      </g>
      <element:node
        x="${7.5}"
        y="${0}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${22.5}"
        y="${0}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${37.5}"
        y="${0}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${52.5}"
        y="${0}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${7.5}"
        y="${80}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${22.5}"
        y="${80}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${37.5}"
        y="${80}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
      <element:node
        x="${52.5}"
        y="${80}"
        parent=${props}
        source="${true}"
        active=${active}
      >
      </element:node>
    </g>
  `;
}