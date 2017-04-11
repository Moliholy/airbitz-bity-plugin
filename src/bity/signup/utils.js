// TODO DRY
export function parseErrorResponse(data) {
  // in some cases bity backend returns HTTP 500 with HTML
  if (!isObject(data)) {
    return {
      code: 500,
      message: ''
    };
  }

  return data.error || {};
}

// TODO DRY
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
