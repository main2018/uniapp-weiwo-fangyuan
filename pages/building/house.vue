<template lang="pug">
  view.budling-house
    view.budling-house-header
      image(:src="$baseUrl + detail.cover" mode="aspectFill")
      text.is-pano.iconfont.font-size-42(v-show="isPano(detail)" @tap="navigateTo({url: `../pano/index?id=2248`})") &#xe7bc;
    view.budling-house-overview.padding-x-40.padding-t-60
      view.budling-house-overview-title.font-size-36.font-weight-bold {{detail.title}}
      view.budling-house-overview-top.flex.padding-y-40.border-b-1
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.all_room}}
          text.font-color-grey.font-size-sm-s 居室
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.area_built}}㎡
          text.font-color-grey.font-size-sm-s 建筑面积
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.price_starting || '暂无'}}
          text.font-color-grey.font-size-sm-s 参考均价
      view.budling-house-overview-content.padding-y-40.border-b-1
        view.font-size-sm(v-for="item in overviews")
          text.font-color-grey.margin-r-20 {{item.name}}:
          text {{item.value}}
        view.font-size-sm
          text.font-color-grey.margin-r-20 建筑类型:
          text 多层 复式 洋房
        view.font-size-sm
          text.font-color-grey.margin-r-20 所属楼盘:
          text.font-color-link 新秀海湾
    view.budling-house-item.analyse.padding-y-40.margin-x-40.border-b-1
      view.budling-house-item-title.font-weight-bold.margin-b-40 户型分析
      |sdfsdfgsdg
      <!-- image(:src="detail.imgs1[0]" mode="aspectFill") -->
    view.budling-house-item.hint.padding-y-40.margin-x-40.border-b-1
      view.budling-house-item-title.margin-b-30.font-weight-bold 温馨提示
      view.line-h1-5 不同楼栋、楼层、朝向价格不同,详细信息及房源动态请咨询置业顾问
    view.budling-house-item.house-type.padding-40
      view.budling-house-item-title.margin-b-10.font-weight-bold.margin-b-40 本楼盘其他户型
      scroll-view.scroll-view.font-size-sm(scroll-x="true")
        view.scroll-view-item(v-for="item in houseTypes")
          image(:src="$baseUrl + item.cover" mode="aspectFill")
          text.is-pano.iconfont.font-size-42(v-show="isPano(item)") &#xe7bc;
          .scroll-view-item-title.padding-x-20.padding-y-30.line-h1.border-1
            text(decode) {{`${item.defective_room}&nbsp;${Math.round(item.area_built || 0)}㎡`}}
            view.font-color-red.margin-t-20 {{item.total_price_min || 0}}万起
    contact
        
</template>

<script>
  import contact from "@/components/contact";
  
  import {dmDetail} from '@/api';
  
	export default {
    components: {
      contact
    },
		data() {
			return {
				detail: {},
        dmList: []
			};
		},
    computed: {
      houseTypes() {
        return this.dmList.filter(item => [8,23].includes(Number(item.type)))
      },
      overviews() {
        const {area_built, public_area, clear_height, state_decoration, name_units} = this.detail
        
        return [
          {name: '套内面积', value: (area_built - public_area) || 0},
          {name: '套内面积', value: clear_height || 0},
          {name: '装修标准', value: state_decoration || '未知'},
          {name: '户型朝向', value: clear_height || 0},
          {name: '户型名称', value: 'B'},
          {name: '所在楼栋', value: name_units || '未知'},
          {name: '房屋用途', value: '住宅'},
        ]
      }
    },
    async onLoad() {
      const id = 31
      const detail = await dmDetail(698)
      this.detail = detail || {}
      console.log('detail',detail);
      this.$api.buildingDms(id).then(({list}) => {
        console.log('list', list);
        this.dmList = list || []
      })
    },
    methods: {
      isPano(obj) {
        const type = obj && obj.type
        return [21,22,23].includes(Number(type))
      },
      navigateTo(obj) {
      	uni.navigateTo(obj);
      }
    }
	}
</script>

<style lang="scss">
.budling-house{
  .is-pano{
    position: absolute;
    width: 90rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(0,0,0,.5);
    color: $color-white;
  }
  &-header{
    position: relative;
    image{
      width: 100%;
      vertical-align: top;
    }
    .is-pano{
      left: 5%;
      bottom: 10%;
    }
  }
  &-overview{
    &-content{
      line-height: 2;
      >view{
        display: inline-block;
        width: 50%;
      }
    }
  }
  &-item{
    &.analyse{
      image{
        width: 100%;
      }
    }
    &.house-type{
      .scroll-view{
        white-space: nowrap;
        &-item{
          position: relative;
          display: inline-block;
          width: 60%;
          &:not(:last-child){
            margin-right: 40rpx;
          }
          .is-pano{
            top: 150rpx;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          image{
            width: 100%;
            height: 300rpx;
          }
        }
      }
    }
  }
}
</style>
