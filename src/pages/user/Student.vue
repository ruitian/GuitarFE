<template lang="html">
  <div class="student_info">
    <as-header headTitle="学生信息" :go-back='true'></as-header>
    <section class="group-part">
      <mt-cell title="学校">{{ school }}</mt-cell>
      <mt-cell title="学院">{{ college }}</mt-cell>
      <mt-cell title="专业">{{ major }}</mt-cell>
      <mt-cell title="班级">{{ student_class }}</mt-cell>
      <mt-cell title="学号">{{ number }}</mt-cell>
      <mt-cell title="姓名">{{ name }}</mt-cell>
    </section>
  </div>
</template>

<script>
  import Header from 'src/components/Header'
  import { Cell } from 'mint-ui'

  export default {
    data () {
      return {}
    },
    computed: {
      name () {
        return this.$store.state.student.student_name
      },
      number () {
        return this.$store.state.student.number
      },
      major () {
        return this.$store.state.student.major
      },
      school () {
        return this.$store.state.student.school
      },
      college () {
        return this.$store.state.student.college
      },
      student_class () {
        return this.$store.state.student.student_class
      }
    },
    components: {
      'mt-cell': Cell,
      'as-header': Header
    }
  }
</script>

<style lang="less">
  .student_info {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #ffffff;

    .group-part {
      padding: 0 .5rem 0 .5rem;
    }
  }
</style>
