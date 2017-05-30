<template lang="html">
  <div class="card">
    <as-header :head-title="headTitle" :go-back="true"></as-header>
    <section class="info">
      <div class="avatar">
        <img :src="user.avatar_url" alt="">
      </div>
      <div class="information">
        <span class="user-name">{{ user.nickname }}</span>
        <span class="user-uid">ID：{{ user.uid }}</span>
      </div>
      <div class="follow-user">
        <button type="button" name="button">+ 关注</button>
      </div>
    </section>
    <section class="student-info">
      <mt-cell title="学校" :value="user.school"></mt-cell>
      <mt-cell title="学院" :value="user.college"></mt-cell>
      <mt-cell title="班级" :value="user.student_class"></mt-cell>
      <mt-cell title="学生姓名" :value="user.student_name"></mt-cell>
    </section>
    <section class="push-message">
      <router-link :to="'/chat/' + user.id + '-' + user.uid">发消息</router-link>
    </section>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import { Cell } from 'mint-ui'

export default {
  data () {
    return {
      headTitle: '详细资料',
      user: {},
      message: 'Hello'
    }
  },
  methods: {
  },
  components: {
    'mt-cell': Cell,
    'as-header': Header
  },
  mounted () {
    const postData = {
      'aid': this.$route.params.uid
    }
    this.$http.post('/api/account/aid', postData).then(response => {
      this.user = response.data.data
    })
  }
}
</script>

<style lang="less">
  .card {
    .info {
      display: box;
      display: -webkit-box;
      display: -moz-box;
      border-top: .3rem #e1e1e1 solid;
      border-bottom: .3rem #e1e1e1 solid;
      .avatar {
        box-flex: 2.5;
        -moz-box-flex: 2.5;
        -webkit-box-flex: 2.5;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: center;
        img {
          width: 2rem;
          height: 2rem;
          vertical-align: middle;
        }
      }
      .information {
        box-flex: 2.0;
        -moz-box-flex: 2.0;
        -webkit-box-flex: 2.0;
        height: 2.5rem;
        .user-name {
          height: 1.25rem;
          line-height: 1.25rem;
          font-size: 0.5rem;
          font-weight: bold;
        }
        .user-uid {
          display: inline-block;
          width: 100%;
          height: 1.25rem;
          color: rgba(132, 138, 138, 0.85);
        }
      }
      .follow-user {
        box-flex: 1.0;
        -moz-box-flex: 2.0;
        -webkit-box-flex: 2.0;
        height: 2.5rem;
        line-height: 2.5rem;
        button {
          display: inline-block;
          border: 1px #e1e1e1;
        }
      }
    }
    .student-info {
      border-bottom: .3rem #e1e1e1 solid;
      .mint-cell-title {
        flex: 0.5;
      }
    }
    .push-message {
      margin: 1rem 0.5rem;
      a {
        display: block;
        width: 100%;
        height: 1rem;
        background-color: #3CAF36;
        color: #ffffff;
        border: 0;
        border-radius: 0.1rem;
        font-size: 0.5rem;
        text-align: center;
        text-decoration: none;
        line-height: 1rem;
      }
    }
  }
</style>
