import FlowChart from '@/components/FlowChart.vue'

const Plugin = {
  install (Vue, options) {
    Vue.component('VueFlowChart', FlowChart)

    if (options) {
      // console.log('options', options);
    }
  }
}

export default Plugin
