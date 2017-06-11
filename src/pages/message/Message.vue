<template lang="html">
  <div class="message">
    <as-header head-title="消息"></as-header>
    <div class="search">
      <input @focus="goToAddress('/account/search')">搜索
    </div>
    <div class="unread-list">
      <router-link class="item" v-for="chat in chatsList" to="/">
        <div class="chat-avatar">
          <img :src="chat|chatToAvater">
        </div>
        <div class="chat-content">
          <div class="chat-nickname">
            {{ chat|chatToNickName }}
          </div>
          <div class="chat-msg">
            {{ chat|chatToContent }}
          </div>
        </div>
      </router-link>
    </div>
    <as-footer></as-footer>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { Search } from 'mint-ui'

export default {
  data () {
    return {
      chatsList: [],
      value: '',
      defaultResult: [
        'Apple',
        'Banana',
        'Orange',
        'Durian'
      ]
    }
  },
  components: {
    'as-footer': Footer,
    'as-header': Header,
    'mt-search': Search
  },
  methods: {
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    },
    goToAddress (path) {
      this.$router.push(path)
    }
  },
  mounted () {
    this.$http.get('/api/chat/unread').then(response => {
      const chatsList = response.data.data
      for (var chat = 0; chat < chatsList.length - 1; chat++) {
        const flag = chatsList[chat]
        if (flag.user === chatsList[chat + 1].user) {
          chatsList.splice(chat + 1, 1)
        }
      }
      this.chatsList = chatsList
    })
  }
}
</script>

<style lang="less">
  .unread-list {
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    .item {
      display: block;
      border-top: 1px #e1e1e1 solid;
      padding: 0.2rem;
      height: 1.5rem;
      .chat-avatar {
        width: 20%;
        float: left;
        height: 1.5rem;
        line-height: 1.5rem;
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .chat-content {
        width: 75%;
        float: right;
        margin-left: 4%;
        .chat-nickname {
          font-weight: bold;
          font-size: 0.4rem;
          color: black;
        }
        .chat-msg {
          color: #808080;
        }
      }
    }
    .item:last-child {
      border-bottom: 1px #e1e1e1 solid;
    }
  }
  .search {
    margin: 0 auto;
    border: 0.3rem #e1e1e1 solid;
    input {
      display: inline-block;
      width: 85%;
      height: 0.8rem;
      line-height: 0.8rem;
      outline: none;
    }
  }
</style>
