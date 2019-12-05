<template lang="pug">
  view.activity.padding-x-40.padding-y-30
    view.activity-title.font-weight-bold.font-size-36.margin-b-40 手动阀手动阀手动阀手动阀
    <!-- rich-text(:nodes="nodes") -->
    rich-text(:nodes="htmlNodes")
    fixed(hasBorder)
      view.padding-x-40.padding-y-20
        view.btn.fullwidth.large.primary.bg-yellow-linear.btn-radius-xs(@click="$navigateTo({url: './activity-join'})") 活动报名
</template>
<script>
  import htmlParser from '@/common/js/html-parser';
  import Fixed from '@/components/fixed';
  
  export default {
    components: {
      Fixed
    },
    data() {
      return {
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
        return htmlParser(this.strings)
      }
    },
    onLoad() {
    }
  }
</script>
<style lang="scss" scoped>
  .activity{
  }
</style>
