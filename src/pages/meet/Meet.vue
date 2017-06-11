<template lang="html">
  <div class="meet">
    <as-header head-title="遇见" :go-back="false"></as-header>
      <section v-if="isShowUserInfo">
        <div class="intro-user">
          <section class="user-avatar">
            <img :src="user.avatar_url" v-if="user.avatar_url">
            <img src="../../assets/man.png" v-else>
          </section>
          <section class="user-motto">
            <div class="user-nickname">{{ user.nickname }}</div>
            <div class="user-motto">{{ user.motto }}</div>
          </section>
          <section class="user-operation">
            <div class="user-item" @click="goToAddress('/chat/' + user.id + '-' + user.uid)">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              发消息
            </div>
            <div class="user-item" v-if="!user.isFollowing" @click="followUser">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              关注
            </div>
            <div class="user-item" v-else @click="unFollowUser">
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              取消关注
            </div>
            <div class="user-item" @click="nextUser">
              <i class="fa fa-caret-right" aria-hidden="true"></i>
              下一个
            </div>
          </section>
        </div>
      </section>
      <section v-else>
        <div class="intro-user no-data">
          <span @click="refresh">点我再刷新一次哟!</span>
        </div>
      </section>
    <as-footer></as-footer>
    <transition name="router-slid" mode="out-in">
       <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      userList: [],
      isShowUserInfo: false,
      offset: 0,
      // 显示的用户
      user: {}
    }
  },
  components: {
    'as-footer': Footer,
    'as-header': Header
  },
  created () {
    this.offset = parseInt(10 * Math.random())
    this.$http.get('/api/accounts/one?limit=1&offset=' + this.offset).then(response => {
      this.userList = response.data.data
      if (this.userList.length > 0) {
        this.isShowUserInfo = true
        this.getUserInfo()
      }
    })
  },
  mounted () {

  },
  methods: {
    refresh () {
      Indicator.open({ spinnerType: 'fading-circle' })
      this.offset = parseInt(10 * Math.random())
      this.$http.get('/api/accounts/one?limit=1&offset=' + this.offset).then(response => {
        Indicator.close()
        this.userList = response.data.data
        if (this.userList.length > 0) {
          this.isShowUserInfo = true
          this.getUserInfo()
        }
      })
    },
    getUserInfo () {
      // 判断是否已经关注
      const postData = {
        'aid': this.userList[0].uid
      }
      this.$http.post('/api/account/aid', postData).then(response => {
        this.user = response.data.data
      })
    },
    goToAddress (path) {
      this.$router.push(path)
    },
    nextUser () {
      this.offset += 1
      this.$http.get('/api/accounts/one?limit=1&offset=' + this.offset).then(response => {
        Indicator.close()
        this.userList = response.data.data
        if (this.userList.length > 0) {
          this.isShowUserInfo = true
          this.getUserInfo()
        } else {
          this.isShowUserInfo = false
        }
      })
    },
    followUser () {
      const postData = {
        'followed_id': this.user.id
      }
      this.$http.post('/api/account/follow', postData).then(response => {
        const data = response.data.data
        if (data.ret === 0) {
          this.user.isFollowing = true
          this.$message({
            message: data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    },
    unFollowUser () {
      this.$http.delete('/api/account/follow?followed_id=' + this.user.id).then(response => {
        const data = response.data.data
        console.log(data)
        if (data.ret === 0) {
          this.user.isFollowing = false
          this.$message({
            message: data.msg,
            type: 'success'
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.intro-user {
  width: 8rem;
  height: 12rem;
  margin: 1rem auto;
  border: 1px #e1e1e1 solid;
  .user-avatar {
    height: 8rem;
    img {
      height: 100%;
    }
  }
  .user-motto {
    height: 3rem;
    .user-nickname {
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      text-align: center;
      width: 100%;
      color: #ffffff;
      background-color: #6F6F6F;
    }
    .user-motto {
      height: 2rem;
      padding: 0.5rem 0.5rem;
    }
  }
  .user-operation {
    height: 1rem;
    border-top: 1px #e1e1e1 solid;
    .user-item {
      width: 33%;
      height: 1rem;
      float: left;
      border-right: 1px #e1e1e1 solid;
      line-height: 1rem;
      font-size: 0.3rem;
      text-align: center;
    }
    .user-item:last-child {
      border-right: 0;
    }
  }
}
.no-data {
  line-height: 8rem;
  text-align: center;
}
</style>
