<template>
  <div class="pano-details">
    <div class="">
      <div class="" ref="panoParent">
        <div class="pos_r w_100 zIndex300">
          <section>
            <div ref="panorama" id="panorama" class=""  @tap="panolensContainerFunc">
              <div ref="panolensContainer" id="panolensContainer" class="panolens-container" style="width: 100%; height: 100%; position: absolute; background-color: rgb(0, 0, 0);"></div>
            </div>
          </section>
          <view class="building-name font-size-sm font-color-white padding-x-20 padding-y-10">
            {{'【 ' + (panoData.province_name || '') + ' · ' + (panoData.city_name || '') + ' 】 ' + (panoData.name_project || panoData.name_house || '')}}
          </view>
          <!-- <section class="pos_a of_h right0 top30">
            <div>
              <div style="" class="fixed_width_110 expand-transition pos_r ">
                <image ref="Illustration" :src="Illustration" @tap="IllustrationIsVisibleFunc(1)">
                <span :class="!mapsize && 'opacity'" ref="IllustrationCoordinate" class="icon-dingwei-copy pos_a"></span>
              </div>
            </div>
            <div>
              <div @tap="IllustrationClick" class="f-icon-tupiansuolvetuBox">
                <span class="icon iconfont icon-tupiansuolvetu f-icon-tupiansuolvetu"></span>
              </div>
            </div>
          </section> -->
          <view class="building-cover">
            <image v-show="!IllustrationShow" :src="Illustration" @tap="previewImage([Illustration])">
            <text @tap="IllustrationClick" class="iconfont image">{{IllustrationShow ? '&#xf2b6;' : '&#xe6a4;'}}</text>
          </view>
          <section v-show="panoNameType" class="current-pano-name">
            <span>{{panoName}}</span>
          </section>
          <section v-show="prompt" class="pos_a w_100 top244">
            <div class="fixed_width_150 ma_auto background-RGBA-5 bor_4 fixed_height_95">
              <div class="text-center f_co_fff pos_r w_100 pt-10">
                <span class="icon iconfont icon-shou01 f-font-37"></span>
                <span class="icon iconfont icon-zuoyoujiantou- f-font-16 pos_a left35"></span>
                <span class="icon iconfont icon-zuoyoujiantou-1 f-font-16 pos_a right35"></span>
              </div>
              <p class="f-12 text-center f_co_fff">左右滑动，效果更佳</p>
            </div>
          </section>
          <view v-show="prompt" class="pano-hint">
            <view class="pano-hint-top">
              <text class="left iconfont">&#xeafb;</text>
              <text class="hand iconfont">&#xe6cf;</text>
              <text class="right iconfont">&#xe608;</text>
            </view>
            <text class="font-size-sm-s">左右滑动，效果更佳</text>
          </view>
          <section :class="{'hide':!currentType || (panoData.panoramas && panoData.panoramas.length < 2)}" class="pano-panoramas">
            <!-- <ul ref="ThumbnailsBox" class="f-panorama-imgListBox cl ma_auto">
              <li :ref="'Thumbnails'" class="f-panorama-List pos_r of_h l" :class="currentPanoramaIndex==index && 'f-panorama-ListAc'" @tap="clickSwitchPanoramic(index, p.name)" v-for="(p, index) in panoData.panoramas" :key="index">
                <image :src="p.cover" class="w_100 height100" mode="aspectFill">
                <p class="pos_a left0 bottom0 background-RGBA-5 f_co_fff f-12 w_100 text-center">{{p.name}}</p>
              </li>
            </ul> -->
            <scroll-view class="scroll-view font-size-sm padding-y-20 padding-x-10" scroll-x="true">
              <view class="scroll-view-item margin-r-20" :class="currentPanoramaIndex==index && 'active'" @tap="clickSwitchPanoramic(index, p.name)" v-for="(p, index) in panoData.panoramas" :key="index">
                <image :src="p.cover" class="w_100 height100" mode="aspectFill">
                <view class="font-size-sm-s font-color-white">{{p.name}}</view>
              </view>
            </scroll-view>
          </section>
          <view class="pano-bottom">
            <view @tap="forwardingShow = !forwardingShow" v-if="panoData.act_status == 2&&($route.query.display_area==1||$route.query.display_area==2)">
              <text class="iconfont">&#xe641;</text>
              <text class="font-size-sm-s">有奖转发</text>
            </view>
            <view
              @tap="$navigateTo({url: generateGetUrl('/pages/DM/detail', option)})"
              >
              <text class="iconfont">&#xe641;</text>
              <text class="font-size-sm-s">
                {{panoData.type == 21?'项目':panoData.type == 22?'区位':panoData.type == 23?'户型':'户型'}}介绍
              </text>
            </view>
            <view @tap="statistics(3)">
              <text class="iconfont">&#xe60d;</text>
              <text class="font-size-sm-s">咨询电话</text>
            </view>
            <view @tap="currentFunc">
              <text class="iconfont" style="font-size: 50rpx;">&#xe602;</text>
            </view>
          </view>
          <!-- <section class="pano-bottom">
            <ul class="cl">
              <li @tap="forwardingShow = !forwardingShow" v-if="panoData.act_status == 2&&($route.query.display_area==1||$route.query.display_area==2)" class="l f-gengduo-list text-center">
                <div class="f-icon-box bor-50 background-fff">
                  <span class="activityIcon"></span>
                </div>
                <p class="f-12 f_co_fff">有奖转发</p>
              </li>
              <li class="l f-gengduo-list text-center">
                <router-link :to="{path : ($route.query.share=='my'?('/myDM-detail/' + panoData.id+'?share='+$route.query.share+'&dm='+$route.query.dm):'/DM-detail/' + panoData.id) + '?display_area=' + $route.query.display_area}" class="di_bl">
                  <div class="f-icon-box bor-50 background-fff">
                    <span class="icon iconfont icon-huxingtu f_co_999 f-font-24"></span>
                  </div>
                  <p class="f-12 f_co_fff">{{panoData.type == 21?'项目':panoData.type == 22?'区位':panoData.type == 23?'户型':'户型'}}介绍</p>
                </router-link>
              </li>
              <li @tap="statistics(3)" class="l f-gengduo-list text-center">
                <div class="f-icon-box bor-50 background-fff">
                  <span class="icon iconfont icon-dianhua1 f_co_999 f-font-24"></span>
                </div>
                <p class="f-12 f_co_fff">咨询电话</p>
              </li>
              <li @tap="currentFunc" class="l f-gengduo-list text-center">
                <div class="f-icon-box bor-50 background-fff">
                  <span class="icon iconfont icon-gengduo1 f_co_999 f-font-24"></span>
                </div>
              </li>
            </ul>
          </section> -->
        </div>
      </div>
      <!--示意图放大-->
      <section id="PanoramaDetailsIllustrationMaxBox" :class="IllustrationIsVisible == 1?'z-index-303':'z-index-negative-10'" class="pos_f left0 top0 w_100 height100">
        <div class="background-RGBA-8 height100 pt-50">
          <div class="pos_r " style="">
            <img ref="IllustrationMax" :src="Illustration" alt="" class="w_100">
            <span :class="!mapsize && 'opacity'" ref="IllustrationCoordinateMax" class="icon-dingwei-copy pos_a"></span>
            <span class="iconfont icongoufangyixiang" @tap="IllustrationIsVisibleFunc(0)">x</span>
          </div>
        </div>
      </section>
    </div>
    <!-- <toast v-model="show1" type="text" width="10em">{{show1message}}</toast> -->
    <!-- 分享 -->
    <!-- <div v-transfer-dom>
      <popup v-model="showShare" position="bottom" max-height="60%">
        
      </popup>
    </div> -->
    <!--<div v-transfer-dom>-->
      <!--<loading :show="panoLoadingShow" :text="progress"></loading>-->
    <!--</div>-->
    <div ref="panoLoadingBox" class="panoLoadingBox">
      <p id="panoLoading" class="panoLoading">{{progress + '%'}}</p>
    </div>
    <div v-show="forwardingShow&&($route.query.display_area==1||$route.query.display_area==2)" class="forwarding-prizes-box">
      <div class="forwarding-prizes" @tap="forward">
        <div class="forwarding-prizes-text">
          <div class="forwarding-prizes-content">
            <p class="forwarding-prizes-mb">1、转发得红包，需要登录账号并实名验证后，才可以得到红包，反之，转发无红包。</p>
            <p class="forwarding-prizes-mb">{{`2、活动时间内转发传单至${(panoData.wechat_friends==1&&panoData.wechat_moments!=1)?'微信好友':
              (panoData.wechat_friends!=1&&panoData.wechat_moments==1)?'朋友圈':'微信好友或朋友圈'};`}}</p>
            <p class="forwarding-prizes-mb">3、转发链接至少<span class="yellow">{{panoData.hit_peoples}}人</span>浏览。</p>
            <p class="forwarding-prizes-mb">同时满足即可获得<span class="yellow">{{panoData.amount_once}}元</span>红包，红包总额<span class="yellow">{{panoData.amount_total}}元</span>。</p>
            <p class="forwarding-prizes-mb">数量有限，发完即止。</p>
            <p>每个账号每次活动仅能领取<span class="yellow">{{panoData.push_num}}次</span>奖励。</p>
          </div>
          <p class="forwarding-prizes-time">活动时间：<span class="yellow">{{panoData.time_activity}}</span></p>
        </div>
      </div>
      <span class="activity_x" @tap="forwardingShow = !forwardingShow"></span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  // @import "~common/styles/style";
  // @import "~@/assets/iconfont/iconfont.css";
  // @import "~common/styles/mixins/bg-image";
  // @import '~common/styles/mixins/border-1px.less';
  //@import "~common/styles/transition";
  .current-pano-name{
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;
    text-align: center;
    font-weight: 600;
    color: $color-white;
  }
  .pano-hint{
    pointer-events: none;
    padding: 30rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: $color-white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10rpx;
    &-top{
      text{
        vertical-align: top;
        &:not(.iconfont){
          display: block;
        }
        &.hand{
          font-size: 80rpx;
        }
      }
    }
  }
  .building-name{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  .building-cover{
    position: absolute;
    top: 80rpx;
    right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    image{
      width: 200rpx;
      height: 300rpx;
    }
    text{
      margin-top: 10rpx;
      width: 50rpx;
      height: 50rpx;
      line-height: 50rpx;
      background-color: $color-white;
      text-align: center;
      border-radius: 50%;
      font-size: 24rpx;
    }
  }
  .pano-bottom{
    position: fixed;
    right: 0;
    bottom: 40rpx;
    color: $color-white;
    >view{
      margin-right: 20rpx;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }
    .iconfont{
      width: 80rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 60rpx;
      border-radius: 50%;
      background-color: $color-white;
      text-align: center;
      color: $color-grey;
    }
  }
  .pano-panoramas{
    position: fixed;
    left: 0;
    width: 100%; 
    bottom: 180rpx;
    background: rgba(0, 0, 0, 0.3);
    overflow-x: auto;
    overflow-y: hidden;
  }
  .scroll-view{
    white-space: nowrap;
    &-item{
      position: relative;
      display: inline-block;
      width: 120rpx;
      height: 120rpx;
      border: 4rpx solid #fff;
      &.active{
        border-color: $color-primary;
      }
      image{
        width: 100%;
        height: 100%;
      }
      >view{
        position: absolute;
        bottom: 5%;
        left: 0;
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  
  .pano-details{
      width: 100%;
    .height0{height: 0}
      ul,li{list-style: none;}
    .f-icon {
      display: inline-block;
      width: .44rem;
      height: .38rem;
      /*background-size: cover;*/
      vertical-align: middle;
    }
    .f-icon-forward {
      background: url(../../common/images/forward@3x.png) no-repeat;
      background-size: cover;
    }
    .f-font-37{
      font-size: .74rem;
    }
    .f-font-24{
      font-size: .48rem;
    }
    .f-panorama-imgListSection{
      bottom: 1.81rem;
      background: rgba(0,0,0,.3);
      overflow-x: auto;
      overflow-y: hidden;
    }
    .f-panorama-imgListBox{
      padding: .195rem .1rem;
    }
    .f-panorama-List{
      width: 1.12rem;
      height: 1.12rem;
      margin: 0 .1rem;
      border: .04rem solid #fff;
    }
    li.f-panorama-ListAc{
      border: .04rem solid #f77941;
    }
    .f-icon-box{
      width: .78rem;
      height: .78rem;
      line-height: .82rem;
      margin: 0 auto .1rem;
    }
    .f-gengduo-list{
      width: 1.2rem;
    }
    .f-icon-tupiansuolvetuBox{
      width: .44rem;
      height: .44rem;
      background: #fff;
      text-align: center;
      line-height: .44rem;
      border-radius: 50%;
      margin: auto;
    }
    .f-icon-tupiansuolvetu{
      font-size: .28rem;
    }
    /* 必需 */
    .expand-transition {
      transition: all 1s ease;
      overflow: hidden;
    }
    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    .expand-enter, .expand-leave {
      height: 0;
      /*opacity: 0;*/
    }
    .expand-leave{
      margin: .2rem .2rem 0 0;
    }
  }
  .pop-share {
    background-color: #fff;
    .share-head {
      line-height: .88rem;
      text-align: center;
      border-bottom: 1px solid;
      .dot {
        display: inline-block;
        width: .06rem;
        height: .06rem;
        background-color: #999;
        border-radius: 50%;
        vertical-align: middle;
        margin: 0 .1rem;
      }
      p {
        font-size: .3rem;
      }
    }
    .share-wrap {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: .32rem;
      span {
        width: 25%;
        margin-top: .2rem;
        text-align: center;
        i {
          margin: auto;
        }
      }
    }
    .share-wrap p {
      font-size: .26rem;
      padding: .06rem 0;
    }
    .wechat-forward {
      max-width: 1.4rem;
      line-height: .3rem;
      padding: .06rem;
      background: #f77941;
      color: #fff;
      font-size: .2rem;
      margin: auto;
    }
  }
  .icon-c_weixin {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_weixin");
    /*background-size: 1.1rem 1.1rem;*/
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
  .icon-c_pengyouquan {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_pengyouquan");
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
  .icon-c_xinlang {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_xinlang");
    /*background-size: 1.1rem 1.1rem;*/
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
  .icon-c_QQ {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_QQ");
    /*background-size: 1.1rem 1.1rem;*/
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
  .icon-c_qzone {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_qzone");
    /*background-size: 1.1rem 1.1rem;*/
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
  .icon-c_tengxun {
    display: block;
    background-position: center center;
    // .bg-image("../../common/assets/dm/c_tengxun");
    /*background-size: 1.1rem 1.1rem;*/
    background-size: contain;
    width: 1.1rem;
    height: 1.1rem;
  }
</style>
<style lang="scss">
  .pano-details{
    .f-header{
      z-index: 301;
    }
    .forwarding-prizes-box {
      position: fixed;
      left: 50%;
      bottom: 3.4rem;
      margin-left: -3.75rem;
      z-index: 499;
      .forwarding-prizes {
        width: 7.5rem;
        height: 5rem;
        margin: auto;
        // background: url('../../common/assets/dm/forwarding-prizes.png') no-repeat center;
        background-size: contain;
        position: relative;
        .forwarding-prizes-text {
          position: absolute;
          top: 1rem;
          left: 1.36rem;
          width: 5.6rem;
          font-size: .24rem;
          line-height: .33rem;
          color: #fff;
          .forwarding-prizes-content {
            margin-bottom: .16rem;
          }
          .forwarding-prizes-mb {
            margin-bottom: .08rem;
          }
          .forwarding-prizes-time {
            padding-right: .5rem;
            text-align: right;
            font-size: .22rem;
          }
          .yellow {
            color: #ff0;
          }
        }
      }
      .activity_x{
        position: absolute;
        right: .46rem;
        top: .34rem;
        width: .48rem;
        height: .48rem;
        // background: url('../../common/assets/activity_x.png') no-repeat center;
        background-size: contain;
      }
    }
    .panoLoadingBox{
      position: fixed;
      top: 5rem;
      left: 0;
      width: 100%;
      text-align: center;
      z-index: 1000
    }
    .panoLoading{
      display: inline-block;
      padding: .5rem;
      background: rgba(0,0,0,.7);
      color: #fff;
    }
    .z-index-negative-10{
      z-index: -10;
    }
    .z-index-303{
      z-index: 303;
    }
    .PanoramaIllustrationOff{
      position: absolute;
      top: .1rem;
      right: .1rem;
      width: .6rem;
      height: .6rem;
      line-height: .55rem;
      border-radius: 50%;
      /*padding: 0 .1rem;*/
      text-align: center;
      font-size: .46rem;
      color: #fff;
      background: rgba(0,0,0,.8);
      /*font-weight: bold;*/
    }
    .icon-dingwei-copy{
      width: 16px;
      height: 16px;
      // background: url(a/images/dingwei-icon.png) no-repeat center;
      background-size: cover;
    }
    .activityIcon {
      display: inline-block;
      /*width: .48rem;*/
      /*height: .52rem;*/
      width: .78rem;
      height: .74rem;
      // background: url('../../common/assets/dm/activityIcon.png') no-repeat center;
      background-size: .48rem .52rem;
    }
  }
  .panolens-infospot{
    background: rgba(0,0,0,.5);
    color: #fff;
    padding: 0 .1rem;
    border-radius: .08rem;
  }
</style>
<script>
  import PANOLENS, {demo} from './panolens/panolens'
  //  import panoramaData from '../../../pano/data.json'
  import { dmDetail, statistics, generateGetUrl } from '@/api'
  import model from './model'
  import renderer from './renderer'
  console.log('PANOLENS', PANOLENS, demo);
  PANOLENS.Panorama.prototype.href = function (datas) {
    let scope = this;
    let spot;
    let data = datas;
    this.visible = true
    if (!data.position) {
      console.warn('Please specify infospot position for linking')
      return
    }
    // Creates a new infospot
    spot = new PANOLENS.Infospot(data.scale, data.img)
    spot.position.copy(data.position)
    spot.addHoverText(data.text)
    spot.addEventListener('click', function () {
      let hotspotsParentIndex;
      if (data.vue.panoData.panoramas[data.hotspotsParentIndex] && data.vue.panoData.panoramas[data.hotspotsParentIndex].id === data.id) {
        hotspotsParentIndex = data.hotspotsParentIndex
      } else {
        for (let i = 0, len = data.vue.panoData.panoramas.length; i < len; i++) {
          if (data.id === data.vue.panoData.panoramas[i].id) {
            hotspotsParentIndex = i;
          }
        }
      }
      data.vue.clickSwitchPanoramic(hotspotsParentIndex, data.text);
    })
    scope.add(spot)
    //    data.viewer.add(scope)
  }
  export default {
    name: 'pano-details',
    /* 组件 */
    components: {
    },
    data () {
      return {
        generateGetUrl,
        detail: null,
        title: '全景图详情',
        setBackTexts: '你好',
        routerLink: '/DM-list',
        progress: 0,
        panolensContainer: null,
        isInit: true, // 判断 进入 页面
        /* 全景图 数据对象 */
        panoData: {},
        //        panoData: {},
        /* 当前全景图 */
        currentPanorama: null,
        /* 当前全景图 下标 用于当前缩略图隐藏 */
        currentPanoramaIndex: 0,
        panoramaIndex: 0,
        getHotspotsIndex: 0,
        Viewer: Object,
        /* 全景图 对象组 */
        panoramas: {},
        panoramajiazaiType: true,
        /* 全景图 name */
        panoName: null,
        /* 当前全景图 对象 的 key */
        PanoramicKey: null,
        InfospotShowType: true,
        Illustration: '',
        /* 全景图的name 显示隐藏 判断 */
        panoNameType: false,
        /* 小手提示 框 显示因此 判断 */
        prompt: true,
        /* 定时器 */
        timeOut: null,
        /* 示意图显示 隐藏判断 */
        IllustrationShow: true,
        mappos: '',
        mapsize: '',
        /* 缩略图 显示 隐藏判断 */
        currentType: true,
        /* 分享判断 */
        showShare: false,
        show1: false,
        show1message: '',
        shareDisabledType: true,
        panoLoadingShow: true,
        IllustrationIsVisible: 0,
        forwardingShow: false,
        daid: 0
      }
    },
    /* 在 `methods` 对象中定义方法 */
    methods: {
      /* 示意图 是否  显示 与 坐标点 */
      IllustrationCoordinateFunc (pano) {
        let panorama = pano;
        if (panorama.mapType) {
          this.IllustrationShow = true;
        } else {
          this.IllustrationShow = false;
        }
        this.mapsize = panorama.mapsize
        this.PanoramicKey = panorama.id;
      },
      previewImage(urls) {
        uni.previewImage({urls: urls})
      },
      //      分享
      forward () {
        this.showShare = true
      },
      routerFunc (limk) {
        this.$router.push({path: limk})
      },
      IllustrationIsVisibleFunc (type) {
        this.IllustrationIsVisible = type;
      },
      /* 点击缩略图 切换 全景图 */
      clickSwitchPanoramic (index, text) {
          //        this.progress = 0
        //        console.log(index)
        if (this.currentPanoramaIndex == index) {
          return false
        }
        //        this.panoLoadingShow = true
        //        console.log(index)
        this.$refs.panoLoadingBox.style.display = 'block';
        let pano = this.panoData.panoramas[index];
        let panorama = this.panoramas[pano.id];
        this.currentPanorama.dispatchEvent({
          type: 'panolens-viewer-handler',
          method: 'setPanorama',
          data: panorama
        });
        this.currentPanorama.visible = false;
        if (!pano.rotationType) {
          this.Viewer.addUpdateCallback(function () {
            panorama.rotation.y += 0.002;
          });
          pano.rotationType = true;
        }
        //        panorama.addEventListener('progress', this.onProgress)
        this.Viewer.add(panorama);
        this.InfospotShowType = true;
        this.currentPanorama = panorama;
        this.currentPanoramaIndex = index;
        this.PanoramaDetailsNameToggle(text);
          //        $('.panolens-infospot').remove()
        if (this.progress >= 100) {
          //          this.panoLoadingShow = false
          setTimeout(() => {
            this.$refs.panoLoadingBox.style.display = 'none'
          }, 1000)
        }
        this.IllustrationCoordinateFunc(pano);
      },
      /* 全景图名称的自动显示隐藏 */
      PanoramaDetailsNameToggle (text) {
        let self = this;
        clearTimeout(self.timeOut);
        self.panoName = text;
        self.panoNameType = true;
        self.timeOut = setTimeout(function () {
          self.panoNameType = false;
        }, 5000)
      },
      clickSwitchPanoramics (index, text) {
        //        this.progress = 0
        if (this.currentPanoramaIndex == index) {
          return false
        }
          //        this.panoLoadingShow = true
          //        console.log(index)
        this.$refs.panoLoadingBox.style.display = 'block'
        let panorama = this.panoramas[this.panoData.panoramas[index].id];
        this.currentPanorama.dispatchEvent({
          type: 'panolens-viewer-handler',
          method: 'setPanorama',
          data: panorama
        });
        this.currentPanorama.visible = false;
        //        panorama.addEventListener('progress', this.onProgress);
        if (!this.panoData.panoramas[index].rotation) {
          panorama.rotation.y = 0;
          this.Viewer.addUpdateCallback(function () {
            panorama.rotation.y += 0.002
          })
          this.panoData.panoramas[index].rotation = true;
        }
        this.Viewer.add(panorama);
        this.InfospotShowType = true;
        this.currentPanorama = panorama;
        this.currentPanoramaIndex = index;
        this.PanoramaDetailsNameToggle(text);
          //        $('.panolens-infospot').remove()
        if (this.progress >= 100) {
          //          this.panoLoadingShow = false
          setTimeout(() => {
            this.$refs.panoLoadingBox.style.display = 'none'
          }, 1000)
        }
        this.IllustrationCoordinateFunc(this.panoData.panoramas[index]);
      },
      onProgress (event) {
        //        this.panoLoadingShow = true
        this.$refs.panoLoadingBox.style.display = 'block'
        this.progress = parseInt(event.progress.loaded / event.progress.total * 100);
        if (this.progress >= 100) {
          
          setTimeout(() => {
            this.$refs.panoLoadingBox.style.display = 'none'
          }, 1000)
        }
      },
      panoramaEdit (data) {
        let self = this;
        let i = 0;
        let len = self.panoData.panoramas.length;
        for (; i < len; i++) {
          if (i > 0) {
            let panoramas = self.panoData.panoramas[i];
            self.panoramas[panoramas.id] = new PANOLENS["ImagePanorama"](panoramas["path"]);
            self.panoramas[panoramas.id].addEventListener('progress', this.onProgress)
          }
        }
        return self;
      },
      link () {
        let jlen = this.panoData.panoramas.length;
        for (let j = 0; j < jlen; j++) {
          let z = 0;
          let btn = this.panoData.panoramas[j]["hotspots"];
          let zlen = btn && btn.length;
          for (; z < zlen; z++) {
            let pos = btn[z].pos.split(",");
            this.panoramas[this.panoData.panoramas[j]["id"]].href({
              viewer: this.Viewer,
              panorama: this.panoramas[btn[z].id],
              position: new PANOLENS.Vector3(pos[0], pos[1], pos[2]),
              scale: 350,
              img: btn[z].icon,
              text: btn[z].text,
              panoramaIndex: btn[z].panoramaIndex,
              hotspotsParentIndex: btn[z].hotspotsParentIndex,
              CoordinatePano: this.panoData.panoramas[btn[z].panoramaIndex],
              vue: this
            })
          }
        }
      },
      /* 获取热点  用于 全景图加载完成后 执行 */
      hotspotsLink () {
        let self = this
        let panorama = self.panoramas[self.panoData.panoramas[self.currentPanoramaIndex]["id"]]
        let z = 0;
        let btn = self.panoData.panoramas[self.currentPanoramaIndex]["hotspots"];
        let zlen = btn && btn.length;
        for (; z < zlen; z++) {
          let pos = btn[z].pos.split(",");
            
          panorama.href({
            viewer: self.Viewer,
            id: btn[z].id,
            panorama: self.panoramas[btn[z].id],
            position: new PANOLENS.Vector3(pos[0], pos[1], pos[2]),
            scale: 350,
            img: btn[z].icon,
            text: btn[z].text,
            panoramaIndex: btn[z].panoramaIndex,
            hotspotsParentIndex: btn[z].hotspotsParentIndex,
            CoordinatePano: self.panoData.panoramas[btn[z].panoramaIndex],
            vue: self
          })
        }
      },
      panolensContainerFunc () {
      },
      touchstartClick () {
      },
      /* 点击全景图 提示框 消失 */
      promptFunc () {
        this.prompt = false;
      },
      /* 示意图按钮点击 */
      IllustrationClick () {
        this.IllustrationShow = !this.IllustrationShow;
      },
      /* 缩略图  显示 隐藏 */
      currentFunc () {
        this.currentType = !this.currentType;
      },
      //      拨打电话及统计
      statistics (type, id, sub) {
        
        const {openid} = this.detail || {}
        const {mobile: phoneNumber} = (this.detail && this.detail.contact_info) || {}
        const {id: id_subject, mu, sf, at} = this.option || {}
        
        const data = {
          id_subject,
          mu,
          sf,
          at,
          openid
        }
        statistics(data).then(() => {
          // location.href = `tel:${this.config.mem.sc.mobile}`
          uni.makePhoneCall({phoneNumber})
        })
      },
    },
    /* 创建前 */
    onLoad (option) {
      const {id, mu, sf, at, dmid} = option
      this.option = option
      //      console.log(this.RealEstate, this.$route.query.lp, this.$route.query.$route.query.display_area)
      this.panoLoadingShow = true
      let self = this;
      let Detail = null;
      Detail = dmDetail(dmid, mu, sf, at)
      Detail.then(res => {
        this.detail = res
        const data = res.info
        data.panoramas_map = data.panoramas_map[0]
        self.panoData = model.apply(data, {
          anonymous: [
            {
              field: 'gallery',
              call (gallery) {
                let galleryNew = []
                if (gallery) { for (let path of gallery) galleryNew.push(model.cdnPath(path)) }
                return galleryNew
              }
            },
            {
              field: 'panoramas',
              call (panoramas) {
                let galleryNew = []
                for (let panorama of panoramas) {
                  model.apply(panorama, {
                    cdnPath: [{field: 'cover'}, {field: 'path'}]
                  })
                  panorama.hotspots && model.applyList(panorama.hotspots, {
                    cdnPath: {field: 'icon'}
                  })
                  galleryNew.push(panorama)
                }
                //                console.log(galleryNew)
                return galleryNew
              }
            }
          ],
          cdnPath: [{field: 'panoramas_map'}, {field: 'cover'}]
        });
        self.Viewer = new PANOLENS.Viewer({
          container: document.getElementById("panolensContainer"),
            //          output: 'overlay',
          /* 视角拉伸 */
          cameraFov: 100,
          controlBar: false
        }, {
          //          dom: document.getElementById("panorama"),
          offsetTop: self.$refs.panoParent.offsetTop || self.$refs.panoParent.clientTop,
          offsetLeft: self.$refs.panoParent.offsetLeft || self.$refs.panoParent.clientLeft,
          canvasParent: this.panolensContainer || document.getElementById('panolensContainer'),
          renderer: renderer,
          canvasId: "canvasId"
        })
        console.log('self.panoData', self.panoData)
        let panoramas = self.panoData.panoramas[0];
        let panoObj = self.panoramas[panoramas.id] = new PANOLENS["ImagePanorama"](panoramas["path"]);
        panoObj.addEventListener('progress', this.onProgress)
        setTimeout(() => {
          self.Viewer.addUpdateCallback(function () {
            panoObj.rotation.y += 0.002;
          });
          self.Viewer.add(panoObj)
          panoramas.rotationType = true;
        }, 0)
        self.currentPanorama = panoObj;
        self.Illustration = self.panoData.panoramas_map;
        self.panoramaEdit()
        //          .link();
        setTimeout(() => {
          this.panoData.panoramas[0].hotspotsLoadType = true;
          self.PanoramaDetailsNameToggle(self.panoData.panoramas[0].name);
        })
        self.panoData.act_status == 2 && (self.forwardingShow = true)
      })
    },
    /* 创建后 */
    created () {
      this.daid = this.$route.query.daid || 0
    },
    /* 载入前 */
    beforeMount () {
    
    },
    /* 载入后 */
    mounted () {
      let self = this;
      let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let headerHeight = 50
      self.$refs.panorama.style.width = w + 'px';
      self.$refs.panorama.style.height = h - headerHeight + 'px';
      this.panolensContainer = document.getElementById('panolensContainer')
      /* 全景图初始化 */
      // function rotateToggle (autoRotate) {
      //   let panorama = self.panoramas[self.panoData.panoramas[self.currentPanoramaIndex].id];
      //   self.Viewer.addUpdateCallback(function () {
      //     if (autoRotate) {
      //       console.log(1111111)
      //       panorama.rotation.y += 0.002;
      //     } else {
      //       panorama.rotation.y = 0;
      //     }
      //   })
      // }
      this.panolensContainer.addEventListener("touchstart", function () {
        // rotateToggle()
        self.prompt = false;
        let Infospot = self.panoramas[self.PanoramicKey].children;
        for (let i = 0, len = Infospot.length; i < len; i++) {
          Infospot[i].element.style.display = 'block';
          let vector = self.Viewer.getScreenVector(Infospot[i].getWorldPosition());
          Infospot[i].element._width = Infospot[i].element.offsetWidth;
          Infospot[i].element._height = Infospot[i].element.offsetHeight;
          Infospot[i].translateElement(vector.x, vector.y);
        }
      })
      this.panolensContainer.addEventListener("touchend", function () {
        // rotateToggle(true)
      })
    },
    /* 更新前 */
    beforeUpdate () {
      // let self = this;
      // setTimeout(function () {
      //   self.$refs.ThumbnailsBox.style.width = 1.4 * (self.$refs.Thumbnails.length) + "rem";
      //   /* 点击 全景图 显示 热点 名称 */
      // }, 0)
    },
    /* 更新后 */
    updated () {
      if (this.InfospotShowType && !this.panoData.panoramas[this.currentPanoramaIndex].hotspotsLoadType) {
        this.hotspotsLink()
        this.panoData.panoramas[this.currentPanoramaIndex].hotspotsLoadType = true
      }
      if (this.isInit) {
        setTimeout(() => {
          this.IllustrationCoordinateFunc(this.panoData.panoramas[0]);
        }, 100)
        this.isInit = false
      }
      this.InfospotShowType = false
    },
    /* 销毁前 */
    beforeDestroy () {
    },
    /* 销毁后 */
    destroyed () {
    }
  }
</script>
