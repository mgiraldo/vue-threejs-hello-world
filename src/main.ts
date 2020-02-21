import * as VueThreejs from 'vue-threejs'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueThreejs)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
