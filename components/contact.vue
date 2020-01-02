<template lang="pug">
  view.contact(:style="{height: `${height * 2}rpx`}")
    view.flex.center.padding-y-20.padding-x-40.contact-content
      image.margin-r-10(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu08.jpg" mode="aspectFill")
      text.username.flex-1.font-size-30 小可
      view.button.see.margin-r-10.flex.flex-y.center.center-x.bg-yellow-linear(@tap="seeHouse")
        text.font-size-30 约看房
        text.font-size-22 快速预约看房
      view.button.call.flex.flex-y.center.center-x.bg-blue-linear(@tap="call")
        text.font-size-30 致电咨询
        text.font-size-22 保护您的真实号码
</template>

<script>
  import {generateGetUrl} from '@/api/index'
  
	export default {
    props: {
      option: {
        type: Object,
        default: () => ({})
      },
      phone: {
        type: String,
        default: ''
      }
    },
		data() {
			return {
				height: 0
			};
		},
    created() {
      // this.option = this.$route.query
    },
    mounted() {
      this.resetHeight()
    },
    methods: {
      seeHouse() {
        this.$navigateTo({url: generateGetUrl('/pages/building/subscribe', this.option)})
      },
      call() {
        // location.href = `tel:${phone}`
        const {id: id_subject, mu, sf, at, openid} = this.option || {}
        
        const data = {
          id_subject,
          mu,
          sf,
          at,
          openid
        }
        this.$api.statistics(data).then(() => {
          // location.href = `tel:${this.config.mem.sc.mobile}`
          uni.makePhoneCall({phoneNumber: this.phone})
        })
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
    background-color: #fff;
    border-radius: 50%;
    box-shadow: inset 4rpx 4rpx 14rpx rgba(0,0,0,.2);
  }
  .button{
    width: 240rpx;
    height: 80rpx;
    color: $color-white;
    border-radius: 8rpx;
    &.see{
    }
    &.call{
      background-color: $color-blue;
    }
  }
}
</style>
