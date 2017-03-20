<template lang="html">
  <!-- <nav class="bar bar-tab">
    <router-link class="tab-item external" to="/meet">
      <span class="icon icon-home"></span>
      <span class="tab-label">遇见</span>
    </router-link>
    <router-link class="tab-item external" to="/square">
      <span class="icon icon-browser"></span>
      <span class="tab-label">广场</span>
    </router-link>
    <router-link class="tab-item external" to="/message">
      <span class="icon icon-star"></span>
      <span class="tab-label">消息</span>
      <span class="badge">2</span>
    </router-link>
    <router-link class="tab-item external" to="/profile">
      <span class="icon icon-me"></span>
      <span class="tab-label">我的</span>
    </router-link>
  </nav> -->
  <mt-tabbar fixed v-model="active">
    <mt-tab-item id="meet">
      <img slot="icon" src="../assets/meet.png">
      遇见
    </mt-tab-item>
    <mt-tab-item id="square">
      <img slot="icon" src="../assets/heart.png">
      广场
    </mt-tab-item>
    <mt-tab-item id="message">
      <img slot="icon" src="../assets/msg.png">
      消息
    </mt-tab-item>
    <mt-tab-item id="profile">
      <img slot="icon" src="../assets/my.png">
      我的
    </mt-tab-item>
</mt-tabbar>
</template>

<script>
import {Tabbar, TabItem} from 'mint-ui'
export default {
  components: {
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem
  },
  data () {
    return {
      active: 'Hello'
    }
  }
}
</script>

<style lang="less">
@import "../lib/css/mixin.less";

  .footer_nav {
    padding: 0;
    width: 100%;

    text-align: center;
    display: flex;
    border-top: 1px #e1e1e1 solid;
    box-sizing: border-box;
    background-color: #FFFAFA;
    a {
      width: 25%;
      display: block;
      flex: 1;
      text-align: center;
      .px2rem(font-size, 40);
      text-decoration: none;
      span {
        text-align: center;
        display: inline-block;
        color: #7D7D7D;
      }
      span::before {
        background-size: 100% 100%;
        vertical-align: middle;
        display: block!important;
        margin-left: 0 auto;
        .px2rem(width, 80);
        .px2rem(height, 80);
        content:"";
        .px2rem(margin-bottom, 15);
      }

    }
    .meet {
      span::before {
        background-image: url('../assets/meet.png');
      }
    }
    .square {
      span::before {
        background-image: url('../assets/heart.png');
      }
    }
    .message {
      span::before {
        background-image: url('../assets/msg.png');
      }
    }
    .my {
      span::before {
        background-image: url('../assets/my.png');
      }
    }
    .router-link-active{
      span {
        color: 	#C71585;
      }
      .span_meet::before {
        background-image: url('../assets/meet_hover.png');
      }
      .span_square::before {
        background-image: url('../assets/heart_hover.png');
      }
      .span_message::before {
        background-image: url('../assets/msg_hover.png');
      }
      .span_user::before {
        background-image: url('../assets/my_hover.png');
      }
    }
  }
</style>
