// @ts-check

import { React, html } from './deps.js';

const { useState, useRef, useReducer, useMemo } = React;

export default function AppComponent() {
  const e1 = createElement('switch', 220, 220);
  const e2 = createElement('button', 220, 280);
  const e3 = createElement('clock', 220, 340);

  const [cursor, setCursor] = useState(null);
  
  const elements = [e1, e2, e3];
  const [wires, setWires] = useState([]);
  const [nodes, setNodes] = useState([]);
  const canvasRef = useRef(null);

  const [node, setNode] = useState(null);

  function reduce(state, action) {
    if (action.type === 'create') {
      if (!state.nodes[action.id]) {
        state.nodes[action.id] = { conns: {} };
      }
      return { ...state };
    }
    if (action.type === 'connect') {
      if (!Object.keys(state.nodes[action.id].conns).includes(action.target)) {
        state.nodes[action.id].conns[action.target] = false;
      }
      return { ...state };
    }
    if (action.type === 'update') {
      for (const conn of Object.keys(state.nodes[action.id].conns)) {
        state.nodes[conn].conns[action.id] = action.active;
      }
      return { ...state };
    }
    throw 'Unknown action for state was dispatched!';
  }

  const [state, dispatch] = useReducer(reduce, { nodes: {} });

  const context = {
    state,
    dispatch,
    cursor,
    setCursor,
    wires,
    setWires,
    node,
    setNode,
  };
  
  function doCreate(event) {
    if (event.target !== canvasRef.current.viewRef.current) {
      return;
    }
    const bounds = event.target.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / canvasRef.current.zoom - canvasRef.current.origin.x;
    const y = (event.clientY - bounds.top) / canvasRef.current.zoom - canvasRef.current.origin.y;
    setNodes([
      ...nodes,
      createNode(x, y),
    ]);
  }

  const wire = useMemo(() => {
    if (node && cursor) {
      const start = { ...node };
      const end = cursor;
      if (start.parent) {
        start.x += start.parent.x;
        start.y += start.parent.y;
      }
      return html`
        <path
          d="M ${start.x} ${start.y} L ${end.x} ${end.y}"
          fill="none"
          stroke="black"
          stroke-width="1"
          style=${{ 'pointer-events': 'none' }}
        >
        </path>
      `;
    }
    return '';
  }, [node, cursor]);

  return html`
    <ctx:global value=${context}>
      <main>
        <app:canvas ref=${canvasRef} on:click=${doCreate}>
          ${wires.map((wire) => html`
            <element:wire $props=${wire}></element:wire>
          `)}
          ${wire}
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
              case 'clock':
                return html`
                  <element:clock $props=${element}></element:clock>
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

function createElement(type, x, y) {
  return { type, x, y };
}
