<template>
  <div class="container">
    <as-header v-if="isLogin"></as-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Index from './index/Index'

  export default {
    computed: {
      isLogin () {
        return this.$store.state.token
      }
    },
    components: {
      'as-header': Header,
      'as-index': Index
    }
  }
</script>

<style lang="less">

</style>
