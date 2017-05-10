<template lang="html">
  <div class="setting_about">
    <as-header :head-title='title' :go-back='true'></as-header>
  </div>
</template>

<script>
import Header from 'src/components/Header'

export default {
  data () {
    return {
      title: '关于我们'
    }
  },
  components: {
    'as-header': Header
  }
}
</script>

<style lang="less">
  .setting_about{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;
  }
</style>
