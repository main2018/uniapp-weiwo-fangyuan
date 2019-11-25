import Vue from 'vue'
import App from './App'

import store from './store'
import * as api from '@/api';
import {baseUrl} from '@/config';
import uniRouterApis from '@/common/js/router';

// require('./assets/styles/vendor.css');
// import 'http://at.alicdn.com/t/font_1495979_gj3et9fbpr9.css';
console.log('uniRouterApis', uniRouterApis)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$baseUrl = baseUrl

Object.assign(Vue.prototype, uniRouterApis)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
