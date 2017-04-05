<template>
  <div class="container" :class="{'slide-open': showSlide}">
    <div class="content">
      <as-header v-if="isLogin"></as-header>
      <router-view></router-view>
    </div>
    <as-slip></as-slip>
    <div class="modal" v-show="showSlide"></div>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Slip from '../components/Slip'
  import Index from './index/Index'

  export default {
    computed: {
      isLogin () {
        return this.$store.state.token
      },
      showSlide () {
        this.closeSlide(this)
        return this.$store.state.isShowSlide
      }
    },
    components: {
      'as-header': Header,
      'as-index': Index,
      'as-slip': Slip
    },
    methods: {
      closeSlide (that) {
        setTimeout(() => {
          var modal = document.querySelector('.modal')
          if (modal != null) {
            modal.onclick = () => {
              that.$store.dispatch('closeSlide')
            }
          }
        }, 50)
      }
    }
  }
</script>

<style lang="less">
  .container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .content {
    position: relative;
    left: 0;
    transition: left .4s cubic-bezier(0.19,1,.22,1);
    -moz-transition: left .4s cubic-bezier(0.19,1,.22,1);
    -webkit-transition: left .4s cubic-bezier(0.19,1,.22,1);
    -o-transition: left .4s cubic-bezier(0.19,1,.22,1);
  }

  .slide-open .content {
    left: 7rem;
  }

  .modal {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #e1e1e1;
    opacity: 0.5;
  }
</style>
