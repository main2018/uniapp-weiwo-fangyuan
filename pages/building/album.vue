<template lang="pug">
  //- 顶部分类导航
  view.page-bg-grey.page-album
    scroll-view.ww-top-nav-wrap.mod-bg(scroll-x="true")
      view.scoll-wrapper.mod-bg.menu
        view.f-item.padding-x-30(v-for="(item, index) in plist" :key="index" :class="{curr: index === currentId}" @click="tabtap(index)" v-show="item.poster_list.length > 0") {{item.type_name}}
    //- 分类模块
    scroll-view.content-wrap(scroll-y="true" @scroll="asideScroll" :scroll-top="tabScrollTop" scroll-with-animation)
      view.s-list.mod-bg(v-for="(item, index) in plist" :key="index" :id="'main-'+index" v-show="item.poster_list.length > 0")
        text.s-item {{item.type_name}}
        //- 图片列表
        view.t-list
          view.t-item(v-for="(p, itemIndex) in item.poster_list" :key="itemIndex" @click="preImg(index, itemIndex, p.screenage_format)")
            image.pic(v-if="p.screenage_format == 1" :src="$baseUrl + p.screenage" mode="aspectFill")
            image.pic(v-if="p.screenage_format == 2" :src="$baseUrl + p.cover" mode="aspectFill")
            text.video-icon(v-if="p.screenage_format == 2")
    //- 弹出层
    
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        isClick: false,
        sizeCalcState: false,
        tabScrollTop: 0,
        currentId: 0,
        plist: [],
      }
    },
    methods: {
      //分类点击
      tabtap(index){
        if(!this.sizeCalcState){
          this.calcSize(index);
        }
        this.currentId = index;
        console.log(index)
        this.isClick = true
        this.tabScrollTop = this.plist[index].top;
      },
      //计算每个类的高度信息
      calcSize() {
        let h = 0;
        this.plist.forEach((item, index)=>{
          let view = uni.createSelectorQuery().select("#main-" + index);
          view.fields({
            size: true
          },data => {
            item.top = h;
            h += data.height;
            item.bottom = h;
          }).exec();
        })
        this.sizeCalcState = true;
      },
      //窗口滚动
      asideScroll(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => { if (this.isClick) this.isClick = false }, 300)
        if (this.isClick) return
        
      	if(!this.sizeCalcState){
      		this.calcSize();
      	}
      	let scrollTop = e.detail.scrollTop;
      	let tabs = this.plist.filter(item=>item.top <= scrollTop).reverse();
      	if(tabs.length > 0){
          const currentId = this.plist.findIndex(item => item.type_name == tabs[0].type_name)
      		this.currentId = currentId;
      	}
        this.tabScrollTop =  scrollTop;
      },
      // 放大图片
      preImg(index, itemIndex, screenageFormat) {
        if (screenageFormat == 2) {
          uni.navigateTo({
              url: '/pages/component/video/video'
          });
        } else {
          let list = this.plist[index].poster_list.filter(item => item.screenage_format == 1).map((p, itemIndex)=>{
            return this.$baseUrl + p.screenage;
          });
          uni.previewImage({
            current: list[itemIndex],
            indicator: "number",
            urls: list
          })
        }
      },
      // 显示视频
      videoShow() {
        alert('11')
      }
    },
    onLoad (option) {
      const {id, mu, sf, at} = option
      this.$api.getPoster(id, mu, sf, at).then( data => {
        console.log('data.list', data.list);
        this.plist = data.list
      })
    }
  }
</script>

<style lang="scss">
.menu {
  padding: 0 10rpx;
}
.page-album {
  position: relative;
  height: calc(100vh - 44px);
  color: #232529;
  .ww-top-nav-wrap{
    position: relative;
    width: 100%;
    display: flex;
    z-index: 10;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    .scoll-wrapper {
     display:flex;
     align-items: flex-start;
     overflow-x: auto;
     justify-content: space-between;
      .f-item {
        position: relative;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        flex-basis: 80rpx;
        flex-shrink: 0;
        white-space: nowrap;
        font-size: 30rpx;
        font-weight: 700;
        color: #979B9E;
        &.curr {
          color: $color-black;
        }
        &.curr:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 32rpx;
          margin-left: -16rpx;
          height: 0;
          border-bottom: 6rpx solid $color-default;
          border-radius: 6rpx;
        }
      }
    }
    
  }
  .content-wrap {
    height: 100%;
    height: calc(100% - 44px);
    .s-list {
      .s-item {
        height: 60rpx;
        line-height: 60rpx;
        font-size: $font-size-base+2rpx;
        font-weight: 700;
        padding: 30rpx $spacing-xlg;
        display: flex;
      }
      .t-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 $spacing-xlg;
        margin-left: -10rpx;
        .t-item {
          position: relative;
          flex-basis: 33.33%;
          height: 160rpx;
          padding-left: 10rpx;
          padding-bottom: 10rpx;
          box-sizing: border-box;
        }
        .pic {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #f6f6f6;
          z-index: 1;
        }
        .video-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 72rpx;
          height: 72rpx;
          margin-left: -36rpx;
          margin-top: -36rpx;
          z-index: 2;
          background: url(../../common/images/shipingbofang.png);
          background-size: contain;
        }
      }
    }
  }
  
}

</style>