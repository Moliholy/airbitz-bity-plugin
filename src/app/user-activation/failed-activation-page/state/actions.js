import { prefix } from './constants';

export const MOUNTED = `${prefix}::MOUNTED`;
export function mounted() {
  return {
    type: MOUNTED
  };
}

export const UNMOUNTED = `${prefix}::UNMOUNTED`;
export function unmounted() {
  return {
    type: UNMOUNTED
  };
}

export const RESEND_EMAIL_VALIDATION = `${prefix}::RESEND_EMAIL_VALIDATION`;
export function resendEmailValidation(email) {
  return {
    type: RESEND_EMAIL_VALIDATION,
    payload: { email }
  };
}

export const RESEND_EMAIL_VALIDATION_STARTED = `${prefix}::RESEND_EMAIL_VALIDATION_STARTED`;
export function resendEmailValidationStarted() {
  return {
    type: RESEND_EMAIL_VALIDATION_STARTED
  };
}

export const RESEND_EMAIL_VALIDATION_FAILED = `${prefix}::RESEND_EMAIL_VALIDATION_FAILED`;
export function resendEmailValidationFailed() {
  return {
    type: RESEND_EMAIL_VALIDATION_FAILED
  };
}

export const RESEND_EMAIL_VALIDATION_SUCCEED = `${prefix}::RESEND_EMAIL_VALIDATION_SUCCEED`;
export function resendEmailValidationSucceed() {
  return {
    type: RESEND_EMAIL_VALIDATION_SUCCEED
  };
}
