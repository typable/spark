// @ts-check

import { React, html } from '../deps.js';

const { useEffect } = React;

export default function WireElement(props) {

  useEffect(() => {
    console.log(props.start, props.end);
  }, [props.start, props.end]);

  function evalPath() {
    const { start, end } = props ?? {};
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  
  return html`
    <path
      d=${evalPath()}
      fill="none"
      stroke="black"
      stroke-width="1"
    >
    </path>
  `;
}
