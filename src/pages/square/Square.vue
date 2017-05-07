<template lang="html">
  <div class="message">
    <as-header></as-header>
    {{ message }}
    <as-footer></as-footer>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

export default {
  data () {
    return {
      message: '广场'
    }
  },
  components: {
    'as-footer': Footer,
    'as-header': Header
  }
}
</script>

<style lang="less">
</style>
