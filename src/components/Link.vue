<template lang="pug">
g(
  class="qkfc-link-svg-group"
  @mouseover="handleMouseOver"
  @mouseleave="handleMouseLeave"
  @click.stop="handleClick"
)
  path(
    :d="dAttr"
    :style="pathStyle"
  )
  a(
    v-if="show.delete && !disableHoverLink"
    @click.stop="deleteLink"
  )
    text(
      text-anchor="middle"
      :transform="arrowTransform"
      font-size="22"
    ) &times;
  path(
    v-else
    d="M -1 -1 L 0 1 L 1 -1 z"
    :style="arrowStyle"
    :transform="arrowTransform"
  )
</template>

<script>
export default {
  name: 'FlowchartLink',

  props: {
    // start point position [x, y]
    start: {
      type: Array,
      default () {
        return [0, 0]
      }
    },

    // end point position [x, y]
    end: {
      type: Array,
      default () {
        return [0, 0]
      }
    },
    id: Number,
    disableHoverLink: {
      type: Boolean
    }
  },

  data () {
    return {
      show: {
        delete: false
      }
    }
  },

  methods: {
    handleClick () {
      if (this.disableHoverLink) {
        this.$emit('linkSelected')
      }
    },
    handleMouseOver () {
      if (this.id) {
        this.show.delete = true
      }
    },

    handleMouseLeave () {
      this.show.delete = false
    },

    caculateCenterPoint () {
      // caculate arrow position: the center point between start and end
      const dx = (this.end[0] - this.start[0]) / 2
      const dy = (this.end[1] - this.start[1]) / 2
      return [this.start[0] + dx, this.start[1] + dy]
    },

    caculateRotation () {
      // caculate arrow rotation
      const angle = -Math.atan2(this.end[0] - this.start[0], this.end[1] - this.start[1])
      const degree = angle * 180 / Math.PI
      return degree < 0 ? degree + 360 : degree
    },
    deleteLink () {
      this.$emit('deleteLink')
    }
  },
  computed: {
    pathStyle () {
      return {
        stroke: 'rgb(255, 136, 85)',
        strokeWidth: 2.73205,
        fill: 'none'
      }
    },

    arrowStyle () {
      return {
        stroke: 'rgb(255, 136, 85)',
        strokeWidth: 5.73205,
        fill: 'none'
      }
    },

    arrowTransform () {
      const [arrowX, arrowY] = this.caculateCenterPoint()
      const degree = this.caculateRotation()
      return `translate(${arrowX}, ${arrowY}) rotate(${degree})`
    },

    dAttr () {
      let cx = this.start[0]; let cy = this.start[1]; let ex = this.end[0]; let ey = this.end[1]
      let x1 = cx; let y1 = cy + 50; let x2 = ex; let y2 = ey - 50
      return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`
    }
  }
}
</script>
