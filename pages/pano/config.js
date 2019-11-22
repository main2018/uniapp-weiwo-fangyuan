/**
 * Created by Administrator on 2017/7/20 0020.
 */

// const baseUrl = 'http://192.168.1.2:9001'
// const baseUrl = 'http://192.168.1.234:80'
// const baseUrl = 'http://192.168.1.222:9001'
// const baseUrl = 'http://192.168.1.202:9001'
// const baseUrl = 'http://192.168.1.250:80'
// const baseUrl = 'http://192.168.1.9:80'
// const baseUrl = 'http://192.168.1.129:9001'
const baseUrl = 'http://weiwo.info'
// const baseUrl = 'https://test.weiwo.info'

// CDN基址
const baseCdn = 'http://cdn.weiwo.info'

export default {
  loginPath: '/login',
  newLoginPath: '/new-login',
  guideAlsoPath: '/guideAlso',
  guideAlso: Boolean(localStorage.getItem('guideAlso')),
  flyer: Boolean(localStorage.getItem('flyer')),
  myPage: Boolean(localStorage.getItem('myPage')),
  baseUrl: baseUrl,
  registeredUrl: baseUrl + '/subsite/index/register',
// 若为线上版本, 则为cdn地址, 否则为服务器基址
  baseCdn: /\bweiwo\b/.test(baseUrl) ? baseCdn : baseUrl,
  baseApi: baseUrl,
  isShare: true,
  // baseApi: baseUrl + '/index.php',
  set mem (value) {
  },

  get mem () {
    return this._mem
  },

  set sid (value) {
    localStorage.sid = value
  },

  get sid () {
    return localStorage.sid
  }
}
