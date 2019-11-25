<template lang="pug">
  view.contact(:style="{height: `${height * 2}rpx`}")
    view.flex.center.padding-20.contact-content
      image.margin-r-10(src="" mode="aspectFill")
      text.username.flex-1.font-size-30 小可
      view.button.see.margin-r-10.flex.flex-y.center.center-x(@tap="$navigateTo({url: '/pages/building/subscribe'})")
        text.font-size-30 约看房
        text.font-size-22 快速预约看房
      view.button.call.flex.flex-y.center.center-x(@tap="call")
        text.font-size-30 指点咨询
        text.font-size-22 保护您的真实号码
</template>

<script>
	export default {
		data() {
			return {
				height: 0
			};
		},
    mounted() {
      this.resetHeight()
      console.log('$navigateTo', this.$navigateTo);
    },
    methods: {
      call() {
        // location.href = `tel:${phone}`
        uni.makePhoneCall({phoneNumber: '13322061910'})
      },
      resetHeight() {
        this.$nextTick(() => {
          const dom = uni.createSelectorQuery().select(".contact-content");
          dom.boundingClientRect(data => {
            const {height} = data
            this.height = height
          }).exec()
        })
      }
    }
	}
</script>

<style lang="scss">
.contact{
  overflow: hidden;
}
.contact>view{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  border-top: 1rpx solid $color-grey-l;
  background-color: $color-white;
  z-index: 9999;
  image{
    width: 60rpx;
    height: 60rpx;
    border: 1px solid;
    border-radius: 50%;
  }
  .button{
    width: 240rpx;
    height: 80rpx;
    color: $color-white;
    border-radius: 8rpx;
    &.see{
      background-color: $color-primary;
    }
    &.call{
      background-color: $color-blue;
    }
  }
}
</style>
