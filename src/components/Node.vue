<template lang="pug">
.qkfc-node(
  :style="[nodeStyle, nodeOrder]"
  @mousedown.stop="startDragNode"
  @mouseup="handleMouseup"
  @mouseover.stop="handleMouseover"
  @mouseout.stop="handleMouseout"
  @ondragstart="handleDragStart"
)
  div.qkfc-node-port__child.qkfc-node-port__child--top(
    @mousedown.stop="startDragLink"
  )
  div.qkfc-node-port__child.qkfc-node-port__child--right(
    @mousedown.stop="startDragLink"
  )
  div.qkfc-node-port__child.qkfc-node-port__child--bottom(
    @mousedown.stop="startDragLink"
  )
  div.qkfc-node-port__child.qkfc-node-port__child--left(
    @mousedown.stop="startDragLink"
  )
  div {{ node.label }}
  component(
    :is="componentType"
    :main-data="node"
    @startDragLinkFromOption="startDragLink($event)"
  )

</template>

<script>
import TextNode from './TextNode.vue'
import ButtonNode from './ButtonNode.vue'

export default {
  name: 'FlowchartNode',
  components: {
    TextNode,
    ButtonNode
  },
  data () {
    return {
      nodeOrder: {
        'z-index': 10
      },
      nodePort: {
        width: 14,
        height: 14
      }
    }
  },
  props: {
    node: {
      type: Object
    }
  },
  computed: {
    nodeStyle () {
      return {
        left: this.node.centerX - this.node.width / 2 + 'px',
        top: this.node.centerY - this.node.height / 2 + 'px',
        width: this.node.width + 'px',
        height: this.node.height + 'px'
      }
    },
    componentType () {
      let type = ''
      switch (this.node.type) {
        case 'button':
          type = 'ButtonNode'
          break
        default:
          type = 'TextNode'
      }
      return type
    }
  },
  methods: {
    startDragNode (e) {
      this.nodeOrder['z-index'] = 5
      const target = e.target || e.srcElement
      let shiftX = e.clientX - this.node.centerX
      let shiftY = e.clientY - this.node.centerY
      if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0) {
        this.$emit('startDragNode', { shiftX, shiftY })
      }
      e.preventDefault()
    },
    startDragLink (event) {
      if (event.index) {
        this.$emit('startDragLink', event)
      } else {
        this.$emit('startDragLink', { sx: event.clientX, sy: event.clientY, index: null })
      }
      console.log(event)
    },
    handleMouseup (e) {
      this.nodeOrder['z-index'] = 10
    },
    handleMouseover (e) {
      this.$emit('dragTarget', { id: this.node.id })
    },
    handleMouseout (e) {
      // console.log('handleMouseout')
      // console.log(e)
    },
    handleDragStart (e) {
      e.preventDefault()
      return false
    }
  }
}
</script>
