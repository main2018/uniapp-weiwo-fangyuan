
import http from '@/config/http'
import {generateGetUrl} from './index'

// 置业顾问名片
function bussinessCard(mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/agency_bussiness_card`, {mu, sf, at})
  })
}

export {
  bussinessCard
}