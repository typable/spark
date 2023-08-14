// @ts-check

import { React, html } from './deps.js';

const { useState, useRef } = React;

export default function AppComponent() {
  const context = {};

  const n1 = createNode(360, 360);
  const n2 = createNode(400, 440);

  const e1 = createElement('switch', 220, 220);
  const e2 = createElement('button', 220, 280);

  const w1 = createWire(n1, n2);
  
  const elements = [e1, e2];
  const wires = [w1];

  const [nodes, setNodes] = useState([n1, n2]);
  const canvasRef = useRef();

  function doCreate(event) {
    // if (event.target !== canvasRef.current) {
    //   return;
    // }
    // const bounds = event.target.getBoundingClientRect();
    // const x = event.clientX - bounds.left;
    // const y = event.clientY - bounds.top;
    // setNodes([
    //   ...nodes,
    //   createNode(x, y),
    // ]);
  }

  return html`
    <ctx:global value=${context}>
      <main>
        <app:canvas ref=${canvasRef} on:click=${doCreate}>
          ${wires.map((wire) => html`
            <element:wire $props=${wire}></element:wire>
          `)}
          ${elements.map((element) => {
            switch (element.type) {
              case 'switch':
                return html`
                  <element:switch $props=${element}></element:switch>
                `;
              case 'button':
                return html`
                  <element:button $props=${element}></element:button>
                `;
            }
          })}
          ${nodes.map((node) => html`
            <element:node $props=${node}></element:node>
          `)}
        </app:canvas>
      </main>
    </ctx:global>
  `;
}

function createNode(x, y) {
  return { x, y };
}

function createWire(start, end) {
  return { start, end };
}

function createElement(type, x, y) {
  return { type, x, y };
}
