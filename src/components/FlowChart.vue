<template lang="pug">
.qkfc-container(
  @mousemove="handleMove"
  @mouseup="handleUp"
  @mousedown="handleDown"
)
  .qkfc-flow-chart-content
    .qkfc-node-list
      Node(
        v-for="item in nodes"
        :key="item.id"
        :node="item"
        @startDragNode="startDragNode(item.id, $event)"
        @startDragLink="startDragLink(item.id, $event)"
        @dragTarget="dragTarget($event)"
      )
    .qkfc-links-wrapper
      svg(
        width="100%"
        height="100%"
      )
        Link.qkfc-flow-chart-link(
          v-for="item in lines"
          :key="item.id"
          :start="item.start"
          :end="item.end"
        )
        Link.qkfc-flow-chart-link(
          v-if="action.linking && draggingLink"
          :start="[draggingLink.sx, draggingLink.sy]"
          :end="[mouse.x, mouse.y]"
        )
  AppStyle
</template>

<script>
import Node from './Node'
import TextNode from './TextNode'
import ButtonNode from './ButtonNode'
// import NodePort from './NodePort'
import Link from './Link'
import AppStyle from './AppStyle'

import { portPosition } from '@/helpers/port-position'
import { nodes, links } from '@/helpers/fake-nodes'

export default {
  components: {
    TextNode,
    ButtonNode,
    Node,
    // NodePort,
    Link,
    AppStyle
  },
  data () {
    return {
      nodes: nodes,
      links: links,
      action: {
        linking: false,
        dragging: false,
        scrolling: false,
        selected: 0
      },
      mouse: {
        x: 0,
        y: 0,
        shiftX: 0,
        shiftY: 0
      },
      draggingLink: null
    }
  },
  computed: {
    lines () {
      const lines = this.links.map((link) => {
        let start = []
        let end = []

        const fromNode = this.findNodeWithId(link.from)
        const toNode = this.findNodeWithId(link.to)
        const shiftX = fromNode.centerX - toNode.centerX
        const shiftY = fromNode.centerY - toNode.centerY

        if (shiftX < 0 && shiftY < 0) {
          start = [...portPosition.getPortBottom(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
          end = [...portPosition.getPortTop(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        }

        if (shiftX < 0 && shiftY > 0) {
          start = [...portPosition.getPortRight(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
          end = [...portPosition.getPortLeft(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        }

        if (shiftX > 0 && shiftY < 0) {
          start = [...portPosition.getPortBottom(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
          end = [...portPosition.getPortTop(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        }

        if (shiftX > 0 && shiftY > 0) {
          start = [...portPosition.getPortLeft(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
          end = [...portPosition.getPortRight(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        }

        return {
          start: start,
          end: end,
          id: link.id
        }
      })

      return lines
    }
  },

  methods: {
    findNodeWithId (id) {
      return this.nodes.find((item) => {
        return id === item.id
      })
    },

    startDragNode (id, { shiftX, shiftY }) {
      this.action.dragging = id
      this.mouse.shiftX = shiftX
      this.mouse.shiftY = shiftY
      this.$emit('node-click', id)
    },

    startDragLink (id, { sx, sy, index }) {
      this.action.linking = true
      this.draggingLink = {
        from: id,
        option: index,
        sx: sx,
        sy: sy
      }
    },

    handleMove (e) {
      if (this.action.linking) {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY
      }

      if (this.action.dragging) {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY

        const dx = this.mouse.x - this.mouse.shiftX
        const dy = this.mouse.y - this.mouse.shiftY

        this.moveSelectedNode(dx, dy)
      }
    },

    handleUp (e) {
      if (this.action.linking && this.draggingLink) {
        const { from, option, to } = this.draggingLink

        this.links.push({
          from: from,
          option: option,
          to: to,
          id: Math.floor(Math.random() * 100)
        })
      }

      this.action.linking = false
      this.action.dragging = null
      this.action.scrolling = false
    },

    handleDown () {
      this.action.scrolling = true
    },

    moveSelectedNode (dx, dy) {
      const index = this.nodes.findIndex((item) => {
        return item.id === this.action.dragging
      })

      this.$set(this.nodes, index, Object.assign(this.nodes[index], {
        centerX: dx,
        centerY: dy
      }))
    },

    dragTarget (e) {
      if (this.action.linking && this.draggingLink) {
        this.draggingLink = Object.assign({}, this.draggingLink, {
          to: e.id
        })
      }
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
