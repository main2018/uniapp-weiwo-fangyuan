<template lang="pug">
  view.building-detail
    view.building-detail-header
      swiper.swiper(:indicator-dots="false" :circular="true" :autoplay="false" :interval="2000" :duration="500" :current="currIndex")
        swiper-item.swiper-item(v-for="url in swiperImgs" :key="url")
          image(:src="$baseUrl + url" mode="aspectFill" lazy-load)
      view.swiper-bar.font-size-sm-s
        view.swiper-bar-switch
          view.swiper-bar-switch-btn.padding-x-20.padding-y-5(
            v-for="(swiper, index) in swipers"
            :class="{active: swiperIndex === index}"
            @tap="switchSwiper(index)"
            ) {{swiper.name}}
        text.swiper-bar-number.padding-x-20.padding-y-5 共{{swiperImgs.length}}张
    <!-- view.building-detail-hint.font-size-sm.font-align-center.background-color-grey-l 详细信息及项目动态请咨询置业顾问 -->
    view.building-detail-overview.margin-y-80.padding-x-20
      view.building-detail-overview-title.flex.center.font-size-46.font-weight-bold
        |{{building.project_name}}
        view.rate.font-color-primary.font-size-24.margin-l-20
          text(class="iconfont" v-for="item in 3") &#xe671;
      view.tags.flex.font-size-sm-s.font-color-grey.margin-b-40.padding-y-30
        view.tag.margin-r-20.margin-r-20.padding-10.background-color-grey-l(v-for="tag in 5") 在售
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20 参考均价
        text.font-color-red.font-size-38 {{building.average_price}}元/㎡
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20 最新开盘
        text 10500元/㎡
        text.font-color-grey.margin-l-40.margin-r-20 产权年限
        text 70
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20(:decode="true") {{`售楼处&emsp;`}}
        text.font-color-link(@tap="navigateTo({url: './nearby'})") {{building.modules[0].data[0].content}}
      view.font-size-sm.font-align-center.font-color-primary.background-color-grey-l.margin-t-40.padding-y-20 更多楼盘信息
    view.split
    view.building-detail-item.activity.padding-20
      view.building-detail-item-title.flex.center.margin-b-10
        text.flex-1 优惠活动
        view.button.font-size-24.padding-x-14.padding-y-5.font-color-primary 活动报名
    view.split
    view.building-detail-item.house-type.padding-20
      view.building-detail-item-title.flex.margin-b-10
        text.flex-1 主力户型
        text.font-size-sm 查看全部>
      scroll-view.scroll-view.font-size-sm(scroll-x="true")
        view.scroll-view-item(v-for="url in detail.imgs1" @tap="navigateTo({url: './house'})")
          image(:src="url" mode="aspectFill")
          .scroll-view-item-title.flex.flex-space-b
            text 1案说法
            text.font-color-red 52万起
    view.split
    view.building-detail-item.special.padding-20
      view.building-detail-item-title.flex.margin-b-10
        text.flex-1 特色解读
      view.flex.margin-b-20(v-for="url in detail.imgs1")
        image.margin-r-20(:src="url" mode="aspectFill")
        view.flex-1
          view.margin-b-10 68玩得两侧三方
          view.font-size-sm.font-color-grey 二室二厅/65.84㎡
    view.building-detail-item.special.padding-20
      view.building-detail-item-title.flex.margin-b-10
        text.flex-1 周边配套
      map#map(ref="map" @tap="navigateTo({url: './nearby'})" style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers" :hidden="false")
    view.building-detail-item.habit.padding-20
      view.building-detail-item-title.flex.margin-b-10
        text.flex-1 看了又看
      view.habit-item.flex.margin-b-20(v-for="url in detail.imgs1")
        image.margin-r-20(:src="url" mode="aspectFill")
        view.flex-1
          view.margin-b-10 68玩得两侧三方
          view.font-size-sm.font-color-grey 二室二厅/65.84㎡
          
    contact
      
</template>

<script>
  import contact from "@/components/contact";
  
  export default {
    components: {
      contact
    },
    data() {
      return {
        latitude: 39.909,
        longitude: 116.39742,
        covers: [
          {
            latitude: 39.909,
            longitude: 116.39742,
            iconPath: '../../static/img/weixin.png'
          }
        ],
        currIndex: 0,
        swiperIndex: 0,
        building: {},
        houseTypeImgs: null,
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
    computed: {
      swipers() {
        const cover = this.building && this.building.cover
        const houseTypeImgs = this.houseTypeImgs || []
        return [
          {
            name: '图片',
            list: [cover]
          },
          {
            name: '户型',
            list: houseTypeImgs.map(item => item.screenage)
          }
        ]
      },
      swiperImgs() {
        return this.swipers.reduce((total, curr) => total.concat(curr.list), [])
      }
    },
    onLoad() {
      this.$api.getBuildingDetail(1124).then(data => {
        // this.detail = data
        this.building = data || {}
        console.log('data', data);
      })
      this.$api.dmHouseTypeImgs(1124).then(list => {
        console.log('list', list);
        this.houseTypeImgs = list
      })
    },
    onReady() {
    },
    methods: {
      switchSwiper(index) {
        this.swiperIndex = index
        const switchFirstImg = this.swipers[index].list[0]
        this.currIndex = this.swiperImgs.findIndex(img => img === switchFirstImg)
      },
      navigateTo(obj) {
      	uni.navigateTo(obj);
      },
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
        height: 100%;
      }
    }
    &-bar{
      position: absolute;
      bottom: 5%;
      left: 0;
      width: 100%;
      text-align: center;
      &-switch{
        display: inline-block;
        &-btn{
          display: inline-block;
          border-radius: 20rpx;
          background-color: rgba(225,227,229, .8);
          &:not(:last-child){
            margin-right: 20rpx;
          }
          &.active{
            color: $color-white;
            background-color: $color-primary;
          }
        }
      }
      &-number{
        position: absolute;
        right: 40rpx;
        background-color: rgba(0,0,0,.6);
        border-radius: 20rpx;
        color: $color-white;
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
    &-header{
      position: relative;
      height: 480rpx;
    }
    &-overview{
      &-title{
      }
      .tags{
        border-bottom: 1rpx solid $color-grey-l;
      }
    }
    &-item{
      &-title{
        font-size: 36rpx;
        .button{
          border: 1rpx solid;
        }
      }
      &.activity{
        button{
          border: 1rpx solid currentColor;
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
      &.special{
        image{
          width: 30%;
          height: 150rpx;
        }
      }
      &.habit{
        image{
          width: 30%;
          height: 150rpx;
        }
      }
    }
  }
</style>
