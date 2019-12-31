<template lang="pug">
  //- 顶部分类导航
  view.page-bg-grey.page-album
    scroll-view.ww-top-nav-wrap.mod-bg(scroll-x="true" :scroll-into-view="`f-item${currentIndex}`")
      <!-- view.scoll-wrapper.mod-bg.menu -->
      view.f-item.padding-x-30(:id="`f-item${index}`" v-for="item, index in slist" :key="item.id" :class="{curr: item.id === currentId}" @click="tabtap(item)") {{item.name}}
    //- 分类模块
    scroll-view.content-wrap(scroll-y="true" @scroll="asideScroll" :scroll-top="tabScrollTop" scroll-with-animation)
      view.s-list.mod-bg(v-for="item in slist" :key="item.id" :id="'main-'+item.id")
        //- 模块名称
        text.s-item {{item.name}}
        //- 图片列表
        view.t-list
          view.t-item(v-if="titem.pid === item.id && !titem.videosrc" v-for="(titem, index) in tlist" :key="titem.id" :data-index="index" @click="preImg")
            image.pic(:src="titem.picture" mode="aspectFill")
            text.video-icon(v-if="titem.videosrc")
            
          view.t-item(v-if="titem.pid === item.id && titem.videosrc" v-for="(titem, index) in tlist" :key="titem.id" @click="videoShow")
            image.pic( :src="titem.picture" mode="aspectFill")
            text.video-icon(v-if="titem.videosrc")
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        isClick: false,
        sizeCalcState: false,
        tabScrollTop: 0,
        currentIndex: 0,
        currentId: 1,
        slist: [ // 分类按钮
          {
          	id: 1,
          	pid: 1,
          	name: '园林景区'
          },
          {
          	id: 2,
          	pid: 2,
          	name: '区位图'
          },
          {
          	id: 3,
          	pid: 3,
          	name: '户型图',
          },
          {
          	id: 4,
          	pid: 4,
          	name: '样板间',
          },
          {
          	id: 5,
          	pid: 5,
          	name: '活动海报'
          },
          {
          	id: 6,
          	pid: 6,
          	name: '交通配套'
          },
          {
          	id: 7,
          	pid: 7,
          	name: '小区配套',
          },
          {
          	id: 8,
          	pid: 8,
          	name: '周边配套',
          }
        ],
        tlist: [ // 分类模块
         {
         	id: 31,
         	pid: 1,
         	name: '景区园林1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg'
         },
         {
         	id: 9,
         	pid: 1,
         	name: '景区园林2',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv03.jpg'
         },
         {
         	id: 10,
         	pid: 1,
         	name: '景区园林1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv04-l.jpg',
          videosrc:'http://cdn.weiwo.info/file_library/mp4/20190307/5c80c02bdc1ec.mp4'
         },
         {
         	id: 11,
         	pid: 1,
         	name: '景区园林2',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv01-l.jpg'
         },
         {
         	id: 12,
         	pid: 2,
         	name: '区位图1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv10.jpg'
         },
         {
         	id: 14,
         	pid: 2,
         	name: '区位图1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche02.jpg'
         },
         {
         	id: 15,
         	pid: 3,
         	name: '户型图1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche01.jpg'
         },
         {
         	id: 16,
         	pid: 3,
         	name: '户型图1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche04-l.jpg'
         },
         {
         	id: 19,
         	pid: 4,
         	name: '样板间1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche06.jpg'
         },
         {
         	id: 20,
         	pid: 4,
         	name: '样板间1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche02-l.jpg'
         },
         {
         	id: 21,
         	pid: 5,
         	name: '活动海报1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche08.jpg'
         },
         {
         	id: 22,
         	pid: 5,
         	name: '活动海报1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche09.jpg'
         },
         {
         	id: 23,
         	pid: 6,
         	name: '交通配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/qiche10.jpg'
         },
         {
         	id: 24,
         	pid: 6,
         	name: '交通配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu08.jpg'
         },
         {
         	id: 27,
         	pid: 7,
         	name: '小区配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu01.jpg'
         },
         {
         	id: 28,
         	pid: 7,
         	name: '小区配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu03-l.jpg'
         },
         {
         	id: 29,
         	pid: 8,
         	name: '周边配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg'
         },
         {
         	id: 30,
         	pid: 8,
         	name: '周边配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu02-l.jpg'
         },
         {
         	id: 31,
         	pid: 8,
         	name: '周边配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg'
         },
         {
         	id: 32,
         	pid: 8,
         	name: '周边配套1',
         	picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu02-l.jpg'
         }
        ],
       
      }
    },
    methods: {
      //一级分类点击
      tabtap(item){
        if(!this.sizeCalcState){
          this.calcSize();
        }
        this.currentId = item.id;
        console.log(item.id)
        let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
        this.currentIndex = index
        this.isClick = true;
        this.tabScrollTop = this.slist[index].top;
        // this.$nextTick(() => {
        //   setTimeout(() => {
        //     this.isClick = false;
        //   }, 500)
        // })
      },
      //计算每个tab的高度等信息
      calcSize() {
        let h = 0;
        this.slist.forEach(item=>{
          let view = uni.createSelectorQuery().select("#main-" + item.id);
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
        this.timer = setTimeout(() => {
          if (this.isClick) this.isClick = false
        }, 300)
        if (this.isClick) return
        
      	if(!this.sizeCalcState){
      		this.calcSize();
      	}
      	let scrollTop = e.detail.scrollTop;
      	let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
      	if(tabs.length > 0){
      		this.currentId = tabs[0].pid;
          let index = this.slist.findIndex(sitem=>sitem.pid === this.currentId);
          this.currentIndex = index
      	}
        this.tabScrollTop =  scrollTop;
      },
      // 放大图片
      preImg(e) {
        let index=e.currentTarget.dataset.index;
        let list = this.tlist.map((item,index)=>{
            return item.picture;
        });
        console.log(list)
       // console.log(list[index])
        uni.previewImage({
          current: list[index],
          indicator: "default",
          urls: list
        })
      },
      // 显示视频
      videoShow() {
        alert('11')
      }
      
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
    white-space: nowrap;
    .f-item {
      display: inline-block;
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
