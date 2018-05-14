<template>
  <div class="side-bar">
    <div class="head" >
      <div class="single_item" id="head" @click="changeMenu"></div>
    </div>
    <div class="con" id="hide">
      <a class="single_item" @click="$router.push('/')">
        <div class="item">发布项目</div>
      </a>
      <a class="single_item" @click="$router.push('/mypros')">
        <div class="item">我的项目</div>
      </a>
      <!-- <a class="single_item" @click="$router.push('/projectdetail')">
        <div class="item">项目细节</div>
      </a> -->
      <div class="bottom">
        <a class="single_item" @mouseenter="briefShow" @mouseleave="briefHidden">
          <img v-show="avatar ? true : false" :src="avatar" alt="">
          <img v-show="avatar ? false : true" src="../assets/img/head.png" alt="">
        </a>
        <div class="brief" id="brief" @mouseenter="briefShow"  @mouseleave="briefHidden">
          <div class="title">
            <h2>{{ data.userName }}</h2>
            <span>{{ data.userEmail }}</span>
            <span>{{ data.userPhone }}</span>
          </div>
          <div class="mine" @click="$router.push('/hello')">
            <img src="../assets/img/per.png" alt="">
            <span>我的资料</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img from '../assets/img/menu.png'
import imgo from '../assets/img/menu1.png'
export default {
  name: 'sidebar',
  data () {
    return {
      isHide: false,
      data: ''
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      let that = this
      that.$http.get('http://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        // console.log(res.data)
        this.data = res.data
      })
    },
    changeMenu () {
      // console.log(document.getElementById('head').style.backgroundImage)
      if (document.getElementById('hide').style.left === '-100px') {
        document.getElementById('hide').style.left = '20px'
        document.getElementById('head').style.backgroundImage = 'url(' + img + ')'
        document.getElementById('hide').style.transition = '1s'
      } else {
        document.getElementById('hide').style.left = '-100px'
        document.getElementById('head').style.backgroundImage = 'url(' + imgo + ')'
      }
    },
    briefShow () {
      document.getElementById('brief').style.bottom = '10px'
      document.getElementById('brief').style.transition = '1s'
    },
    briefHidden () {
      document.getElementById('brief').style.bottom = '-200px'
      document.getElementById('brief').style.transition = '1s'      
    }
  },
  props: {
    avatar: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 70px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  padding-top: 30px;
  .single_item {
    width: 30px;
    height: 30px;
    display: block;
    background-size: cover;
    margin:0 auto 30px;
    cursor: pointer;
    position: relative;
    &:hover>.item {
      display: block;
    }
    .item {
      display: none;
      position: absolute;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(20, 20, 20, 0.603);
      color: #fff;
      top: 0;
      left: 50px;
      border-radius: 5px;
    }
  }
  .head {
    .single_item {
      transition: 1s;
      background-image: url('../assets/img/menu.png');
    }
  }
  .con {
    height: 100%;
    width: 30px;
    border-top: 1px solid #d6d6d6;
    position: absolute;
    top: 80px;
    left: 20px;
    padding-top: 20px;
    // background: #b9f7f7;
    transition: 1s;
    .single_item:nth-of-type(1) {
      transition: 1s;
      background-image: url('../assets/img/add1.png');
      &:hover {
        transition: 1s;
        background-image: url('../assets/img/add.png');
      }
    }
    .single_item:nth-of-type(2) {
      background-image: url('../assets/img/file1.png');
      transition: 1s;
      &:hover {
        transition: 1s;
        background-image: url('../assets/img/file.png');
      }
    }
    .single_item:nth-of-type(3) {
      background-image: url('../assets/img/nav_file_n.png');
      transition: 1s;
      &:hover {
        transition: 1s;
        background-image: url('../assets/img/nav_file_n1.png');
      }
    }
    .single_item img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .bottom {
      width: 70px;
      position: absolute;
      bottom: 150px;
      left: -20px;
      a {
        width: 100%;
        height: 40px;
        background: rgba(0, 0, 0, 0);
        img {
          width: 40px;
          display: block;
          margin: 0 auto;
        }
      }
      .brief {
        min-height: 100px;
        position: absolute;
        bottom: -200px;
        left: 70px;
        width: 260px;
        border-radius: 2px;
        background-color: #ffffff;
        -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
        border: 1px solid #eee;
        -webkit-transition: 0.3s;
        transition: 0.3s;
      }
    }
  }
}
.brief {
  .title {
    padding: 15px 30px;
    border-bottom: 1px solid #eaeaea;
    h2 {
      width: 100%;
      font-size: 18px;
      font-weight: 500;
      height: 27px;
      line-height: 27px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      font-size: 12px;
      color: #999;
      font-weight: 300;
      &:nth-of-type(1) {
        border-right: 1px solid #eaeaea;
        padding-right: 5px;
      }
      &:nth-of-type(2) {
        padding-left: 3px;
      }
    }
  }
  .mine {
    line-height: 18px;
    font-weight: 300;
    padding: 15px 30px;
    cursor: pointer;
    &:hover {
      background: #fafafa;
    }
    img {
      width: 18px;
      margin-right: 10px;
      display: block;
      float: left;
    }
    span {
      line-height: 22px;
    }
  }
}
</style>
