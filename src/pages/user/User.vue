<template>
  <div class="profile">
    <as-header head-title="个人中心"></as-header>
    <div class="profile-content">
      <div class="img_info">
        <div class="avatar">
          <img src="../../assets/avatar.png" alt="">
        </div>
        <div class="info">
          <span class="user_name">{{ username }}</span>
          <span class="user_uid">{{ uid }}</span>
        </div>
        <div class="func_span">
          <router-link to='' class="btn">资料</router-link>
        </div>
      </div>
      <div class="follow">
        <span>最近来访</span> |
        <span>关注 0</span> |
        <span>粉丝 0</span>
      </div>
      <div class="func_menu">
        <div class="up_img">
          <router-link to=""><span>上传头像</span></router-link>
        </div>
        <b>|</b>
        <div class="up_word">
          <router-link to="/profile/dynamic"><span>文字传情</span></router-link>
        </div>
        <b>|</b>
        <div class="up_date">
          <router-link to=""><span>发起约会</span></router-link>
        </div>
        <b>|</b>
        <div class="up_question">
          <router-link to=""><span>友情询问</span></router-link>
        </div>
      </div>

      <div class="profile_list">
        <router-link class="cell" to="/profile/dynamic/my">
          <i class="fa fa-star" aria-hidden="true"></i> 我的动态
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </router-link>
        <router-link class="cell" @click.native="getStudentInfo" to="/profile/student">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i> 学生信息
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </router-link>
        <div class="cell" to='/'>
          <i class="fa fa-commenting" aria-hidden="true"></i> 我的话题
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </div>
        <div class="cell" to='/'>
          <i class="fa fa-music" aria-hidden="true"></i> 我的兴趣
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </div>
        <div class="cell" to='/'>
          <i class="fa fa-flask" aria-hidden="true"></i> 我的活动
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </div>
        <router-link class="cell" to="/profile/setting">
          <i class="fa fa-cog" aria-hidden="true"></i> 设置
          <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
        </router-link>
      </div>
    </div>
    <as-footer></as-footer>
    <transition name="router-slid" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { Cell } from 'mint-ui'
  import Student from './Student'
  import Header from 'src/components/Header'
  import Footer from 'src/components/Footer'

  export default {
    name: 'profile',
    data () {
      return {
        username: this.$store.state.user.nickname,
        uid: this.$store.state.user.uid
      }
    },
    components: {
      'mt-cell': Cell,
      'as-student': Student,
      'as-header': Header,
      'as-footer': Footer
    },
    methods: {
      getStudentInfo () {
        const uid = {'uid': this.$store.state.user.uid}
        this.$store.dispatch('getStudentInfo', uid).then(res => {
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less">
@import '../../lib/css/mixin.less';
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
      background-image: url(../../assets/title_heart.png);
    }
  }

  .profile {
    .img_info {
      display:-moz-box; /* Firefox */
      display:-webkit-box; /* Safari and Chrome */
      display:box;
      .px2rem(height, 250);
      .avatar {
        .px2rem(line-height, 250);
        .px2rem(height, 250);
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        text-align: center;
        img {
          .px2rem(width, 200);
          .px2rem(height, 200);
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .info {
        -moz-box-flex: 2.0; /* Firefox */
        -webkit-box-flex: 2.0; /* Safari 和 Chrome */
        .px2rem(padding-left, 20);
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        span {
          display: inline-block;
          width: 100%;
          .px2rem(height, 125);
        }
        .user_name {
          .px2rem(line-height, 125);
          .px2rem(font-size, 50);
          font-weight: bold;
        }
        .user_name::before {
          content: '';
        }
        .user_uid {
          color: rgba(132, 138, 138, 0.85);
        }
        .user_uid::before {
          content: 'ID:';
        }
      }
      .func_span {
        -moz-box-flex: 2.0; /* Firefox */
        -webkit-box-flex: 2.0; /* Safari 和 Chrome */
        .px2rem(line-height, 250);
        .btn {
          display: inline-block;
          .px2rem(line-height, 80);
          .px2rem(width, 200);
          .px2rem(height, 80);
          text-align: center;
          border: 1px solid #e1e1e1;
          .px2rem(border-top-right-radius, 40);
          .px2rem(border-bottom-right-radius, 40);
          .px2rem(border-top-left-radius, 40);
          .px2rem(border-bottom-left-radius, 40);
          text-decoration: none;
          .px2rem(font-size, 30);
          color: black;
          -webkit-tap-highlight-color:rgba(0,0,0,0);
        }
        .btn::after {
          .px2rem(margin-left, 15);
          content: '>';
        }
      }
    }
    .follow {
      width: 90%;
      margin: 0 auto;
      padding: 5px 0 5px 0;
      span {
        display: inline-block;
        text-align: center;
        width: 30%;
      }
    }
    .func_menu {
      .px2rem(height, 180);
      // background-color: rgb(249, 232, 240);
      display:-moz-box; /* Firefox */
      display:-webkit-box; /* Safari and Chrome */
      display:box;
      .px2rem(line-height, 180);
      text-align: center;
      border-top: .3rem #e1e1e1 solid;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
      b {
        .px2rem(font-size, 80);
        color: rgb(178, 186, 186);
      }
      span {
        display: inline-block;
        .px2rem(line-height, 100);
        .px2rem(height, 180);
        color: #7D7D7D;
      }
      span::before {
        background-size: 100% 100%;
        margin: 0 auto;
        display: block!important;
        .px2rem(width, 70);
        .px2rem(height, 70);
        .px2rem(margin-top, 20);
        content:"";
        padding: 0;
      }
      .up_img {
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        .px2rem(font-size, 30);
        span::before {
          background-image: url(../../assets/photo.png);
        }
      }
      .up_word {
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        .px2rem(font-size, 30);
        span::before {
          background-image: url(../../assets/paper.png);
        }
      }
      .up_date {
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        .px2rem(font-size, 30);
        span::before {
          background-image: url(../../assets/caffe.png);
        }
      }
      .up_question {
        box-flex:1.0;
        -moz-box-flex: 1.0; /* Firefox */
        -webkit-box-flex: 1.0; /* Safari 和 Chrome */
        .px2rem(font-size, 30);
        span::before {
          background-image: url(../../assets/question.png);
        }
      }
    }

    .profile_list {
      border-top: .3rem #e1e1e1 solid;
      border-bottom: .3rem #e1e1e1 solid;
      font-size: 0.4rem;
      font-family: monospace;
      .cell {
        width: 95%;
        margin-left: 10%;
        height: 1.3rem;
        border-bottom: 1px #e1e1e1 solid;
        line-height: 1.3rem;
        display: block;
        text-decoration: none;
        color: #919C9D;
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        span {
          position: absolute;
          right: 0.5rem;
        }
      }
      .cell:last-child {
        width: 95%;
        margin-left: 10%;
        height: 1.3rem;
        border: 0;
      }
    }

    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }

    .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
  }

</style>
