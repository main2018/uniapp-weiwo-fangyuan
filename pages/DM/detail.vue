<template lang="pug">
  view.dm-detail
    view.dm-detail-title BASF撒发生发生发生
    view.tags
      view.btn.btn-sm.btn-disabled(v-for="a, index in 10" :class="{primary: index %2 == 0}") dsfsdf
</template>
<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
