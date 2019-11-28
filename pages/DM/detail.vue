<template lang="pug">
  view.dm-detail.padding-40
    view.dm-detail-title.font-size-36 BASF撒发生发生发生
    view.tags.padding-y-40.border-b-1
      view.btn.btn-sm(v-for="a, index in 10" :class="index %2 == 0 ? 'btn-danger' : 'btn-grey'") 环境优美
    view.dm-detail-content.margin-b-40.padding-y-40.border-b-1 项目位于海口西海岸片区,海南实力繁华地
    card(@click.native="$navigateTo({url: '../building/detail'})")
    contact
</template>
<script>
  import card from "@/components/card";
  import contact from "@/components/contact";
  
  export default {
    components: {
      card,
      contact
    },
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  
</style>
