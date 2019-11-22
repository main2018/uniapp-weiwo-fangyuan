<template lang="pug">
  view.activity
    view.activity-title 手动阀手动阀手动阀手动阀
    rich-text(:nodes="nodes")
    rich-text(:nodes="htmlNodes")
</template>
<script>
  import htmlParser from '@/common/js/html-parser';
  
  export default {
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
  
</style>
