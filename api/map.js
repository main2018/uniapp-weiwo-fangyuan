// import initSdk from '@/common/js/tecent-sdk';

//转换百度坐标为腾讯坐标
// qq.maps.convertor.translate(new qq.maps.LatLng(39.911082,116.396135), 3, function(res){
//   var latlng = res[0];
//   console.log('latlng', latlng);
// });
function convertCoordinate(lat, lng) {
  if (!lat || !lng) return Promise.resolve()
  lat = Number(lat)
  lng = Number(lng)
  
  return new Promise(resolve => {
    qq.maps.convertor.translate(new qq.maps.LatLng(lat, lng), 3, function(res){
      const latlng = res[0];
      resolve(latlng)
    });
  })
  // return uni.request({
  //   method: 'get',
  //   url: 'https://apis.map.qq.com/ws/coord/v1/translate',
  //   data: {
  //     locations: '39.12,116.83;30.21,115.43',
  //     type: 5,
  //     key: 'NEPBZ-SDK3W-SWMRQ-R4ZOY-X5QRT-QQFL5'
  //   }
  // })
}

export {
  convertCoordinate
}