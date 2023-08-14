// @ts-check

import { React, html } from '../deps.js';

const { useState, useEffect } = React;

export default function NodeElement(props) {
  const [active, setActive] = useState(props?.active ?? false);

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
      on:click=${() => setActive(!active)}
    >
    </circle>
  `;
}
