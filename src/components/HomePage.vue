<template>
  <div class="home-page">
    <div class="info">
      <p>扁诞全方位</p>
      <p>解决你的创意和需求</p>
      <div class="btn">
        <router-link to="ChoosePage">
          <button>立即体验</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
    }
  }
}
</script>

<style lang="less">
.home-page {
  background: #000;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 0.14rem;
  text-align: center;
  p {
    font-size: 28px;
    line-height: 70px;
  }
  .info {
    padding-top: 300px;
    width: 600px;
    margin: 0 auto 0;
  }
  .btn {
    width: 144px;
    height: 50px;
    // margin-top: 14px;
    margin: 20px auto;
    button {
      width: 144px;
      height: 50px;
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
    }
  }
}
</style>
