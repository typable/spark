// @ts-check

import { React, global, html } from '../deps.js';

const { useState, useEffect, useContext } = React;

export default function NodeElement(props) {
  const { wires, setWires, node, setNode } = useContext(global);
  const [active, setActive] = useState(props?.active ?? false);

  function doWire() {
    if (!node) {
      setNode(props);
      return;
    }
    const start = node;
    const end = props;
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
    ])
    setNode(null);
  }

  useEffect(() => {
    setActive(props?.active ?? false);
  }, [props?.active]);

  return html`
    <circle
      cx=${props?.x ?? 0}
      cy=${props?.y ?? 0}
      r="4"
      fill=${active ? 'black' : 'white'}
      stroke="black"
      stroke-width="1"
      on:click=${doWire}
    >
    </circle>
  `;
}
