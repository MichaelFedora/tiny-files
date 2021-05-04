<template>
<div id='tiny-explore'>
  <h1 class='title'>tiny-files explorer</h1>
  <tiny-explorer
    v-if='paths'
    :paths='paths'
    @update:dir='dir = $event'
    @open='open'
    :mapLink='getLink'
    rootRoute='/explore'
    :rootName='rootName'
    viewOnly
  />
  <b-loading :active='working' />
</div>
</template>

<script src='./explore.ts'></script>
<style lang='scss'>
div#tiny-explore {
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-flow: column;

  > h1 {
    padding-left: 0.5rem;
    padding-bottom: 1.25rem;
    padding-top: 0.75rem;
    margin-bottom: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  }

  > div#tiny-explorer { height: 100%; }
}
</style>
