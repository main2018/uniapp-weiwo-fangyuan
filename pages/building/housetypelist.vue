<template lang="pug">
  view.page-bg-grey
    //- 户型
    //- 顶部选项
    view.house-wrap.mod-bg
      view.top-tab.mod-bg
        view.tab-item.curr 全部(10)
        view.tab-item 一室(3)
        view.tab-item 二室(3)
        view.tab-item 三室(2)
        view.tab-item 其他(2)
      view.house-list.ptl-list
        view.ptl-list
          view.ptl-item
            view.flex
              view.pic-wrap
                image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
              view.text-wrap
                view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
                view.flex.margin-b-12
                  text.font-color-red.font-size-30 72万元起
                view.margin-b-12
                  text.font-size-24 建面72㎡/朝南
                view.margin-b-12.font-align-right
                  text.font-color-red 转发
          view.ptl-item
            view.flex
              view.pic-wrap
                image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
              view.text-wrap
                view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
                view.flex.margin-b-12
                  text.font-color-red.font-size-30 72万元起
                view.margin-b-12
                  text.font-size-24 建面72㎡/朝南
                view.margin-b-12.font-align-right
                  text.font-color-red 转发
    //- 看了又看
    view.lookagain.mod-bg
      view.title 看了又看
      view.ptl-list
        view.ptl-item
          view.flex
            view.pic-wrap
              image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
              view.star-wrap
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe61c;
            view.text-wrap
              view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
              view.flex.margin-b-12
                text.font-color-red.font-size-30 1000元/㎡
              view.margin-b-12
                text.font-size-24 龙华区/1-4室 24-122㎡
              view
                text.btn.btn-sm.btn-danger 在售
                text.btn.btn-sm.btn-grey 商住
                text.btn.btn-sm.btn-grey 首付低
                text.btn.btn-sm.btn-grey 大型社区
          view
            text.iconfont.color-yellow.margin-r-6 &#xe605;
            text 活动描述

        view.ptl-item
          view.flex
            view.pic-wrap
              image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
              view.star-wrap
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe61c;
            view.text-wrap
              view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
              view.flex.margin-b-12
                text.font-color-red.font-size-30 1000元/㎡
              view.margin-b-12
                text.font-size-24 龙华区/1-4室 24-122㎡
              view
                text.btn.btn-sm.btn-danger 在售
                text.btn.btn-sm.btn-grey 商住
                text.btn.btn-sm.btn-grey 首付低
                text.btn.btn-sm.btn-grey 大型社区
          view
            text.iconfont.color-yellow.margin-r-6 &#xe605;
            text 活动描述
        view.ptl-item
          view.flex
            view.pic-wrap
              image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
              view.star-wrap
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe671;
                text.iconfont.font-size-24 &#xe61c;
            view.text-wrap
              view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
              view.flex.margin-b-12
                text.font-color-red.font-size-30 1000元/㎡
              view.margin-b-12
                text.font-size-24 龙华区/1-4室 24-122㎡
              view
                text.btn.btn-sm.btn-danger 在售
                text.btn.btn-sm.btn-grey 商住
                text.btn.btn-sm.btn-grey 首付低
                text.btn.btn-sm.btn-grey 大型社区
          view
            text.iconfont.color-yellow.margin-r-6 &#xe605;
            text 活动描述
    contact
</template>

<script>
  import contact from "@/components/contact";
  export default {
    data() {
      return {
      }
    },
    components:{
      contact
    }
  }
</script>

<style lang="scss">
.color-yellow {
  color: #fda84e;
}
.house-nav-wrap {
  padding: $spacing-base 20rpx $spacing-base 0;
  display: flex;
}
.top-tab {
  display: flex;
  border-bottom: 1rpx solid #eee;
  .tab-item {
    position:relative;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 20rpx 0;
    color: #979B9E;
    font-weight: 700;
    &.curr {
      color: $color-black;
      &::after {
        content:'';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 32rpx;
        height: 0;
        margin-left: -16rpx;
        border-bottom: 6rpx solid $color-default;
      }
    }
  }
  
}
.house-list {
    padding: $spacing-xlg $spacing-xlg 0;
    &::after{
      content: "";
      width: 100%;
      height: 0;
      border-bottom: 1px solid #eee;
      display: block;
    }
}
.lookagain {
   padding: 0 $spacing-xlg;
   &::after{
     content: "";
     width: 100%;
     height: 0;
     border-bottom: 1px solid #eee;
     display: block;
   }
  .title {
    font-size: 36rpx;
    padding: 40rpx 0;
    font-weight: 700;
  }
}
.ptl-list {
  .ptl-item {
    display: flex;
    flex-direction: column;
    padding-bottom: 30rpx;
    margin-bottom: 30rpx;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border: none;
      margin-bottom: 0;
    }
    .pic-wrap {
      position: relative;
      width: 200rpx;
      height: 164rpx;
      margin-right: $spacing-base;
      .pic {
        width: 100%;
        height: 100%;
      }
      .star-wrap {
        position: absolute;
        top: 12rpx;
        left: 0;
        background-color: rgba(0,0,0,.5);
        height: 32rpx;
        line-height: 32rpx;
        padding: 0 16rpx;
        color: #fff;
        border-top-right-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
        display: flex;
        align-items: center;
      }
    }
    .text-wrap {
      flex: 1;
      line-height: 1;
    }
  }
}
</style>
