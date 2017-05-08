<template lang="html">
  <mt-header :title='headTitle'>
    <section class="header_button" slot="left" v-if="goBack" @click="$router.go(-1)">
      <mt-button class="header_button" icon="back">
      </mt-button>
    </section>
    <router-link to="" slot="left" v-if="!isProfile && !goBack">
      <mt-button class="header_button">
        <img :src="avatar" height="30" width="30" slot="icon" @click="showSlideFn">
      </mt-button>
    </router-link>
  </mt-header>
</template>

<script>
import { Header, Button } from 'mint-ui'
export default {
  data () {
    return {
      avatar: this.$store.state.user.avatar_url
    }
  },
  props: ['goBack', 'headTitle'],
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
    isProfile () {
      if (this.$route.path.indexOf('profile') === -1) {
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
