<template lang="pug">
  view.budling-house
    view.budling-house-header
      image(:src="detail.imgs1[0]" mode="aspectFill")
      view.is-pano(@tap="navigateTo({url: `../pano/index?id=2248`})") 全景
    view.budling-house-overview.padding-20
      .budling-house-overview-title 一啊沙发沙发
      .budling-house-overview-content
        view.font-size-sm(v-for="item in overviews")
          text.font-color-grey.margin-r-20 {{item.name}}:
          text {{item.value}}
        view.font-size-sm
          text.font-color-grey.margin-r-20 所属楼盘:
          text.color-blue 新秀海湾
    view.budling-house-item.analyse.padding-20
      view.budling-house-item-title.margin-b-10 户型分析
      |sdfsdfgsdg
      image(:src="detail.imgs1[0]" mode="aspectFill")
    view.budling-house-item.house-type.padding-20
      view.budling-house-item-title.margin-b-10 本楼盘其他户型
      scroll-view.scroll-view.font-size-sm(scroll-x="true")
        view.scroll-view-item(v-for="url in detail.imgs1")
          image(:src="url" mode="aspectFill")
          .scroll-view-item-title.flex.flex-space-b
            text 1案说法
            text.font-color-red 52万起
    contact
        
</template>

<script>
  import contact from "@/components/contact";
  
  import {dmDetail} from '@/api';
  
	export default {
    components: {
      contact
    },
		data() {
			return {
				detail: {
				  imgs1: [
				    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459148&di=aa8c0bbb7f822cea1812ff137c6bb419&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft014c0bef2485acc973.jpg',
				    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg',
				  ],
				  imgs2: [
				    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459147&di=90805470dd63e8c844478327e63f9883&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F397%2F578%2F464%2Fa14f5213790f4ae7b0c74b155462feb6.jpg',
				    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574750290&di=be30819abde5c3384ddfa4c3b2c2b5d4&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-13%2F5a096bd16aa4a.jpg',
				  ],
        }
			};
		},
    computed: {
      overviews() {
        return [
          {name: '套内面积', value: '4556'},
          {name: '套内面积', value: '4556'},
        ]
      }
    },
    async onLoad() {
      const detail = await dmDetail(2309)
      console.log('detail',detail);
    },
    methods: {
      navigateTo(obj) {
      	uni.navigateTo(obj);
      }
    }
	}
</script>

<style lang="scss">
.budling-house{
  &-header{
    position: relative;
    image{
      width: 100%;
    }
    .is-pano{
      position: absolute;
      left: 5%;
      bottom: 10%;
      width: 90rpx;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      border-radius: 50%;
      background-color: rgba(0,0,0,.5);
      color: $color-white;
    }
  }
  &-overview{
    &-content{
      line-height: 2;
      >view{
        display: inline-block;
        width: 50%;
      }
    }
  }
  &-item{
    &.analyse{
      image{
        width: 100%;
      }
    }
    &.house-type{
      .scroll-view{
        white-space: nowrap;
        &-item{
          display: inline-block;
          width: 60%;
          height: 300rpx;
          &:not(:last-child){
            margin-right: 40rpx;
          }
          image{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
