<template lang="pug">
  view.subscribe.padding-x-40.padding-y-40
    view.subscribe-title.font-weight-bold 联系人信息
    v-input(v-model="username" placehloder="请输入姓名")
    v-input(v-model="phone" placehloder="请输入手机号")
    view.subscribe-title.font-weight-bold.margin-t-100.margin-b-40 目的地楼盘
    card(border)
    
    view.btn.fullwidth.large.primary 立即预约
    view.font-size-24.font-color-link.font-align-center(@tap="explainShow = true") 了解活动说明
    
    layer-explain(v-model="explainShow" title="活动说明")
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
      |ds的事故发生的故事大概多少对股市大幅改善翻跟斗翻跟斗翻跟斗翻跟斗
</template>
<script>
  import vInput from '@/components/input';
  import card from "@/components/card";
  import layerExplain from "@/components/layer/explain";
  
  export default {
    components: {
      vInput,
      card,
      layerExplain
    },
    data() {
      return {
        explainShow: false,
        username: '',
        phone: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn{
    margin-top: 246rpx;
  }
  .font-color-link{
    margin-top: 133rpx;
    font-weight: bold;
  }
</style>
