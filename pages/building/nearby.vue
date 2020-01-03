<template lang="pug">
  view.nearby
    web-view(:src="tecentMap")
    scroll-view(scroll-x="true").nearby-bar.font-align-center
      view.nearby-bar-item(v-for="(item, index) in nearby" @tap="changeIndex(index)" :class="{active: currIndex === index}")
        text.iconfont.margin-r-8(decode :style="{color: item.color}") {{unicodeToZh(item.icon)}}
        |{{item.name}}
      <!-- text.padding-x-50.padding-y-40(v-for="(item, index) in nearby" @tap="currIndex = index") {{item.name}} -->
</template>

<script>
  import {unicodeToZh} from '@/common/js/util';
  import {generateGetUrl} from '@/api';
  
	export default {
		data() {
			return {
        unicodeToZh,
        currIndex: 0,
        total: 1,
        nearby: [
          {name: '公交', icon: '&#xe614;', color: '#22c392'},
          {name: '地铁', icon: '&#xe6f3;', color: '#66a2fe'},
          {name: '学校', icon: '', color: '#ff5e3a'},
          {name: '购物', icon: '&#xe619;', color: '#fda84e', keyword: '商场/超市'},
          {name: '医院', icon: '&#xe6a7;', color: '#c86183'},
          {name: '银行', icon: '&#xe64c;', color: '#22c392'},
          {name: '餐饮', icon: '&#xe64d;', color: '#22c392'},
        ],
        lat: 0,
        lng: 0
			};
		},
    computed: {
      tecentMap (){
        const tonav = 0;
        const key = 'NEPBZ-SDK3W-SWMRQ-R4ZOY-X5QRT-QQFL5';
        // const key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';
        const keyword = this.nearby[this.currIndex].keyword || this.nearby[this.currIndex].name
        return `https://apis.map.qq.com/tools/poimarker?type=1&keyword=${keyword}&tonav=${tonav}&center=${this.lat},${this.lng}&radius=1000&key=${key}&referer=微窝`
      }
    },
    onLoad(option) {
      this.option = option
      const {lat, lng} = option
      this.lat = lat
      this.lng = lng
    },
    onBackPress(options) {
      
      if (options.from === 'navigateBack') {
        return false;  
      }
      const {id, mu, sf, at} = this.option || {}
      if (!id || (this.total == 1)) {
        return false
      };
      // this.$navigateBack({delta: this.total})
      uni.navigateTo({
        url: generateGetUrl('/pages/building/detail', {id, mu, sf, at})
      })
      return true
    },
    methods: {
      changeIndex(index) {
        if (index == this.currIndex) return
        
        this.currIndex = index;
        this.total += 1;
      }
    }
	}
</script>

<style lang="scss">
.nearby{
  &-bar{
    position: absolute;
    z-index: 99;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    background-color: $color-white;
    &-item{
      padding: 20rpx 20rpx;
      display: inline-block;
      filter: grayscale(100%);
      &.active{
        filter: none;
      }
      .iconfont{
        vertical-align: middle;
      }
    }
  }
}
</style>
