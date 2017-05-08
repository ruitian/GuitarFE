<template lang="html">
  <section>
    <as-header :head-title="title" :go-back='false'></as-header>
    <div class="group-part bind-form">
      <form ref="bindForm" :model="student">
        <mt-field label="学校" value="山东理工大学" disabled=disabled :disableClear=true></mt-field>
        <mt-field label="学号" v-model.trim="student.xh" :attr="{ maxlength: 11 }" :state="state" :disableClear=true></mt-field>
        <mt-field label="密码" v-model.trim="student.passwd" type="password" :disableClear=true></mt-field>
        <mt-field label="验证码" v-model.trim="student.code" :attr="{ maxlength: 4 }" :disableClear=true>
          <img :src="codeImg" height="45px" width="100px" @click="refreshCode">
        </mt-field>
        <div class="page-button-group">
          <button @click="bindSchool" :disabled="buttonDisabled" class="bind-btn" type="button">绑定</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {Field, Indicator, Button, MessageBox} from 'mint-ui'
import Header from 'src/components/Header'

export default {
  data () {
    return {
      student: {
        xh: '',
        passwd: '',
        code: ''
      },
      title: '绑定学生信息'
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
    'mt-button': Button,
    'as-header': Header
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
        MessageBox({
          title: '提示',
          message: '绑定成功!',
          showCancelButton: false
        })
        this.$router.push('/meet')
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
.group-part{
  width: 90%;
  margin: 0 auto;
}
.bind-form {
  margin-top: 1rem;
  .page-button-group {
    margin-top: 1rem;
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
    .bind-btn {
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
    .bind-btn::after {
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
