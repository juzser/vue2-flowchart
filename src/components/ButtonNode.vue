<template lang="pug">
div button node
  .qkfc-btn-node.card
    .card-body
      .card-text(v-for="(item, i) in mainData.options" :key='i + 1')
        button.btn.btn-sm.qkfc-btn-option(
          @mousedown.stop="startDragLinkFromOption($event, i + 1)"
        ) {{ item.value }}
          IconRightArrow.qkfc-icon-right-arrow

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
    }
  }
}
</script>
