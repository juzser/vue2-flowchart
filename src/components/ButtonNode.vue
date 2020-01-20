<template lang="pug">
.qkfc-btn-node(
  @click="nodeSelected"
)
  .qkfc-btn-node-body
    .qkfc-btn-node-option(
      v-for="(item, i) in mainData.options"
      :key='i + 1'
      @click
    )
      .qkfc-btn-node-option__title {{ item.value }}
      IconRightArrow.qkfc-icon-right-arrow(
        @mousedown.stop="startDragLinkFromOption($event, i + 1)"
      )

</template>

<script>
import IconRightArrow from '@/assets/icons/right-arrow.svg'

export default {
  data () {
    return {
    }
  },
  components: {
    IconRightArrow
  },
  props: {
    mainData: {
      type: Object
    }
  },
  methods: {
    startDragLinkFromOption (e, index) {
      this.$emit('startDragLinkFromOption', { sx: e.clientX, sy: e.clientY, index })
    },
    optionSelected (event, index) {
      if (event.target.parentNode.className === 'qkfc-btn-node-body') {
        const listNode = event.target.parentNode.childNodes
        listNode.forEach(e => {
          e.classList.remove('qkfc-btn-node-option--active')
        })
        listNode[index].classList.add('qkfc-btn-node-option--active')
      }
    },
    nodeSelected () {
      this.$emit('nodeSelected')
    }
  }
}
</script>
