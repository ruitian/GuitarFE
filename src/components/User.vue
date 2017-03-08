<template>
  <div class="profile">
    <div class="header">
      <span>我的</span>
    </div>
    <div class="content">
      <div class="img_info">
        <div class="avatar">
          <img src="../assets/avatar.png" alt="">
        </div>
        <div class="info">
          {{ username }}
        </div>
        <div class="func_span">
          <span>资料</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: this.$store.state.user.nickname
      }
    }
  }
</script>

<style lang="less">
@import '../lib/css/mixin.less';
  .header {
    width: 100%;
    max-width: 414px;
    .px2rem(font-size, 70);
    color: white;
    .px2rem(line-height, 150);
    .px2rem(height, 150);
    text-align: center;
    bottom: 0;
    background: rgb(238, 71, 35);
    span {
      display: block;
      .px2rem(width, 400);
      .px2rem(height, 150);
    }
    span::before {
      background-size: 100% 100%;
      margin: 0;
      display: inline-block;
      vertical-align:middle;
      .px2rem(width, 80);
      .px2rem(height, 80);
      content:"";
      background-image: url(../assets/title_heart.png);
    }
  }

  .content {
    .img_info {
      display:-moz-box; /* Firefox */
      display:-webkit-box; /* Safari and Chrome */
      display:box;
      border-bottom: 1px solid #e1e1e1;
      vertical-align: middle;
      .px2rem(height, 250);
      .px2rem(line-height, 250);
      .avatar {
        .px2rem(height, 250);
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        text-align: center;
        img {
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .info {
        -moz-box-flex: 2.0; /* Firefox */
        -webkit-box-flex: 2.0; /* Safari 和 Chrome */
      }
      .func_span {
        -moz-box-flex: 2.0; /* Firefox */
        -webkit-box-flex: 2.0; /* Safari 和 Chrome */
      }
    }
  }

</style>
