<template>
<div id='tiny-not-found' class='content'>
  <h1>404 Not Found</h1>
  <p>Couldn't find the page you were looking for. Try going <router-link to='/'>Home</router-link>?</p>
</div>
</template>
<script>
export default {
  name: 'tiny-not-found'
}
</script>
<style lang='scss'>
#tiny-not-found {
  padding: 1rem;
  padding-top: 1.5rem;
}
</style>
