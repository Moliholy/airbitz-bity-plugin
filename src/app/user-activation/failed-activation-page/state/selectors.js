import { mountPoint } from './constants';

export function isMounted(state) {
  return state[mountPoint].mounted === true;
}

export function isResendEmailValidationStarted(state) {
  return state[mountPoint].resendEmailValidation.started === true;
}

export function isValidationEmailSent(state) {
  return state[mountPoint].validationEmailSent === true;
}
