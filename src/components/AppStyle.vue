<template lang="pug">
.qkfc-style(v-html="style", style="display: none")
</template>
<script>
export default {
  props: ['options'],
  computed: {
    style () {
      if (!this.options) {
        return ''
      }

      const {
        nodeBdColor,
        nodePortColor,
        nodeBgColor,
        nodePortSize,
        iconDeleteNodeColor
      } = this.options

      const styles = `
<style type="text/css" id="qkfc-style">
.qkfc-node {
  background-color: ${nodeBgColor}
}
.qkfc-node--active {
  border-top: 2.5px solid ${nodeBdColor};
}

qkfc-btn-node-option--active {
  border-left: 2.5px solid ${nodeBgColor};
}

.qkfc-node-port {
  border: 1.5px solid ${nodePortColor};
  width: ${nodePortSize}px;
  height: ${nodePortSize}px;
  transform: translate(-${nodePortSize / 2 + 3}px, -${nodePortSize / 2 + 1}px);
}

.qkfc-node-port:hover {
  background-color: ${nodePortColor}
}

.qkfc-btn-node-option--active {
  border-left: 2px solid ${nodeBdColor}
}

.qkfc-node-btn-icon--delete-active {
  fill: ${iconDeleteNodeColor};
}

</style>
      `
      return styles
    }
  }
}
</script>
