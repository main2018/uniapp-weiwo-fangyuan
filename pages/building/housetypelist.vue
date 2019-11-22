<template lang="pug">
  view.page-bg-grey
    //- 户型
    view.house-wrap.mod-bg.margin-b-10
      view.house-nav-wrap
        text.btn.btn-sm.btn-radius 全部(10)
        text.btn.btn-sm.btn-radius.btn-primary 一室(3)
        text.btn.btn-sm.btn-radius.btn-primary 二室(3)
        text.btn.btn-sm.btn-radius.btn-primary 三室(2)
        text.btn.btn-sm.btn-radius.btn-primary 其他(2)
      view.house-list.ptl-list
        view.ptl-item
          view.pic-wrap
            image.pic(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg" mode="aspectFill")
          view.text-wrap
            view.flex.margin-b-10
              text.flex-1 1-4室 | 24-122㎡
              text.font-color-red 72万起
            view
              text 72㎡ 朝南
        view.ptl-item
          view.pic-wrap
            image.pic(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg" mode="aspectFill")
          view.text-wrap
            view.flex.margin-b-10
              text.flex-1 1-4室 | 24-122㎡
              text.font-color-red 72万起
            view
              text 72㎡ 朝南    
    //- 看了又看
    view.lookagain.mod-bg
      view.title 看了又看
      view.ptl-list
        view.ptl-item
          view.pic-wrap
            image.pic(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg" mode="aspectFill")
          view.text-wrap
            view.margin-b-10 恒大海口文化
            view.flex.margin-b-10
              text.flex-1 1-4室 | 24-122㎡
              text.font-color-red 1000元/㎡
            view
              text 龙华区 海口东站
            view
              text.btn.btn-sm.btn-danger 在售
              text.btn.btn-sm.btn-disabled 商住
        view.ptl-item
          view.pic-wrap
            image.pic(src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg" mode="aspectFill")
          view.text-wrap
            view.margin-b-10 恒大海口文化
            view.flex.margin-b-10
              text.flex-1 1-4室 | 24-122㎡
              text.font-color-red 1000元/㎡
            view
              text 龙华区 海口东站
            view
              text.btn.btn-sm.btn-danger 在售
              text.btn.btn-sm.btn-disabled 商住
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
.house-nav-wrap {
  padding: $spacing-base 20rpx $spacing-base 0;
  display: flex;
  .btn {
    flex: 1;
    margin-left: 20rpx;
  }
}
.lookagain {
  .title {
    font-size: $font-lg;
    padding: 16rpx $spacing-base;
    font-weight: 700;
  }
}
.ptl-list {
  .ptl-item {
    display: flex;
    padding: 0 $spacing-base $spacing-base;
    margin-bottom: $spacing-base;
    border-bottom: 1rpx solid $uni-border-color;
    &:last-child {
      border: none;
    }
    .pic-wrap {
      width: 240rpx;
      height: 180rpx;
      margin-right: $spacing-base;
      .pic {
        width: 100%;
        height: 100%;
      }
    }
    .text-wrap {
      flex: 1;
    }
  }
}
</style>
