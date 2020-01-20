import FlowChart from '@/components/FlowChart.vue'

export const VueFlowChart = FlowChart

const Plugin = {
  install (Vue, options) {
    Vue.component('VueFlowChart', FlowChart)
  }
}

export default Plugin
