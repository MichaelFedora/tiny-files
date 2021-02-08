<template>
<div id='tiny-login' class='content'>
  <h1>login</h1>
  <div class='form'>
    <b-field>
      <b-input placeholder='username@tinyhome.site' pattern='\w+@.+' v-model='origin' icon-right='account' @keyup.native.enter='login()' />
    </b-field>
  </div>
  <div id='buttons'>
    <a :class='{
      disabled: !origin || working,
      "has-text-grey-lighter": origin && !working,
      "hover-warning": origin && !working
    }' @click='login(false)'>login (root)</a>
    <div style='flex-grow: 1'/>
    <b-button type='is-primary' :disabled='!origin || working' @click='login()' :loading='working'>login</b-button>
  </div>
</div>
</template>
<script src='./login.ts'></script>
<style lang='scss'>
#tiny-login {
  display: inline-block;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);

  > div#buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;

    > button:not(:last-child) {
      margin-right: 0.5rem;
    }

    > a {
      font-size: 0.8rem;
    }
  }
}
</style>
