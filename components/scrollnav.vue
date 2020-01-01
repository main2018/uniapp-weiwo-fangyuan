<template>
	<view class="content">
		<scroll-view scroll-x class="left-aside" :scroll-into-view="`f-item${currentIndex}`">
			<view class="left-aside-wrap">
        <view
          v-for="(item, index) in list"
          :key="item.id" class="f-item b-b"
          v-show="item.list.length > 0"
          :id="`f-item${index}`"
          :class="{active: currentIndex == index}"
          @click="tabtap(index)"
          >
        	{{item.name}}
        </view>
      </view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="(item, index) in list" :key="item.id" v-show="item.list.length" class="s-list" :id="'main-'+index">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view
            @click="seeItem(item.list, titem.id, !titem.cover)"
            class="t-item"
            v-for="(titem, tindex) in item.list"
            :key="titem.id"
            >
						<image :src="$baseUrl + (titem.cover || titem.picture)" mode="aspectFill"></image>
            <text class="iconfont" v-show="titem.cover">&#xe622;</text>
						<!-- <text>{{titem.name}}</text> -->
					</view>
				</view>
			</view>
		</scroll-view>
    
    <uni-popup ref="popup" type="center">
      <video :src="$baseUrl + list[currentIndex].list[selectIndex].picture" controls v-if="list && list.length"></video>
    </uni-popup>
	</view>
</template>

<script>
  import {uniPopup} from '@dcloudio/uni-ui';
  
	export default {
    components: {
      uniPopup
    },
    props: {
      list: {
        type: Array,
        default: () => [
          {
            name: '士大夫撒旦',
            list: [
              {
                id: 1,
                picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv03.jpg',
                cover: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg'
              },
              {
                id: 2,
                picture: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/meinv03.jpg',
                cover: 'https://img-cdn-qiniu.dcloud.net.cn/tuku/img/dongwu06.jpg'
              }
            ]
          }
        ]
      }
    },
		data() {
			return {
        timer: null,
        isClick: false,
				sizeCalcState: false,
				tabScrollTop: 0,
        currentIndex: 0,
        selectIndex: 0,
				flist: [],
				slist: [],
				tlist: [],
			}
		},
		onLoad(){
		},
		methods: {
      toggleOpen(bol){
        // 需要在 popup 组件，指定 ref 为 popup
         bol ? this.$refs.popup.open() : this.$refs.popup.close()
      },
      seeItem(list, id, isImg) {
        const index = list.findIndex(item => item.id == id)
        this.selectIndex = index
        isImg ? this.preImg(list, id) : this.preVideo(list, id)
      },
      preVideo(list, id) {
        this.toggleOpen(true)
      },
      // 放大图片
      preImg(list, id) {
        list = list.filter(item => !item.cover)
        const urls = list.map(item => this.$baseUrl + item.picture)
        const index = list.findIndex(item => item.id == id)
        
        if (!list || !list.length) return
        uni.previewImage({
          current: index,
          indicator: "number",
          urls
        })
      },
			//一级分类点击
			tabtap(index){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
        this.isClick = true
				this.currentIndex = index;
				this.tabScrollTop = this.list[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => { if (this.isClick) this.isClick = false }, 300)
        if (this.isClick) return
        
				if(!this.sizeCalcState){
					this.calcSize();
				}
				const scrollTop = e.detail.scrollTop;
				const index = [...this.list].findIndex(item => scrollTop <= item.top) - 1;
				if(index >= 0){
          this.tabScrollTop = scrollTop;
					this.currentIndex = index;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.list.forEach((item, index) => {
					let view = uni.createSelectorQuery().select("#main-" + index);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
  video{
    // width: 100vw;
    width: 100vw;
  }
  
	page,
	.content {
		height: 100%;
		background-color: $color-white;
	}

	.content {
		display: flex;
    flex-direction: column;
	}
	.left-aside {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
    &-wrap{
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
	}
	.f-item {
    padding: 0 40rpx;
    // display: inline-block;
    text-align: center;
		height: 80rpx;
    line-height: 80rpx;
		font-size: 30rpx;
    white-space: nowrap;
		font-weight: 700;
		position: relative;
    color: #979B9E;
		&.active{
      color: $color-black;
			&:before{
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				height: 6rpx;
				width: 36upx;
				background-color: $color-default;
				border-radius: 6rpx;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding: 0 40rpx;
    box-sizing: border-box;
	}
	.s-item{
		line-height: 120rpx;
    font-size: 34rpx;
    font-weight: 700;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
    position: relative;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
    flex-basis: calc(1 / 3 * (100% - 20rpx));
    height: 160rpx;
		// width: 176upx;
		font-size: 26upx;
		color: #666;
    margin-bottom: 10rpx;
    &:not(:nth-child(3n)){
      margin-right: 10rpx;
    }
		image{
			width: 100%;
			height: 100%;
		}
    .iconfont{
      font-size: 60rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255,255,255,.6);
    }
	}
</style>