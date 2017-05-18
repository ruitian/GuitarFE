<template lang="html">
  <section class="dynamic">
    <as-header :head-title="title" :go-back="true"></as-header>
    <section ref="wrapper" :style="{ height: wrapperHeight + 'px' }" class="dynamic_list">
      <div class="dynamic_my" v-for="dynamic in dynamics">
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
            <span><i class="fa fa-trash-o" aria-hidden="true"></i></span>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Header from 'src/components/Header'

export default {
  data () {
    return {
      title: '我的动态',
      message: 'Meet',
      dynamics: [],
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
      const data = response.data.data
      this.dynamics = data
    })
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
