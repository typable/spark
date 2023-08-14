// @ts-check

/* ----- react ----- */

/**
 * @typedef {Object} ReactElement
 */

/**
 * @template V The value
 * @typedef {Object} ReactRef
 * @property {V} current The current value
 */

/**
 * @template S The state
 * @template A The action
 * @typedef {function(S, A): S} ReduceFunction
 */

/**
 * @template A The action
 * @typedef {function(A): void} DispatchFunction
 */

/**
 * @template S The state
 * @template A The action
 * @typedef {function(ReduceFunction<S, A>, S): [S, DispatchFunction<A>]} UseReducer
 */

/**
 * @template C The context
 * @typedef {function(any): C} UseContext
 */
