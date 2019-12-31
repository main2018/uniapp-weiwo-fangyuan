<template lang="pug">
  .empty
    |{{title}}
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '数据不存在~'
      }
    },
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .empty{
    text-align: center;
    line-height: 5;
  }
</style>
