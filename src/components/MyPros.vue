<template>
  <div class="my-projects">
    <sidebar :avatar="avatar"></sidebar>
    <div class="message">
      <h2>我的项目</h2>
      <div class="pro_list">
        <div class="figure" v-for="(data, index) in list" :key="index">
          <div class="tit">{{ data.docName }}</div>
          <div class="con" @click="link(data.docId)">
            <img src="../assets/img/nav_file_n.png" alt="">
            <div class="status">{{ data.type }}</div>
            <div class="time">{{ data.docDate.split(' ')[0].replace('-', '.').replace('-', '.') }}创建</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar'
export default {
  name: 'myprojects',
  data () {
    return {
      avatar: '',
      list: ''
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    // 获取用户基本信息
    getInfo () {
      let that = this
      that.$http.get('https://www.temaxd.com/getUserDoc', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        // console.log(res)
        if (res.data) {
          this.list = res.data
        }
      })
      that.$http.get('https://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        // console.log(res.data.userAvatar)
        this.avatar = res.data.userAvatar
      })
    },
    link (id) {
      this.$router.push({
        name: 'ProjectDetail',
        query: {id: id}
      })
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.my-projects {
  background: #f8f8f8;
  height: 100%;
}
.message {
  width: 1070px;
  margin: 0 auto;
  h2 {
    padding-top: 60px;
    padding-left: 100px;
    font-size: 24px;
    font-weight: normal;
    line-height: 1.2;
    color: #333;
    margin-bottom: 40px;
  }
  .pro_list {
    // background: rgba(123, 247, 220, 0.658);
    width: 990px;
    padding: 40px 0 0 0;
    margin-left: 80px;
    border-top: 1px solid #eaeaea;
    min-height: 100px;
    overflow: hidden;
    .figure {
      width: 300px;
      height: 170px;
      margin: 0 30px 40px 0;
      float: left;
      border-radius: 4px;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
      border: solid 0.5px #eeeeee;
      box-sizing: border-box;
      background: #fff;
      transition: 0.3s;
      cursor: pointer;
      .tit {
        padding: 20px 15px;
        line-height: 16px;
        border-bottom: 1px solid #d4d4d4;
      }
      .con {
        padding: 30px 20px 15px;
        img {
          display: block;
          float: left;
          width: 45px;
          margin: 0 22px 30px 0;
        }
        .status {
          font-size: 16px;
        }
        .time {
          margin-top: 15px;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.5px;
          color: #aaaaaa;
        }
      }
      &:hover {
        transition: 0.3s;
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.15);
      }
    }
  }
}
</style>
