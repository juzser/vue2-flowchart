import FlowChart from '@/components/FlowChart.vue'

const Plugin = {
  install (Vue, options) {
    Vue.component('VueFlowChart', FlowChart)
  }
}

export default Plugin
