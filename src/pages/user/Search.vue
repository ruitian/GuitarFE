<template lang="html">
  <div class="page-search">
    <as-header :head-title="title" :go-back="true"></as-header>
    <mt-search autofocus v-model.trim="value" @input="search">
      <mt-cell v-for="item in result" :title="item.nickname" is-link :to="'/chat/' + item.id + '-' + item.uid">
        <img :src="item.avatar_url">
      </mt-cell>
    </mt-search>
  </div>
</template>

<script>
import { Search, Cell } from 'mint-ui'
import Header from 'src/components/Header'

export default {
  data () {
    return {
      title: '查找好友',
      value: '',
      result: []
    }
  },
  components: {
    'as-header': Header,
    'mt-search': Search,
    'mt-cell': Cell
  },
  methods: {
    search () {
      setTimeout(() => {
        if (this.value) {
          const postData = {
            'keyword': this.value
          }
          this.$http.post('/api/account/search', postData).then(response => {
            this.result = response.data.data
          })
        }
      }, 100)
    }
  }
}
</script>

<style lang="less">
  .page-search {
    width: 100%;
  }
  .mint-search-list-warp {
    margin-top: 1.5rem;
    img {
      width: 1.5rem;
      heigh: 1.5rem;
    }
  }
</style>
