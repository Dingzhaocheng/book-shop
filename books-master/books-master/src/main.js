import Vue from 'vue'
import VueRouter from 'vue-router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App.vue'
import Home from './pages/Home.vue'
import Detail from './pages/Detail.vue'
import Result from './pages/Result.vue'

Vue.use(VueRouter)
Vue.use(MintUI)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/detail', component: Detail },
  { path: '/result', component: Result }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
