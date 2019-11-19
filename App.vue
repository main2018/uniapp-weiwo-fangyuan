<script>
	export default {
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
