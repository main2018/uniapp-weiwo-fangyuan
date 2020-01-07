<template lang="pug">
  view.contact(:style="{height: `${height * 2}rpx`}" v-if="contact && contact.name")
    view.flex.center.padding-y-20.padding-x-40.contact-content
      image.margin-r-10(
        :src="$baseUrl + contact.avatar"
        mode="aspectFill"
        @tap="$navigateTo({url: generateGetUrl('/pages/user/card-consultant', option)})"
        )
      text.username.flex-1.font-size-30 {{contact.name}}
      view.button.see.margin-r-10.flex.flex-y.center.center-x.bg-yellow-linear(@tap="seeHouse")
        text.font-size-30 约看房
        text.font-size-22 快速预约看房
      view.button.call.flex.flex-y.center.center-x.bg-blue-linear(@tap="call")
        text.font-size-30 致电咨询
        text.font-size-22 保护您的真实号码
    
    layer-explain(v-model="explainShow" title="")
      |dsfsdf
</template>

<script>
  import layerExplain from "@/components/layer/explain";
  
  import {generateGetUrl} from '@/api/index'
  
	export default {
    components: {
      layerExplain
    },
    props: {
      option: {
        type: Object,
        default: () => ({})
      },
      contact: {
        type: [Object, Array],
        default: null
      }
    },
    watch: {
      contact: {
        handler() {
          if (this.contact && this.contact.name) {
            this.resetHeight()
          }
        },
        immediate: true
      }
    },
		data() {
			return {
        generateGetUrl,
        explainShow: false,
				height: 0
			};
		},
    created() {
      // this.option = this.$route.query
    },
    mounted() {
      // this.resetHeight()
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
          uni.makePhoneCall({phoneNumber: this.contact.mobile})
        })
      },
      resetHeight() {
        this.$nextTick(() => {
          const dom = uni.createSelectorQuery().select(".contact-content");
          dom.boundingClientRect(data => {
            const {height} = data || {}
            this.height = height
            // console.log('height', height)
          }).exec()
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
.contact{
  overflow: hidden;
}
.contact-content{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  border-top: 1rpx solid $color-grey-l;
  background-color: $color-white;
  z-index: 9999;
  white-space: nowrap;
  .username{
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
