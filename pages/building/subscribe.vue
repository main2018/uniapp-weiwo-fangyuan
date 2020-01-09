<template lang="pug">
  view.subscribe.padding-x-40.padding-y-40
    view.subscribe-title.font-weight-bold 联系人信息
    v-input(v-model="name" placeholder="请输入姓名")
    v-input(v-model="phone" placeholder="请输入手机号")
    view.subscribe-title.font-weight-bold.margin-t-100.margin-b-40 目的地楼盘
    card(:data="building && building.info" border)
    
    view.btn.fullwidth.large.primary.bg-yellow-linear.btn-radius-xs(@tap="subscribe") 立即预约
    view.font-size-24.font-color-link.font-align-center(@tap="explainShow = true") 了解活动说明
    
    layer-explain(v-model="explainShow" title="")
      ul(v-for="item in rule")
        li.rule-title {{item.name}}
        li(v-for="citem in item.list") {{citem}}
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
        phone: '',
        rule: [
          {
            name: '活动规则',
            list: [
              '提交预约信息后，置业顾问将与您取得联系，与您约定看房时间、上车地点、随行人数；',
              '置业顾问根据确认的看房时间、上车地点、随行人数安排车辆带看，目的地默认为报名的楼盘；',
              '看房专车在约定时间约定地点上门接人看房；',
              '看房结束后乘坐车辆返回上车地点；',
              '若行程有变，请及时联系置业顾问。',
            ]
          },
          {
            name: '免责声明',
            list: [
              '为规范微窝房源免费看房活动，明确每位购房网友权责，敬请购房用户仔细阅读并充分理解，凡参与者均视为认同并自愿遵守本声明内容；',
              '在提交预约信息后，您已经同意通过微窝房源平台提供的用车需求，置业顾问将做出合理的努力，让您获得服务，但这受限于您请求服务之时所在周边是否有可提供服务的车辆；',
              '本次免费看房活动以参与者自愿参加、自愿退出为原则；',
              '活动参与者确认免费看房期间的风险及责任均自行承担；',
              '免费看房活动的参与者都应该遵守国家相关法律、法规，一切与活动直接或间接的法律责任均由活动参与者自行承担；',
              '活动参与者实现对本声明条款的含义及相关法律后果全部通晓并充分理解，凡参加本活动者均视为接受本声明。',
            ]
          }
        ]
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
        
        const {id, mu, sf, at} = this.option
        
        const data = {
          name: this.name,
          phone: this.phone,
          type: 1,
          did: id,
          openid: this.$api._getOpenid(),
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
  .rule-title{
    list-style: none;
    text-align: center;
    font-size: 40rpx;
    font-weight: 700;
    line-height: 3;
  }
  .btn{
    margin-top: 246rpx;
  }
  .font-color-link{
    margin-top: 133rpx;
    font-weight: bold;
  }
</style>
