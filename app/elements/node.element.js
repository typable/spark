// @ts-check

import { React, global, html, uid } from '../deps.js';
import { useEffectOnce } from '../hooks.js';

const { useState, useEffect, useContext } = React;

export default function NodeElement(props) {
  const [id] = useState(() => uid());
  const { state, dispatch, wires, setWires, node, setNode } = useContext(global);

  useEffectOnce(() => {
    dispatch({ type: 'create', id });
  });

  useEffect(() => {
    dispatch({ type: 'update', id, active: props?.active ?? false });
  }, [props?.active]);

  function doWire() {
    if (!node) {
      setNode({ ...props, id });
      return;
    }
    if (node?.id === id) {
      setNode(null);
      return;
    }
    const start = node;
    const end = { ...props, id };
    if (start.parent) {
      start.x += start.parent.x;
      start.y += start.parent.y;
    }
    if (end.parent) {
      end.x += end.parent.x;
      end.y += end.parent.y;
    }
    setWires([
      ...wires,
      { start, end },
    ]);
    dispatch({ type: 'connect', id: id, target: node.id });
    dispatch({ type: 'connect', id: node.id, target: id });
    setNode(null);
  }

  function isActive() {
    if (props?.source) {
      return props?.active ?? false;
    }
    if (state.nodes[id] === undefined) {
      return false;
    }
    return Object.values(state.nodes[id].conns).some((active) => active);
  }

  return html`
    <circle
      cx=${props?.x ?? 0}
      cy=${props?.y ?? 0}
      r="4"
      fill=${isActive() ? 'black' : 'white'}
      stroke="black"
      stroke-width="1"
      on:click=${doWire}
    >
    </circle>
  `;
}
