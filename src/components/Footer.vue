<template lang="html">
  <section>
    <mt-tabbar class="footer_nav">
      <mt-tab-item id="meet" href="#/meet" :class="$route.path.indexOf('meet') !== -1 || $route.path === '/' ? 'active' : ''">
        <img slot="icon" src="../assets/meet.png"> 遇见
      </mt-tab-item>
      <mt-tab-item id="square" href="#/square" :class="$route.path.indexOf('square') !== -1? 'active' : ''">
        <img slot="icon" src="../assets/heart.png"> 广场
      </mt-tab-item>
      <mt-tab-item id="message" href="#/message" :class="$route.path.indexOf('message') !== -1? 'active' : ''">
        <img slot="icon" src="../assets/msg.png"> 消息
        <mt-badge size="small" class="footer_badge" type="error" v-if="unReadCount !== 0">{{ unReadCount }}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="profile" href="#/profile" :class="$route.path.indexOf('profile') !== -1? 'active' : ''">
        <img slot="icon" src="../assets/my.png"> 我的
      </mt-tab-item>
    </mt-tabbar>
  </section>
</template>

<script>
import {
  Tabbar,
  TabItem,
  Badge
} from 'mint-ui'

export default {
  name: 'footer',
  data () {
    return {
      count: 0
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.token
    },
    messages () {
      return this.$store.state.messageNum
    },
    unReadCount () {
      return this.count
    }
  },
  components: {
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'mt-badge': Badge
  },
  methods: {
    goToAddress (path) {
      this.$route.push(path)
    }
  },
  mounted () {
    this.$http.get('/api/chat/unread/count').then(response => {
      this.count = parseInt(response.data.data.count)
    })
  }
}
</script>

<style lang="less">
  @import '../lib/css/mixin.less';
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
    .active {
      background-color: #e1e1e1;
    }
  }
</style>
