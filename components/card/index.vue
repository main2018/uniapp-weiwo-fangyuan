<template lang="pug">
  view.card.margin-b-20.padding-b-30(:class="{'border-b-1': border}"  v-if="data")
    view.card-content.flex
      view.card-content-view.margin-r-30
        view.card-content-view-rate.padding-x-18.padding-y-4.flex.center
          text.iconfont.font-size-18(v-for="(item, index) in 3")
            |{{Number(data.star_level || 0) > index ? '&#xe671;' : '&#xe61c;'}}
        text.iconfont.font-size-20(v-show="data.panorama") &#xe7bc;
        image(:src="$baseUrl + data.cover" mode="aspectFill")
      view.flex-1
        view.margin-b-10 {{data.name_project}}
        view.margin-b-5.font-size-28.font-color-red {{data.average_price}}
        view.font-size-24.font-color-grey.margin-b-4(v-show="data.room_num && data.area_built")
          |{{data.county_name}} {{data.city_name}}/
          |{{data.room_num}} {{data.area_built}}
        view.btn.btn-sm.btn-grey(
          v-for="item, index in tags"
          v-show="index < 4"
          ) {{item}}
    view.card-bottom.flex.center.margin-t-18(v-show="data.markedness")
      text.iconfont.font-color-primary.margin-r-10 &#xe605;
      text.font-size-24 {{data.markedness}}
</template>
<script>
  export default {
    props: {
      data: {
        type: Object,
        default: () => ({
          title: '标题呀',
          cover: '/file_library/png/20190115/5c3da97be5ca5.png',
          type: 21
        })
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      tags() {
        const {building_status, building_type, feature_arr = []} = this.data || {}
        return [...feature_arr, building_status, building_type].filter(item => item)
      }
    },
    methods: {
      isPano(obj) {
        const type = obj && obj.type
        return [21,22,23].includes(Number(type))
      }
    }
  }
</script>
<style lang="scss" scoped>
  .card-content{
    &-view{
      position: relative;
      width: 210rpx;
      height: 170rpx;
      image{
        width: 100%;
        height: 100%;
      }
      &>text, &-rate{
        position: absolute;
        z-index: 1;
        color: $color-white;
        background-color: rgba(0,0,0,.5);
      }
      &-rate{
        top: 10rpx;
        border-radius: 0 16rpx 16rpx 0;
        line-height: 1;
      }
      &>text{
        left: 10rpx;
        bottom: 10rpx;
        width: 40rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        border-radius: 50%;
      }
    }
  }
</style>
