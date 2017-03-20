<template lang="html">
  <mt-header title="标题过长会隐藏后面的内容啊哈哈哈哈">
    <router-link to="" slot="left">
      <mt-button class="header_button">
        <img src="../assets/avatar.png" height="40" width="40" slot="icon" @click="showSlideFn">
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
