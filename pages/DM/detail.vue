<template lang="pug">
  view.dm-detail.padding-40
    view.dm-detail-title.font-size-36.font-weight-bold {{DmDetailInfo.title}}{{DmDetailInfo.type}}
    view.tags.padding-y-40.border-b-1
      view.btn.btn-sm(v-for="(item, index) in DmDetailInfo.feature_arr" :class="index %2 == 0 ? 'btn-danger' : 'btn-grey'") {{item.tag_name}}
    view.dm-detail-content.margin-b-40.padding-y-40.border-b-1 
      u-parse(:content="DmDetailInfo.introduction || ' '" @preview="preview" @navigate="navigate")
    card(
    @click.native="$navigateTo({url: '../building/detail'})"
    :data="building")
    contact
</template>
<script>
  import card from "@/components/card";
  import contact from "@/components/contact";
  import uParse from '@/components/gaoyia-parse/parse.vue'
  
  export default {
    components: {
      card,
      contact,
      uParse
    },
    data() {
      return {
        building: {},
        DmDetailInfo: {}
      }
    },
    methods: {
      preview(src, e) {
        // do something
      },
      navigate(href, e) {
        // do something
      }
    },
    onLoad(option){
      const {dmid, mu, sf, at} = option
      this.$api.dmDetail(dmid, mu, sf, at).then( data =>{
        this.DmDetailInfo = data.info
        console.log('11111222222222', this.DmDetailInfo.did)
        // 楼盘详情
        this.$api.getPresentBuildingDetail(this.DmDetailInfo.did, mu, sf, at).then(async data => {
          this.building = data.info || {}
          console.log('this.building111111111111111', this.building)
        })
      })
     
    }
  }
</script>
<style lang="scss" scoped>
  @import url("../../components/gaoyia-parse/parse.css");
</style>