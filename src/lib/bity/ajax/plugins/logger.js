export default function loggerPluginFactory() {
  return function loggerPlugin(ajax) {
    return function applyLoggerPlugin(cfg) {
      return ajax(cfg)
        .then((resp) => {
          console.log(`network:\n\t${JSON.stringify(resp)}`);
          return resp;
        })
        .catch((resp) => {
          console.log(`network:\n\t${JSON.stringify(resp)}`);
          return Promise.reject(resp);
        });
    };
  };
} 
