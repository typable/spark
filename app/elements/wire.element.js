// @ts-check

import { html } from '../deps.js';
import { useTheme } from '../hooks.js';

export default function WireElement(props) {
  const theme = useTheme();

  function evalPath() {
    const { start, end } = props ?? {};
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  
  return html`
    <path
      d=${evalPath()}
      fill="none"
      stroke="${theme.wire}"
      stroke-width="1"
    >
    </path>
  `;
}
