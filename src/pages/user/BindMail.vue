<template lang="html">
  <section class="email">
    <as-header :head-title="title" :go-back='true'></as-header>
    <div class="group-part bind-form">
      <mt-cell title="当前邮箱" :value="currentEmail"></mt-cell>
      <form ref="bindForm" >
        <mt-field label="邮箱" v-model.trim="email" :disableClear=true></mt-field>
        <div class="page-button-group">
          <button @click="bindMail" :disabled="buttonDisabled" class="bind-btn" type="button">绑定</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import {Field, Cell} from 'mint-ui'
import Header from 'src/components/Header'

export default {
  data () {
    return {
      currentEmail: this.$store.state.user.email,
      email: '',
      title: '绑定邮箱'
    }
  },
  components: {
    'mt-field': Field,
    'mt-cell': Cell,
    'as-header': Header
  },
  methods: {
    bindMail () {
      const postData = {
        'email': this.email
      }
      console.log(this.email)
      this.$http.post('/api/account/email', postData).then(response => {
        console.log(response.data.data)
      })
    }
  },
  computed: {
    buttonDisabled () {
      if (this.email) {
        return false
      } else {
        return 'disabled'
      }
    }
  }
}
</script>

<style lang="less">
.group-part{
  width: 90%;
  margin: 0 auto;
}
.email {
  .mint-field {
    border-bottom: 1px #d9d9d9 solid;
  }
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
