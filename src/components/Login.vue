<template lang="html">
  <el-form ref="form" :model="form" class="form_login" :rules="rules">
    <el-form-item label="用户名" prop="nickname">
       <el-input v-model="form.nickname" placeholder="输入用户名"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
       <el-input v-model="form.password" placeholder="输入密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="but_login">
      <el-button type="primary" @click="onSubmit(form)" size="large">登录</el-button>
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
  Button
} from 'element-ui'

export default {

  data () {
    var checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
    }
    return {
      form: {
        nickname: '',
        password: ''
      },
      rules: {
        nickname: [
          { validator: checkNickname, trigger: 'blur' }
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log('yes')
        } else {
          console.log('yes')
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
  //.px2rem(width, 800);
  //.px2rem(padding-top, 250);
  padding: 5%;
  margin: 0 auto;
  button {
    display: block;
    width: 100%;
  }
}
</style>
