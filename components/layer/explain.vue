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
    &-explain{
      position: absolute;
      top: 50%;
      left: 64rpx;
      right: 64rpx;
      transform: translateY(-50%);
      max-height: 70%;
      overflow: hidden;
      &-content{
        padding: 30rpx;
        border-radius: 8rpx;
        background-color: $color-white;
        overflow: hidden auto;
        -webkit-overflow-scrolling: touch;
        &-title{
          margin-bottom: 40rpx;
          font-weight: bold;
          font-size: 36rpx;
          text-align: center;
        }
      }
      &-close{
        display: inline-block;
        margin-top: 80rpx;
        color: $color-white;
        font-size: 64rpx;
        align-self: center;
      }
    }
  }
</style>
