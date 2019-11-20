<template lang="pug">
  view.contact.flex.center.padding-20
    image.margin-r-20(src="" mode="aspectFill")
    text.username.flex-1.font-size-lg 小可
    view.button.see 约看房
    view.button.call 打电话
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.contact{
  border-top: 1rpx solid $color-grey;
  image{
    width: 60rpx;
    height: 60rpx;
    border: 1px solid;
    border-radius: 50%;
  }
  .button{
    padding: 0 50rpx;
    line-height: 2.5;
    color: $color-white;
    &.see{
      border-radius: 50rpx 0 0 50rpx;
      background-color: $color-primary;
    }
    &.call{
      border-radius: 0 50rpx 50rpx 0;
      background-color: $color-red;
    }
  }
}
</style>
