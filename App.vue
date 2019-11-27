<script>
	export default {
    globalData: {  
      text: 'text'
    },
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style lang="scss">
  @import "./common/css/reset.scss";
  @import "./common/css/class.scss";
	/*每个页面公共css */
  @font-face {
    font-family: 'iconfont';  /* project id 1495979 */
    src: url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.eot');
    src: url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.woff') format('woff'),
    url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1495979_3xoyqu6wi6.svg#iconfont') format('svg');
  }
  .iconfont{
      font-family:"iconfont" !important;
      font-size:16px;font-style:normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;}
      
	page {
		min-height: 100%;
		/* display: flex; */
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}
  /*  #endif  */

</style>
