<template>
  <div class="single-price">
    <div class="pay">
      <p>请选择扁诞单项价格</p>
      <div class="progress">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="big-circle"></span>
      </div>
      <!-- <div class="progress">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="big-circle"></span>
      </div> -->
      <div class="content">
        <div class="pay_money">
          <div class="tit">费用明细</div>
          <div class="cash default">
            <input class="laber_radio" type="radio" name="pay" checked />
            <div class="laber_checked"></div>
            <span>¥ {{price}}</span>
          </div>
        </div>
        <div class="pay_way">
          <div class="tit">支付方式</div>
          <div class="way default">
            <input class="laber_radio" type="radio" name="way" checked />
            <div class="laber_checked"></div>
            <span>转账</span>
            <div class="fullname"><input type="text" placeholder="账户全称：上海扁诞网络科技有限公司" disabled /></div>
            <div class="fullname"><input type="text" placeholder="银行账号：31050 17036 00000 00674" disabled /></div>
            <div class="fullname"><input type="text" placeholder="开户银行：中国建设银行股份有限公司上海黄浦支行" disabled /></div>
          </div>
        </div>
        <div class="pay_model">
          <div class="tit">服务模式</div>
          <div class="model default">
            <input class="laber_radio" type="radio" name="ser" checked />
            <div class="laber_checked"></div>
            <span>单项</span>
            <div class="total">总计 ¥ {{price}} 元</div>
          </div>
        </div>
        <div class="btn">
          <router-link class="back" to="agreement">返回</router-link>
          <a class="link" @click="payMoney">
            <button>继 续</button>
          </a>
        </div>
      </div>
    </div>
    <div class="loading" v-if="isPay">
      扁诞正在确认中...
    </div>
  </div>
</template>

<script>
export default {
  name: 'singleprice',
  data () {
    return {
      isPay: false,
      price: ''
    }
  },
  mounted () {
    this.price = this.$route.params.price
    console.log(this.$route.params)
  },
  methods: {
    payMoney () {
      let type = localStorage.getItem('type')
      // this.isPay = true
      let that = this
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      if (type === 'package') {
        that.$http.post('https://www.temaxd.com/addDoc', {
          params: {
            docId: sessionStorage.getItem('docId'),
            contract: this.$route.params.data,
            payment_state: 0
          }
        }, config).then((res) => {
          console.log(res)
          // let iTimer = setInterval(() => {
          //   window.location.href = 'https://account.teambition.com/login'
          //   clearInterval(iTimer)
          // }, 3000)
        })
      } else {
        that.$http.post('https://www.temaxd.com/addDoc', {
          params: {
            docId: sessionStorage.getItem('docId'),
            offer: JSON.stringify(this.$route.params.offer),
            contract: this.$route.params.data,
            payment_state: 0
          }
        }, config).then((res) => {
          console.log(res)
          // let iTimer = setInterval(() => {
          //   window.location.href = 'https://account.teambition.com/login'
          //   clearInterval(iTimer)
          // }, 3000)
        })
      }
    }
  }
}
</script>

<style lang="less">
.single-price {
  width: 8.1rem;
  font-size: 0.12rem;
  margin: 0.75rem auto;
  position: relative;
  p {
    font-size: 0.2rem;
    padding-bottom: 0.3rem;
  }
  outline: none;
  .content {
    width: 8.1rem;
    min-height: 500px;
    // border: 1px solid #eaeaea;
    position: relative;
    .default {
      position: relative;
      .laber_checked {
        width: 14px;
        height: 14px;
        position: absolute;
        top: 0;
        margin-top: -8px;
        left: -2px;
        border-radius: 50%;
      }
      .laber_radio:checked + .laber_checked {
        top: 10px;
        background: #eaeaea;
        border: 1px solid #eaeaea;
        cursor: pointer;
        &:hover {
          border: 1px solid #3cc8b4;
        }
      }
      .laber_radio {
        opacity: 0;
      }
      .laber_radio:checked + .laber_checked::after {
        position: absolute;
        content: "";
        width: 8px;
        height: 8px;
        top: 3px;
        left: 3px;
        border-radius: 50%;
        background: #3cc8b4;
      }
    }
  }
  .progress {
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 0.3rem;
    position: relative;
    height: 0;
    font-size: 0;
    .circle {
      width: 0.11rem;
      height: 0.11rem;
      display: block;
      background: #3cc8b4;
      left: 0;
      top: -0.05rem;
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
    }
    .big-circle {
      width: 0.18rem;
      height: 0.18rem;
      display: block;
      background: #3cc8b4;
      left: 792px;
      top: -0.08rem;
      position: absolute;
      border-radius: 50%;
    }
  }
  .pay {
    font-size: 0.14rem;
    .tit {
      float: left;
      width: 2.2rem;
      text-align: center;
      line-height: 0.26rem;
    }
    .pay_money {
      padding-top: 0.4rem;
      height: 0.7rem;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      .cash {
        float: left;
        height: 100%;
        span {
          padding-left: 0.1rem;
        }
      }
    }
    .pay_way {
      padding-top: 0.4rem;
      height: 2.3rem;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      .way {
        float: left;
        height: 100%;
        span {
          padding-left: 0.1rem;
        }
        .fullname {
          width: 4.4rem;
          height: 0.3rem;
          border: 1px solid #eaeaea;
          margin: 0.22rem 0 0 0.1rem;
          overflow: hidden;
          input[type=text] {
            width: 100%;
            height: 100%;
            border: 0;
            outline: none;
            padding-left: 0.1rem;
          }
          input::-webkit-input-placeholder{
            color: #000
          }
          input::-moz-placeholder{
            color:#000;
          }
          input:-moz-placeholder{
            color:#000;
          }
          input:-ms-input-placeholder{
            color:#000;
          }
        }
      }
    }
    .pay_model {
      padding-top: 0.4rem;
      height: 0.66rem;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      .model {
        float: left;
        width: 5.9rem;
        height: 100%;
        span {
          padding-left: 0.1rem;
        }
        .total {
          float: right;
        }
      }
    }
  }
  .btn {
    width: 100%;
    display: block;
    height: 0.8rem;
    .back {
      font-size: 0.14rem;
      padding: 0.4rem 0 0 0.2rem;
      height: 0.33rem;
      float: left;
      display: block;
      width: 0.8rem;
      cursor: pointer;
      color: #000;
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
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    top: 0;
  }
}

</style>
