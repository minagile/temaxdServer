<template>
  <div class="choose-page">
    <div class="title">
      <p>请选择需求类型</p>
      <div class="btn">
        <div @click="individual">
          <button>单项服务</button>
        </div>
      </div>
      <div class="btn">
        <div @click="setMeal">
          <button>套餐服务</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'choosepage',
  data () {
    return {
    }
  },
  mounted () {
    // localStorage.setItem('type', 'individual')
  },
  methods: {
    individual () {
      this.$router.push('/ChoosePage/SimpleSelect')
      localStorage.setItem('type', 'individual')
    },
    setMeal () {
      this.$router.push('/ChoosePage/Demand')
      localStorage.setItem('type', 'package')
    }
  }
}
</script>

<style lang="less" escoped>
.choose-page {
  color: #fff;
  background: #000;
  width: 100%;
  height: 100%;
  font-size: 0.14rem;
  p {
    font-size: 28px;
  }
  .title {
    padding-top: 300px;
    width: 560px;
    margin: 0 auto 0;
    p {
      text-align: center;
    }
  }
  .btn {
    // height: 50px;
    margin-top: 70px;
    width: 220px;
    button {
      width: 220px;
      height: 90px;
      border: 0;
      line-height: 29px;
      background-color: #009688;
      color: rgba(255, 255, 255, 1);
      font-size: 20px;
      text-align: center;
      font-family: Roboto;
      border-radius: 10px;
      cursor: pointer;
      outline: none;
      transition: 1s;
      &:hover {
        transition: 1s;
        background: #00796d;
      }
    }
    &:first-of-type {
      float: left;
    }
    &:last-of-type {
      float: right;
    }
  }
}
</style>
