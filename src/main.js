// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import RecyclerView from './recyclerview'
// import RecyclerView from './recyclerview.build'
import vueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(vueLazyload)
Vue.use(RecyclerView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
