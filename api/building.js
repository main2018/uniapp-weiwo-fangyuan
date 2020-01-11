import http from '@/config/http'
import {generateGetUrl} from './index'

/**
 * DM详情
 * @returns {AxiosPromise}
 */
function dmDetail(dmid, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${dmid}/agency_dm_details`, {mu, sf, at})
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

// 预约看房或图文传单底部的楼盘
function getPresentBuildingDetail(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_present_building`, {mu, sf, at})
  })
}


function getHxDms(id, mu, sf, at, dmid, room_num) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_hx_dm`, {mu, sf, at, dmid, room_num})
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

// 活动详情
function getActivity(id, mu, sf, at, dsoid) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_discounts/${dsoid}`, {mu, sf, at})
  })
}

// 活动报名
function activityJoin(data) {
  return http.request({
    method: 'post',
    url: `site/agency_appointed_apply`,
    data
  })
}

// 项目数据
function getProjectData(id, mu, sf, at) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_project_data`, {mu, sf, at})
  })
}

// 户型全景列表
function getHxPanos(id, mu, sf, at, dmid) {
  return http.request({
    method: 'get',
    url: generateGetUrl(`site/${id}/agency_hx_panoramas/${dmid}`, {mu, sf, at})
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
// function statistics(type, idSubject, subject, terminal = 2) {
//   return http.request({
//     method: 'post',
//     url: `home/api/dm_statistics`,
//     data: {
//       id_subject: idSubject,
//       subject: subject, // {1:公共DM, 3:私人DM}
//       type: type, // {1:浏览, 2:转发, 3:来电, 4:评论, 5:使用}
//       terminal: terminal
//     },
//   })
// }
function statistics(data) {
  if (!data) return
  data.id_subject = data.id_subject || 0
  data.mu = data.mu || 0
  data.sf = data.sf || 0
  data.at = data.at || 0
  data.openid = data.openid || ''

  const baseData = {
    subject: 2, // 1 传单 2 楼盘
    type: 4, // 2转发 4来电
  }
  
  return http.request({
    method: 'post',
    url: `site/agency_behaviour`,
    data: Object.assign(baseData, data)
  })
}

function _getOpenid() {
  return getApp().globalData.openid || ''
}

export {
  _getOpenid,
  
  dmDetail,
  getPresentBuildingDetail,
  getBuildingDetail,
  getHxDms,
  getSpecialDms,
  getHabitDms,
  getPoster,
  getActivity,
  getHxPanos,
  activityJoin,
  buildingDms,
  getProjectData,
  dmHouseTypeImgs,
  statistics
}