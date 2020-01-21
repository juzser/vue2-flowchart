<template lang="pug">
.qkfc-text-node(
  @click.stop="nodeSelected"
)
  .qkfc-text-node-body {{ mainData.text }}

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
    nodeSelected () {
      this.$emit('nodeSelected')
    }
  }
}
</script>
