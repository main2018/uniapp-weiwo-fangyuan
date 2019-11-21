import Vue from 'vue'
import App from './App'

import store from './store'
import * as api from '@/api';

// require('./assets/styles/vendor.css');
// import 'http://at.alicdn.com/t/font_1495979_gj3et9fbpr9.css';

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
