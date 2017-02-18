<template>
  <div id="app" class="container">
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      <as-footer></as-footer>
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    'as-footer': Footer
  }
}
</script>

<style lang="less">
@import 'lib/css/mixin.less';
#app {
  margin: 0;
  padding: 0;
  color: #2c3e50;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .footer {
    width: 100%;
    max-width: 414px;
    .px2rem(height, 150);
    position: fixed;
    bottom: 0;
  }
}

</style>
