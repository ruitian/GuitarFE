<template lang="html">
  <div class="popup slide">
    <div class="slide_content">
      <h1>测试</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slip'
}
</script>

<style lang="less">
.slide {
  height: 100%;
  width: 0rem;
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

.container .popup {
  left: -7rem;
  transition: left .4s cubic-bezier(0.19,1,.22,1);
  -moz-transition: left .4s cubic-bezier(0.19,1,.22,1);
  -webkit-transition: left .4s cubic-bezier(0.19,1,.22,1);
  -o-transition: left .4s cubic-bezier(0.19,1,.22,1);
}

.slide-open .popup {
  left: 0;
}

.popup {
  position: fixed;
  top: 0;
  width: 7rem;
  height: 100%;
  overflow: hidden;
  background: #fff;
  z-index: 2000;
}
</style>
