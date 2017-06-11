<template lang="html">
  <section class="information-index">
    <as-header :go-back="true"></as-header>
    <section class="page-part">
      <div class="avatar">
        <img :src="user.avatar_url" v-if="user.avatar_url">
        <img src="../../assets/man.png" v-else>
      </div>
      <span class="nickname">{{ user.nickname }}</span>
      <div class="user-tag">
        <span v-for="tag in userTags">{{ tag.tag_name }}</span>
        <span @click="changePopupVisible" ref="button" class="modify"><i class="fa fa-pencil" aria-hidden="true"></i> 修改</span>
        <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" class="popup-span" :style="{ top: buttonBottom + 10 + 'px' }">
          <div class="my-tags">
            <span v-for="tag in userTags">
              {{ tag.tag_name }} | <i class="fa fa-times" aria-hidden="true" @click="deleteMyTag(tag)"></i>
            </span>
          </div>
          <div class="all-tags">
            <span v-for="tag in allTags" @click="addTag(tag)">
              {{ tag.tag_name}}
            </span>
          </div>
        </mt-popup>
      </div>
    </section>
    <section class="student-info">
      <mt-cell title="学校" :value="user.school"></mt-cell>
      <mt-cell title="学院" :value="user.college"></mt-cell>
      <mt-cell title="班级" :value="user.student_class"></mt-cell>
      <mt-cell title="学生姓名" :value="user.student_name"></mt-cell>
    </section>
    <section class="bind-student">
      <button @click="goToAddress('/bindSchool')" type="button" class="btn">更换绑定信息</button>
    </section>
  </section>
</template>

<script>
import Header from 'src/components/Header'
import { Popup, Cell } from 'mint-ui'

export default {
  data () {
    return {
      user: {},
      tags: [],
      allOfTags: [],
      popupVisible: false,
      buttonBottom: 0
    }
  },
  components: {
    'as-header': Header,
    'mt-popup': Popup,
    'mt-cell': Cell
  },
  computed: {
    userTags () {
      return this.tags
    },
    allTags () {
      return this.allOfTags
    }
  },
  mounted () {
    var temporary = []
    this.$http.get('/api/tag/user').then(response => {
      this.tags = response.data.data
      this.$http.get('/api/tag').then(response => {
        this.allOfTags = response.data.data
        for (var i = 0; i < this.allOfTags.length; i++) {
          var obj = this.allOfTags[i]
          var isExist = false
          for (var j = 0; j < this.tags.length; j++) {
            var temp = this.tags[j]
            if (obj.id === temp.id) {
              isExist = true
            }
          }
          if (!isExist) {
            temporary.push(obj)
          }
        }
        this.allOfTags = temporary
      })
    })
    this.buttonBottom = this.$refs.button.getBoundingClientRect().bottom

    const postData = {
      'aid': this.$store.state.user.uid
    }
    this.$http.post('/api/account/aid', postData).then(response => {
      this.user = response.data.data
    })
  },
  methods: {
    changePopupVisible () {
      this.popupVisible = true
    },
    deleteMyTag (tag) {
      this.$http.delete('/api/tag/user?tid=' + tag.id).then(response => {
        const index = this.tags.indexOf(tag)
        this.tags.splice(index, 1)
        this.allOfTags.push(tag)
      })
    },
    addTag (tag) {
      const postData = {
        'tid': tag.id
      }
      this.$http.post('/api/tag/user', postData).then(response => {
        this.tags.push(tag)
        const index = this.allOfTags.indexOf(tag)
        this.allOfTags.splice(index, 1)
      })
    },
    goToAddress (path) {
      this.$router.push(path)
    }
  },
  goToAddress (path) {
    this.$router.push(path)
  }
}
</script>

<style lang="less">
.information-index {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #ffffff;
  .page-part {
    height: 7rem;
    margin: 0 auto;
    text-align: center;
    background: #000000;
    background: -moz-linear-gradient(top,  #000000 0%, #ffffff 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top,  #000000 0%,#ffffff 100%);
    background: -o-linear-gradient(top,  #000000 0%,#ffffff 100%);
    background: -ms-linear-gradient(top,  #000000 0%,#ffffff 100%);
    background: linear-gradient(to bottom,  #000000 0%,#ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff',GradientType=0 );
    .avatar {
      width: 100%;
      padding-top: 0.5rem;
      margin: 0 auto;
      text-align: center;
      img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
      }
    }
    .nickname {
      color: #ffffff;
      font-size: 0.5rem;
      font-weight: bold;
      font-family: cursive;
    }
    .user-tag {
      width: 80%;
      margin-left: 10%;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      box-sizing: border-box;
      span {
        display: inline-block;
        height: 0.5rem;
        line-height: 0.5rem;
        border: 1px #ffffff solid;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        padding: 0 0.25rem 0 0.25rem;
        margin: 0.15rem 0.15rem;
        color: #ffffff;
      }
      .modify {
        background-color: #e1e1e1;
        color: grey;
      }
    }
    .popup-span {
      width: 6rem;
      height: 8rem;
      border-radius: 8px;
      padding: 10px;
      transform: translate(-50%, 0);
      .my-tags {
        width: 100%;
        height: 4.5rem;
        border-bottom: 1px #e1e1e1 solid;
      }
      span {
        border: 1px #e2e2e2 solid;
        color: black;
      }
    }
  }
  .student-info {
    border-bottom: 1px #e1e1e1 solid;
    .mint-cell-wrapper {
      padding: 0 0.5rem 0 0.5rem;
    }
  }
  .bind-student {
    width: 100%;
    margin-top: 0.5rem;
    button {
      display: block;
      height: 1.2rem;
      line-height: 1.2rem;
      border-top-left-radius: 0.75rem;
      border-top-right-radius: 0.75rem;
      border-bottom-left-radius: 0.75rem;
      border-bottom-right-radius: 0.75rem;
    }
    .btn {
      opacity: 0.6;
      padding: 0 12px;
      width: 85%;
      margin: 0 auto;
      color: #fff;
      background-color: #ef4f4f;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      box-sizing: border-box;
      font-size: 0.5rem;
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;
    }
  }
}
</style>
