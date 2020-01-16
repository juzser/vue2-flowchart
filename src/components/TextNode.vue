<template lang="pug">
.qkfc-text-node(
) {{ mainData.text }}
</template>

<script>

export default {
  data () {
    return {
    }
  },
  props: {
    mainData: {
      type: Object
    }
  },
  methods: {
    startDragLinkFromNode (e) {
      console.log(e)
      this.$emit('startDragLinkFromNode', e)
    }
  }
}
</script>
