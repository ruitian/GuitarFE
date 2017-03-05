<template lang="html">

  <div class="footer_nav">
    <router-link to='/meet' class="meet"><span class="span_meet">遇见</span></router-link>
    <router-link to='/square' class="square"><span class="span_square">广场</span></router-link>
    <router-link to='/message' class="message"><span class="span_message">消息</span></router-link>
    <router-link to='/profile' class="my"><span class="span_user">我的</span></router-link>
  </div>
</template>

<script>
export default {
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
