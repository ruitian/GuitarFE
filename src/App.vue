<template>
  <div class="page-group " id="app">
    <as-header v-if="isLogin"></as-header>
    <router-view name="login"></router-view>
    <mt-tab-container v-model="active" v-if="isLogin">
      <mt-tab-container-item id="meet">
        <router-view name="meet"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="square">
        <router-view name="square"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="message">
        <router-view name="message"></router-view>
      </mt-tab-container-item>
      <mt-tab-container-item id="profile">
        <router-view name="profile"></router-view>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar fixed v-model="active" v-if="isLogin">
      <mt-tab-item id="meet" href="#meet">
        <img slot="icon" src="./assets/meet.png">
        遇见
      </mt-tab-item>
      <mt-tab-item id="square" href="#meet">
        <img slot="icon" src="./assets/heart.png">
        广场
      </mt-tab-item>
      <mt-tab-item id="message" href="#message">
        <img slot="icon" src="./assets/msg.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="profile" href="#profile">
        <img slot="icon" src="./assets/my.png">
        我的
      </mt-tab-item>
    </mt-tabbar>

    <as-slide></as-slide>
  </div>
</template>

<script>
import {Tabbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui'
import Header from './components/Header'
import Slide from './components/Slide'
export default {
  name: 'page',
  computed: {
    isLogin () {
      return this.$store.state.token
    }
  },
  components: {
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
    'as-header': Header,
    'as-slide': Slide
  },
  data () {
    return {
      active: 'meet'
    }
  }
}
</script>

<style lang="less">
@import 'lib/css/mixin.less';
// #app {
//   margin: 0;
//   padding: 0;
//   color: #2c3e50;
//   position: relative;
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//
//   .footer {
//     width: 100%;
//     max-width: 414px;
//     .px2rem(height, 150);
//     position: fixed;
//     bottom: 0;
//   }
// }
.mint-tabbar {
  max-width: 414px;
  margin: 0 auto;
}

</style>
