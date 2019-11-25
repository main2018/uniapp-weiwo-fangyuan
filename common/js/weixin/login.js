// https://www.jianshu.com/p/203c9af4c3bf

export default {
  // export default function () {
  //   let appid = 'xxx';
  //   let uri = encodeURIComponent(window.location.href); // 这里务必编码
  //   let scope = 'snsapi_userinfo'; // 获取用户信息
  //   // let scope = 'snsapi_base'; // 静默授权，仅可获取openid
  //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
  // }
  
  // 微信公众号授权
  wxAuthorize() {
    let link = window.location.href;
    const code = this._getUrlParams('code');  // 地址解析
  
    // 已经授权登录过的就不用再授权了
    if (store.state.token) return;
  
    // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
    if (code) {
      api.wxAuth(code); // 调用后台接口，授权
    } else {
      let appid = 'xxx';
      let uri = encodeURIComponent(link);
      let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
      window.location.href = authURL;
    }
  },
  _getUrlParams(key, url) {
    const paramsString = url || window.location.search
    const searchParams = new URLSearchParams(paramsString);
    return searchParams.get(key)
  }
}