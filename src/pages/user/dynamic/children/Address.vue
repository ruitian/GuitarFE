<template lang="html">
  <div class="choose_address">
    <as-header :head-title='title' :go-back='true'></as-header>
    <div class="page_list" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-cell title="正在搜索附近位置" v-show="isShowMessage">
        <mt-spinner type="double-bounce"></mt-spinner>
      </mt-cell>
      <div class="" v-for="address in addresses" @click="chooseAddress(address)">
        <mt-cell :title="address.name" :label="address.address"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import { Spinner, Cell, Loadmore } from 'mint-ui'
import AMap from 'AMap'

export default {
  data () {
    return {
      title: '选择位置',
      isShowMessage: true,
      addresses: [],
      activeAddress: '',
      wrapperHeight: 0
    }
  },
  created () {
    this.getAddress()
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  },
  components: {
    'as-header': Header,
    'mt-spinner': Spinner,
    'mt-cell': Cell,
    'mt-loadmore': Loadmore
  },
  methods: {
    getAddress () {
      var map, geolocation
      map = new AMap.Map('container', {
        resizeEnable: true
      })
      map.plugin('AMap.Geolocation', () => {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          // buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: false,
          buttonPosition: 'RB'
        })
        // map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', this.onComplete)
      })
    },
    onComplete (data) {
      const location = data.position.getLng() + ',' + data.position.getLat()
      const url = '/api/address/around?location=' + location + '&offset=15&page=1'
      this.$http.get(url).then(response => {
        this.addresses = response.data.pois
        this.isShowMessage = false
      })
    },
    chooseAddress (address) {
      this.$store.dispatch('changeAddress', address)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  .choose_address{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;
    .page_list {
      overflow: scroll;
    }
  }
</style>
