export default function() {
  // #ifdef H5
  var jweixin = require('jweixin-module');
  // console.log(jweixin);
  jweixin.ready(function(){
    uni.showToast({
      title: 'jweixin'
    });
    jweixin.updateAppMessageShareData({
      title: 'uni-app分享', // 分享标题
      desc: '我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！', // 分享描述
      link: 'http://sso.9shengyi.com/h5', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png', // 分享图标
      success: function (res) {
        console.log("success:" + JSON.stringify(res));
      },
      fail: function (err) {
        console.log("fail:" + JSON.stringify(err));
      },
    })
  });
  // #endif
}