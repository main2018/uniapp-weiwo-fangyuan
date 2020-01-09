<template lang="pug">
  view.layer(v-show="value")
    view.layer-explain.flex.flex-y
      view.layer-explain-content.flex-1
        view.layer-explain-content-title(v-show="title") {{title}}
        slot
      text.layer-explain-close.iconfont(@tap="$emit('input', false)") &#xe753;
</template>
<script>
  export default {
    props: {
      value: false,
      title: ''
    },
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .layer{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    &-explain{
      width:84%;
      max-height: 90%;
      min-height: 60%;
      overflow-y: auto;
      &-content{
        width: 100%;
        height: 100%;
        padding: 30rpx 30rpx 30rpx 0;
        border-radius: 8rpx;
        background-color: $color-white;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        &-title{
          margin-bottom: 40rpx;
          font-weight: bold;
          font-size: 36rpx;
          text-align: center;
        }
      }
      &-close{
        display: inline-block;
        margin-top: 50rpx;
        color: $color-white;
        font-size: 64rpx;
        align-self: center;
      }
    }
  }
</style>
