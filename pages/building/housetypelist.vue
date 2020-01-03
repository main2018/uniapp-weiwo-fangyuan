<template lang="pug">
  view
    //- 顶部选项
    view.house-wrap.mod-bg
      view.top-tab.mod-bg
        view.tab-item(
        v-for="(item, index) in hxtype"
        :class="{curr: index == currentId}"
        :key="index"
        @click="tabtap(index)"
        ) {{item.title}}({{item.total}})
        
      view.house-list.ptl-list
        view.ptl-list
          view.ptl-item(
            v-for="(item, index) in hxDm.list"
            :key="index"
            @tap="$navigateTo({url: `./house?dmid=${item.id}&id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})"
            )
            view.flex
              view.pic-wrap
                image.pic(:src="$baseUrl + item.gallery" mode="aspectFill")
                view.sign-center(v-if="item.panorama") 
                  text.iconfont &#xe7bc;
              view.text-wrap
                view.margin-b-12.font-weight-bold.ellipsis {{item.defective_room}}
                view.flex.margin-b-12
                  text.font-color-red.font-size-30 {{item.price_total}}
                view.margin-b-12
                  text.font-size-24 建面{{item.area_built+(item.area_built && item.orientations? '/': '')+item.orientations}}
                view.margin-b-12.font-align-right
                  //- text.font-color-red.font-size-24 转发
    contact
</template>

<script>
  import contact from "@/components/contact";
  import {generateGetUrl} from '@/api';
  
  export default {
    components:{
      contact
    },
    data() {
      return {
        generateGetUrl,
        option: {},
        hxDm: {},
        currentId: 0,
        hxtype: [
          {
            title: '全部',
            id: 0,
            total: null
          },
          {
            title: '一室',
            id: 1,
            total: null
          },
          {
            title: '二室',
            id: 2,
            total: null
          },
          {
            title: '三室',
            id: 3,
            total: null
          },
          {
            title: '四室',
            id: 4,
            total: null
          }
        ]
      }
    },
    onLoad(option){
      this.option = option
      this.getHx_dm(option)
    },
    methods: {
      tabtap(index) {
        this.option.room_num = index
        this.currentId = index
        const {id, mu, sf, at, dmid, room_num} = this.option
        console.log('room_num', room_num)
        this.getHx_dm(this.option)
      },
      getHx_dm(option){
        const {id, mu, sf, at, dmid, room_num} = option
        this.option = option
        this.$api.getHxDms(id, mu, sf, at, dmid, room_num).then(data => {
          this.hxDm = data
          this.hxtype[0].total = data.total
          this.hxtype[1].total = data.one_total
          this.hxtype[2].total = data.two_total
          this.hxtype[3].total = data.three_total
          this.hxtype[4].total = data.other_total
        })
      }
    }
  }
</script>

<style lang="scss">
.uni-view {
  line-height: inherit;
}
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
    font-size: 30rpx;
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
// 看了又看
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
// 列表
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
      .sign-center {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60rpx;
        height: 60rpx;
        margin-left:-30rpx;
        margin-top: -30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgba(0,0,0,.5);
        border-radius:60rpx ;
        .iconfont {
          font-size: 36rpx;
          color: #fff;
        }
      }
      .sign-bl {
        position: absolute;
        bottom: 12rpx;
        left: 12rpx;
        width: 40rpx;
        height: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:rgba(0,0,0,.5);
        border-radius:60rpx ;
        .iconfont {
          font-size: 24rpx;
          color: #fff;
        }
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
      .margin-b-12 {
        line-height: 1;
      }
      
    }
  }
}
</style>