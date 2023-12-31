// @ts-check

import React from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import figure from 'https://cdn.typable.dev/figure';

import CanvasComponent from './components/canvas.component.js';

import NodeElement from './elements/node.element.js';
import WireElement from "./elements/wire.element.js";
import SwitchElement from './elements/switch.element.js';
import ButtonElement from "./elements/button.element.js";
import ClockElement from "./elements/clock.element.js";
import LampElement from "./elements/lamp.element.js";
import SegmentDisplayElement from "./elements/segment-display.element.js";


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
    clock: ClockElement,
    lamp: LampElement,
    segmentdisplay: SegmentDisplayElement,
  },
});

export { html, global, React, ReactDOM };
