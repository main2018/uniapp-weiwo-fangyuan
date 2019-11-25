<template lang="pug">
  view.fixed(:style="{height: `${height * 2}rpx`}")
    view.fixed-content(:style="style"): slot
</template>
<script>
  export default {
    props: {
      isTop: {
        type: Boolean,
        default: false
      },
      hasBorder: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        height: 0
      }
    },
    computed: {
      style() {
        let obj = this.isTop ? {top: 0} : {bottom: 0}
        if(this.hasBorder) {
          const attr = this.isTop ? 'borderBottom' : 'borderTop'
          obj = Object.assign(obj, {[attr]: '1rpx solid #eee'})
        }
        return obj
      }
    },
    mounted() {
      this.resetHeight()
    },
    methods: {
      resetHeight() {
        this.$nextTick(() => {
          const dom = uni.createSelectorQuery().select(".fixed-content");
          dom.boundingClientRect(data => {
            const {height} = data
            this.height = height
          }).exec()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fixed{
    &-content{
      position: fixed;
      left: 0;
      right: 0;
      box-sizing: border-box;
    }
  }
</style>
