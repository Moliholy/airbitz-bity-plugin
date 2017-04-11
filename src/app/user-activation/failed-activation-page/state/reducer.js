import * as actions from './actions';

const initialState = {
  resendEmailValidation: {
    started: false,
    failed: false
  },
  mounted: false,
  validationEmailSent: false
};

export default function failedActivationPageReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.MOUNTED:
      return onMounted(state, action);
    case actions.UNMOUNTED:
      return onUnmounted(state, action);
    case actions.RESEND_EMAIL_VALIDATION_STARTED:
      return onResendEmailValidationStarted(state, action);
    case actions.RESEND_EMAIL_VALIDATION_FAILED:
      return onResendEmailValidationFailed(state, action);
    case actions.RESEND_EMAIL_VALIDATION_SUCCEED:
      return onResendEmailValidationSucceed(state, action);
    default:
      return state;
  }
}

function onMounted() {
  return {
    ...initialState,
    mounted: true
  };
}

function onUnmounted() {
  return { ...initialState };
}

function onResendEmailValidationStarted(state) {
  return {
    ...state,
    resendEmailValidation: {
      started: true,
      failed: false
    }
  };
}

function onResendEmailValidationFailed(state) {
  return {
    ...state,
    resendEmailValidation: {
      started: false,
      failed: true
    }
  };
}

function onResendEmailValidationSucceed(state) {
  return {
    ...state,
    resendEmailValidation: {
      started: false,
      failed: false
    },
    validationEmailSent: true
  };
}
