<template lang="pug">
  view.activity-join.padding-x-40
    v-input(v-model="name" placeholder="请输入姓名")
    v-input(v-model="phone" placeholder="请输入手机号")
    view.btn.fullwidth.large.bg-yellow-linear.btn-radius-xs(@tap="join") 马上报名
</template>
<script>
  import vInput from '@/components/input';
  
  import {mixin_share_building} from '@/common/js/mixin'
  
  export default {
    mixins: [mixin_share_building],
    components: {
      vInput
    },
    data() {
      return {
        name:'',
        phone: ''
      }
    },
    onLoad(option) {
      const {id, mu, sf, at, dsoid} = option
      this.option = option
      
      this.$api.getBuildingDetail(id, mu, sf, at).then(data => {
        this.share(data)
      })
    },
    computed: {
      disabled() {
        const {name, phone} = this
        return !name || !phone
      }
    },
    methods: {
      join() {
        if (this.disabled) {
          return this.$showToast({title: '请输入姓名或手机号'})
        }
        
        const {id, mu, sf, at, dsoid} = this.option
        
        const data = {
          name: this.name,
          phone: this.phone,
          type: 2,
          did: id,
          dsoid,
          openid: this.$api._getOpenid(),
          mu,
          sf,
          at
        }
        this.$api.activityJoin(data).then(async data => {
          await this.$showToast({title: '报名成功'})
          this.$router.back()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn{
    margin-top: 300rpx;
  }
</style>
