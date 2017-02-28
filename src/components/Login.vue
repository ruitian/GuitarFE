<template lang="html">
  <el-form ref="userForm" :model="user" class="form_login" :rules="rules">
    <el-form-item label="用户名" prop="nickname_or_email">
       <el-input v-model="user.nickname_or_email" placeholder="输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
       <el-input v-model="user.password" placeholder="输入密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="but_login">
      <el-button type="primary" @click="loginUser" size="large">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

import {
  Form,
  Input,
  FormItem,
  Select,
  Option,
  Button,
  Message
} from 'element-ui'

export default {

  data () {
    var checkNickname = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      }
      callback()
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      }
      callback()
    }
    return {
      user: {
        nickname_or_email: '',
        password: ''
      },
      rules: {
        nickname_or_email: [
          { validator: checkNickname, trigger: 'blur' }
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    loginUser () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('userLogin', this.user).then(res => {
            this.$router.push('/meet')
            Message.success(res)
          }, (error) => {
            Message.error(error)
          })
        } else {
        }
      })
    }
  },
  components: {
    'el-form': Form,
    'el-input': Input,
    'el-form-item': FormItem,
    'el-select': Select,
    'el-option': Option,
    'el-button': Button
  }
}

</script>

<style lang="less">
@import "../lib/css/mixin.less";

.form_login {
  padding: 5%;
  margin: 0 auto;
  max-width: 414px;
  button {
    display: block;
    width: 100%;
  }
}
</style>
