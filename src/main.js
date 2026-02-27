import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Element UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'
import PmsCard from './components/PmsCard.vue'

Vue.config.productionTip = false

// 使用Element UI
Vue.use(ElementUI)
Vue.component('pms-card', PmsCard)

// 配置axios
Vue.prototype.$http = axios
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || ''

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')