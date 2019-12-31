import http from '@/config/http'
import {generateGetUrl} from './index'

/**
 * DM详情
 * @returns {AxiosPromise}
 */
function dmDetail(id, daid) {
  return http.request({
    method: 'get',
    url: `consultant/dm/${id}`,
    data: {
      daid
    },
  })
}

/**
 * 楼盘传单列表
 * @params {did: 楼盘id}
 * @returns {AxiosPromise}
 */
function buildingDms(did) {
  return http.request({
    method: 'get',
    url: `consultant/building/${did}/dm`
  })
}



/**
 * 楼盘详情
 * @param {id}
 * @returns {Promise}
 */
function getBuildingDetail(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_building_push`, {mu, sf, at})
  })
}

function getHxDms(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_hx_dm`, {mu, sf, at})
  })
}

// 获取特色解读
function getSpecialDms(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_other_dm`, {mu, sf, at})
  })
}

// 看了又看
function getHabitDms(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_enshrine_building`, {mu, sf, at})
  })
}

// 相册
function getPoster(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_poster`, {mu, sf, at})
  })
}

// 获取户型图
function dmHouseTypeImgs(id) {
  return new Promise(resolve => {
    http.request({
      method: 'get',
      url: `consultant/building/${id}/poster`,
    })
    .then(data => {
      const imgs = (data && data.list) || []
      const obj = imgs.find(img => img.type_name === '户型图')
      resolve(obj.poster_list || [])
    })
  })
}

/**
 * DM相关统计
 * @returns {Promise.<*>}
 */
function statistics(type, idSubject, subject, terminal = 2) {
  return http.request({
    method: 'post',
    url: `home/api/dm_statistics`,
    data: {
      id_subject: idSubject,
      subject: subject, // {1:公共DM, 3:私人DM}
      type: type, // {1:浏览, 2:转发, 3:来电, 4:评论, 5:使用}
      terminal: terminal
    },
  })
}

export {
  dmDetail,
  getBuildingDetail,
  getHxDms,
  getSpecialDms,
  getHabitDms,
  getPoster,
  buildingDms,
  dmHouseTypeImgs,
  statistics
}