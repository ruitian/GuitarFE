<template lang="html">
  <mt-popup
    position="left"
    v-model="slideShow"
    popup-transition="popup-fade"
  ></mt-popup>
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
</style>
