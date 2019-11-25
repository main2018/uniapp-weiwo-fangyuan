<template lang="pug">
  view.page-bg-grey.page-container
    //- 顶部选项
    view.top-tab.mod-bg
      view.tab-item(v-for="(item, index) in navlist" :key="index" :class="{curr:index === navCurrIndex}" @click="tabnav(index)") {{item.title}}
    view.content-wrap(@scroll="contentScroll" :scroll-top="tabScrollTop")
      //- 数据详情
      view.x-form.mod-bg#main-1
        view.title 项目数据
        view.x-form-item
          label.x-form-label 最新开盘：
          view.x-form-content 2019-11-20
        view.x-form-item
          label.x-form-label 预计交房：
          view.x-form-content 2019-11-20
        view.x-form-item
          label.x-form-label 装修情况：
          view.x-form-content 精装
        view.x-form-item
          label.x-form-label 销售状态：
          view.x-form-content 在售
        view.x-form-item
          label.x-form-label 楼盘类型：
          view.x-form-content 未知
        view.x-form-item
          label.x-form-label 产权年限：
          view.x-form-content 70
        view.x-form-item
          label.x-form-label 建筑类型：
          view.x-form-content 高层、住宅
        view.x-form-item
          label.x-form-label 占地面积：
          view.x-form-content 8111.12㎡
        view.x-form-item
          label.x-form-label 建筑面积：
          view.x-form-content 8111.12㎡
        view.x-form-item
          label.x-form-label 容积率：
          view.x-form-content 容积率：
        view.x-form-item
          label.x-form-label 绿化率：
          view.x-form-content 25%
        view.x-form-item
          label.x-form-label 得房率：
          view.x-form-content 25%
        view.x-form-item
          label.x-form-label 规划栋数：
          view.x-form-content 3栋
        view.x-form-item
          label.x-form-label 规划户数：
          view.x-form-content 300栋
        view.x-form-item
          label.x-form-label 车位数：
          view.x-form-content 300位
        view.x-form-item
          label.x-form-label 车位配比：
          view.x-form-content 1:1
        view.x-form-item
          label.x-form-label 物业费：
          view.x-form-content 2.0元/平方/月
        view.x-form-item
          label.x-form-label 物业公司：
          view.x-form-content 暂无
        view.x-form-item
          label.x-form-label 小区配套：
          view.x-form-content 未知
        view.x-form-item
          label.x-form-label 开发商：
          view.x-form-content 海南微窝
        view.x-form-item
          label.x-form-label 售楼处：
          view.x-form-content.color-deep 海南海口龙华区
      //- 预售许可证    
      view.x-form.mod-bg#main-2
        view.title 预售许可证
        view.x-form-item
          label.x-form-label 预售证号：
          view.x-form-content.color-deep 【2019】房预字(0047)号
        view.x-form-item
          label.x-form-label 发证时间：
          view.x-form-content {{"2019-05-01"}}
        view.x-form-item
          label.x-form-label 绑定楼栋：
          view.x-form-content 暂无
      //- 楼盘介绍        
      view.x-form.mod-bg#main-3
        view.title 楼盘介绍
        view.margin-b-40
          |项目位于海口西海岸片区， 海南十里繁华地，东十里是海南商务区，西十里是海口行政区，北走1000步是大海，南靠秀英老城区。“十里繁华，宁静海生活”，闹市区选择这安静的生活空间，无论出租、自主、投资都是首选
      //- 楼盘证件
      view.container.mod-bg#main-4
        view.title 楼盘证件
        view.papers-list
          view.papers-item
            view.img-wrap
              image.img(
              src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg"
              mode="aspectFill"
              )
            view.aux.ellipsis 《营业执照》
          view.papers-item
            view.img-wrap
              image.img(
              src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg"
              mode="aspectFill"
              )
            view.aux.ellipsis 《国有土地使用证》
          view.papers-item
            view.img-wrap
              image.img(
              src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg"
              mode="aspectFill"
              )
            view.aux.ellipsis 《建设用地规划许可证》
          view.papers-item
            view.img-wrap
              image.img(
              src="https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu05-l.jpg"
              mode="aspectFill")
            view.aux.ellipsis 《建筑工程规划许可证》
      //- 看了又看
      //- 看了又看
      view.lookagain.mod-bg
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
            view
              text.iconfont.color-yellow.margin-r-6 &#xe605;
              text 活动描述
      
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
            view
              text.iconfont.color-yellow.margin-r-6 &#xe605;
              text 活动描述
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
            view
              text.iconfont.color-yellow.margin-r-6 &#xe605;
              text 活动描述
    contact
</template>
        
<script>
  import contact from "@/components/contact";
	export default {
		data() {
			return {
        tabScrollTop: 0,
        navCurrIndex: 0,
        navlist:[
          {
            title:'项目数据',
          },
          {
            title:'预售许可证',
          },
          {
            title:'楼盘介绍',
          },
          {
            title:'楼盘证件',
          }
        ]
			}
		},
    components: {
      contact
    },
		methods: {
      //一级分类点击
      tabnav(index){
       /* if(!this.sizeCalcState){
          this.calcSize();
        } */
        this.navCurrIndex = index;
        // this.tabScrollTop = document.querySlector('#main-1').top;
       /* let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
        this.tabScrollTop = this.slist[index].top; */
      },
      // 窗口滚动
      contentScroll(e){
        let scrollTop = e.detail.scrollTop;
      }
			
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
    flex: 1;
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
