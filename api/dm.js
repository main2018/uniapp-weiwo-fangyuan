import http from '@/config/http'
import {generateGetUrl} from './index'

/**
 * 推送 / 转发传单获取红包
 * @params {mu: 推送人员用户Id, dmid, id_push_log, openid}
 * @returns {Promise}
 */
function agencyRed(mu, dmid, id_push_log, openid) {
  if (!mu || !dmid || !id_push_log || !openid) return Promise.reject()
  
  return http.request({
    method: 'post',
    url: `site/agency_red_dm`,
    data: {
      mu,
      dmid,
      id_push_log,
      openid,
    }
  })
}
3
export {
  agencyRed
}
