/**
 * 数据模型, 处理各类数据, 如相对地址补全/状态码转换等
 * Created by Administrator on 2017/7/25 0025.
 */

import config from './config'

export default {
  /**
   * 对象数据处理
   * @param data
   * @param config object {
   *  method string : [{ // 模型函数名
   *    field string : 原字段, // 若有传入该值, 则将其字段值作为回调函数的第一个参数
   *    to string : 处理为新字段, // 若有传入该值, 则将其作为新数据的字段名, 否则以field值作为字段名
   *    argsField array : 字段参数, // 若有传入该值, 则取以之为字段名的字段值作为参数作为回调函数的中间参数
   *    args array : 固定参数, // 若有该值, 则将其作为回调函数的尾部参数
   *    call function : 回调函数 // 若无, 则以method模型函数作为回调函数
   *   }]
   * }
   * @returns {*}
   */
  apply (data, config) {
    for (let [method, fields] of Object.entries(config)) { // 遍历规则方法表
      if (fields instanceof String) fields = {field: fields}
      if (!Array.isArray(fields)) fields = [fields]
      for (let fc of fields) { // 遍历字段配置表
        let [fieldCopy, fArgs] = [fc.to || fc.field, fc.args || []] // 处理新字段名及参数
        let [args, call] = [[]]
        if (fc.field) args.push(data[fc.field]) // 将若有传字段, 则将字段原值压入为第一个参数
        if (fc.argFields instanceof Array) for (let fName of fc.argFields) fArgs.push(data[fName]) // 若有传入字段参数, 则应入字段参数列表
        args.push(...fArgs) // 将固定参数合到字段参数
        call = fc.call instanceof Function ? fc.call : this[method] // 若有定义匿名处理函数, 则用其回调, 否则以模型函数处理之
        data[fieldCopy] = call.apply(null, args) // 应入处理方法并取值
      }
    }
    return data
  },

  /**
   * 列表数据处理
   * @param datas
   * @param config
   * @returns {*}
   */
  applyList (datas, config) {
    datas.forEach((data, key) => {
      datas[key] = this.apply(data, config)
    })
    return datas
  },

  /**
   * 补全相对路径
   * @param value
   * @returns {string}
   */
  path (value) {
    return config.baseUrl + value
  },

  /**
   * 补全CDN文件路径
   * @param value
   * @returns {string}
   */
  cdnPath (value) {
    if (!value) return ''
    return config.baseCdn + value
  },
  /**
   * 补全相对路径2
   * @param value  数组字符串
   * @returns {string}
   */
  arrayPath (value) {
    var result = []
    var arr = JSON.parse(value)
    if (Array.isArray(arr)) {
      for (let x in arr) {
        result.push(this.path(arr[x]))
      }
      return result
    } else {
      return this.path(arr)
    }
  },

  /**
   * 取编码对应的性别
   * @param value object {null: 取数字键字典, undefined: 取以key,value对象为元素的数组, false: 取名字键字典, string: 取对应数字键的值}
   * @returns {*}
   */
  gender (value) {
    let [map, arrayMap, mapFlip] = [{
      1: '男',
      2: '女'
    }, [], {}]
    for (let [key, value] of Object.entries(map)) {
      arrayMap.push({key, value})
      mapFlip[value] = key
    }
    return value === null ? map : (value === undefined ? arrayMap : (value === false ? mapFlip : map[value] || ''))
  },

  /**
   * 筛选获取房源数据
   * @param data
   * @param bid
   * @param filters
   * @returns {*}
   */
  housing (data, bid, filters = {}) {
    // bid = Number.parseInt(bid)
    // let building
    // for (let item of data) { // 找到楼数据
    //   if (parseInt(item.id) === bid) {
    //     building = item
    //     break
    //   }
    // }
    let building = data[0]
    if (!building) return null
    let {floors, houses: housesALL, units = [], huxing: huxings = []} = building
    let [floorsMap, unitsMap, huxingMap, houses] = [[], [], [], []]
    label:
    for (let house of housesALL) {
      for (let [field, value] of Object.entries(filters)) {
        if (value && value !== '0' && String(house[field]) !== String(value)) continue label
      }
      floorsMap[house.id_developer_floor] = 1
      // unitsMap[house.id_developer_units] = 1
      if (parseInt(house.id_developer_units)) unitsMap[house.id_developer_units] = 1
      if (parseInt(house.id_developer_huxing)) huxingMap[house.id_developer_huxing] = 1
      houses.push(house)
    }
    var index = 0
    for (let floor of floors) {
      floor.index = index++
      if (floorsMap[floor.id]) {
        floor.houses = []
        floorsMap[floor.id] = floor
      }
    }
    var sortMap = Object.values(floorsMap).sort(function (a, b) {
      return a.index - b.index
    })
    for (let unit of units) if (unitsMap[unit.id]) unitsMap[unit.id] = unit
    for (let huxing of huxings) if (huxingMap[huxing.id]) huxingMap[huxing.id] = huxing
    for (let house of houses) if (floorsMap[house.id_developer_floor]) floorsMap[house.id_developer_floor].houses.push(house)
    return {
      building,
      houses_total: houses.length,
      units: Object.values(unitsMap),
      huxing: Object.values(huxingMap),
      floors: sortMap,
      unitsMap,
      huxingMap,
      floorsMap
    }
  },

  /**
   * 房间状态
   * @param value mixed {null: 取数字键字典, undefined: 取以key,value对象为元素的数组, false: 取名字键字典, string: 取对应数字键的值}
   * @param field mixed {undefined: 取对象值, string: 取对应数字键的对象字段值}
   * @returns {null}
   */
  houseState (value, field = 'label') {
    let [map, arrayMap, atlas] = [{
      0: {label: '全部'},
      // 1: {label: '待售', class: 'house-state-1'},
      // 3: {label: '预留', class: 'house-state-3'},
      // 4: {label: '认购', class: 'house-state-4'},
      // 5: {label: '签约', class: 'house-state-5'},
      // 2: {label: '不可售', class: 'house-state-2'}
      1: {label: '可售', class: 'house-state-1'},
      2: {label: '不可售', class: 'house-state-2'}
    }, [], {}]
    atlas.map = map
    for (let [key, value] of Object.entries(map)) {
      for (let [f, v] of Object.entries(value)) {
        if (!atlas[f]) atlas[f] = {}
        atlas[f][key] = v
      }
      arrayMap.push({key, value})
      // mapFlip[value] = key
    }
    return value === null ? atlas[field || 'map'] : (value === undefined ? arrayMap : (field === undefined ? map[value] : map[value][field]) || '')
  },

  /**
   * 根据地区代码取地区名 (后面可能会扩展)
   * @param data
   * @param rid
   * @returns {*}
   */
  region (data, rid) {
    let i = 0
    rid = String(rid)
    let isId = /^\d+$/.test(rid)
    if (!isId) rid = rid.replace(/(?:省|市|县|区)$/, '')
    for (; i < data.length; i++) {
      let cityName = data[i].name.replace(/(?:省|市|县|区)$/, '')
      if (rid === (isId ? data[i].value : cityName)) return isId ? cityName : data[i].value
    }
    return null
  },

  /**
   * 生成DM分享链接
   * @param id
   * @param did
   * @returns {string}
   */
  dmShareUrl (id, did, pano, idPushlog, idPosition, daid) {
    return config.baseUrl + '/site/' + did + '/dm_agency/' + id + (pano ? '/' + pano : '') + '?id_push_log=' + (idPushlog || '') + '&id_position=' + (idPosition || '') + '&daid=' + (daid || 0)
  },
  carShareUrl (id, aid) {
    return config.baseUrl + '/site/' + aid + '/card_consultant/' + id
  },
  newCarShareUrl (bkid) {
    return config.baseUrl + '/site/' + bkid + '/card_consultant'
  },
  /* 游客传单 */
  touristFlyer (id, did, pano, tourist) {
    return `${config.baseUrl}/site/${did}/dm_agency/${id}${pano ? '/' + pano : ''}?tourist=${tourist || 1}`
  },
  /**
   * 提现任务分享
   * @param astk
   * @param mid_encryption
   * @returns {string}
   */
  inviteShareUrl (astk) {
    return config.baseUrl + `/subsite/index/invitation?astk=${astk}`
  },
  /**
   *对象深拷贝
   */
  // 数据类型
  isClass (o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);
  },

  // 深度克隆
  deepClone (obj) {
    let result
    let oClass = this.isClass(obj)
    // 确定result的类型
    if (oClass === "Object") {
      result = {};
    } else if (oClass === "Array") {
      result = [];
    } else {
      return obj;
    }

    for (let key in obj) {
      let copy = obj[key];
      if (this.isClass(copy) == "Object") {
        result[key] = this.deepClone(copy);// 递归调用
      } else if (this.isClass(copy) == "Array") {
        result[key] = this.deepClone(copy);
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  },
  // 比较版本号
  versionCompare (oldVersion, newVersion) {
    var arrOld = oldVersion.split('.')
    var arrNew = newVersion.split('.')
    var oldV = ''
    var newV = ''
    for (let x in arrOld) {
      oldV = oldV + this.prefixInteger(parseInt(arrOld[x]), 3)
    }
    for (let y in arrNew) {
      newV = newV + this.prefixInteger(parseInt(arrNew[y]), 3)
    }
    return parseInt(newV) > parseInt(oldV)
  },
  // 按长度补全零
  prefixInteger (num, length) {
    return (Array(length).join('0') + num).slice(-length)
  }
}
