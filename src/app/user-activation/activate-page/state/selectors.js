import { mountPoint } from './constants';

export function isMounted(state) {
  return state[mountPoint].mounted === true;
}
