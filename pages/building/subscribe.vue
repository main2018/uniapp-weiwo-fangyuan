<template lang="pug">
  view.subscribe.padding-x-40.padding-y-40
    view.subscribe-title.font-weight-bold 联系人信息
    v-input(v-model="name" placeholder="请输入姓名")
    v-input(v-model="phone" placeholder="请输入手机号")
    view.subscribe-title.font-weight-bold.margin-t-100.margin-b-40 目的地楼盘
    card(:data="building && building.info" border)
    
    view.btn.fullwidth.large.primary.bg-yellow-linear.btn-radius-xs(@tap="subscribe") 立即预约
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
        building: null,
        explainShow: false,
        name: '',
        phone: ''
      }
    },
    onLoad(option) {
      const {id, mu, sf, at, dsoid} = option
      this.option = option
      
      this.$api.getPresentBuildingDetail(id, mu, sf, at).then(data => {
        this.building = data
      })
    },
    computed: {
      disabled() {
        const {name, phone} = this
        return !name || !phone
      }
    },
    methods: {
      subscribe() {
        if (this.disabled) {
          return this.$showToast({title: '请输入姓名或手机号'})
        }
        
        const {id, mu, sf, at, openid} = this.option
        
        const data = {
          name: this.name,
          phone: this.phone,
          type: 1,
          did: id,
          openid,
          mu,
          sf,
          at
        }
        this.$api.activityJoin(data).then(async data => {
          await this.$showToast({title: '预约成功'})
          this.$router.back()
        })
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
