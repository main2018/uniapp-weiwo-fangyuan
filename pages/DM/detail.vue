<template lang="pug">
  view.dm-detail.padding-40
    template(v-if="!isPano")
      view.dm-detail-title.font-size-36.font-weight-bold {{DmDetailInfo.title}}{{DmDetailInfo.type}}
      view.tags.padding-y-40.border-b-1
        view.btn.btn-sm(v-for="(item, index) in DmDetailInfo.feature_arr" :class="index %2 == 0 ? 'btn-danger' : 'btn-grey'") {{item.tag_name}}
      view.dm-detail-content.margin-b-40.padding-y-40.border-b-1 
        u-parse(:content="DmDetailInfo.introduction || ' '" @preview="preview" @navigate="navigate")
    view.border-b-1.margin-b-20(v-else)
      view.margin-b-20(v-for="item in DmDetailInfo.package")
        view.margin-b-20 {{item.title}}
        image(:src="$baseUrl + item.gallery" mode="aspectFill")
        view(v-html="item.introduction")
    card(
    @click.native="$navigateTo({url: '../building/detail'})"
    :data="building")
    contact(:contact="contact" :option="option")
</template>
<script>
  import card from "@/components/card";
  import contact from "@/components/contact";
  import uParse from '@/components/gaoyia-parse/parse.vue'
  
  import weixin from '@/common/js/weixin';
  
  export default {
    components: {
      card,
      contact,
      uParse
    },
    data() {
      return {
        building: {},
        DmDetailInfo: {},
        DmDetail: null
      }
    },
    computed: {
      contact() {
        const contact = this.DmDetail && this.DmDetail.contact_info
        return (contact && contact.name) ? contact : null
      },
      isPano() {
        const types = [21, 22, 23]
        const {type} = this.DmDetailInfo || {}
        return types.includes(type)
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
      this.option = option
      this.$api.dmDetail(dmid, mu, sf, at).then( data =>{
        this.DmDetailInfo = data.info
        uni.setNavigationBarTitle({
          title: data.info && data.info.title
        });
        // 楼盘详情
        this.$api.getPresentBuildingDetail(this.DmDetailInfo.did, mu, sf, at).then(async data => {
          this.building = data.info || {}
        })
        console.log('DmDetailInfo', this.DmDetailInfo);
        this.DmDetail = data
      })
      weixin.share({
        title: '测试微窝分享',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574153459148&di=aa8c0bbb7f822cea1812ff137c6bb419&imgtype=0&src=http%3A%2F%2Fi8.qhimg.com%2Ft014c0bef2485acc973.jpg'
      })
    },
    onBackPress(options) {
      if (options.from === 'navigateBack') {
        return false;  
      }
      const {id, mu, sf, at} = this.option || {}
      if (!id || (this.total == 1)) {
        return false
      };
      // this.$navigateBack({delta: this.total})
      uni.navigateTo({
        url: generateGetUrl('/pages/building/detail', {id, mu, sf, at})
      })
      return true
    },
  }
</script>
<style lang="scss" scoped>
  @import url("../../components/gaoyia-parse/parse.css");
</style>