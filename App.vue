<script>
  
	export default {
    globalData: {  
      openid: ''
    },
    watch: {
      routeFullPath(to, from) {
        const name = 'pages-building-detail'
        const currName = this.$route.meta.name
        const isBuildingDetail = currName == name
        
        let queryStr = from.split('?')[1]
        if (isBuildingDetail && !this.$route.query.id && queryStr) {
          // queryStr = queryStr.replace(/^dmid=[\d]*[&]?/, '')
          queryStr = queryStr.split('&').filter(item => {
            const needKeys = ['id', 'mu', 'sf', 'at']
            return needKeys.find(key => item.split('=')[0] == key)
          }).join('&')
          // console.log('queryStr', queryStr)
          uni.redirectTo({
            url: `/pages/building/detail?${queryStr}`
          });
        }
      }
    },
    computed: {
      routeFullPath() { return this.$route.fullPath }
    },
		onLaunch: async function() {
			console.log('App Launch');
      const openid = await this.$weixin.wxAuthorize()
      getApp().globalData.openid = openid
      this.$store.commit('SET_OPENID', openid)
      // alert(`openid:${openid}`)
      // this.$scope.globalData.openid = openid
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
    src: url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.eot');
    src: url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.woff') format('woff'),
    url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1495979_uy7f0n5e8w.svg#iconfont') format('svg');
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
