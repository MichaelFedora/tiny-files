<template>
<div id='tiny-settings'>
</div>
</template>

<script lang='ts'>
import Vue from 'vue';

// show all "shares"
// show their root folder, number of items
// rename, delete
export default Vue.extend({
  name: 'tiny-settings',
  data() { return {

  } },
  methods: {
    close() {
      this.$emit('close');
    }
  }
});
</script>
<style lang='scss'>
#tiny-settings {

}
</style>
