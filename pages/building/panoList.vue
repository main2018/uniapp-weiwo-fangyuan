<template lang="pug">
  empty(v-if="!loading && (!panos || !panos.length)")
  view.pano-list.padding-40(v-else)
    view.pano-list-item.flex.margin-b-20.padding-b-30.border-b-1(
      v-for="item in panos"
      @tap="toPano(item.id, item.hxid)")
      view.pano-list-item-view.margin-r-30
        image(:src="$baseUrl + item.cover" mode="aspectFill")
        text.iconfont.font-size-28.pano &#xe7bc;
      view.flex-1
        view.margin-b-10 {{item.title}}
        view.margin-b-10.font-size-sm.font-color-grey {{item.average_huxing}}
</template>
<script>
  import empty from "@/components/empty";
  
  import {generateGetUrl} from '@/api';
  
  export default {
    comments: {
      empty
    },
    data() {
      return {
        generateGetUrl,
        loading: true,
        panos: null
      }
    },
    onLoad(option) {
      const {id, mu, sf, at, dmid} = option
      this.option = option
      
      this.$api.getHxPanos(id, mu, sf, at, dmid).then(({list}) => {
        console.log('list', list)
        this.panos = list
        this.loading = false
      })
    },
    methods: {
      toPano(dmid, hxid) {
        this.$navigateTo({url: generateGetUrl('/pages/pano/index', {...this.option, dmid, hxid})})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .pano-list{
    &-item{
      &-view{
        position: relative;
        width: 210rpx;
        height: 170rpx;
        image{
          width: 100%;
          height: 100%;
        }
        .pano{
          position: absolute;
          top: 50%;
          left: 50%;
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
</style>
