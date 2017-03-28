<template lang="html">
  <div class="group-part bind-form">
    <form ref="bindForm" :model="student">
      <mt-field label="学校" v-model.trim="student.xh" value="山东理工大学" disabled=disabled :disableClear=true></mt-field>
      <mt-field label="学号" v-model.trim="student.xh" :attr="{ maxlength: 11 }" :state="state" :disableClear=true></mt-field>
      <mt-field label="密码" v-model.trim="student.passwd" type="password" :disableClear=true></mt-field>
      <mt-field label="验证码" v-model.trim="student.code" :attr="{ maxlength: 4 }" :disableClear=true>
        <img :src="codeImg" height="45px" width="100px" @click="refreshCode">
      </mt-field>
      <div class="page-button-group">
        <mt-button type="primary" size="large" plain @click="bindSchool" :disabled="buttonDisabled">绑定</mt-button>
      </div>
    </form>
  </div>
</template>

<script>
import {Field, Indicator, Button, MessageBox} from 'mint-ui'

export default {
  data () {
    return {
      student: {
        xh: '',
        passwd: '',
        code: ''
      }
    }
  },
  created () {
    Indicator.open({ spinnerType: 'fading-circle' })
    this.$store.dispatch('initBindForm').then(res => {
      Indicator.close()
      if (res.data.ret === -1) {
        MessageBox('提示', res.data.msg)
      }
    }, err => {
      console.log(err)
    })
  },
  computed: {
    codeImg () {
      return 'data:image/bmp;base64,' + this.$store.state.bindSchoolCode
    },
    state () {
      const rex = /^[0-9]*$/
      const stuNumber = this.student.xh
      if (!stuNumber) {
        return ''
      } else if (!rex.exec(stuNumber) || stuNumber.length !== 11) {
        return 'error'
      } else {
        return 'success'
      }
    },
    buttonDisabled () {
      const student = this.student
      if (this.state === 'success' && student.passwd && student.code.length === 4) {
        return false
      } else {
        return 'disabled'
      }
    }
  },
  beforeDestroy () {
    Indicator.close()
  },
  components: {
    'mt-field': Field,
    'mt-button': Button
  },
  methods: {
    bindSchool () {
      Indicator.open({ text: '绑定中', spinnerType: 'triple-bounce' })
      const student = {
        'stu_number': this.student.xh,
        'stu_password': this.student.passwd,
        'check_code': this.student.code,
        'check_b64': this.$store.state.bindSchoolCode
      }
      this.$store.dispatch('bindSchool', student).then(res => {
        Indicator.close()
        this.$route.push('/#meet"')
      }, err => {
        Indicator.close()
        MessageBox('提示', err)
        this.refreshCode()
        this.student.passwd = ''
        this.student.code = ''
      })
    },
    refreshCode () {
      Indicator.open({ spinnerType: 'triple-bounce' })
      this.$store.dispatch('initBindForm').then(res => {
        Indicator.close()
        if (res.data.ret === -1) {
          MessageBox('提示', res.data.msg)
        }
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less">
.bind-form {
  margin-top: 1rem;
  .page-button-group {
    margin-top: 1rem;
  }
}
</style>
