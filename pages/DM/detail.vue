<template lang="pug">
  view.dm-detail.padding-40
    template(v-if="!isPano")
      view.dm-detail-title.font-size-36.font-weight-bold {{DmDetailInfo.title}}
      view.tags.padding-y-40.border-b-1
        view.btn.btn-sm(v-for="(item, index) in DmDetailInfo.feature_arr" :class="index %2 == 0 ? 'btn-danger' : 'btn-grey'") {{item.tag_name}}
      view.dm-detail-content.margin-b-40.padding-y-40.border-b-1 
        u-parse(:content="DmDetailInfo.introduction || ' '" @preview="preview" @navigate="navigate")
    view.border-b-1.margin-b-20(v-else)
      view.margin-b-20(v-for="item in DmDetailInfo.package")
        view.margin-b-20 {{item.title}}
        image(v-for="citem in item.gallery" :src="$baseUrl + citem" mode="aspectFill")
        view(v-html="item.introduction")
    card(
      @click.native="$navigateTo({url: `/pages/building/detail?id=${DmDetailInfo.did}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})"
      :data="building"
      )
    contact(:contact="contact" :option="option")
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
        DmDetailInfo: {},
        DmDetail: null
      }
    },
    computed: {
      openid() { return this.$store.state.openid },
      contact() {
        const contact = this.DmDetail && this.DmDetail.contact_info
        return (contact && contact.name) ? contact : null
      },
      isPano() {
        const types = [21, 22, 23]
        const {type} = this.DmDetailInfo || {}
        return types.includes(Number(type))
      }
    },
    watch: {
      openid: {
        handler() {
          this.hitsStatistics()
          
          this.agencyRed()
        },
        immediate: true
      },
    },
    methods: {
      agencyRed() {
        this.$nextTick(() => {
          const {mu, dmid, id_push_log} = this.option || {}
          this.$api.agencyRed(mu, dmid, id_push_log, this.openid)
            .finally(() => {
              delete this.option.id_push_log
            })
        })
      },
      // 浏览统计
      hitsStatistics() {
        this.$nextTick(() => {
          if (this.$weixin.isWechat() && !this.openid) return
          const {dmid, mu, sf, at} = this.option || {}
          
          const data = {
            subject: 1,
            id_subject: dmid,
            type: 1,
            mu,
            sf,
            at,
            openid: this.openid
          }
          this.$api.statistics(data)
        })
      },
      share() {
        // #ifdef H5
        const {
          type,
          intro = '',
          
          title = '',
          province_name = '',
          city_name = '',
          name_project = '',
          
          building_status = '',
          building_type = '',
          
          all_room = '',
          area_built = '',
          
          cover: imgUrl,
        } = this.DmDetailInfo || {}
        const isPano = [21, 22].includes(Number(type))
        
        const introductionText = intro.replace(/<\/?.+?>/g, "").replace(/&nbsp;/g, "")
        const introduction = introductionText.substr(0, 15) + '...'
        const {name = '', mobile = ''} = (this.DmDetail && this.DmDetail.contact_info) || {}
        const newsletter = `${name} ${mobile}`
        const desc = type == 8 ? `${all_room ? all_room + '/' : ''}${area_built}\n${newsletter}` : `${introduction}\n ${newsletter}`
        const shareConfig = {
          title: `${title} 【${province_name}${city_name}·${name_project}】${isPano ? '(3D)' : ''}`,
          desc,
          imgUrl: this.$baseUrl + imgUrl,
        }
        console.log('shareConfig', shareConfig);
        this.$weixin.share(shareConfig, this.shareStatistics)
        // #endif
      },
      shareStatistics() {
        const {dmid: id_subject, mu, sf, at} = this.option || {}
        const data = {
          subject: 1,
          id_subject,
          type: 2,
          mu,
          sf,
          at,
        }
        this.$api.statistics(data)
      },
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
        this.share()
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
  
  image{
    max-width: 100%;
  }
</style>