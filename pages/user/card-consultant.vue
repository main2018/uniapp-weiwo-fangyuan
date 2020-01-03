<template lang="pug">
  view.card-consultant.padding-30(v-if="card_info")
    view.card-consultant-info.padding-30
      view.username {{card_info.name}}
      view.team {{card_info.company_name}}
      view.position {{card_info.duty}}
      view.phone
        text.iconfont &#xe61a;
        |{{card_info.mobile}}
      image(:src="$baseUrl + card_info.avatar" mode="aspectFill" lazy-load)
    view.card-consultant-qrcode
      |长按手机二维码,加下我的微信
      image(:src="$baseUrl + card_info.wechat_qr_code" mode="aspectFill" lazy-load)
</template>
<script>
  export default {
    data() {
      return {
        detail: null
      }
    },
    computed: {
      card_info() {
        return this.detail && this.detail.card_info
      }
    },
    onLoad(option) {
      const {id, mu, sf, at} = option
      this.option = option
      this.$api.bussinessCard(mu, sf, at).then(data => {
        this.detail = data
      })
    }
  }
</script>
<style lang="scss" scoped>
  page{
    position: relative;
    background-color: rgb(0,0,0);
    // height: 100vh;
  }
  .card-consultant{
    background: white;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    &-info{
      position: relative;
      border: 2rpx solid $color-grey;
      border-bottom: none;
      border-radius: 10rpx 10rpx 0 0;
      line-height: 2;
      image{
        position: absolute;
        top: 30rpx;
        right: 30rpx;
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }
    }
    &-qrcode{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 50rpx 0 80rpx;
      font-size: 20rpx;
      border: 2rpx solid $color-grey;
      border-radius: 0 0 10rpx 10rpx;
      image{
        margin-top: 40rpx;
        width: 250rpx;
        height: 250rpx;
      }
    }
  }
</style>
