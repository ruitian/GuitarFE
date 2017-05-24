<template lang="html">
  <div class="square">
    <as-header :head-title="title" :go-back="false"></as-header>
    <section class="page_list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div class="item" v-for="dynamic in dynamics">
        <div class="user">
          <img :src="dynamic.user.avatar_url" v-if="dynamic.user.avatar_url">
          <img src="../../assets/man.png" v-else>
        </div>
        <div class="content">
          <div class="user_nickname">
            <router-link to='/'>{{ dynamic.user.nickname }}</router-link>
          </div>
          <div class="dynamic_content">
            {{ dynamic.content }}
          </div>
          <div :class="dynamic.img_url|setImgClassName" v-for="img in dynamic.img_url">
            <img :src="img|dynamic_img">
          </div>
          <div class="dynamic_footer">
            <div class="dynamic_address" v-if="dynamic.address_city">
              {{ dynamic.address_city }} · {{ dynamic.address_name}}
            </div>
            <div class="dynamic_func">
              <span><i class="fa fa-thumbs-o-up" @click="praise($event, dynamic.id)" aria-hidden="true"></i> {{ dynamic.praises }}</span>
              <span><i class="fa fa-comments-o" aria-hidden="true"></i></i></span>
            </div>
          </div>
          <div class="dynamic_time">
            {{ dynamic.create_on|timeStampToWord }}
          </div>
        </div>
      </div>
    </section>
    <as-footer></as-footer>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      title: '广场',
      dynamics: [],
      wrapperHeight: 0,
      // 图片显示
      imgWidth: 0
    }
  },
  components: {
    'as-footer': Footer,
    'as-header': Header
  },
  mounted () {
    Indicator.open({ spinnerType: 'fading-circle' })
    this.wrapperHeight = document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top - this.$refs.wrapper.getBoundingClientRect().bottom - 20
    this.$http.get('/api/dynamic/all').then(response => {
      this.dynamics = response.data.data
      Indicator.close()
    }, error => {
      console.log(error)
    })
  },
  methods: {
    praise ($event, dynamicId) {
      const praiseCount = parseInt($event.target.nextSibling.data)
      var data = {'did': dynamicId}
      this.$http.post('/api/dynamic/praise', data).then(response => {
        const data = response.data.data
        if (data.ret === 0) {
          $event.target.nextSibling.data = praiseCount + 1
        } else {
          this.$http.delete('/api/dynamic/praise?did=' + dynamicId).then(response => {
            if (response.data.data.ret === 0) {
              $event.target.nextSibling.data = praiseCount - 1
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.page_list {
  overflow-y: scroll;
  padding: 0 0.5rem 0 0.5rem;
  .user {
    width: 20%;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    width: 75%;
    float: right;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user_nickname {
    height: 1rem;
    line-height: 1rem;
    a {
      text-decoration: none;
      color: #0099ff;
    }
  }
  .dynamic_content {
    margin-bottom: 0.5rem;
  }
  .dynamic_footer {
    clear: both;
    height: 0.5rem;
    padding-top: 0.3rem;
    line-height: 0.5rem;
    .dynamic_address {
      width: 60%;
      overflow: hidden;
      float: left;
    }
    .dynamic_func {
      float: right;
      width: 40%;
      span {
        width: 50%;
        display: inline-block;
        float: left;
        text-align: center;
        color: #bfbfbf;
        display: inline;
      }
    }
  }
  .dynamic_time {
    clear: both;
    color: #B8B8B8;
  }
}
  .item {
    overflow: hidden;
    padding: 0.8rem 0 0.5rem 0;
    border-bottom: 1px #e2e2e2 solid;
    .dynamic_img_1 {
      width: 100%;
    }
    .dynamic_img_2 {
      float: left;
      width: 45%;
      height: 40%;
      img {
        max-width: 100%;
        height: 3rem;
      }
    }
    .dynamic_img_2:nth-last-child(2) {
      margin-left: 0.2rem;
    }
    .dynamic_img_3 {
      width: 33.3333%;
      height: 3rem;
    }
    .dynamic_img_4 {
      width: 25%;
      height: 2rem;
    }
    .page_list:last-child {
      display: none;
    }
  }
  .slide-open .square {
    position: absolute;
    left: 7rem;
    right: -7rem;
  }
</style>
