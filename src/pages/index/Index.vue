<template>
  <div class="page-group">
    <router-view name="login"></router-view>
    <mt-tab-container v-model="active" v-if="isLogin">
      <mt-tab-container-item id="meet">
        <as-meet></as-meet>
      </mt-tab-container-item>
      <mt-tab-container-item id="square">
        222
      </mt-tab-container-item>
      <mt-tab-container-item id="bindSchool">
        <as-bind-school></as-bind-school>
      </mt-tab-container-item>
      <mt-tab-container-item id="profile">
        <as-user></as-user>
      </mt-tab-container-item>
    </mt-tab-container>

    <mt-tabbar v-model="active" v-if="isLogin" class="footer_nav">
      <mt-tab-item id="meet">
        <img slot="icon" src="../../assets/meet.png"> 遇见
      </mt-tab-item>
      <mt-tab-item id="square">
        <img slot="icon" src="../../assets/heart.png"> 广场
      </mt-tab-item>
      <mt-tab-item id="bindSchool">
        <img slot="icon" src="../..//assets/msg.png"> 消息
        <mt-badge size="small" class="footer_badge" type="error" v-if="messages !== 0">{{ messages }}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="profile">
        <img slot="icon" src="../../assets/my.png"> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {
    Tabbar,
    TabItem,
    TabContainer,
    TabContainerItem,
    Badge
  } from 'mint-ui'
  import User from '../user/User'
  import BindSchool from '../../components/BindSchool'
  import Meet from '../../components/Meet'

  export default {
    name: 'index',
    computed: {
      isLogin () {
        return this.$store.state.token
      },
      messages () {
        return this.$store.state.messageNum
      }
    },
    components: {
      'mt-tabbar': Tabbar,
      'mt-tab-item': TabItem,
      'mt-tab-container': TabContainer,
      'mt-tab-container-item': TabContainerItem,
      'mt-badge': Badge,
      'as-user': User,
      'as-bind-school': BindSchool,
      'as-meet': Meet
    },
    data () {
      return {
        active: 'meet'
      }
    }
  }
</script>

<style lang="less">
  @import '../../lib/css/mixin.less';
  body {
    margin: 0;
  }

  .slide-open .footer_nav {
    left: 7rem;
    right: -7rem;
  }

  .footer_nav {
    position: fixed;
    left: 0;
    transition: left .4s cubic-bezier(0.19,1,.22,1);
    -moz-transition: left .4s cubic-bezier(0.19,1,.22,1);
    -webkit-transition: left .4s cubic-bezier(0.19,1,.22,1);
    -o-transition: left .4s cubic-bezier(0.19,1,.22,1);
    .mint-tab-item-label {
      color: #9C9C9C;
    }
    .footer_badge {
      position: absolute;
      top: 10px;
    }
  }
</style>
