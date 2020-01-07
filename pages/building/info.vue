<template lang="pug">
  view.page-bg-grey.page-container
    //- 顶部选项
    view.top-tab.mod-bg
      view.tab-item(v-for="(item, index) in navlist" :key="index" :class="{curr:index === navCurrIndex}" @click="tabnav(index)") {{item.title}}
    scroll-view.content-wrap(scroll-y="true" @scroll="contentScroll" :scroll-top="tabScrollTop" scroll-with-animation)
      //- 数据详情
      view.x-form.mod-bg#floor-1
        view.title 项目数据
        view.x-form-item(v-for="val, name in dataList")
          label.x-form-label {{name}}：
          view.x-form-content {{val}}
        view.x-form-item
          label.x-form-label 售楼处：
          view.x-form-content(v-if="projectData.sales_office_address") 暂无
          view.x-form-content.color-deep(
            v-else
            @tap="toNearby"
            ) {{projectData.sales_office_address}}

      //- 预售许可证    
      view.x-form.mod-bg#floor-2
        view.title 预售许可证
        view.margin-b-20(v-if="!projectData.presales || !projectData.presales.length") 暂无
        view.x-form-list(v-else v-for="(item, index) in projectData.presales" :key="index")
          view.x-form-item(@click="isShowGallery = !isShowGallery")
            label.x-form-label 预售证号：
            view.x-form-content.color-deep {{item.cardno || '暂无'}}
          view.x-form-item(v-show="isShowGallery && item.gallery")
            image(:src="$baseUrl + item.gallery" mode="aspectFit")
          view.x-form-item
            label.x-form-label 发证时间：
            view.x-form-content {{item.opening_date || '暂无'}}
          view.x-form-item
            label.x-form-label 绑定楼栋：
            view.x-form-content {{item.building || '暂无'}}
      //- 楼盘介绍        
      view.x-form.mod-bg#floor-3
        view.title 楼盘介绍
        view.margin-b-40
          |{{projectData.intro || '暂无'}}
      //- 楼盘证件
      view.container.mod-bg#floor-4
        view.title 楼盘证件
        view.papers-list
          view.papers-item(v-if="!projectData.zhengshu || !projectData.zhengshu.length") 暂无
          view.papers-item(v-for="(item, index) in projectData.zhengshu" :key="index")
            view.img-wrap
              image.img(
              :src="$baseUrl+ item.list[0]"
              mode="aspectFill"
              @click="certificateShow(index)"
              )
            view.aux.ellipsis.font-size-28 《{{item.title}}》
      view.container.mod-bg
        view.title 看了又看
        card(
          v-for="item in habitDms"
          :data="item"
          border
          @click.native="$navigateTo({url: generateGetUrl('./detail', Object.assign({}, option, {id: item.id}))})"
          )
        
        
    contact(:contact="contact" :option="contactOption")
</template>
        
<script>
  import contact from "@/components/contact";
  import card from "@/components/card";
  import {generateGetUrl} from '@/api';
  
	export default {
    components: {
      contact,
      card
    },
		data() {
			return {
        generateGetUrl,
        habitDms: null,
        projectDataFull: null,
        projectData: {},
        isShowGallery: false,
        certificateNames: {
          licence_business: "营业执照",
          licence_constructor: "建筑工程施工许可证",
          licence_land: "国有土地使用证",
          licence_planning: "建设用地规划许可证",
          licence_project: "建筑工程规划许可证",
          licence_presale: "商品房预售许可证"
        },
        tabScrollTop: 0,
        navCurrIndex: 0,
        sizeCalcState:false,
        navlist:[
          {
            title:'项目数据',
            id: '1'
          },
          {
            title:'预售许可证',
            id: '2'
          },
          {
            title:'楼盘介绍',
            id: '3'
          },
          {
            title:'楼盘证件',
            id: '4'
          }
        ]
			}
		},
    onLoad(option) {
      const {id, mu, sf, at} = option
      this.option = option
      this.$api.getProjectData(id, mu, sf, at).then(async data => {
        // console.log('getProjectData', data)
         data.project_data.zhengshu = []
         for (let [key, value] of Object.entries(data.project_data)) {
           if (key === 'licence_business' ||
             key === 'licence_constructor' ||
             key === 'licence_land' ||
             key === 'licence_planning' ||
             key === 'licence_project'
           ) {
            if (value.length >0) {
              data.project_data.zhengshu.push({
                title: this.certificateNames[key],
                name: key,
                list: value
              })
              // value.forEach ((val, i)=> { value[i] = {src: $baseUrl(val)}})
              // data.zhengshu.push({
              //   title: this.certificateNames[k],
              //   name: key,
              //   list: value
              // })
            }
           }
         }
        this.projectDataFull = data
        this.projectData = data.project_data
        uni.setNavigationBarTitle({
          title: data.project_data && data.project_data.name_project
        });
        const {lat, lng} = this.projectData || {}
        const latlng = await this.$api.convertCoordinate(lat, lng)
        this.latlng = latlng
        console.log('contact', this.contact)
      })
      this.$api.getHabitDms(id, mu, sf, at).then(({list}) => {
        this.habitDms = list
      })
    },
		computed: {
      contactOption() {
        const {openid} = this.projectDataFull || {}
        return {...this.option, openid}
      },
      contact() {
        const contact = this.projectDataFull && this.projectDataFull.contact_info
        return (contact && contact.name) ? contact : null
      },
      dataList() {
        const {
          opening_date,
          house_delivery,
          decoration_state,
          building_status,
          building_type,
          property_limit,
          houses_type,
          floor_space,
          build_area,
          plot_ratio,
          greening_rate,
          house_rate,
          build_num,
          planning_num,
          carport_num,
          parking_ratio,
          property_fee,
          property_company,
          estate_mating,
          name_developer,
          // sales_office_address,
        } = this.projectData || {}
        function normalizeVal(val, unit = '', defat = '暂无') {
          return val ? val + unit : defat
        }
        
        return {
          '最新开盘': normalizeVal(opening_date),
          '预计交房': normalizeVal(house_delivery),
          '装修情况': normalizeVal(decoration_state),
          '销售状态': normalizeVal(building_status),
          '楼盘类型': normalizeVal(building_type),
          '产权年限': normalizeVal(property_limit),
          '建筑类型': normalizeVal(houses_type),
          '占地面积': normalizeVal(floor_space),
          '建筑面积': normalizeVal(build_area),
          '容积率': normalizeVal(plot_ratio),
          '绿化率': normalizeVal(greening_rate),
          '得房率': normalizeVal(house_rate),
          '规划栋数': normalizeVal(build_num),
          '规划户数': normalizeVal(planning_num),
          '车位数': normalizeVal(carport_num),
          '车位配比': normalizeVal(parking_ratio),
          '物业费': normalizeVal(property_fee),
          '物业公司': normalizeVal(property_company),
          '小区配套': normalizeVal(estate_mating),
          '开发商': normalizeVal(name_developer),
          // '售楼处': normalizeVal(sales_office_address),
        }
      }
    },
    methods: {
      toNearby() {
        const latlng = this.latlng || {}
        // `./nearby?lat=${latlng.lat}&lng=${latlng.lng}`
        this.$navigateTo({url: generateGetUrl('./nearby', {...latlng, ...this.option || {}})})
      },
      //一级分类点击
      tabnav(index){
       if(!this.sizeCalcState){
          this.calcSize()
        }
        this.navCurrIndex = index;
        this.tabScrollTop = this.navlist[index].top;
      },
      //计算每个tab的高度等信息
      calcSize() {
        let h = 0;
        this.navlist.forEach(item=>{
          let view = uni.createSelectorQuery().select("#floor-" + item.id);
          view.fields({
            size: true
          },data => {
            item.top = h;
            h += data.height;
            item.bottom = h;
          }).exec();
        })
        this.sizeCalcState = true;
      },
      // 窗口滚动
      contentScroll(e){
        if(!this.sizeCalcState){
        	this.calcSize();
        }
        let scrollTop = e.detail.scrollTop;
        let tabs = this.navlist.filter(item=>item.top <= scrollTop).reverse();
        if(tabs.length > 0){
        	this.navCurrIndex = tabs[0].id-1;
          this.tabScrollTop = scrollTop
        }
      },
      // 证书预览
      certificateShow (index) {
        // console.log(this.projectData.zhengshu[index].list)
        let list = this.projectData.zhengshu[index].list.map( p => {
          return this.$baseUrl + p;
        });
        uni.previewImage({
          current: list[0],
          indicator: "number",
          urls: list
        })
        // this.$refs.certificatePreviewer[key].show(0)
      },
		}
	}
</script>

<style lang="scss">
.color-yellow {
  color: #fda84e;
}
.color-deep{
  color: #305E8F;
 }
.page-container {
  position: relative;
  height: calc(100vh - 44px);
  color: #232529;
  display: flex;
  flex-direction: column;
  .content-wrap {
    height: 100%;
    overflow-y:auto;
   -webkit-overflow-scrolling: touch;
  }
}
.top-tab {
  display: flex;
  border-bottom: 1rpx solid #eee;
  .tab-item {
    position:relative;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 20rpx 0;
    color: #979B9E;
    font-weight: 700;
    &.curr {
      color: $color-black;
      &::after {
        content:'';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 32rpx;
        height: 0;
        margin-left: -16rpx;
        border-bottom: 6rpx solid $color-default;
      }
    }
  }
  
}
    
.x-form {
  padding: 0 $spacing-xlg;
  color: #474B4E;
  &::after{
    content: "";
    width: 100%;
    height: 0;
    border-bottom: 1px solid #eee;
    display: block;
  }
  .title {
    font-size: 36rpx;
    padding: 40rpx 0;
    font-weight: 700;
  }
  .x-form-item {
    display: flex;
    line-height: 40rpx;
    margin-right: 20rpx;
    margin-bottom: 40rpx;
    .x-form-label {
      width: 160rpx;
      margin-right: 10rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $uni-text-color-grey;
      font-size: 30rpx;
    }
  }
}
.container {
  padding: 0 $spacing-xlg;
  &::after{
    content: "";
    width: 100%;
    height: 0;
    border-bottom: 1px solid #eee;
    display: block;
  }
  .title {
    font-size: 36rpx;
    padding: 40rpx 0;
    font-weight: 700;
  }
  .papers-list {
    display: flex;
    flex-wrap: wrap;
    margin-right: -$spacing-base;
    .papers-item {
      width:50%;
      padding: 0 $spacing-base $spacing-base 0;
      box-sizing: border-box;
      .img-wrap {
        position:relative;
        width: 184rpx;
        height: 120rpx;
        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .aux {
        text-align: left;
        padding: 16rpx 0;
        font-size: 30rpx;
      }
    }
  }
}
.lookagain {
   padding: 0 $spacing-xlg;
   &::after{
     content: "";
     width: 100%;
     height: 0;
     border-bottom: 1px solid #eee;
     display: block;
   }
  .title {
    font-size: 36rpx;
    padding: 40rpx 0;
    font-weight: 700;
  }
}
.ptl-list {
  .ptl-item {
    display: flex;
    flex-direction: column;
    padding-bottom: 30rpx;
    margin-bottom: 30rpx;
    border-bottom: 1rpx solid #eee;
    &:last-child {
      border: none;
    }
    .pic-wrap {
      position: relative;
      width: 200rpx;
      height: 164rpx;
      margin-right: $spacing-base;
      .pic {
        width: 100%;
        height: 100%;
      }
      .star-wrap {
        position: absolute;
        top: 12rpx;
        left: 0;
        background-color: rgba(0,0,0,.5);
        height: 32rpx;
        line-height: 32rpx;
        padding: 0 16rpx;
        color: #fff;
        border-top-right-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
        display: flex;
        align-items: center;
      }
    }
    .text-wrap {
      flex: 1;
      line-height: 1;
    }
  }
}
</style>