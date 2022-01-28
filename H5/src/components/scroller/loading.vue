<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script>
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="less">
  .mf-loading-container {
      display: inline-block;
      img{
      transform: translate(0,4px);
      width: 20px;
      height: 20px;
      display: inline-block;
      }
  }
</style>
