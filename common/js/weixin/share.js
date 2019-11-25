const jweixin = require('jweixin-module');

import * as api from '@/api';

export default {
  //判断是否在微信中
  isWechat:function(){
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/micromessenger/i) == 'micromessenger';
  },  
      //初始化sdk配置  
  initJssdk: async function(url){
    if(!this.isWechat()) return;
    
    //服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
    let resConfig = await api.wxConfig(window.location.href);
    
    let apiList = [
      'updateAppMessageShareData', // 分享给朋友和分享到QQ
      'updateTimelineShareData', // 分享到朋友圈和分享到QQ空间
      'onMenuShareWeibo', // 分享到腾讯微博
      'hideOptionMenu',  // 可能需要用到的能力
      'showOptionMenu',  // 可能需要用到的能力
      'chooseWXPay'  // 可能需要用到的能力
    ];

    let info = {
      debug: true, // 调试，发布的时候改为false
      appId: 'appid',
      nonceStr: resConfig.noncestr,
      timestamp: resConfig.timestamp,
      signature: resConfig.signature,
      jsApiList: apiList
    };
    
    jweixin.config(info);

    await new Promise((resolve, reject) => {
      jweixin.ready(res => {
        resolve(jweixin); // 配置成功
      });
      jweixin.error(err => {
        reject()
        console.log('config fail:', err);
      });
    })
    return jweixin
  },
  // 如需每个页面都用到,在main.js里加这段
  // Vue.mixin({
  //   onShow() {
  //     jwx.configWeiXin(jweixin => {
  //       jweixin.hideOptionMenu();
  //     });
  //   }
  // });
  //在需要自定义分享的页面中调用  
  share: async function(data){
    //每次都需要重新初始化配置，才可以进行分享
    await this.initJssdk()
    
    let config = {
      title: '',
      desc: '',
      link: window.location.href,  
      imgUrl: ''
    }
    Object.assign(data, config)
    
    const shareData = {
      ...data,
      success: function (res) {
        //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的  
        // request.post('/api/member/share');  
      },
      cancel: function (res) {}
    };  
    //分享给朋友, QQ好友 接口  
    jweixin.updateAppMessageShareData(shareData);
    //分享到朋友圈, QQ空间 接口
    jweixin.updateTimelineShareData(shareData);
  },
  async pay() {
    await this.initJssdk()
    
    let payRes = await api.wxPay(params);
    
    jweixin.chooseWXPay({
      nonceStr: payRes.nonceStr,
      timestamp: payRes.timeStamp,
      package: payRes.package,
      signType: payRes.signType,
      paySign: payRes.paySign,
      success: () => {
          // 支付成功后
      },
      fail: err => {
          // 支付失败
      },
      cancel: err => {
          // 支付取消
      }
    });
  }
}