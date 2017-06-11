<template lang="html">
  <div class="chat">
    <as-header :head-title="headTitle" :go-back="true"></as-header>
    <div class="chat-content">
      <div class="chatting-content" @click.stop.prevent="isShowEmoji=false" ref="chattingContent" :style="{ height: contentHeight + 'px' }">
        <div v-if="messages" v-for="item in messages">
          <div v-if="parseInt(item.userFrom.uid) === uid" class="chatting-item self clearfix">
            <div class="msg-from">
              <span class="msg-author">{{ item.userFrom.nickName}}</span>
              <!-- 要删除的代码 -->
              <img :src="item.userFrom.avatarUrl" alt="" v-if="item.userFrom.avatarUrl">
              <img v-else src="../../assets/man.png" alt="">
            </div>
            <div class="msg-content">{{ item.content }}</div>
          </div>
          <div v-else class="chatting-item other clearfix">
            <div class="msg-from">
              <span class="msg-author">{{ item.userFrom.nickName}}</span>
              <img :src="item.userFrom.avatarUrl" alt="" v-if="item.userFrom.avatarUrl">
              <img v-else src="../../assets/man.png" alt="">
            </div>
            <div class="msg-content">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="chatting-input">
        <transition name="slide-bottom">
           <div v-show="isShowEmoji" class="emoji-display">
             <ul>
               <li @click="insertText(item)" v-for="item of emojis">{{item}}</li>
             </ul>
           </div>
         </transition>
         <div class="emoji">
           <i class="fa fa-smile-o icon-emoji" aria-hidden="true" @click="isShowEmoji=!isShowEmoji"></i>
         </div>
          <textarea @keyup.enter="send" @click="newLine" v-on:input="newLine" ref="textarea" v-model.trim="inputContent"></textarea>
          <button @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'src/components/Header'

export default {
  data () {
    return {
      chatTo: '',
      chatFrom: this.$store.state.user.id,
      uid: parseInt(this.$store.state.user.uid),
      chats: [],
      userTo: {},
      inputContent: '',
      headTitle: '',
      emojis: ['😂', '🙏', '😄', '😏', '😇', '😅', '😌', '😘', '😍', '🤓', '😜', '😎', '😊', '😳', '🙄', '😱', '😒', '😔', '😷', '👿', '🤗', '😩', '😤', '😣', '😰', '😴', '😬', '😭', '👻', '👍', '✌️', '👉', '👀', '🐶', '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳'],
      isShowEmoji: false,
      oContent: {},
      oTextarea: {},
      contentHeight: 0
    }
  },
  methods: {
    newLine () {
      setTimeout(() => { this.oTextarea.scrollTop = this.oTextarea.scrollHeight }, 0)
    },
    send () {
      this.isShowEmoji = false
      if (this.inputContent === '') {
        return
      } else {
        const message = {
          'content': this.inputContent,
          'userFrom': {
            'uid': this.$store.state.user.uid,
            'nickName': this.$store.state.user.nickname,
            'avatarUrl': this.$store.state.user.avatar_url
          },
          'userTo': this.userTo
        }
        this.$socket.send(JSON.stringify(message))
        this.inputContent = ''
        setTimeout(() => { this.oContent.scrollTop = this.oContent.scrollHeight }, 0)
      }
    },
    insertText (str) {
      str = str + ` `
      const oTextarea = this.$refs.textarea
      if (document.selection) {
        let sel = document.selection.createRange()
        sel.text = str
      } else if (typeof oTextarea.selectionStart === 'number' && typeof oTextarea.selectionEnd === 'number') {
        let startPos = oTextarea.selectionStart
        let cursorPos = startPos
        let tempVal = oTextarea.value
        this.inputContent = tempVal.substring(0, startPos) + str + tempVal.substring(startPos, tempVal.length)
        cursorPos += str.length
        oTextarea.selectionStart = oTextarea.selectionEnd = cursorPos
      } else {
        oTextarea.value += str
      }
      this.newLine()
    }
  },
  computed: {
    messages () {
      return this.chats
    }
  },
  mounted () {
    // 布局
    this.contentHeight = document.documentElement.clientHeight - this.$refs.chattingContent.getBoundingClientRect().top - 40
    // 内容变化
    this.oContent = document.querySelector('.chatting-content')
    this.oContent.scrollTop = this.oContent.scrollHeight
    this.oTextarea = document.querySelector('textarea')
    this.oContent.scrollTop = this.oContent.scrollHeight

    this.chatTo = this.$route.params.userid.split('-')[0]
    // 获取聊天对象的资料
    const postData = {
      'uid': this.$route.params.userid.split('-')[1]
    }
    this.$http.post('/api/account/uid', postData).then(response => {
      this.userTo = response.data.data
      this.headTitle = '与' + this.userTo.nickName + '聊天'
    })
    // 创建Socket连接,注意服务地址
    this.$socket = new WebSocket('ws://127.0.0.1:8080/api/chat?from=' + this.chatFrom + '&to=' + this.chatTo)
    this.$socket.onmessage = (event) => {
      this.chats.push(JSON.parse(event.data))
      setTimeout(() => {
        this.oContent.scrollTop = this.oContent.scrollHeight
      }, 0)
    }
  },
  destroyed () {
    this.$socket.close()
  },
  components: {
    'as-header': Header
  }
}
</script>

<style lang="less">
.slide-open .chat {
  position: absolute;
  left: 7rem;
  right: -7rem;
}
.chat, .chat-content {
  display: flex;
  flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  width: 100%;
  height: 100%;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}
.clearfix:after {
    clear: both;
}
.clearfix{
    *zoom: 1;
}
.chatting-content {
  flex: 1;
  width: 100%;
  background-color: rgba(0, 0, 0, .1);
  overflow: auto;
  .chatting-item {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    .msg-date {
      text-align: center;
      color: gray;
      font-size: 80%;
    }
    .msg-from {
      display: flex;
      align-items: center;
      span.loc {
        color: gray;
        font-size: 60%;
        margin-right: 5px;
      }
      .msg-author {
        font-size: .4rem;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
      }
    }
    .msg-content {
      margin-top: 5px;
      background-color: white;
      width: 200px;
      padding: 6px 10px;
      border-radius: 10px;
    }
  }
  .chatting-item, .chatting-item {
    margin-top: 10px;
  }
  .self {
    .msg-from {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        margin-left: 10px;
      }
    }
    .msg-content {
      float: right;
      word-wrap: break-word;
      word-break: break-all;
      margin-right: 10px;
    }
  }
  .other {
    .msg-from {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span.loc {
        color: gray;
        font-size: 60%;
        margin-right: 5px;
      }
      img {
        margin-left: 10px;
      }
    }
    .msg-content {
      float: left;
      margin-left: 10px;
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
.chatting-input {
  position: relative;
  display: flex;
  height: 40px;
  width: 100%;
  .emoji-display {
    position: absolute;
    width: 100%;
    height: 210px;
    background-color: white;
    top: -210px;
    left: 0;
    overflow-y: auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      li {
        padding: 2px 1.8px;
        font-size: 0.8rem;
        list-style: none;
      }
    }
  }
  .emoji {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 100%;
    text-align: center;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .1);
    .icon-emoji {
      width: 40px;
    }
  }
  textarea {
    flex: 1;
    resize: none;
    padding-left: 3px;
    padding-right: 3px;
    font-size: .4rem;
  }
  button {
    width: 60px;
    height: 100%;
    background-color: #26A2FF;
    color: white;
    font-size: 16px;
    border: 0;
  }
}
</style>
