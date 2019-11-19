<template lang="pug">
  view.building-detail
    view.building-detail-header
      swiper.swiper(:indicator-dots="false" :circular="true" :autoplay="false" :interval="2000" :duration="500")
        swiper-item.swiper-item(v-for="url in detail.imgs1" :key="url")
          image(:src="url" mode="center")
    view.building-detail-hint.font-size-sm.font-align-center.background-color-grey-l 详细信息及项目动态请咨询置业顾问
    view.building-detail-overviewview
      view.building-detail-overview-title.flex.font-size-lg.font-weight-bold
        |新修改完
        view.rate.font-color-primary {{rate(3)}}
      view.tags.flex.font-size-sm.font-color-grey: view.tag.margin-l-20.padding-5.background-color-grey-l(v-for="tag in 5") 在售
</template>

<script>
  export default {
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
          ]
        }
      }
    },
    onLoad() {
      this.$api.getBuildingDetail(1124).then(data => {
        // this.detail = data
        console.log('data', data);
      })
    },
    methods: {
      rate(rate) {
        // return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)
        return "★★★★★☆☆☆☆☆".slice(0, rate)
      }
    }
  }
</script>

<style lang="scss">
.swiper{
  &-item{
    image{
      width: 100%;
    }
  }
}
.building-detail{
  &-hint{
    display: inline-block;
    margin: 20rpx 0 20rpx 50%;
    padding: 10rpx 40rpx;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  &-overview{
    .tags{
    }
  }
}
</style>
