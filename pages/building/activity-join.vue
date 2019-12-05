<template lang="pug">
  view.activity-join.padding-x-40
    v-input(v-model="username" placehloder="请输入姓名")
    v-input(v-model="phone" placehloder="请输入手机号")
    view.btn.fullwidth.large.bg-yellow-linear.btn-radius-xs 马上报名
</template>
<script>
  import vInput from '@/components/input';
  
  export default {
    components: {
      vInput
    },
    data() {
      return {
        username:'',
        phone: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn{
    margin-top: 300rpx;
  }
</style>
