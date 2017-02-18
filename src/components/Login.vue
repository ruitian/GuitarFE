<template lang="html">
  <div class="test">
    ssssss
  </div>

</template>
<script>

import {Row, Col, Table, TableColumn} from 'element-ui'

export default {

  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-table': Table,
    'el-table-column': TableColumn
  }
}

</script>

<style lang="less">
@import "../lib/css/mixin.less";
.test {
  .px2rem(font-size, 50);
}
</style>
