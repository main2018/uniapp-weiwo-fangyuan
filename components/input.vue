<template lang="pug">
  view.input.padding-y-30.flex.center.btn-yuyue(:class="{'border-b-1': border}")
    text.required.font-color-red.margin-r-5 *
    input(
      :type="type"
      :focus="focus"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
      )

</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      focus: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请输入'
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    }
  }
</script>
<style lang="scss" scoped>
  .input{
    input{
      
    }
  }
</style>
