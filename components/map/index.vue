<template lang="pug">
  #map
</template>
<script>
  import {
    key
  } from './config';

  export default {
    props: {
      keyword: {
        type: String,
        default: '酒店'
      },
      center: {
        validator: function (value) {
          return value && value.length === 2
        },
        default: () => [39.916527, 116.397128]
      }
    },
    data() {
      return {
        searchService: null,
        markers: []
      }
    },
    async created() {},
    async mounted() {
      await this.loadScript()
      this.init(this.searchKeyword)
    },
    watch: {
      keyword: {
        handler() {
          this.$nextTick(() => {
            console.log('searchService', this.searchService);
          })
          this.searchKeyword()
        }
        // immediate: true
      }
    },
    methods: {
      init(callback) {
        window.init = () => {
          //设置地图中心点
          var center = new qq.maps.LatLng(...this.center);
          //定义工厂模式函数
          var myOptions = {
            zoom: 12, //设置地图缩放级别
            center, //设置中心点样式
            zoomControl: false,
            mapTypeControlOptions: {
              //设置控件的地图类型ID，ROADMAP显示普通街道地图，SATELLITE显示卫星图像，HYBRID显示卫星图像上的主要街道透明层
              mapTypeIds: [
                // qq.maps.MapTypeId.ROADMAP,
                // qq.maps.MapTypeId.SATELLITE,
                // qq.maps.MapTypeId.HYBRID
              ],
              //设置控件位置相对上方中间位置对齐
              position: qq.maps.ControlPosition.TOP_CENTER
            }
            // mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
          }
          //获取dom元素添加地图信息
          var map = new qq.maps.Map(document.getElementById("map"), myOptions);
          var markerIcon = new qq.maps.MarkerImage("https://lbs.qq.com/doc/img/nilt.png")
          var marker = new qq.maps.Marker({
            position: center,
            map: map
          });
          this.map = map
          this._initSearch.call(this)
          callback && callback()
        }
      },
      loadScript() {
        return new Promise((resolve, reject) => {
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.src = `https://map.qq.com/api/js?v=2.exp&key=${key}&callback=init`;
          document.body.appendChild(script);
          script.onload = resolve
          script.onerror = reject
        })
      },
      _initSearch() {
        const that = this
        const map = this.map
        //设置Poi检索服务，用于本地检索、周边检索
        this.searchService = new qq.maps.SearchService({
          //检索成功的回调函数
          complete: results => {
            console.log('results', results);
            //设置回调函数参数
            var pois = results.detail.pois;
            var infoWin = new qq.maps.InfoWindow({
              map
            });
            var latlngBounds = new qq.maps.LatLngBounds();
            for (var i = 0, l = pois.length; i < l; i++) {
              var poi = pois[i];
              //扩展边界范围，用来包含搜索到的Poi点
              latlngBounds.extend(poi.latLng);
        
              (function(n) {
                var marker = new qq.maps.Marker({
                  map
                });
                marker.setPosition(pois[n].latLng);
        
                marker.setTitle(i + 1);
                that.markers.push(marker);
        
                qq.maps.event.addListener(marker, 'click', function() {
                  infoWin.open();
                  infoWin.setContent('<div style="width:280px;height:100px;">' + 'POI的ID为：' +
                    pois[n].id + '，POI的名称为：' + pois[n].name + '，POI的地址为：' + pois[n].address + '，POI的类型为：' +
                    pois[n].type + '</div>');
                  infoWin.setPosition(pois[n].latLng);
                });
              })(i);
            }
            //调整地图视野
            map.fitBounds(latlngBounds);
          },
          //若服务请求失败，则运行以下函数
          error: function() {
            console.error('_initSearch 出错');
          }
        });
      },
      clearOverlays(overlays) {
        var overlay;
        while (overlay = overlays.pop()) {
          overlay.setMap(null);
        }
      },
      searchKeyword() {
        // var region = document.getElementById("region").value;
        var pageIndex = 0;
        var pageCapacity = 5
        this.clearOverlays(this.markers);
        //根据输入的城市设置搜索范围
        // searchService.setLocation(region);
        //设置搜索页码
        this.searchService.setPageIndex(pageIndex);
        //设置每页的结果数
        this.searchService.setPageCapacity(pageCapacity);
        //根据输入的关键字在搜索范围内检索
        // this.searchService.search(this.keyword);
        //根据输入的关键字在圆形范围内检索
        var region = new qq.maps.LatLng(39.916527,116.397128);
        this.searchService.searchNearBy(this.keyword, region , 2000);
        //根据输入的关键字在矩形范围内检索
        //region = new qq.maps.LatLngBounds(new qq.maps.LatLng(39.936273,116.440043),new qq.maps.LatLng(39.896775,116.354212));
        //searchService.searchInBounds(keyword, region);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 500rpx;
  }
</style>
