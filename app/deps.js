// @ts-check

import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import figure from 'https://cdn.typable.dev/figure';

import CanvasComponent from './components/canvas.component.js';

import NodeElement from './elements/node.element.js';
import WireElement from "./elements/wire.element.js";
import SwitchElement from './elements/switch.element.js';
import ButtonElement from "./elements/button.element.js";

const { dict } = figure(React.createElement);

const global = React.createContext({});

const html = dict({
  ctx: {
    global: global.Provider,
  },
  app: {
    canvas: CanvasComponent,
  },
  element: {
    node: NodeElement,
    wire: WireElement,
    switch: SwitchElement,
    button: ButtonElement,
  },
});

export { html, global, React, ReactDOM };
