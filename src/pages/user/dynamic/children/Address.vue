<template lang="html">
  <div class="choose_address">
    <as-header :head-title='title' :go-back='true'></as-header>
    <mt-cell title="正在搜索附近位置" v-show="isShowMessage">
      <mt-spinner type="double-bounce"></mt-spinner>
    </mt-cell>
    <ul v-for="address in addresses">
      <li>{{ address.name }}</li>
    </ul>
  </div>
</template>

<script>
import Header from 'src/components/Header'
import { Indicator, Spinner, Cell } from 'mint-ui'
import AMap from 'AMap'

export default {
  data () {
    return {
      title: '选择位置',
      isShowMessage: true,
      addresses: [],
      activeAddress: ''
    }
  },
  created () {
    this.getAddress()
  },
  components: {
    'as-header': Header,
    'mt-spinner': Spinner,
    'mt-cell': Cell
  },
  methods: {
    getAddress () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      var map, geolocation
      map = new AMap.Map('container', {
        resizeEnable: true
      })
      map.plugin('AMap.Geolocation', () => {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: 'RB'
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', this.onComplete)
      })
    },
    onComplete (data) {
      var placeSearch, map
      map = new AMap.Map('container', {
        resizeEnable: true
      })
      AMap.service(['AMap.PlaceSearch'], () => {
        placeSearch = new AMap.PlaceSearch({
          pageSize: 20,
          type: '餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施',
          pageIndex: 1,
          city: '010',
          map: map,
          panel: 'panel'
        })
      })
      var cpoint = [data.position.getLng(), data.position.getLat()]
      placeSearch.searchNearBy('', cpoint, 200, (status, result) => {
        this.isShowMessage = false
        this.addresses = result.poiList.pois
      })
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
  }
</style>
