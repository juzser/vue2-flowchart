<template lang="pug">
.qkfc-container(
  @mousemove.stop="handleMove"
  @mouseup.stop="handleUp"
  @mousedown.stop="handleDown"
)

  .qkfc-content
    .qkfc-node-list
      Node(
        v-for="(item, index) in nodes"
        :key="item.id"
        :id="`qkfc-node-${item.id}`"
        :node="item"
        :activeNode="nodeActive === item.id ? true : false"
        @startDragNode="startDragNode(item.id, $event)"
        @startDragLink="startDragLink(item.id, $event)"
        @dragTarget="dragTarget($event)"
        @deleteNode="deleteNode(item.id)"
        @nodeSelected="nodeSelected($event, item.id)"
      )
    .qkfc-links-wrapper
      svg(
        width="100%"
        height="100%"
      )
        Link.qkfc-link(
          v-for="item in lines"
          :key="item.id"
          :start="item.start"
          :end="item.end"
          :id="`qkfc-link-${item.id}`"
          :class="{'qkfc-link--active': item.active, 'qkfc-link--select': selectedLink === item.id ? true : false}"
          :selectedLink="selectedLink === item.id ? true : false"
          @deleteLink="deleteLink(item.id)"
          @linkSelected="linkSelected($event, item.id)"
          :disableHoverLink="optionsMain.disableHoverLink"
        )
        Link.qkfc-link(
          v-if="action.linking && draggingLink.from"
          :start="[draggingLink.sx, draggingLink.sy]"
          :end="[mouse.x, mouse.y]"
        )
  AppStyle(:options="optionsMain")
</template>

<script>
import EventBus from '@/helpers/event-bus'
import Node from './Node'
import TextNode from './TextNode'
import ButtonNode from './ButtonNode'
import Link from './Link'
import AppStyle from './AppStyle'

import { portPosition } from '@/helpers/port-position'

export default {
  name: 'FlowChart',
  components: {
    TextNode,
    ButtonNode,
    Node,
    Link,
    AppStyle
  },
  props: {
    options: {
      type: Object,
      default: () => { return {} }
    },
    nodes: {
      type: Array
    },
    links: {
      type: Array
    }
  },
  data () {
    return {
      defaultOptions: {
        nodeBdColor: '#6188F3',
        optionsItemBgColor: '#05E839',
        optionsItemColor: '#FFFFFF',
        nodePortColor: '#FFDF10',
        nodePortSize: 14,
        linksColor: '#FF1500',
        nodeBgColor: '#FFFFFF',
        iconDeleteNodeColor: '#FF7216',
        iconDeleteNodeBdColor: '#FF7216',
        disableHoverLink: false
      },
      activeClass: [],
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
      scroll: {
        x: 0,
        y: 0
      },
      draggingLink: null,
      nodeActive: null,
      linkActive: [],
      selectedLink: null
    }
  },
  computed: {
    optionsMain () {
      return { ...this.defaultOptions, ...this.options }
    },
    lines () {
      const linkActive = this.linkActive
      const lines = this.links.map((link) => {
        let start = []
        let end = []

        const fromNode = this.findNodeWithId(link.from)
        const toNode = this.findNodeWithId(link.to)
        // phân vùng
        // const lF = fromNode.centerX - fromNode.width / 2
        // const rF = fromNode.centerX + fromNode.width / 2
        // const tF = fromNode.centerY - fromNode.height / 2
        // const bF = fromNode.centerY + fromNode.height / 2

        const shiftX = fromNode.centerX - toNode.centerX
        const shiftY = fromNode.centerY - toNode.centerY

        // if (toNode.centerX + toNode.width / 2 <= lF) {
        //   start = [...portPosition.getPortLeft(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
        //   end = [...portPosition.getPortRight(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        // }

        // if (toNode.centerX - toNode.width / 2 >= rF) {
        //   start = [...portPosition.getPortRight(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
        //   end = [...portPosition.getPortLeft(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        // }

        // if (toNode.centerY + toNode.height / 2 <= tF) {
        //   start = [...portPosition.getPortTop(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
        //   end = [...portPosition.getPortBottom(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        // }

        // if (toNode.centerY - toNode.height / 2 >= bF) {
        //   start = [...portPosition.getPortBottom(fromNode.centerX, fromNode.centerY, fromNode.width, fromNode.height)]
        //   end = [...portPosition.getPortTop(toNode.centerX, toNode.centerY, toNode.width, toNode.height)]
        // }

        if (shiftX < 0 && shiftY < 0) {
          start = [...portPosition.getPortBottom(fromNode.centerX, fromNode.centerY, fromNode.type)]
          end = [...portPosition.getPortTop(toNode.centerX, toNode.centerY, toNode.type)]
        }

        if (shiftX < 0 && shiftY > 0) {
          start = [...portPosition.getPortRight(fromNode.centerX, fromNode.centerY, fromNode.type)]
          end = [...portPosition.getPortLeft(toNode.centerX, toNode.centerY, toNode.type)]
        }

        if (shiftX > 0 && shiftY < 0) {
          start = [...portPosition.getPortBottom(fromNode.centerX, fromNode.centerY, fromNode.type)]
          end = [...portPosition.getPortTop(toNode.centerX, toNode.centerY, toNode.type)]
        }

        if (shiftX > 0 && shiftY > 0) {
          start = [...portPosition.getPortLeft(fromNode.centerX, fromNode.centerY, fromNode.type)]
          end = [...portPosition.getPortRight(toNode.centerX, toNode.centerY, toNode.type)]
        }

        // check link active
        let active = false
        if (linkActive.length) {
          const flag = linkActive.findIndex(e => {
            return e.id === link.id
          })
          if (flag > -1) {
            active = true
          }
        }

        return {
          start: start,
          end: end,
          id: link.id,
          active
        }
      })

      return lines
    }
  },

  watch: {
    links: 'setLinkActive'
  },
  created () {
    EventBus.$on('select-btn-node-option', this.selectOption)
  },

  beforeDestroy () {
    EventBus.$off('select-btn-node-option')
  },

  methods: {
    selectOption (event) {
      const linkSelected = this.links.find(e => {
        return e.from === event.parentNodeId && e.option === event.option
      })
      if (linkSelected) {
        this.selectedLink = linkSelected.id
      } else {
        this.selectedLink = null
      }
      this.$emit('optionSelected', event)
    },
    linkSelected (e, id) {
      this.selectedLink = id
      this.$emit('linkSelected', id)
    },
    findNodeWithId (id) {
      return this.nodes.find((item) => {
        return id === item.id
      })
    },
    nodeSelected (e, id, index) {
      this.selectedLink = null
      this.nodeActive = id
      this.setLinkActive()

      const nodeSelected = document.getElementById(`qkfc-node-${id}`)
      const listNode = document.getElementsByClassName('qkfc-node')
      // deactive node others
      listNode.forEach(e => {
        e.classList.remove('qkfc-node--active')
      })

      // active node
      nodeSelected.classList.add('qkfc-node--active')
      this.$emit('nodeSelected', id)
    },

    startDragNode (id, { shiftX, shiftY }) {
      this.action.dragging = id
      this.mouse.shiftX = shiftX
      this.mouse.shiftY = shiftY
    },

    startDragLink (id, { sx, sy, index }) {
      this.action.linking = true
      this.mouse.x = sx + Math.floor(this.$el.scrollLeft) - this.$el.offsetLeft
      this.mouse.y = sy + Math.floor(this.$el.scrollTop) - this.$el.offsetTop
      this.nodeActive = id

      this.draggingLink = {
        from: id,
        option: index,
        sx: sx + Math.floor(this.$el.scrollLeft) - this.$el.offsetLeft,
        sy: sy + Math.floor(this.$el.scrollTop) - this.$el.offsetTop
      }
    },

    handleMove (e) {
      if (this.action.linking) {
        this.mouse.x = e.clientX + Math.floor(this.$el.scrollLeft) - this.$el.offsetLeft
        this.mouse.y = e.clientY + Math.floor(this.$el.scrollTop) - this.$el.offsetTop
      }

      if (this.action.dragging) {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY

        const dx = this.mouse.x - this.mouse.shiftX
        const dy = this.mouse.y - this.mouse.shiftY

        this.moveSelectedNode(dx, dy)
      }

      if (this.action.scrolling) {
        this.mouse.x = e.clientX
        this.mouse.y = e.clientY
      }
    },

    handleUp (e) {
      if (this.action.dragging) {
        const x = this.mouse.x - this.mouse.shiftX
        const y = this.mouse.y - this.mouse.shiftY
        const id = this.action.dragging
        this.$emit('updatePositionNode', { id, x, y })
      }
      if (this.action.linking && this.draggingLink.to && this.draggingLink.to !== this.draggingLink.from) {
        const { from, option, to } = this.draggingLink
        let link = this.links.find(e => e.from === from && e.option === option)
        if (link) {
          this.$emit('editLink', {
            to: to,
            id: link.id,
            from: from,
            option: option
          })
        } else {
          this.$emit('addLink', {
            from: from,
            option: option,
            to: to
          })
        }
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
    setLinkActive () {
      if (this.nodeActive) {
        if (this.links.length) {
          this.linkActive = this.links.filter(e => {
            return e.from === this.nodeActive || e.to === this.nodeActive
          })
        }
      }
    },

    dragTarget (e) {
      if (this.action.linking && this.draggingLink && e.id) {
        this.draggingLink = Object.assign({}, this.draggingLink, {
          to: e.id
        })
      }
    },

    deleteLink (id) {
      // this.links = this.links.filter(e => e.id !== id)
      this.$emit('linkDeleted', id)
    },

    deleteNode (id) {
      // this.nodes = this.nodes.filter(e => e.id !== id)
      // this.links = this.links.filter((link) => {
      //   return link.from !== id && link.to !== id
      // })
      this.$emit('nodeDeleted', id)
    }
  }
}
</script>

<style src="../assets/scss/_app.scss" lang="scss"></style>
