<template lang="html">
  <mt-header :title=title>
    <router-link to="" slot="left" v-if="router">
      <mt-button class="header_button">
        <img src="../assets/avatar.png" height="30" width="30" slot="icon" @click="showSlideFn">
      </mt-button>
    </router-link>
  </mt-header>
</template>

<script>
import { Header, Button } from 'mint-ui'
export default {
  components: {
    'mt-header': Header,
    'mt-button': Button
  },
  methods: {
    showSlideFn () {
      this.$store.dispatch('showSlide')
    }
  },
  computed: {
    router () {
      if (this.$route.path === '/profile') {
        return false
      } else {
        return true
      }
    },
    title () {
      if (this.$route.path === '/meet') {
        return '遇见'
      }
      if (this.$route.path === '/square') {
        return '广场'
      }
      if (this.$route.path === '/message') {
        return '动态'
      }
      if (this.$route.path === '/profile') {
        return '我的'
      }
    }
  }
}
</script>

<style lang="less">
  .header_button {
    img {
      border-radius: 50%;
    }
  }
</style>
