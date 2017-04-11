import { take, put, spawn, call, select } from 'redux-saga/effects';

import * as notificationActions from '../../../notifications/actions';

import * as actions from './actions';
import * as selectors from './selectors';

export default function failedActivationPageDaemonFactory(bity) {
  return function* runFailedActivationPageDaemon() {
    yield [
      yield spawn(listenResendEmailValidationIntents, bity)
    ];
  };
}

// ==========================
// resend email validation
// ==========================
function* listenResendEmailValidationIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { email } } = yield take(actions.RESEND_EMAIL_VALIDATION);

    yield put(actions.resendEmailValidationStarted());

    const res = yield call(sendResendEmailValidationRequest, bity, email);

    let isMounted;

    if (res.error) {
      yield put(notificationActions.notify({
        title: 'Error',
        msg: `Can't resend email validation\n${res.error.message}`
      }));

      isMounted = yield select(selectors.isMounted);
      if (isMounted) {
        yield put(actions.resendEmailValidationFailed());
      }
      continue; // eslint-disable-line no-continue
    }

    isMounted = yield select(selectors.isMounted);
    if (isMounted) {
      yield put(actions.resendEmailValidationSucceed());
    }
  }
}

function* sendResendEmailValidationRequest(bity, email) {
  try {
    const data = yield call(bity.signup.resendEmailValidation, email);
    return { data };
  } catch (error) {
    return { error };
  }
}
