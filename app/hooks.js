// @ts-check

/**
 * @typedef {function(Function): void} UseEffectOnce
 */

/**
 * @template T The data
 * @typedef {function(string, Object=): FetchState<T>} UseFetch
 */

/**
 * @template T The data
 * @typedef {Object} FetchState
 * @property {boolean} pending
 * @property {T} [data]
 * @property {string} [error]
 */

/**
 * @typedef {Object} FetchAction
 * @property {string} type The action type
 * @property {any} [payload] The action payload
 */

import { React } from './deps.js';

const { useEffect, useRef, useReducer } = React;

/**
 * Calls the given function once.
 *
 * @param {Function} fn The function
 */
export function useEffectOnce(fn) {
  useEffect(fn, []);
}

/**
 * Creates a reference which is updated on value change.
 *
 * @template V The value
 * @param {any} value The value
 * @returns {import('./types.js').ReactRef<V>} Returns the reference for a value
 */
export function useStateRef(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}

/**
 * Fetches JSON data from given url and indicates the state.
 *
 * @template T The data
 * @param {string} url The request url
 * @param {Object} [options] The fetch options
 * @returns {FetchState<T>} The useFetch hook
 */
export function useFetch(url, options) {
  const initial = /** @type {FetchState<T>} */ ({
    pending: false,
  });

  /** @type {import('./types.js').ReduceFunction<FetchState<T>, FetchAction>} */
  function doReduce(state, action) {
    switch (action.type) {
      case 'pending':
        return { ...initial, pending: true };
      case 'fetched':
        return { ...initial, pending: false, data: action.payload };
      case 'error':
        return { ...initial, pending: false, error: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = /** @type {import('./types.js').UseReducer<FetchState<T>, FetchAction>} */ (useReducer)(doReduce, initial);

  useEffect(() => {
    if (!url) {
      return;
    }
  
    /**
     * Performs the fetch.
     */
    async function doFetch() {
      dispatch({ type: 'pending' });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch({ type: 'fetched', payload: data });
      }
      catch (error) {
        dispatch({ type: 'error', payload: error });
      }
    }

    doFetch();
  }, [url]);

  return state;
}
