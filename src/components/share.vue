<template>
<div id='tiny-share'>
</div>
</template>

<script lang='ts'>
import Vue from 'vue';

// show autocomplete for share
// - on complete: update
//   - add or replace?
//   - confirm
// - on blank: add
// return link for browse to show
export default Vue.extend({
  name: 'tiny-share',
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
#tiny-share {

}
</style>
