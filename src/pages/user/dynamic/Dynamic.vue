<template lang="html">
  <section class="dynamic">
    <as-header :head-title="title" :go-back="true"></as-header>
    <mt-field placeholder="写点儿什么吧" type="textarea" rows="6" v-model.trim="dynamicContent"></mt-field>
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
    <div class="page-button-group">
      <button class="publish-btn" type="button" @click="publishDynamic">发表</button>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { Field, MessageBox } from 'mint-ui'
import Header from 'src/components/Header'

export default {
  data () {
    return {
      title: '动态',
      dynamicContent: '',
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
        this.images.push({'src': '/static' + response.data.data.src})
        var count = this.images.length
        var add = document.querySelector('.add')
        var input = document.querySelector('.file_input')
        var left = 1.5 * count + 0.5
        input.style.left = add.style.left = left + 'rem'
        if (count === 4) {
          input.disabled = 'disabled'
        }
      }, error => {
        console.log(error)
        this.images.push({'src': 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'})
      })
    },
    publishDynamic () {
      if (!this.dynamicContent) {
        MessageBox('提示', '发表内容不能为空!')
      } else {
        const addressInfo = this.$store.state.addressInfo
        let addressName = ''
        let addressCity = ''
        if (addressInfo.name) {
          addressName = addressInfo.name
          addressCity = addressInfo.cityname
        }
        const data = {
          'dynamicContent': this.dynamicContent,
          'addressName': addressName,
          'addressCity': addressCity
        }
        this.$http.put('/api/upload', data).then(response => {
          const data = response.data.data
          if (data.ret === 0) {
            this.$router.push('/meet')
            this.$message({
              message: data.msg,
              type: 'success'
            })
          } else {
            MessageBox('提示', data.msg)
          }
        })
      }
    }
  },
  beforeDestroy () {
    this.$http.get('/api/upload')
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
        width: 1.5rem;
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
    .page-button-group {
      margin-top: 1rem;
      padding: 0 0.5rem 0 0.5rem;
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
      .publish-btn {
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
      .publish-btn::after {
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
