<template lang="html">
  <section class="user-tag">
    <as-header :go-back="true" :head-title="headTitle"></as-header>
    {{ message }}
  </section>
</template>

<script>
import Header from 'src/components/Header'

export default {
  data () {
    return {
      'headTitle': '个人标签',
      'message': 123
    }
  },
  components: {
    'as-header': Header
  }
}
</script>

<style lang="less">
.user-tag {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #ffffff;
}
</style>
