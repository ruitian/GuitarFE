<template lang="html">
  <div class="login">
    <div class="avatar">
      <img src="../../assets/man.png" alt="">
    </div>
    <form ref="loginForm" :model="user" class="form_login">
      <div class="page-part">
        <mt-field placeholder="用户名或邮箱" type="text" v-model.trim="user.nickname_or_email" :state='state' v-on:input="validate($event)"></mt-field>
        <mt-field placeholder="密码" type="password" v-model.trim="user.password"></mt-field>
        <span>Forget your password</span>
        <button @click="loginUser" :disabled="disabled" type="button" class="login-btn">Login In</button>
      </div>
    </form>
  </div>
</template>
<script>

import { Field, MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      user: {
        nickname_or_email: '',
        password: ''
      },
      state: ''
    }
  },
  methods: {
    validate (value) {
      setTimeout(() => {
        if (value) {
          this.$store.dispatch('getNickname', {'nickname': value}).then(res => {
            this.state = 'success'
          }, err => {
            if (err) {
              this.state = 'error'
            }
          })
        } else {
          this.state = ''
        }
      }, 1000)
    },
    loginUser () {
      this.$store.dispatch('userLogin', this.user).then(res => {
        if (this.$store.state.user.is_bind_school) {
          this.$router.push('/')
        } else {
          this.$router.push('/bindSchool')
        }
      }, (error) => {
        MessageBox.alert(error, '提示')
      })
    }
  },
  computed: {
    disabled () {
      if (this.user.nickname_or_email && this.user.password) {
        return false
      } else {
        return true
      }
    },
    // 头像
    avatarUrl () {
      return '../../assets/avatar_default.png'
    }
  },
  components: {
    'mt-field': Field,
    'mt-message-box': MessageBox
  }
}

</script>

<style lang="less">
@import "../../lib/css/mixin.less";

.login {
  height: 100%;
  width: 100%;
  bottom: 0;
  background-image: url('../../assets/bj.jpg');
  background-size: 100% 100%;

  .avatar  {
    margin: 0 auto;
    width: 3rem;
    height: 3rem;
    padding-top: 2rem;
    img {
      width: 100%;
      height: 100%;
      border: 2px solid black;
      border-radius: 50%;
    }
  }

  .form_login {
    padding: 5%;
    margin: 0 auto;
    max-width: 414px;
    padding-top: 2rem;
    button {
      display: block;
      margin-top: 1rem;
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      border-top-left-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
      border-bottom-left-radius: 0.75rem;
      border-bottom-right-radius: 0.75rem;
    }
    .login-btn {
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
    .login-btn::after {
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

</style>
