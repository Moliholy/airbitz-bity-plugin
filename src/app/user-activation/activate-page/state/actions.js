import { prefix } from './constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted(token, router) {
  return {
    type: MOUNTED,
    payload: { token, router }
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}
