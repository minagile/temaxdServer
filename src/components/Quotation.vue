<template>
  <div class="quotation">
    <div class="quote">
      <p>请选择扁诞单项报价</p>
      <div class="progress">
        <span class="circle"></span>
        <span class="circle big"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
      </div>
      <div class="content">
        <div class="kinds" v-for="(item, i) in Data" :key="i">
          <div class="table-title">
            <!-- 多选选项 -->
            <div class="breed">{{ item.breed }}</div>
            <!-- 标题 -->
            <div class="price-title">
              <span>{{ item.mark }}</span>
              <span class="unit">单位：人民币（元）</span>
            </div>
          </div>
          <!-- 表格 -->
          <table border="1">
            <tr v-for="(v, j) in item.list" :key="j">
              <td v-for="(m, n) in v" :key="n">
                <div @click="chooseData($event, m, n, j, i, item.id)">{{ m }}</div>
                <img class="chooseMoney" :src="imgUrl" />
              </td>
            </tr>
          </table>
          <!-- 备注 -->
          <div class="basic" v-if="item.isLaberShow">
            备注：
            <div v-for="(data, index) in item.laber.split(':')[1].split(';')" :key="index">{{data}}</div>
          </div>
        </div>
        <div class="btn">
          <router-link class="back" to="SimpleSelect"><img src="../assets/img/back.jpg" alt="">返回</router-link>
          <a class="link" @click="nextpage">
            <button>继 续</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allPrice from '../assets/allPrice.json'
import { Complete } from '../assets/img/index';
export default {
  name: 'quotation',
  data () {
    return {
      value: [],
      Data: [],
      Total: 0,
      imgUrl: Complete,
      number: []
    }
  },
  mounted () {
    this.handleData()
    // console.log(this.$route.params.docId)
  },
  methods: {
    nextpage () {
      if (this.Total === 0) {
        alert('您还没有选择价格')
      } else {
        sessionStorage.setItem('quotation_data', JSON.stringify([this.Total, JSON.parse(sessionStorage.getItem('docId')), this.value]))
        this.$router.push({
          name: 'Demand'
        })
      }
    },
    handleData () {
      let selectData = JSON.parse(sessionStorage.getItem('select'))
      allPrice.data.forEach(m => {
        m.Code.forEach(n => {
          n.data.forEach(x => {
            if (x.laber) {
              x.isLaberShow = true
            } else {
              x.isLaberShow = false
            }
            selectData.forEach((v, k) => {
              if (v.Id === x.id) {
                this.number.push({id: v.Id, num: v.value})
                this.Data.push(x)
              }
            })
          })
        })
      })
    },
    chooseData (e, data, index, iIndex, k, id) {
      // console.log(e.target.parentNode.parentNode.parentNode)
      if (!/[\u4e00-\u9fa5]/.test(data)) {
        let oTr = e.target.parentNode.parentNode.parentNode.children
        for (var i = 0; i < oTr.length; i++) {
          for (var j = 0; j < oTr[i].children.length; j++) {
            if (index === j && iIndex === i) {
              oTr[i].children[j].style.background = '#39beab'
              oTr[i].children[j].style.color = '#fff'
            } else {
              oTr[i].children[j].style.background = '#fff'
              oTr[i].children[j].style.color = '#000'
            }
            if (oTr[i].children[j].children[1].style.display === 'block') {
              oTr[i].children[j].children[1].style.display = 'none'
            }
          }
        }
        let correct = e.target.nextElementSibling
        if (correct.style.display !== 'block') {
          correct.style.display = 'block'
        }
        this.value.forEach((m, n) => {
          if (m.Index === k) {
            this.value.splice(n, 1)
          }
        })
        this.value.push({'Price': data, 'Index': k, 'level': e.target.parentNode.parentNode.parentNode.children[0].children[index].textContent, 'first': e.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].textContent, 'id': id})
        // console.log(this.value)
        // console.log(this.number)
        let total = 0
        this.value.forEach((m, n) => {
          this.number.forEach((a, b) => {
            if (m.id === a.id) {
              total += Number(m.Price) * Number(a.num)
            }
          })
        })
        this.Total = total
      }
    }
  }
}
</script>

<style lang="less" escoped>
.quotation {
  width: 8.1rem;
  margin: 75px auto;
  font-size: 0.14rem;
  outline: none;
  .content {
    width: 8.1rem;
    min-height: 500px;
    // border: 1px solid #eaeaea;
    position: relative;
  }
  p {
    margin-bottom: 30px;
    font-size: 20px;
  }
  .progress {
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 0.3rem;
    position: relative;
    height: 0;
    font-size: 0;
    .circle {
      width: 12px;
      height: 12px;
      display: block;
      background: #3cc8b4;
      left: 0;
      top: -5px;
      position: absolute;
      border-radius: 50%;
      &:nth-of-type(2) {
        left: 162px;
      }
      &:nth-of-type(3) {
        left: 324px;
      }
      &:nth-of-type(4) {
        left: 486px;
      }
      &:nth-of-type(5) {
        left: 648px;
      }
      &:nth-of-type(6) {
        left: 810px;
      }
    }
    .big {
      width: 18px;
      height: 18px;
      top: -9px;
    }
    .c {
      width: 12px;
      height: 12px;
      top: -5px;
      display: block;
      background: #eaeaea;
    }
  }
  .kinds {
    padding-bottom: 30px;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 30px;
    .table-title {
      .breed {
        font-size: 20px;
        // padding-bottom: 30px;
      }
      .price-title {
        padding: 10px 0;
        overflow: hidden;
        .unit {
          float: right;
        }
      }
    }
    .basic {
      padding-top: 20px;
    }
  }
  table {
    margin: 0 auto;
    border-collapse: collapse;
    td {
      width: 2.43rem;
      height: 0.4rem;
      border: 1px solid #eaeaea;
      box-shadow: #eaeaea 0 0 5px inset;
      text-align: center;
      position: relative;
      cursor: pointer;
      &:hover {
        background: #eaeaea;
      }
      div {
        height: 100%;
        line-height: 0.4rem;
      }
      .chooseMoney {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        background: #fff;
        width: 0.24rem;
        height: 0.24rem;
        line-height: 0.24rem;
        border-radius: 0.02rem;
        opacity: 0;
        // img {
        //   width: 100%;
        //   display: block;
        // }
      }
      &:hover {
        // border: 1px solid #0ff000;
      }
    }
  }
  .quote {
    .baojia {
      width: 100%;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 0.5rem;
      .table-title {
        height: 0.26rem;
        padding: 0.2rem;
        span:nth-of-type(2) {
          float: right;
        }
      }
      table {
        margin: 0 auto;
        border-collapse: collapse;
        td {
          width: 2.43rem;
          height: 0.4rem;
          border: 1px solid #eaeaea;
          box-shadow: #eaeaea 0 0 5px inset;
          text-align: center;
          position: relative;
          cursor: pointer;
          &:hover {
            background: #eaeaea;
          }
          .chooseMoney {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            background: #fff;
            width: 0.24rem;
            height: 0.24rem;
            border-radius: 0.02rem;
          }
        }
      }
    }
  }
}

.btn {
  width: 100%;
  display: block;
  height: 0.7rem;
  .back {
    font-size: 0.14rem;
    // padding: 0.4rem 0 0 0.2rem;
    padding: 0.4rem 0 0 0;
    height: 0.33rem;
    float: left;
    display: block;
    width: 0.8rem;
    cursor: pointer;
    color: #000;
    img {
      width: 0.2rem;
      position: relative;
      left: 0;
      top: 4px;
      margin-right: 10px;
    }
  }
  .link {
    width: 1.5rem;
    display: block;
    height: 0.7rem;
    float: right;
    button {
      display: block;
      margin-top: 0.37rem;
      width: 1.5rem;
      height: 0.4rem;
      border: 0;
      line-height: 0.4rem;
      background-color: #3cc8b4;
      color: rgba(255, 255, 255, 1);
      font-size: 0.16rem;
      text-align: center;
      font-family: Roboto;
      border-radius: 0.03rem;
      cursor: pointer;
      outline: none;
      transition: 0.3s;
      &:hover {
        background: #39beab;
      }
    }
  }
}
</style>
