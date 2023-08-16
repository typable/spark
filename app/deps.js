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
  },
});

// [1-9|A-Z] | 35
const len = 35;
const min = 49;
const max = 65;
const pos = 9;

function uid() {
  const uids = [];
  let attempts = 0;
  while (attempts < 50) {
    const uid = Array.from({ length: 4 }, function() {
      const rand = Math.floor(Math.random() * len);
      return String.fromCharCode(rand < pos ? min + rand : max + rand - pos);
    }).join('');
    attempts++;
    if (!uids.includes(uid)) {
      uids.push(uid);
      return uid;
    }
  }
  throw 'Took too many attempts to create uid!';
}

export { html, global, React, ReactDOM, uid };
