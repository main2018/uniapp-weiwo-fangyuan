<template lang="pug">
  empty(v-if="!loading && !detail")
  view.budling-house(v-else): template(v-if="detail && detail.info")
    view.budling-house-header
      image(:src="$baseUrl + detail.info.cover" mode="aspectFill")
      text.is-pano.iconfont.font-size-42(
        v-show="detail.info.panoramas_hx_num"
        @tap="navigateTo({url: generateGetUrl('/pages/building/panoList', option)})"
        ) &#xe7bc;
    view.budling-house-overview.padding-x-40.padding-t-60
      view.budling-house-overview-title.font-size-36.font-weight-bold {{detail.info.title}}
      view.budling-house-overview-top.flex.padding-y-40.border-b-1
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.info.all_room || '暂无'}}
          text.font-color-grey.font-size-sm-s 居室
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.info.area_built || '暂无'}}
          text.font-color-grey.font-size-sm-s 建筑面积
        view.budling-house-overview-top-item.flex-1.flex.flex-y
          text.font-color-primary.margin-b-10 {{detail.info.price_starting || '暂无'}}
          text.font-color-grey.font-size-sm-s 参考均价
      view.budling-house-overview-content.padding-y-40.border-b-1
        view.font-size-sm(v-for="item in overviews")
          text.font-color-grey.margin-r-20 {{item.name}}:
          text {{item.value}}
        view.font-size-sm
          text.font-color-grey.margin-r-20 建筑类型:
          text {{detail.info.building_type || '未知'}}
        view.font-size-sm
          text.font-color-grey.margin-r-20(@tap="$navigateBack()") 所属楼盘:
          text.font-color-link {{detail.info.name_project || '未知'}}
    view.budling-house-item.analyse.padding-y-40.margin-x-40.border-b-1
      view.budling-house-item-title.font-weight-bold.margin-b-40 户型分析
      view(v-html="detail.info.introduction").margin-b-20
      view(v-for="item in detail.info.package")
        image(:src="$baseUrl + item.gallery" mode="aspectFill")
        view(v-html="item.introduction")
      <!-- image(:src="detail.imgs1[0]" mode="aspectFill") -->
    view.budling-house-item.hint.padding-y-40.margin-x-40.border-b-1
      view.budling-house-item-title.margin-b-30.font-weight-bold 温馨提示
      view.line-h1-5 不同楼栋、楼层、朝向价格不同,详细信息及房源动态请咨询置业顾问
    view.budling-house-item.house-type.padding-40
      view.budling-house-item-title.margin-b-10.font-weight-bold.margin-b-40 本楼盘其他户型
      scroll-view.scroll-view.font-size-sm(scroll-x="true")
        view.scroll-view-item(
          v-for="item in dmList"
          @tap="navigateTo({url: `./house?dmid=${item.id}&id=${option.id}&mu=${option.mu}&sf=${option.sf}&at=${option.at}`})")
          image(:src="$baseUrl + item.gallery" mode="aspectFill")
          text.is-pano.iconfont.font-size-42(v-show="item.panorama") &#xe7bc;
          .scroll-view-item-title.padding-x-20.padding-y-30.line-h1.border-1
            text(decode) {{`${item.defective_room}&nbsp;${item.area_built}`}}
            view.font-color-red.margin-t-20 {{item.price_total || 0}}
    contact
        
</template>

<script>
  import contact from "@/components/contact";
  import empty from "@/components/empty";
  
  import {dmDetail, generateGetUrl} from '@/api';
  
	export default {
    components: {
      contact,
      empty
    },
		data() {
			return {
        generateGetUrl,
        loading: true,
				detail: null,
        dmList: []
			};
		},
    computed: {
      houseTypes() {
        return this.dmList.filter(item => [8,23].includes(Number(item.type)))
      },
      overviews() {
        function normalizeVal(val, unit = '', defat = '未知') {
          return val ? val + unit : defat
        }
        const {average_huxing, area_built, public_area, clear_height, state_decoration, name_units, inside_space, orientations, house_usage} = (this.detail && this.detail.info) || {}
        
        return [
          {name: '套内面积', value: normalizeVal(inside_space || 0)},
          {name: '户型净高', value: normalizeVal(clear_height || 0)},
          {name: '装修标准', value: normalizeVal(state_decoration)},
          {name: '户型朝向', value: normalizeVal(orientations)},
          {name: '户型名称', value: normalizeVal(average_huxing)},
          {name: '所在楼栋', value: normalizeVal(name_units)},
          {name: '房屋用途', value: normalizeVal(house_usage)},
        ]
      }
    },
    async onLoad(option) {
      const {id, mu, sf, at, dmid} = option
      this.option = option
      const detail = await this.$api.dmDetail(dmid, mu, sf, at)
      console.log('detail', detail)
      this.detail = detail || {}
      this.loading = false
      this.$api.getHxDms(id, mu, sf, at, dmid).then(({list}) => {
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
        vertical-align: top;
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
