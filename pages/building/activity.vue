<template lang="pug">
  empty(v-if="!loading && !activity")
  view.activity.padding-x-40.padding-y-30(v-else)
    view.activity-title.font-weight-bold.font-size-36.margin-b-40 {{activity && activity.title}}
    <!-- rich-text(:nodes="nodes") -->
    rich-text(:nodes="htmlNodes")
    fixed(hasBorder v-show="contact")
      view.padding-x-40.padding-y-20
        view.btn.fullwidth.large.primary.bg-yellow-linear.btn-radius-xs(@click="join") 活动报名
</template>
<script>
  import htmlParser from '@/common/js/html-parser';
  import Fixed from '@/components/fixed';
  import empty from "@/components/empty";
  
  export default {
    components: {
      Fixed,
      empty
    },
    data() {
      return {
        loading: true,
        activity: null,
        nodes: [
          {
            name: 'div',
            attrs: {
              class: 'div-class',
              style: 'line-height: 60px; color: red; text-align:center;'
            },
            children: [
              {
                type: 'text',
                text: 'Hello&nbsp;uni-app!'
              }
            ]
          }
        ],
        strings: '<div style="text-align:center;"><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
      }
    },
    computed: {
      htmlNodes() {
        const content = (this.activity && this.activity.content) || ''
        return htmlParser(content)
      },
      contact() {
        const contact = this.activity && this.activity.contact_info
        return (contact && contact.name) ? contact : null
      },
    },
    onLoad(option) {
      const {id, mu, sf, at, dsoid} = option
      this.option = option
      
      this.$api.getActivity(id, mu, sf, at, dsoid).then(data => {
        console.log('data', data)
        this.activity = data
        this.loading = false
      })
    },
    methods: {
      join() {
        const {id, mu, sf, at, dsoid} = this.option
        const {openid} = this.activity || {}
        this.$navigateTo({url: `./activity-join?id=${id}&mu=${mu}&sf=${sf}&at=${at}&dsoid=${dsoid}&openid=${openid}`})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .activity{
  }
</style>
