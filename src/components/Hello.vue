<template>
  <div class="hello">
    <h1>{{ count }}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    count () {
      return this.$store.state.count
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
