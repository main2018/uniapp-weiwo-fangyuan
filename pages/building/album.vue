<template lang="pug">
  //- 顶部分类导航
  scrollnav(:list="normalizeList")
</template>

<script>
  import scrollnav from '@/components/scrollnav.vue'
  
  export default {
    components: {
      scrollnav
    },
    data() {
      return {
        timer: null,
        isClick: false,
        sizeCalcState: false,
        tabScrollTop: 0,
        currentId: 0,
        list: [],
      }
    },
    computed: {
      normalizeList (){
        const arr = this.list.map(item => {
          const list = (item.poster_list || []).map(item => ({
            id: item.id,
            picture: item.screenage,
            cover: item.cover
          }))
          return {
            name: item.type_name,
            list
          }
        })
        return arr
      }
    },
    methods: {},
    onLoad (option) {
      const {id, mu, sf, at} = option
      this.$api.getPoster(id, mu, sf, at).then( data => {
        console.log('data.list', data.list);
        this.list = data.list
      })
    }
  }
</script>

<style lang="scss">
.menu {
  padding: 0 10rpx;
}
.page-album {
  position: relative;
  height: calc(100vh - 44px);
  color: #232529;
  .ww-top-nav-wrap{
    position: relative;
    width: 100%;
    display: flex;
    z-index: 10;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    .scoll-wrapper {
     display:flex;
     align-items: flex-start;
     overflow-x: auto;
     justify-content: space-between;
      .f-item {
        position: relative;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        flex-basis: 80rpx;
        flex-shrink: 0;
        white-space: nowrap;
        font-size: 30rpx;
        font-weight: 700;
        color: #979B9E;
        &.curr {
          color: $color-black;
        }
        &.curr:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 32rpx;
          margin-left: -16rpx;
          height: 0;
          border-bottom: 6rpx solid $color-default;
          border-radius: 6rpx;
        }
      }
    }
    
  }
  .content-wrap {
    height: 100%;
    height: calc(100% - 44px);
    .s-list {
      .s-item {
        height: 60rpx;
        line-height: 60rpx;
        font-size: $font-size-base+2rpx;
        font-weight: 700;
        padding: 30rpx $spacing-xlg;
        display: flex;
      }
      .t-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 $spacing-xlg;
        margin-left: -10rpx;
        .t-item {
          position: relative;
          flex-basis: 33.33%;
          height: 160rpx;
          padding-left: 10rpx;
          padding-bottom: 10rpx;
          box-sizing: border-box;
        }
        .pic {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-color: #f6f6f6;
          z-index: 1;
        }
        .video-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 72rpx;
          height: 72rpx;
          margin-left: -36rpx;
          margin-top: -36rpx;
          z-index: 2;
          background: url(../../common/images/shipingbofang.png);
          background-size: contain;
        }
      }
    }
  }
  
}

</style>