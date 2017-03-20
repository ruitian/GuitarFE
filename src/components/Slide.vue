<template lang="html">
  <mt-popup
  class="slide"
    position="left"
    v-model="slideShow"
    popup-transition="popup-fade"
  >
    <div class="slide_content">
      <h1>Hello</h1>
    </div>
  </mt-popup>
</template>

<script>
import { Popup } from 'mint-ui'

export default {
  components: {
    'mt-popup': Popup
  },
  methods: {
    closeSlide (that) {
      setTimeout(() => {
        var modal = document.querySelector('.v-modal')
        if (modal != null) {
          modal.onclick = () => {
            that.$store.dispatch('closeSlide')
          }
        }
      }, 50)
    }
  },
  computed: {
    slideShow () {
      this.closeSlide(this)
      return this.$store.state.isShowSlide
    }
  }
}
</script>

<style lang="less">
@import '../lib/css/mixin.less';
  .slide {
    height: 100%;
  }
  .slide_content {
    height: 100%;
    width: 7rem;
    background-color: #fff;
  }
</style>
