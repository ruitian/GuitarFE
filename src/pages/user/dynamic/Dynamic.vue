<template lang="html">
  <section class="dynamic">
    <as-header :head-title="title" :go-back="true"></as-header>
    <mt-field placeholder="自我介绍" type="textarea" rows="6"></mt-field>
    <div class="upload">
      <input type="file" name="files" value="" class="file_input" @change='onUpload'>
      <img class="close hide" src="../../../assets/close.png"/>
      <img class="add" src="../../../assets/add.png">
      <img class="show hide" />
    </div>
    <div class="center">
      <div class="item" v-for="image in images">
        <img class="image" :src="image.src" />
      </div>
    </div>
    <div class="address">
      <i class="fa fa-map-marker" aria-hidden="true"></i>
      <router-link to="/profile/dynamic/address" v-if="address">{{ address.name }}</router-link>
      <router-link to="/profile/dynamic/address" v-else>所在位置</router-link>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { Field } from 'mint-ui'
import Header from 'src/components/Header'

export default {
  data () {
    return {
      title: '动态',
      images: []
    }
  },
  components: {
    'mt-field': Field,
    'as-header': Header
  },
  computed: {
    address () {
      const address = this.$store.state.addressInfo
      if (address.name) {
        return address
      } else {
        return null
      }
    }
  },
  methods: {
    onUpload (e) {
      var formData = new FormData()
      formData.append('file', e.target.files[0])
      this.$http.post('/api/upload', formData).then(response => {
        console.log(response)
        this.images.push({'src': 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'})
        var count = this.images.length
        var add = document.querySelector('.add')
        var input = document.querySelector('.file_input')
        var left = 1.5 * count
        input.style.left = add.style.left = left + 'rem'
        if (count === 4) {
          input.disabled = 'disabled'
        }
      }, error => {
        console.log(error)
        this.images.push({'src': 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'})
      })
    }
  },
  destroyed () {
    this.$store.dispatch('changeAddress', {})
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
    .mint-field-core {
      resize: none;
    }
    .upload {
      padding: 0 .5rem 0 .5rem;
      .file_input {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        opacity: 0;
        z-index: 100;
      }
      .close {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        left: 110px;
        z-index: 200;
        cursor: pointer;
      }
      .add {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
      }
      .hide {
        display: none;
      }
      .show {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .center {
      width: 100%;
      height: 1.5rem;
      padding: 0 .5rem 0 .5rem;
      .item {
        width: 1,5rem;
        float: left;
      }
      img {
        widht: 1.5rem;
        height: 1.5rem;
      }
    }
    .address {
      width: 100%;
      clear: both;
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 .5rem 0 .5rem;
      color: #bfbfbf;
      font-size: .4rem;
      a {
        text-decoration: none;
        color: black;
      }
    }
  }
</style>
