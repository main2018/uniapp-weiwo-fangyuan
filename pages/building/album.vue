<template lang="pug">
  //- 分类导航
  view.page-bg-grey.page-album
    scroll-view.ww-top-nav-wrap.margin-b-10.mod-bg(scroll-x="true")
      view.scoll-wrapper.mod-bg
        view.f-item.padding-x-30(v-for="item in slist" :key="item.id" :class="{curr: item.id === currentId}" @click="tabtap(item)") {{item.name}}
    
    scroll-view.content-wrap(scroll-y="true" @scroll="asideScroll" :scroll-top="tabScrollTop")
      view.s-list.mod-bg.margin-b-10(v-for="item in slist" :key="item.id" :id="'main-'+item.id")
        text.s-item {{item.name}}
        view.t-list
          view.t-item(v-if="titem.pid === item.id" v-for="titem in tlist" :key="titem.id")
            image.pic(:src="titem.picture")
    
</template>

<script>
  export default {
    data() {
      return {
        sizeCalcState: false,
        tabScrollTop: 0,
        currentId: 1,
        slist: [
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
        tlist: [
         {
         	id: 31,
         	pid: 1,
         	name: '景区园林1',
         	picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459148&di=aa8c0bbb7f822cea1812ff137c6bb419&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft014c0bef2485acc973.jpg'
         },
         {
         	id: 9,
         	pid: 1,
         	name: '景区园林2',
         	picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459148&di=aa8c0bbb7f822cea1812ff137c6bb419&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft014c0bef2485acc973.jpg'
         },
         {
         	id: 10,
         	pid: 1,
         	name: '景区园林1',
         	picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459148&di=aa8c0bbb7f822cea1812ff137c6bb419&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft014c0bef2485acc973.jpg'
         },
         {
         	id: 11,
         	pid: 1,
         	name: '景区园林2',
         	picture: '/static/temp/cate4.jpg'
         },
         {
         	id: 12,
         	pid: 2,
         	name: '区位图1',
         	picture: '/static/temp/cate5.jpg'
         },
         {
         	id: 14,
         	pid: 2,
         	name: '区位图1',
         	picture: '/static/temp/cate1.jpg'
         },
         {
         	id: 15,
         	pid: 3,
         	name: '户型图1',
         	picture: '/static/temp/cate4.jpg'
         },
         {
         	id: 16,
         	pid: 3,
         	name: '户型图1',
         	picture: '/static/temp/cate5.jpg'
         },
         {
         	id: 19,
         	pid: 4,
         	name: '样板间1',
         	picture: '/static/temp/cate7.jpg'
         },
         {
         	id: 20,
         	pid: 4,
         	name: '样板间1',
         	picture: '/static/temp/cate8.jpg'
         },
         {
         	id: 21,
         	pid: 5,
         	name: '活动海报1',
         	picture: '/static/temp/cate9.jpg'
         },
         {
         	id: 22,
         	pid: 5,
         	name: '活动海报1',
         	picture: '/static/temp/cate10.jpg'
         },
         {
         	id: 23,
         	pid: 6,
         	name: '交通配套1',
         	picture: '/static/temp/cate11.jpg'
         },
         {
         	id: 24,
         	pid: 6,
         	name: '交通配套1',
         	picture: '/static/temp/cate12.jpg'
         },
         {
         	id: 27,
         	pid: 7,
         	name: '小区配套1',
         	picture: '/static/temp/cate13.jpg'
         },
         {
         	id: 28,
         	pid: 7,
         	name: '小区配套1',
         	picture: '/static/temp/cate14.jpg'
         },
         {
         	id: 29,
         	pid: 8,
         	name: '周边配套1',
         	picture: '/static/temp/cate15.jpg'
         },
         {
         	id: 30,
         	pid: 8,
         	name: '周边配套1',
         	picture: '/static/temp/cate16.jpg'
         }
        ]
      }
    },
    methods: {
      //一级分类点击
      tabtap(item){
        if(!this.sizeCalcState){
          this.calcSize();
        }
        this.currentId = item.id;
        let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
        this.tabScrollTop = this.slist[index].top;
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
            console.log(h)
            h += data.height+5;
            item.bottom = h;
          }).exec();
        })
        this.sizeCalcState = true;
      },
      //右侧栏滚动
      asideScroll(e){
      	if(!this.sizeCalcState){
      		this.calcSize();
      	}
      	let scrollTop = e.detail.scrollTop;
      	let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
      	if(tabs.length > 0){
      		this.currentId = tabs[0].pid;
      	}
      }
      
    }
  }
</script>

<style lang="scss">
.page-album {
  position: relative;
  height: calc(100vh - 44px);
  /* display: flex;
  flex-direction: column; */
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
        &.curr {
          color: #007AFF;
        }
        &.curr:after {
          content: '';
          position: absolute;
          left: 20%;
          bottom: 0;
          width: 60%;
          height: 0;
          border-bottom: 2px solid #007AFF;
        }
      }
    }
    
  }
  
  .content-wrap {
    flex: 1;
    height: 100%;
    .s-list {
      .s-item {
        height: 80rpx;
        line-height: 80rpx;
        padding-left: $spacing-lg;
        padding-right: $spacing-lg;
      }
      .t-list {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        .t-item {
          width: 223rpx;
          height: 150rpx;
          margin-left: $spacing-base;
          margin-bottom: $spacing-base;
        }
        .pic {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #f6f6f6;
        }
      }
    }
  }
  
}


</style>
