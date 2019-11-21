<template lang="pug">
  view.page-bg-grey
    //- 数据详情
    view.x-form.mod-bg.margin-b-10
      view.x-form-item
        label.x-form-label {{"最新开盘:"}}
        view.x-form-content {{"2019-05-01"}}
      view.x-form-item
        label.x-form-label {{"预计交房:"}}
        view.x-form-content {{"2019-05-01"}}
      view.x-form-item
        label.x-form-label {{"装修情况:"}}
        view.x-form-content {{"精装 数据来源 公示-筛选标签-户型装修"}}
      view.x-form-item
        label.x-form-label {{"产权年限:"}}
        view.x-form-content {{"70"}}
    //- 预售许可证    
    view.x-form.mod-bg.margin-b-10
      view.title 预售许可证
      view.x-form-item
        label.x-form-label {{"最新开盘:"}}
        view.x-form-content {{"2019-05-01"}}
      view.x-form-item
        label.x-form-label {{"预计交房:"}}
        view.x-form-content {{"2019-05-01"}}
      view.x-form-item
        label.x-form-label {{"装修情况:"}}
        view.x-form-content {{"精装 数据来源 公示-筛选标签-户型装修"}}
      view.x-form-item
        label.x-form-label {{"产权年限:"}}
        view.x-form-content {{"70"}}
    //- 楼盘介绍        
    view.x-form.mod-bg.margin-b-10
      view.title 楼盘介绍
      view
        |项目位于海口西海岸片区， 海南十里繁华地，东十里是海南商务区，西十里是海口行政区，北走1000步是大海，南靠秀英老城区。“十里繁华，宁静海生活”，闹市区选择这安静的生活空间，无论出租、自主、投资都是首选
    //- 楼盘证件
    view.container.mod-bg.margin-b-10
      view.title 楼盘证件
      view.papers-list
        view.papers-item
          view.img-wrap
            image.img(
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg"
            mode="aspectFill"
            )
          view.aux.ellipsis 营业执照营业执照营业执照营业执照
        view.papers-item
          view.img-wrap
            image.img(
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg"
            mode="aspectFill"
            )
          <i class="iconfont">&#xe62f;</i>
        view.papers-item
          view.img-wrap
            image.img(
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg"
            mode="aspectFill"
            )
        view.papers-item
          view.img-wrap
            image.img(
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574155503081&di=daa82b272c93fac5c1b08d9909a46eeb&imgtype=0&src=http%3A%2F%2Fpic70.nipic.com%2Ffile%2F20150615%2F19831515_145215217000_2.jpg"
            mode="aspectFill"
            )
      
      
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.x-form {
  padding: $spacing-base;
  .title {
    font-size: $font-lg;
    padding: 16rpx 0;
    font-weight: 700;
  }
  .x-form-item {
    display: flex;
    padding: 16rpx 0;
    line-height: 20px;
    margin-right: 10px;
    .x-form-label {
      width: 160rpx;
      margin-right: 10rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: $uni-text-color-grey;
    }
  }
}
.container {
  padding: $spacing-base;
  .title {
    font-size: $font-lg;
    padding: 16rpx 0;
    font-weight: 700;
  }
  .papers-list {
    display: flex;
    flex-wrap: wrap;
    .papers-item {
      width:50%;
      padding: 0 $spacing-base $spacing-base;
      box-sizing: border-box;
      .img-wrap {
        position:relative;
        width: 100%;
        height: 0;
        padding-bottom: 60%;
        .img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .aux {
        text-align: center;
        padding: 16rpx 0;
      }
    }
  }
}
</style>
