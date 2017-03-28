<template>
  <div class="hello">
    <h1>{{ name }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    name () {
      return this.$store.state.user.nickname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.hello {
  h1 {
    font-weight: normal;
    color: #42b983;
  }
}
</style>
