import * as failReasons from '../../fail-reasons';

export function activateUserErrorToFailReason(error) {
  if (isObject(error)) {
    switch (error.code) {
      // TODO get rid of knowledge about the server side details
      case 'invalid_token':
        return failReasons.TOKEN;
      default:
        return failReasons.ANOTHER;
    }
  }
  return failReasons.ANOTHER;
}

// TODO DRY
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
