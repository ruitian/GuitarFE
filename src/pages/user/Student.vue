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
      <button @click="goToAddress('/bindSchool')" type="button" class="btn">更换绑定信息</button>
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
    methods: {
      goToAddress (path) {
        this.$router.push(path)
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
      button {
        display: block;
        margin-top: 1rem;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        border-top-left-radius: 0.75rem;
        border-top-right-radius: 0.75rem;
        border-bottom-left-radius: 0.75rem;
        border-bottom-right-radius: 0.75rem;
      }
      .btn {
        opacity: 0.6;
        padding: 0 12px;
        color: #fff;
        background-color: #ef4f4f;

        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        box-sizing: border-box;
        font-size: 18px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
      }
    }
  }
</style>
