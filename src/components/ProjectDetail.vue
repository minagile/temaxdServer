<template>
  <div class="project-detail">
    <sidebar :avatar="avatar"></sidebar>
    <div class="con">
      <h2>{{ Data.projectName }}</h2>
      <div class="body">
        <div class="big_type table" v-for="(data, index) in list" :key="index">
          <h3>{{ data.type }}</h3>
          <table>
            <tr>
              <th>二级标题</th>
              <th>内容</th>
              <th>数量</th>
              <th>总价</th>
            </tr>
            <tr v-for="(item, index) in data.data" :key="index">
              <td>{{ item.secondType }}</td>
              <td>{{ item.kinds }}</td>
              <!-- <td>{{ item.id }}</td> -->
              <td>{{ item.value }}</td>
              <!-- <td>{{ item.price }}</td> -->
              <td>{{ item.price * item.value }}</td>
            </tr>
          </table>
        </div>
        <div class="big_type">
          <h3> 项目详细信息</h3>
          <div class="info">
            <div class="tr">
              <div class="span">项目名称</div>
              <h6>{{ Data.projectName }}</h6>
            </div>
            <div class="tr">
              <div class="span">项目阶段</div>
              <h6>{{ Data.projectPhase }}</h6>
            </div>
          </div>
          <div class="info">
            <div class="tr">
              <div class="span">已有元素</div>
              <h6>{{ Data.projectElement }}</h6>
            </div>
            <div class="tr">
              <div class="span">目标用户</div>
              <h6>{{ Data.targetUser }}</h6>
            </div>
          </div>
          <div class="info">
            <div class="tr">
              <div class="span">行业领域</div>
              <h6>{{ Data.industryField }}</h6>
            </div>
            <div class="tr">
              <div class="span">创意风格</div>
              <h6>
                <span v-for="(data, index) in Data.creativeStyle" :key="index">{{ data }} </span>
              </h6>
            </div>
          </div>
        </div>
        <div class="big_type">
          <h3>项目阶段</h3>
          <div class="info">
            <div class="tr">
              <div class="span">项目开始时间</div>
              <h6>{{ Data.projectStartTime }}</h6>
            </div>
            <div class="tr">
              <div class="span">项目周期</div>
              <h6>{{ Data.projectCycle }}</h6>
            </div>
          </div>
          <div class="info">
            <div class="tr">
              <div class="span">发票</div>
              <h6>{{ Data.invoice }}</h6>
            </div>
            <div class="tr">
              <div class="span">工作地点</div>
              <h6>{{ Data.workPlace }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar'
export default {
  name: 'projectdetail',
  data () {
    return {
      Data: {},
      type: [],
      classifies: [],
      price: [],
      list: [],
      avatar: ''
    }
  },
  mounted () {
    this.getdata()
  },
  methods: {
    getdata () {
      let that = this
      that.$http.get('https://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        // console.log(res.data)
        this.avatar = res.data.userAvatar
      })
      that.$http.get('https://www.temaxd.com/getDocInfo', {
        params: {
          docId: this.$route.query.id
        }
      }).then(res => {
        this.classifies = res.data.contractJson.design.split(' ').splice(0, res.data.contractJson.design.split(' ').length - 1)
        this.Data = res.data
        this.Data.industryField = res.data.industryField[0].text
        this.type = this.Data.designsType[1]
        this.price = res.data.offer
        this.handleData()
      })
    },
    handleData () {
      let obj = {}
      let data = []
      this.type.forEach(v => {
        // console.log(v.classify)
        this.price.forEach(m => {
          if (m.id === v.Id) {
            v.price = m.Price
          }
        })
        if (!obj[v.classify]) {
          obj[v.classify] = 1
          data.push(v.classify)
        }
      })
      for (var i = 0; i < this.classifies.length; i++) {
        this.list.push({type: data[i], data: []})
      }
      this.type.forEach(v => {
        this.list.forEach(m => {
          if (m.type === v.classify) {
            m.data.push({secondType: v.second, kinds: v.text, id: v.Id, value: v.value, price: v.price})
          }
        })
      })
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.project-detail {
  background: #f8f8f8;
  min-height: 100%;
}
.con {
  margin: 0 auto;
  width: 750px;
  padding: 25px 0;
  h2 {
    height: 64px;
    margin-bottom: 30px;
    font-size: 24px;
    line-height: 36px;
    font-weight: 300;
    margin-bottom: 10px;
    color: rgb(51, 51, 51);
  }
  .body {
    width: 100%;
    min-height: 20px;
    // background: #fff;
    .big_type {
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px 0px;
      margin-bottom: 20px;
      line-height: 1.7em;
      padding: 0px 40px;
      min-height: 100px;
      &.table {
        padding-bottom: 30px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        line-height: 30px;
        th {
          text-align: left;
          width: 25%;
          color: rgb(170, 170, 170);
          font-weight: 300;
        }
        td {
          width: 25%;
          color: rgb(51, 51, 51);
          font-weight: 300;
        }
      }
      h3 {
        font-size: 16px;
        color: rgb(170, 170, 170);
        line-height: 24px;
        font-weight: normal;
        text-align: center;
        padding: 15px;
        letter-spacing: 3px;
      }
      .info {
        overflow: hidden;
        padding: 25px 20px;
        border-top: 1px solid rgb(238, 238, 238);
        .tr {
          width: 50%;
          float: left;
          min-height: 1px;
          box-sizing: border-box;
          padding: 0px 15px;
          font-weight: 300;
          .span {
            color: rgb(170, 170, 170);
            margin-bottom: 15px;
            font-weight: 300;            
          }
          h6 {
            color: rgb(51, 51, 51);
            font-weight: 300;
          }
        }
      }
    }
  }
}
</style>
