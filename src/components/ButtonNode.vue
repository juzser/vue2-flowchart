<template lang="pug">
.qkfc-btn-node(
  @click.stop="nodeSelected"
)
  .qkfc-btn-node-text {{ mainData.text }}
  .qkfc-btn-node-body
    button.qkfc-btn-node-option(
      type="button"
      v-for="(item, i) in mainData.options"
      :key='i + 1'
      @click.stop="optionSelected($event, i)"
      :disabled="!activeNode"
    )
      .qkfc-btn-node-option__title {{ item.value }}
      IconRightArrow.qkfc-icon-right-arrow(
        @mousedown.stop="startDragLinkFromOption($event, i + 1)"
      )

</template>

<script>
import IconRightArrow from '@/assets/icons/right-arrow.svg'
import EventBus from '@/helpers/event-bus'

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
    },
    activeNode: Boolean
  },
  methods: {
    startDragLinkFromOption (e, index) {
      this.$emit('startDragLinkFromOption', { sx: e.clientX, sy: e.clientY, index })
    },
    optionSelected (event, index) {
      const buttonNode = this.$el
      const listOption = buttonNode.getElementsByClassName('qkfc-btn-node-option')
      listOption.forEach(e => {
        e.classList.remove('qkfc-btn-node-option--active')
      })
      listOption[index].classList.add('qkfc-btn-node-option--active')
      EventBus.$emit('select-btn-node-option', { parentNodeId: this.mainData.id, option: index + 1 })
    },
    nodeSelected () {
      this.$emit('nodeSelected')
    }
  }
}
</script>
