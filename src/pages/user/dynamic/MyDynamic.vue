<template lang="html">
  <section class="dynamic">
    <as-header :head-title="title" :go-back="true"></as-header>
    <section ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="dynamic_list">
      <div class="dynamic_my" v-show="isShowDynamics" v-for="dynamic in dynamics">
        <div class="dynamic_img" v-if="dynamic.img_url">
          <img :src="dynamic.img_url|dynamic_img" width="100%" alt="">
        </div>
        <div class="dynamic_content">
          {{ dynamic.content }}
        </div>
        <div class="dynamic_options">
          <div class="dynamic_date">
            <i class="fa fa-calendar" aria-hidden="true"></i>
            {{ dynamic.create_on|timestampToDate }}
          </div>
          <div class="dynamic_func">
            <span><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>10000</span>
            <span @click="deleteDynamic(dynamic)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
          </div>
        </div>
      </div>
      <div class="no_dynamic">
        <p v-show="!isShowDynamics">您还没发表任何动态</p>
      </div>
    </section>
  </section>
</template>

<script>
import Header from 'src/components/Header'
import { MessageBox } from 'mint-ui'

export default {
  data () {
    return {
      title: '我的动态',
      message: 'Meet',
      dynamics: [],
      isShowDynamics: false,
      wrapperHeight: 0
    }
  },
  components: {
    'as-header': Header
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  },
  created () {
    this.$http.get('/api/dynamic?offset=0&limit=15').then(response => {
      this.dynamics = data
      if (this.dynamics.length > 0) {
        this.isShowDynamics = true
      }
    })
  },
  methods: {
    deleteDynamic (dynamic) {
      const index = this.dynamics.indexOf(dynamic)
      MessageBox.confirm('确定执行此操作?').then(action => {
        const data = {'did': dynamic.id}
        this.$http.post('/api/dynamic', data).then(response => {
          const data = response.data.data
          if (data.ret === 0) {
            this.dynamics.splice(index, index + 1)
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
      })
    }
  }
}
</script>

<style lang="less">
  .dynamic {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;
    .dynamic_list {
      overflow-y: scroll;
      overflow-x: hidden;
      img {
        border: 0;
      }
      .no_dynamic {
        p {
          display: inline-block;
          text-align: center;
          height: 2rem;
          color: #bfbfbf;
          padding: 1rem;
        }
      }
      .dynamic_my {
        border-bottom: 0.3rem #bfbfbf solid;
        .dynamic_img, .dynamic_content, .dynamic_options {
          padding: 0 0.5rem 0 0.5rem;
        }
      }
      .dynamic_my:first-child {
        border-top: 0.3rem #bfbfbf solid;
      }
      .dynamic_content {
        margin-top: 0.2rem;
        width: 100%;
      }
      .dynamic_options {
        height: 1.5rem;
        line-height: 1.5rem;
      }
      .dynamic_date {
        width: 65%;
        float: left;
      }
      .dynamic_func {
        width: 35%;
        float: left;
        span {
          display: inline-block;
          text-align: center;
          color: #bfbfbf;
        }
        span:first-child {
          width: 2rem;
        }
      }
    }
  }
</style>
