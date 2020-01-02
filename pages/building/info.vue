<template lang="pug">
  view.page-bg-grey.page-container
    //- 顶部选项
    view.top-tab.mod-bg
      view.tab-item(v-for="(item, index) in navlist" :key="index" :class="{curr:index === navCurrIndex}" @click="tabnav(index)") {{item.title}}
    scroll-view.content-wrap(scroll-y="true" @scroll="contentScroll" :scroll-top="tabScrollTop" scroll-with-animation)
      //- 数据详情
      view.x-form.mod-bg#floor-1
        view.title 项目数据
        view.x-form-item
          label.x-form-label 最新开盘：
          view.x-form-content {{projectData.opening_date || '未知'}}
        view.x-form-item
          label.x-form-label 预计交房：
          view.x-form-content {{projectData.house_delivery || '未知'}}
        view.x-form-item
          label.x-form-label 装修情况：
          view.x-form-content {{projectData.decoration_state || '未知'}}
        view.x-form-item
          label.x-form-label 销售状态：
          view.x-form-content {{projectData.building_status || '未知'}}
        view.x-form-item
          label.x-form-label 楼盘类型：
          view.x-form-content {{projectData.building_type || '未知'}}
        view.x-form-item
          label.x-form-label(v-if="projectData.property_limit") 产权年限：
          view.x-form-content {{projectData.property_limit+'年' || '未知'}}
        view.x-form-item
          label.x-form-label 建筑类型：
          view.x-form-content {{projectData.houses_type || '未知'}}
        view.x-form-item
          label.x-form-label 占地面积：
          view.x-form-content {{projectData.floor_space+'㎡' || '未知'}}
        view.x-form-item
          label.x-form-label 建筑面积：
          view.x-form-content {{projectData.build_area+'㎡' || '未知'}}
        view.x-form-item
          label.x-form-label 容积率：
          view.x-form-content {{projectData.plot_ratio || '未知'}}
        view.x-form-item
          label.x-form-label 绿化率：
          view.x-form-content {{projectData.greening_rate+'%' || '未知'}}
        view.x-form-item
          label.x-form-label 得房率：
          view.x-form-content {{projectData.house_rate+'%' || '未知'}}
        view.x-form-item
          label.x-form-label 规划栋数：
          view.x-form-content {{projectData.build_num+'栋' || '未知'}}
        view.x-form-item
          label.x-form-label 规划户数：
          view.x-form-content {{projectData.planning_num+'户' || '未知'}}
        view.x-form-item
          label.x-form-label 车位数：
          view.x-form-content {{projectData.carport_num+'位' || '未知'}}
        view.x-form-item
          label.x-form-label 车位配比：
          view.x-form-content {{projectData.parking_ratio || '未知'}}
        view.x-form-item
          label.x-form-label 物业费：
          view.x-form-content {{projectData.property_fee || '未知'}}
        view.x-form-item
          label.x-form-label 物业公司：
          view.x-form-content {{projectData.property_company || '未知'}}
        view.x-form-item
          label.x-form-label 小区配套：
          view.x-form-content {{projectData.estate_mating || '未知'}}
        view.x-form-item
          label.x-form-label 开发商：
          view.x-form-content {{projectData.name_developer || '未知'}}
        view.x-form-item
          label.x-form-label 售楼处：
          view.x-form-content.color-deep {{projectData.sales_office_address || '未知'}}
      //- 预售许可证    
      view.x-form.mod-bg#floor-2
        view.title 预售许可证
        view.x-form-list(v-for="(item, index) in projectData.presales" :key="index")
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
          |{{projectData.intro}}
      //- 楼盘证件
      view.container.mod-bg#floor-4
        view.title 楼盘证件
        view.papers-list
          view.papers-item(v-for="(item, index) in projectData.zhengshu" :key="index")
            view.img-wrap
              image.img(
              :src="$baseUrl+ item.list[0]"
              mode="aspectFill"
              @click="certificateShow(index)"
              )
            view.aux.ellipsis.font-size-28 《{{item.title}}》
      //- 没有了
        view.title 看了又看
        view.ptl-list
          view.ptl-item
            view.flex
              view.pic-wrap
                image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
                view.star-wrap
                  text.iconfont.font-size-24 &#xe671;
                  text.iconfont.font-size-24 &#xe671;
                  text.iconfont.font-size-24 &#xe61c;
              view.text-wrap
                view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
                view.flex.margin-b-12
                  text.font-color-red.font-size-30 1000元/㎡
                view.margin-b-12
                  text.font-size-24 龙华区/1-4室 24-122㎡
                view
                  text.btn.btn-sm.btn-danger 在售
                  text.btn.btn-sm.btn-grey 商住
                  text.btn.btn-sm.btn-grey 首付低
                  text.btn.btn-sm.btn-grey 大型社区
            view.flex.center.padding-t-10
              text.iconfont.color-yellow.margin-r-6 &#xe605;
              text.font-size-24 活动描述活动描述活动描述活动描述活动描述活动描述
          view.ptl-item
            view.flex
              view.pic-wrap
                image.pic(src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg" mode="aspectFill")
                view.star-wrap
                  text.iconfont.font-size-24 &#xe671;
                  text.iconfont.font-size-24 &#xe671;
                  text.iconfont.font-size-24 &#xe61c;
              view.text-wrap
                view.margin-b-12.font-weight-bold.ellipsis 恒大海口文化
                view.flex.margin-b-12
                  text.font-color-red.font-size-30 1000元/㎡
                view.margin-b-12
                  text.font-size-24 龙华区/1-4室 24-122㎡
                view
                  text.btn.btn-sm.btn-danger 在售
                  text.btn.btn-sm.btn-grey 商住
                  text.btn.btn-sm.btn-grey 首付低
                  text.btn.btn-sm.btn-grey 大型社区
            view.flex.center.padding-t-18
              text.iconfont.color-yellow.margin-r-6 &#xe605;
              text.font-size-24 活动描述活动描述活动描述活动描述活动描述活动描述    
    contact
</template>
        
<script>
  import contact from "@/components/contact";
	export default {
    components: {
      contact
    },
		data() {
			return {
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
      this.$api.getProjectData(id, mu, sf, at).then( data => {
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
        this.projectData = data.project_data
        console.log('projectData', this.projectData)
      })
    },
		methods: {
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