import http from '@/config/http'

function login(username, password, deviceId) {
  console.log('http', http);
  return http.request({
    method: 'post',
    url: 'consultant/session',
    data: {
      username, password, deviceId
    },
  })
}

/**
 * 楼盘详情
 * @param {id}
 * @returns {Promise}
 */
function getBuildingDetail(id) {
  console.log('http', http);
  return http.request({
    method: 'get',
    url: `consultant//building/${id}`
  })
}

export {
  login,
  getBuildingDetail
}

function generateGetUrl (url, obj = {}) {
  if (!isJson(obj)) return ''
  return `${url}?${Object.entries(obj).map(item => item.join('=')).join('&')}`
}

function isJson (obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
}
