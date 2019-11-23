import http from '@/config/http'

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
function getBuildingDetail(id) {
  console.log('http', http);
  return http.request({
    method: 'get',
    url: `consultant/building/${id}`
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
  buildingDms,
  dmHouseTypeImgs,
  statistics
}