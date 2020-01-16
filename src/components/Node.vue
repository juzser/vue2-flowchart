<template lang="pug">
.qkfc-node(
  :style="[nodeStyle, nodeOrder]"
  @mousedown.stop="startDragLink"
  @mouseup="handleMouseup"
  @mouseover.stop="handleMouseover"
  @mouseout.stop="handleMouseout"
  @ondragstart="handleDragStart"
  @click.stop="nodeSelected"
)

  .qkfc-node-header(
    @mousedown.stop="startDragNode"
  )
    .qkfc-node-title {{ node.label }}
    IconDeleteNode.qkfc-node-btn-icon--delete(
      @click.stop="deleteNode"
    )

  component(
    :is="componentType"
    :main-data="node"
    @startDragLinkFromOption="startDragLink($event)"
  )
</template>

<script>
import TextNode from './TextNode.vue'
import ButtonNode from './ButtonNode.vue'
import IconDeleteNode from '@/assets/icons/delete-node.svg'

export default {
  name: 'FlowchartNode',
  components: {
    TextNode,
    ButtonNode,
    IconDeleteNode
  },

  props: {
    node: {
      type: Object
    },
    width: Number,
    height: Number
  },

  data () {
    return {
      nodeOrder: {
        'z-index': 5
      }
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
      e.preventDefault()
      this.nodeOrder['z-index'] = 10
      const shiftX = e.clientX - this.node.centerX
      const shiftY = e.clientY - this.node.centerY

      this.$emit('startDragNode', { shiftX, shiftY })
    },

    startDragLink (event) {
      if (event.index) {
        this.$emit('startDragLink', event)
      } else {
        this.$emit('startDragLink', { sx: event.clientX, sy: event.clientY, index: null })
      }
    },

    handleMouseup (e) {
      this.nodeOrder['z-index'] = 5
    },

    handleMouseover (e) {
      // this.nodeSeleted = true
      this.$emit('dragTarget', { id: this.node.id })
    },

    handleMouseout (e) {
      // this.nodeSeleted = false
    },

    handleDragStart (e) {
      e.preventDefault()
      return false
    },

    deleteNode () {
      this.$emit('deleteNode')
    },

    nodeSelected (e) {
      this.$emit('nodeSelected', e)
    }
  }
}
</script>
