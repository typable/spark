// @ts-check

import { React, html } from '../deps.js';
import { useStateRef } from '../hooks.js';

const { useState, useEffect } = React;

export default function ClockElement(props) {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const activeRef = useStateRef(active);

  useEffect(() => {
    let interval = null;
    if (enabled) {
      interval = setInterval(() => {
        setActive(!activeRef.current);
      }, 500);
    }
    else if (active) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [enabled]);
  
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
        on:click=${() => setEnabled(!enabled)}
      >
      </rect>
      <rect
        x="${enabled ? 12 : 10}"
        y="${enabled ? 12 : 10}"
        width=${enabled ? 16 : 20}
        height=${enabled ? 16 : 20}
        fill="#AAA"
        stroke="black"
        stroke-width="1"
        style=${{ 'pointer-events': 'none' }}
      >
      </rect>
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
