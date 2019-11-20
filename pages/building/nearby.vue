<template lang="pug">
  view.nearby
    web-view(:src="tecentMap")
    scroll-view(scroll-x="true").nearby-menu.font-align-center: text.padding-x-50.padding-y-40(v-for="(item, index) in nearby" @tap="currIndex = index") {{item.name}}
</template>

<script>
	export default {
		data() {
			return {
        currIndex: 0,
        nearby: [
          {name: '公交'},
          {name: '地铁'},
          {name: '学校'},
          {name: '购物', keyword: '商场/超市'},
          {name: '医院'},
          {name: '银行'},
          {name: '餐饮'},
        ]
			};
		},
    computed: {
      tecentMap (){
        const tonav = 0;
        const key = 'NEPBZ-SDK3W-SWMRQ-R4ZOY-X5QRT-QQFL5';
        // const key = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';
        const keyword = this.nearby[this.currIndex].keyword || this.nearby[this.currIndex].name
        return `https://apis.map.qq.com/tools/poimarker?type=1&keyword=${keyword}&tonav=${tonav}&center=39.908491,116.374328&radius=1000&key=${key}&referer=微窝`
      }
    }
	}
</script>

<style lang="scss">
.nearby{
  &-menu{
    position: absolute;
    z-index: 99;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    text{
      display: inline-block;
      color: $color-primary;
      background-color: $color-white;
      white-space: nowrap;
    }
  }
}
</style>
