<template lang="pug">
#app
  VueFlowChart(
    :nodes.sync="nodes"
    :links.sync="links"
    :options="options"
    @linkDeleted='linkDeleted'
    @nodeSelected='nodeSelected'
    @nodeDeleted='nodeDeleted'
    @linkSelected='linkSelected'
  )
</template>

<script>
import { nodes, links } from '@/helpers/fake-nodes'

export default {
  data () {
    return {
      nodes: nodes,
      links: links,
      options: {
        disableHoverLink: true
      }
    }
  },
  components: {},
  methods: {
    linkDeleted (id) {
      console.log('linkDeleted: ' + id)
    },
    nodeSelected (id) {
      console.log('nodeSelected: ' + id)
    },
    nodeDeleted (id) {
      console.log('nodeDeleted: ' + id)
    },
    linkSelected (id) {
      console.log('linkSelected: ' + id)
    }
  }
}
</script>
