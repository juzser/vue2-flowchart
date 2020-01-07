import Vue from 'vue'
import VueFlowChart from './vue-flowchart'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueFlowChart)

new Vue({
  render: h => h(App)
}).$mount('#app')
