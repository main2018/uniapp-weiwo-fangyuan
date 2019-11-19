<template lang="pug">
  view.building-detail.content
    view.building-detail-header
      swiper.swiper(:indicator-dots="false" :circular="true" :autoplay="true" :interval="2000" :duration="500")
        swiper-item.swiper-item.uni-bg-red(v-for="item in 10") {{item}}
</template>

<script>
  export default {
    data() {
      return {
        detail: {
        }
      }
    },
    onLoad() {
      this.$api.getBuildingDetail(1124).then(data => {
        this.detail = data
        console.log('data', data);
      })
    }
  }
</script>

<style lang="scss">

</style>
