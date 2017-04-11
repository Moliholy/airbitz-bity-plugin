import * as utils from './utils';

const URL = '/user_signup/resend_activation/';

export default function resendEmailValidationFactory(ajax) {
  return (email) => {
    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: {
        email
      }
    };

    return ajax(ajaxCfg)
      .then(resp => resp.data)
      .catch(resp => Promise.reject(utils.parseErrorResponse(resp.data)));
  };
}
