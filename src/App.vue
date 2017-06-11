<template>
  <div class="container" :class="{'slide-open': showSlide}">
    <div class="content">
      <transition name="router-fade" mode="out-in">
         <router-view></router-view>
      </transition>
    </div>
    <as-slip></as-slip>
    <div class="modal" v-show="showSlide"></div>
  </div>
</template>

<script>
  import Slip from './components/Slip'

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
    },
    mounted () {
      setTimeout(() => {
        this.$chatRecordSocket = new WebSocket('ws://127.0.0.1:8080/api/chat/record?id=' + this.$store.state.user.id)
        this.$chatRecordSocket.onmessage = (event) => {
          console.log(event)
        }
      }, 50)
    }
  }
</script>

<style lang="less">

  html,body,#app{
    margin:0px;
    height:100%;
  }

  .container {
    height: 100%;
    overflow: hidden;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .content {
    height: 100%;
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
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    opacity: 0.8;
  }

  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>
