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
        nodeBgColor,
        linkActiveColor
      } = this.options

      const styles = `
<style type="text/css" id="qkfc-style">
.qkfc-node {
  background-color: ${nodeBgColor};
  opacity: 0.5;
}

// .qkfc-node-header--active {
//   color: ${nodeBdColor}
// }

.qkfc-node:hover {
  opacity: 1;
  border: 1px solid ${nodeBdColor};
  border-top: 4px solid ${nodeBdColor};
}

.qkfc-node--active {
  opacity: 1;
  border: 1px solid ${nodeBdColor};
  border-top: 4px solid ${nodeBdColor};
}
.qkfc-node--active .qkfc-node-header, .qkfc-node:hover .qkfc-node-header {
  color: ${nodeBdColor}
}
.qkfc-node--active .qkfc-node-btn-icon--delete, .qkfc-node:hover .qkfc-node-btn-icon--delete {
  fill: ${nodeBdColor}
}
qkfc-btn-node-option--active {
  border: 1px solid ${nodeBdColor};
  border-left: 4px solid ${nodeBdColor};
}

.qkfc-btn-node-option--active {
  border-left: 3px solid ${nodeBdColor}
}
.qkfc-link--active {
  stroke: ${nodeBdColor};
  opacity: 1;
}
// .qkfc-node-btn-icon--delete-active {
//   fill: ${nodeBdColor};
// }

.qkfc-flow-chart-link--active {
  fill: ${linkActiveColor};
  transform: scale(2);
}
</style>
      `
      return styles
    }
  }
}
</script>
