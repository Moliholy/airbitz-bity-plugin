import * as utils from './utils';

const URL = '/user_signup/activate_user/';

export default function activateUserByEmailFactory(ajax) {
  return (token) => {
    const ajaxCfg = {
      method: 'POST',
      url: URL,
      data: {
        token
      }
    };

    return ajax(ajaxCfg)
      .then(resp => resp.data)
      .catch(resp => Promise.reject(utils.parseErrorResponse(resp.data)));
  };
}
