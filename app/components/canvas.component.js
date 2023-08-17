// @ts-check

import { React, html } from '../deps.js';
import { useEffectOnce, useStateRef } from '../hooks.js';

const { forwardRef, useState, useRef, useImperativeHandle } = React;

const SIZE = 20;

export default forwardRef(function CanvasComponent(props, ref) {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState(null);
  const originRef = useStateRef(origin);
  const zoomRef = useStateRef(zoom);
  const canvasRef = useRef(null);
  const viewRef = useRef(null);

  useEffectOnce(() => {
    canvasRef.current.addEventListener('wheel', onScroll, { passive: false });
    return () => {
      canvasRef.current.removeEventListener('wheel', onScroll);
    };
  });

  function onPointerDown(event) {
    if (event.button === 1) {
      const dx = event.clientX / zoom - origin.x;
      const dy = event.clientY / zoom - origin.y;
      setPointer({ dx, dy });
    }
  }

  function onPointerUp(event) {
    if (event.button === 1) {
      setPointer(null);
    }
  }

  function onPointerLeave() {
    setPointer(null);
  }

  function onPointerMove(event) {
    if (pointer) {
      const bounds = viewRef.current.getBoundingClientRect();
      const x = (event.clientX - bounds.x) / zoom - pointer.dx;
      const y = (event.clientY - bounds.y) / zoom - pointer.dy;
      setOrigin({ x, y });
    }
  }

  function onScroll(event) {
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        if (zoomRef.current < 2.5) {
          const bounds = viewRef.current.getBoundingClientRect();
          const dx = (event.clientX - bounds.x) / zoomRef.current - (event.clientX - bounds.x) / (zoomRef.current + 0.1);
          const dy = (event.clientY - bounds.y) / zoomRef.current - (event.clientY - bounds.y) / (zoomRef.current + 0.1);
          const x = originRef.current.x - dx;
          const y = originRef.current.y - dy;
          setOrigin({ x, y });
          setZoom(zoomRef.current + 0.1);
        }
      }
      else {
        if (zoomRef.current > 1) {
          const bounds = viewRef.current.getBoundingClientRect();
          const dx = (event.clientX - bounds.x) / (zoomRef.current - 0.1) - (event.clientX - bounds.x) / zoomRef.current;
          const dy = (event.clientY - bounds.y) / (zoomRef.current - 0.1) - (event.clientY - bounds.y) / zoomRef.current;
          const x = originRef.current.x + dx;
          const y = originRef.current.y + dy;
          setOrigin({ x, y });
          setZoom(zoomRef.current - 0.1);
        }
      }
    }
  }

  useImperativeHandle(ref, () => {
    return {
      origin,
      zoom,
      viewRef,
    };
  }, [viewRef, origin, zoom]);

  return html`
    <app-canvas
      $props=${props}
      ref=${canvasRef}
      on:pointerdown=${onPointerDown}
      on:pointerup=${onPointerUp}
      on:pointerleave=${onPointerLeave}
      on:pointermove=${onPointerMove}
    >
      <svg>
        <g transform="scale(${zoom})">
          <pattern
            id="pattern-circles"
            x="${SIZE / 2 + origin.x}"
            y="${SIZE / 2 + origin.y}"
            width="${SIZE}"
            height="${SIZE}"
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
          >
            <circle
              cx="${SIZE / 2}"
              cy="${SIZE / 2}"
              r="1"
              fill="#DDD"
            >
            </circle>
          </pattern>
          <rect
            ref=${viewRef}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#pattern-circles)"
          >
          </rect>
          <g transform="translate(${origin.x}, ${origin.y})">
            <path
              d="M -20 0 L 20 0 M 0 -20 L 0 20 M -6 0 a 6 6 0 1 1 0 1"
              stroke="#888"
              stroke-width="1"
              fill="none"
            >
            </path>
            ${props?.children}
          </g>
        </g>
      </svg>
    </app-canvas>
  `;
})
