<template lang="html">
  <form ref="loginForm" :model="user" class="form_login">
    <div class="page-part">
      <mt-field placeholder="用户名或邮箱" type="text" v-model.trim="user.nickname_or_email" :state='state' v-on:input="validate($event)"></mt-field>
      <mt-field placeholder="密码" type="password" v-model.trim="user.password"></mt-field>
      <mt-button plain @click="loginUser" :disabled="disabled">Login In</mt-button>
    </div>

    <!-- <el-form-item label="用户名" prop="nickname_or_email">
       <el-input v-model="user.nickname_or_email" placeholder="输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
       <el-input v-model="user.password" placeholder="输入密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="but_login">
      <el-button type="primary" @click="loginUser" size="large">登录</el-button>
    </el-form-item> -->
  </form>
</template>
<script>

import {
  Form,
  Input,
  FormItem,
  Select,
  Option,
  Message
} from 'element-ui'
import { Field, Button, MessageBox } from 'mint-ui'

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
        this.$router.push('/meet')
        Message.success(res)
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
    }
  },
  components: {
    'el-form': Form,
    'el-input': Input,
    'el-form-item': FormItem,
    'el-select': Select,
    'el-option': Option,
    'mt-field': Field,
    'mt-button': Button,
    'mt-message-box': MessageBox
  }
}

</script>

<style lang="less">
@import "../lib/css/mixin.less";

.form_login {
  padding: 5%;
  margin: 0 auto;
  max-width: 414px;
  margin-top: 4rem;
  button {
    display: block;
    width: 100%;
  }
}
</style>
