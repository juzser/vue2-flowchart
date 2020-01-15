<template lang="pug">
.qkfc-style(v-html="style", style="display: none")
</template>
<script>
export default {
  props: ['options'],
  computed: {
    style () {
      const styles = `
<style type="text/css" id="qkfc-style">

</style>
      `
      return styles
    }
  }
}
</script>
