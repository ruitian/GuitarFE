<template lang="html">
  <div class="setting">
    <as-header :head-title="title" :go-back='true'></as-header>
    <div class="page_part">
      <mt-cell-swipe title="关于" :is-link=true to="/profile/setting/about"></mt-cell-swipe>
      <mt-cell-swipe title="意见反馈" :is-link=true to="/profile/setting/about"></mt-cell-swipe>
      <mt-cell-swipe title="关于" :is-link=true to="/profile/setting/about"></mt-cell-swipe>
      <mt-cell-swipe title="关于" :is-link=true to="/profile/setting/about"></mt-cell-swipe>
    </div>
    <div class="page-button-group">
      <button @click="logout" class="logout-btn" type="button">退出登录</button>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import { CellSwipe } from 'mint-ui'

export default {
  data () {
    return {
      title: '设置'
    }
  },
  components: {
    'mt-cell-swipe': CellSwipe,
    'as-header': Header
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout').then(res => {
        if (res.ret === 0) {
          this.$router.go(0)
        }
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
  .setting{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;
    .page_part {
      margin-top: 1rem;
    }
    .page-button-group {
      margin-top: 1rem;
      padding: 0 .5rem 0 .5rem;
      button {
        display: block;
        margin-top: 1rem;
        margin: 0 auto;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        border-top-left-radius: 0.6rem;
        border-top-right-radius: 0.6rem;
        border-bottom-left-radius: 0.6rem;
        border-bottom-right-radius: 0.6rem;
      }
      .logout-btn {
        opacity: 0.6;
        padding: 0 12px;
        color: #fff;
        background-color: #ef4f4f;

        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        box-sizing: border-box;
        font-size: 18px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
      }
      .logout-btn::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        position: absolute;
      }
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
 }
 .router-slid-enter, .router-slid-leave-active {
   transform: translate3d(2rem, 0, 0);
   opacity: 0;
 }
</style>
