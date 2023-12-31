// @ts-check

import { React, html } from '../deps.js';
import { useEffectOnce, useStateRef, useTheme } from '../hooks.js';

const { forwardRef, useState, useRef, useImperativeHandle } = React;

const SIZE = 20;

export default forwardRef(function CanvasComponent(props, ref) {
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [pointer, setPointer] = useState(null);
  const originRef = useStateRef(origin);
  const zoomRef = useStateRef(zoom);
  const viewRef = useRef(null);
  const theme = useTheme();

  useEffectOnce(() => {
    window.addEventListener('wheel', onScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', onScroll);
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
      const x = Math.round((event.clientX - bounds.x) / zoom - pointer.dx);
      const y = Math.round((event.clientY - bounds.y) / zoom - pointer.dy);
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
          const x = Math.round(originRef.current.x - dx);
          const y = Math.round(originRef.current.y - dy);
          setOrigin({ x, y });
          setZoom(zoomRef.current + 0.1);
        }
      }
      else {
        if (zoomRef.current > 1) {
          const bounds = viewRef.current.getBoundingClientRect();
          const dx = (event.clientX - bounds.x) / (zoomRef.current - 0.1) - (event.clientX - bounds.x) / zoomRef.current;
          const dy = (event.clientY - bounds.y) / (zoomRef.current - 0.1) - (event.clientY - bounds.y) / zoomRef.current;
          const x = Math.round(originRef.current.x + dx);
          const y = Math.round(originRef.current.y + dy);
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
    <style>

      svg.canvas {
        background-color: ${theme.background};
      }
    
    </style>
    <app-canvas
      $props=${props}
      on:pointerdown=${onPointerDown}
      on:pointerup=${onPointerUp}
      on:pointerleave=${onPointerLeave}
      on:pointermove=${onPointerMove}
    >
      <svg
        class="canvas"
      >
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
              fill="${theme.grid}"
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
              stroke="${theme.grid}"
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
