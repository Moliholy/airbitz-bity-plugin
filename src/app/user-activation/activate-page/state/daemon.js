import { take, put, spawn, call, select } from 'redux-saga/effects';

import * as notificationActions from '../../../notifications/actions';

import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';

export default function activateUserPageDaemonFactory(bity) {
  return function* runActivateUserPageDaemon() {
    yield [
      yield spawn(listenActivateUserIntents, bity)
    ];
  };
}

// ==========================
// activate user
// ==========================
function* listenActivateUserIntents(bity) {
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: { token, router } } = yield take(actions.MOUNTED);

    let isMounted;

    const res = yield call(sendActivateUserByEmailRequest, bity, token);
    if (res.error) {
      const failReason = utils.activateUserErrorToFailReason(res.error);

      isMounted = yield select(selectors.isMounted);
      if (isMounted) {
        router.replace({
          pathname: 'activate/error',
          state: {
            failReason
          }
        });
        continue; // eslint-disable-line no-continue
      }
    }

    isMounted = yield select(selectors.isMounted);
    if (isMounted) {
      yield put(notificationActions.notify({
        title: 'Success',
        msg: 'Your account is activated'
      }));
      router.replace('/');
    }
  }
}

function* sendActivateUserByEmailRequest(bity, token) {
  try {
    const data = yield call(bity.signup.activateUserByEmail, token);
    return { data };
  } catch (error) {
    return { error };
  }
}
