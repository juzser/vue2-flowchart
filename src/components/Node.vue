<template lang="pug">
.qkfc-node(
  :style="[nodeStyle, nodeOrder]"
  @mousedown.stop="startDragNode"
  @mouseup="handleMouseup"
  @mouseover.stop="handleMouseover"
  @mouseout.stop="handleMouseout"
  @ondragstart="handleDragStart"
  @click="nodeSelected"
)
  IconDownArrow.qkfc-node-port(
    @mousedown.stop="startDragLink"
    @click.stop="handleClickPort"
  )
  .qkfc-node-header
    .qkfc-node-title {{ node.label }}
    IconDeleteNode.qkfc-node-btn-icon--delete(
      @click.stop="deleteNode"
    )

  component(
    :is="componentType"
    :main-data="node"
    @startDragLinkFromOption="startDragLink($event)"
    @nodeSelected="nodeSelected"
    :activeNode="activeNode"
  )
</template>

<script>
import TextNode from './TextNode.vue'
import ButtonNode from './ButtonNode.vue'
import IconDeleteNode from '@/assets/icons/delete-node.svg'
import IconDownArrow from '@/assets/icons/down-arrow.svg'
import { WIDTH_OF_NODE, HEIGHT_OF_TEXT_NODE, HEIGHT_OF_BUTTON_NODE } from '@/helpers/constant'

export default {
  name: 'FlowchartNode',
  components: {
    TextNode,
    ButtonNode,
    IconDeleteNode,
    IconDownArrow
  },

  props: {
    node: {
      type: Object
    },
    activeNode: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      nodeOrder: {
        'z-index': 5
      },
      width: WIDTH_OF_NODE
    }
  },

  computed: {
    nodeStyle () {
      return {
        left: this.node.centerX - this.width / 2 + 'px',
        top: this.node.centerY - this.heightOfNode / 2 + 'px',
        width: this.width + 'px',
        height: this.heightOfNode + 'px'
      }
    },
    heightOfNode () {
      let height = 0
      switch (this.node.type) {
        case 'button':
          height = HEIGHT_OF_BUTTON_NODE
          break
        default:
          height = HEIGHT_OF_TEXT_NODE
      }
      return height
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
      this.nodeSelected()
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

    handleClickPort (e) {
      e.preventDefault()
    },

    deleteNode () {
      this.$emit('deleteNode')
    },

    nodeSelected () {
      this.$emit('nodeSelected', this.$el)
    }
  }
}
</script>
