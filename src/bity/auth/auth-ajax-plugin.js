export default function authAjaxPluginFactory(opts) {
  const { getAccessToken, hasAccessToken, onUnauthResponse } = opts;

  return function authAjaxPlugin(ajax) {
    return function (cfg) {
      const { headers = {} } = cfg;

      if (hasAccessToken()) {
        headers.Authorization = `Bearer ${getAccessToken()}`;
      }

      const nextCfg = {
        ...cfg,
        headers
      };

      return ajax(nextCfg)
        .catch((resp) => {
          const { status, data = {} } = resp;
          const { error: responseErrorField } = data;

          // TODO this needs more fine grained processing
          // see https://github.com/oauthjs/angular-oauth2/blob/master/src/interceptors/oauth-interceptor.js
          switch (status) {
            case 400:
              if (responseErrorField === 'invalid_request' || responseErrorField === 'invalid_grant') {
                onUnauthResponse();
                console.log(`authAjaxPlugin::on unauth response:\n\t${JSON.stringify(resp)}`);
              }
              break;
            case 401:
              onUnauthResponse();
              console.log(`authAjaxPlugin::on unauth response:\n\t${JSON.stringify(resp)}`);
              break;
          }

          return Promise.reject(resp);
        });
    };
  };
}
