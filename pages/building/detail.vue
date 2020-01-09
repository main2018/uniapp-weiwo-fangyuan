<template lang="pug">
  empty(v-if="!loading && !building")
  view.building-detail(v-else): template(v-if="building")
    view.building-detail-header(@tap="navigateTo({url: `./album?id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})")
      swiper.swiper(:indicator-dots="false" :circular="true" :autoplay="false" :interval="2000" :duration="500" :current="currIndex")
        swiper-item.swiper-item(v-for="(url, index) in swiperImgs" :key="index")
          image(:src="$baseUrl + url" mode="aspectFill" lazy-load)
      view.swiper-bar.font-size-sm-s
        view.swiper-bar-switch
          view.swiper-bar-switch-btn.padding-x-20.padding-y-5(
            v-for="(swiper, index) in swipers"
            v-show="swipers.length > 1"
            :class="{active: swiperIndex === index}"
            @tap.stop="switchSwiper(index)"
            ) {{swiper.name}}
        text.swiper-bar-number.padding-x-20.padding-y-5 共{{swiperImgs.length}}张
    <!-- view.building-detail-hint.font-size-sm.font-align-center.background-color-grey-l 详细信息及项目动态请咨询置业顾问 -->
    view.building-detail-overview.margin-y-80.padding-x-40
      view.building-detail-overview-title.flex.center.font-size-46.font-weight-bold
        |{{building.building_info.name_project}}
        view.rate.font-color-primary.font-size-24.margin-l-20
          text(class="iconfont" v-for="item in building.building_info.star_level") &#xe671;
      view.tags.flex.wrap.font-size-sm-s.font-color-grey.margin-b-40.padding-y-30
        view.tag.btn.btn-grey.btn-sm.margin-b-10(v-for="tag in tags") {{tag}}
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20 参考均价
        text.font-color-red.font-size-38 {{building.building_info.average_price ? `${building.building_info.average_price}元/㎡` : '待定'}}
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20 最新开盘
        text {{building.building_info.opening_date}}
        text.font-color-grey.margin-l-40.margin-r-20 产权年限
        text {{building.building_info.property_limit || '未知'}}
      view.building-detail-overview-item.margin-y-15
        text.font-color-grey.margin-r-20(:decode="true" @tap="navigateTo({url: './nearby'})") {{`售楼处&emsp;`}}
        text.font-color-link(
          @tap="toNearby"
          ) {{building.building_info.province_name + building.building_info.city_name + building.building_info.sales_office_address}}
      view.font-size-sm.font-align-center.font-color-primary.btn-grey.margin-t-40.padding-y-20(
        @tap="navigateTo({url: `./info?id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})"
        ) 更多信息
    view.building-detail-item.activity.padding-x-40(v-if="building.activity_info && building.activity_info.dsoid")
      view.building-detail-item-title.flex.center.margin-b-40
        text.flex-1 优惠活动
        view.button.font-size-24.padding-x-14.padding-y-5.font-color-primary(
          v-show="contact"
          @tap="join"
          ) 活动报名
      image(:src="$baseUrl + building.activity_info.cover" mode="aspectFill" lazy-load @tap="navigateTo({url: `./activity?id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}&dsoid=${building.activity_info.dsoid}`})")
    view.building-detail-item.house-type.padding-40(v-if="hxDms && hxDms.length")
      view.building-detail-item-title.flex.center.margin-b-40
        text.flex-1 主力户型({{hxDms.length}})
        .view.font-size-sm-s.font-color-grey
          text(
            @tap="navigateTo({url: generateGetUrl('/pages/building/housetypelist', option)})"
            ) 查看更多
          text.iconfont.font-size-sm-s &#xe62a;
      scroll-view.scroll-view.font-size-sm(scroll-x="true")
        view.scroll-view-item(v-for="item in hxDms" @tap="navigateTo({url: `./house?dmid=${item.id}&id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})")
          image(:src="$baseUrl + item.gallery" mode="aspectFill")
          text.scroll-view-item-pano.iconfont.font-size-42(v-show="item.panorama") &#xe7bc;
          .scroll-view-item-title.padding-x-20.padding-y-30.line-h1
            text(decode) {{`${item.defective_room}&nbsp;${item.area_built}`}}
            view.font-color-red.margin-t-20 {{item.price_total || 0}}
    view.building-detail-item.special.padding-40(v-if="specialDms && specialDms.length")
      view.building-detail-item-title.flex.margin-b-40
        text.flex-1 特色解读
      view.special-item.flex.margin-b-20.padding-b-20.border-b-1(
        v-for="item in specialDms"
        @tap="toSpecialDetail(item)"
        )
        text.iconfont.font-size-28(v-show="item.panorama") &#xe7bc;
        image.margin-r-20(:src="$baseUrl + item.cover" mode="aspectFill")
        view.flex-1
          view.margin-b-10 {{item.title}}
          <!-- view.font-size-sm.font-color-grey {{`${item.defective_room}/${Math.round(item.area_built || 0)}㎡`}} -->
          view.font-size-sm.font-color-grey {{item.intro}}
    view.building-detail-item.nearby.padding-40(v-if="latlng")
      view.building-detail-item-title.flex.margin-b-40
        text.flex-1 周边配套
      map#map(
        ref="map"
        @tap="toNearby"
        :center="[latlng.lat, latlng.lng]"
        :latitude="latlng.lat"
        :longitude="latlng.lng"
        :markers="covers"
        :hidden="false"
        )
      view.nearby-bar.font-color-grey.flex.center.flex-space-a.font-size-30.padding-y-30.border-1
        view.nearby-bar-item
          text.iconfont.margin-r-8(style="color: #22c392;") &#xe614;
          |公交
        view.nearby-bar-item
          text.iconfont.margin-r-8(style="color: #66a2fe;") &#xe606;
          |学校
        view.nearby-bar-item
          text.iconfont.margin-r-8(style="color: #ff5e3a;") &#xe64d;
          |餐饮
        view.nearby-bar-item
          text.iconfont.margin-r-8(style="color: #fda84e;") &#xe619;
          |购物
        view.nearby-bar-item
          text.iconfont.margin-r-8(style="color: #c86183;") &#xe6a7;
          |医院
    view.building-detail-item.habit.padding-40(v-if="habitDms && habitDms.length")
      view.building-detail-item-title.flex.margin-b-40
        text.flex-1 看了又看
      card(
        v-for="item in habitDms"
        :data="item"
        border
        @click.native="navigateTo({url: generateGetUrl('./detail', Object.assign({}, option, {id: item.id}))})"
        )
          
    contact(:contact="contact" :option="option")
      
</template>

<script>
  import contact from "@/components/contact";
  import card from "@/components/card";
  import empty from "@/components/empty";
  import {generateGetUrl} from '@/api';
  
  const app = getApp()
  
  export default {
    name: 'BuildingDetail',
    components: {
      contact,
      card,
      empty
    },
    data() {
      return {
        generateGetUrl,
        loading: true,
        option: {},
        latlng: null,
        currIndex: 0,
        swiperIndex: 0,
        building: null,
        hxDms: null,
        specialDms: null,
        habitDms: null,
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
      contact() {
        const contact = this.building && this.building.contact_info
        return (contact && contact.name) ? contact : null
      },
      tags() {
        const {building_status, building_type, feature_arr} = this.building && this.building.building_info || {}
        return [building_status, building_type, ...feature_arr]
      },
      covers() {
        if (!this.latlng) return []
        const {name_project, province_name, city_name, sales_office_address} = (this.building && this.building.building_info) || {}
        const fontSize = 14
        const address = province_name + city_name + sales_office_address
        
        const html = `
          <div style="padding: 5px 10px;text-align: center;transform: translateX(-50%);background-color: rgba(255,255,255,.9);">
            <h6 style="font-size: 14px;">${name_project}</h6>
            <p style="font-size: 12px;color: #979B9E;">${address}</p>
          </div>
        `
        return [
          {
            id: 0,
            latitude: this.latlng.lat,
            longitude: this.latlng.lng,
            iconPath: '../../static/img/location.png',
            width: 15,
            // title: 'safaf',
            // callout: {
            //   content: name_project,
            //   display: 'ALWAYS'
            // }
            label: {
              content: html,
              fontSize,
              x: '-9px',
              y: '-5px',
              color: 'black',
            }
          }
        ]
      },
      swipers() {
        const {img_arr, img_hx} = (this.building && this.building.building_info) || {}
        const arr = []
        const imgArrObj = {
          name: '图片',
          list: img_arr
        }
        const imgHxObj = {
          name: '户型',
          list: img_hx
        }
        img_arr && img_arr.length && arr.push(imgArrObj)
        img_hx && img_hx.length && arr.push(imgHxObj)
        console.log('arr', arr)
        return arr
      },
      swiperImgs() {
        return this.swipers.reduce((total, curr) => total.concat(curr.list), [])
      }
    },
    filters: {
      filterAddress(val) {
        return val && val.modules && val.modules[0] && val.modules[0].data && val.modules[0].data[0] && val.modules[0].data[0].content
      }
    },
    onShow() {
      // 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    },
    watch: {
      building() {
        this.share()
      },
      '$route.query': {
        handler(option) {
          const pageName = 'pages-building-detail'
          const currPageName = this.$route.meta.name
          if (currPageName != pageName) return
          const {id, mu, sf, at} = option
          this.option = option
          
          // if (!id || !mu || !sf || !at) return
          if (!id) return
          // console.log('id, mu, sf, at', id, mu, sf, at);
          // console.log('text', app.globalData.text);
          this.$api.getBuildingDetail(id, mu, sf, at).then(async data => {
            // this.detail = data
            this.building = data || {}
            const {lat, lng} = this.building.building_info || {}
            const latlng = await this.$api.convertCoordinate(lat, lng)
            this.latlng = latlng
            this.loading = false
          })
          this.$api.getHxDms(id, mu, sf, at).then(({list}) => {
            // this.detail = data
            this.hxDms = list
          })
          this.$api.getSpecialDms(id, mu, sf, at).then(({list}) => {
            // this.detail = data
            this.specialDms = list
          })
          this.$api.getHabitDms(id, mu, sf, at).then(({list}) => {
            this.habitDms = list
          })
        },
        immediate: true
      }
    },
    onLoad(option) {
      // const {id, mu, sf, at} = option
      // this.option = option
      
      // // if (!id || !mu || !sf || !at) return
      // if (!id) return
      // console.log('id, mu, sf, at', id, mu, sf, at);
      // // console.log('text', app.globalData.text);
      // this.$api.getBuildingDetail(id, mu, sf, at).then(async data => {
      //   // this.detail = data
      //   this.building = data || {}
      //   const {lat, lng} = this.building.building_info || {}
      //   const latlng = await this.$api.convertCoordinate(lat, lng)
      //   this.latlng = latlng
      //   this.loading = false
      // })
      // this.$api.getHxDms(id, mu, sf, at).then(({list}) => {
      //   // this.detail = data
      //   this.hxDms = list
      // })
      // this.$api.getSpecialDms(id, mu, sf, at).then(({list}) => {
      //   // this.detail = data
      //   this.specialDms = list
      // })
      // this.$api.getHabitDms(id, mu, sf, at).then(({list}) => {
      //   this.habitDms = list
      // })
    },
    async onReady() {
    },
    activated() {
    },
    methods: {
      share() {
        console.log('this.building', this.building);
        // #ifdef H5
        const {
          tagline = '',
          name_project = '',
          province_name = '',
          city_name = '',
          building_status = '',
          building_type = '',
          
          start_price,
          average_price,
          max_price,
          
          cover: imgUrl,
        } = (this.building && this.building.building_info) || {}
        const startPrice = start_price ? `起价${start_price}元/㎡` : ''
        const averagePrice = average_price ? `均价${average_price}元/㎡` : ''
        const maxPrice = max_price ? `顶价${max_price}元/㎡` : ''
        const shareConfig = {
          title: `${tagline} 【${province_name}·${city_name}·${name_project}】 [${building_status}][${building_type}]`,
          desc: `${startPrice} ${averagePrice} ${maxPrice}`,
          imgUrl: this.$baseUrl + imgUrl,
        }
        console.log('shareConfig', shareConfig);
        this.$weixin.share(shareConfig, this.shareStatistics)
        // #endif
      },
      shareStatistics() {
        const {id: id_subject, mu, sf, at} = this.option || {}
        const data = {
          subject: 2,
          id_subject,
          type: 2,
          mu,
          sf,
          at,
        }
        this.$api.statistics(data)
      },
      toNearby() {
        const latlng = this.latlng || {}
        // `./nearby?lat=${latlng.lat}&lng=${latlng.lng}`
        this.$navigateTo({url: generateGetUrl('./nearby', {...latlng, ...this.option || {}})})
      },
      toSpecialDetail(item) {
        const isPano = [21, 22].includes(Number(item && item.type))
        const data = {
          dmid: item && item.id,
          ...this.option
        }
        if (isPano) {
          
          this.$navigateTo({url: generateGetUrl('/pages/pano/index', data)})
        } else {
          this.$navigateTo({url: generateGetUrl('/pages/DM/detail', data)})
        }
      },
      join() {
        const {id, mu, sf, at} = this.option
        const dsoid = this.building && this.building.activity_info && this.building.activity_info.dsoid
        this.$navigateTo({url: `./activity-join?id=${id}&mu=${mu}&sf=${sf}&at=${at}&dsoid=${dsoid}`})
      },
      isPano(obj) {
        const type = obj && obj.type
        return [21,22,23].includes(Number(type))
      },
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
  #map{
    width: 100%;
    height: 290rpx;
  }
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
        image{
          width: 100%;
          height: 190rpx;
        }
      }
      &.house-type{
        .scroll-view{
          white-space: nowrap;
          &-item{
            position: relative;
            display: inline-block;
            width: 60%;
            border: 1rpx solid $color-grey-l;
            &:not(:last-child){
              margin-right: 20rpx;
            }
            &-pano{
              position: absolute;
              top: 150rpx;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 88rpx;
              height: 88rpx;
              line-height: 88rpx;
              text-align: center;
              background-color: rgba(0,0,0,.5);
              border-radius: 50%;
              color: $color-white;
            }
            image{
              width: 100%;
              height: 300rpx;
            }
          }
        }
      }
      &.special{
        image{
          width: 200rpx;
          height: 164rpx;
        }
        .special-item{
          position: relative;
          .iconfont{
            position: absolute;
            z-index: 2;
            top: 82rpx;
            left: 100rpx;
            transform: translate(-50%, -50%);
            width: 60rpx;
            height: 60rpx;
            line-height: 60rpx;
            text-align: center;
            background-color: rgba(0,0,0,.5);
            border-radius: 50%;
            color: $color-white;
          }
        }
      }
        
    }
  }
</style>
