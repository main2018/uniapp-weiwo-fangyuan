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
  statistics
}