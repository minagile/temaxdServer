<template>
  <div class="single-price">
    <div class="pay">
      <p>请选择扁诞单项价格</p>
      <div class="progress" v-if="!isPay">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="big circle"></span>
      </div>
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
            <div class="transfer p" @click="publicTransfer()">对公转账</div>
            <div class="transfer z" id="zhifu" @click="alipay()">
              <img src="../assets/img/zhifubao.jpeg" alt="">
              <span>支付宝支付</span>
              <button @click="zhifubao" v-if="isAlipay">前去支付</button>
              <div class="border" v-if="isAlipay"></div>
            </div>
            <div class="transfer w" id="wechat" @click="wechat()">
              <img src="../assets/img/weixin.jpeg" />
              <span>微信支付</span>
              <div id="qrcode" v-if="isWeixin"></div>
					    <div class="border" v-if="isWeixin"></div>
            </div>
            <div class="public" v-if="isPublicTransfer">
              <div class="fullname">账户全称：上海扁诞网络科技有限公司</div>
              <div class="fullname">银行账号：31050 17036 00000 00674</div>
              <div class="fullname">开户银行：中国建设银行股份有限公司上海黄浦支行</div>
            </div>
          </div>
        </div>
        <div class="pay_model">
          <div class="tit">服务模式</div>
          <div class="model default">
            <input class="laber_radio" type="radio" name="ser" checked />
            <div class="laber_checked"></div>
            <span>{{ model }}</span>
            <div class="total">总计 ¥ {{ price }} 元</div>
          </div>
        </div>
        <div class="btn">
          <router-link class="back" to="agreement"><img src="../assets/img/back.jpg" alt="">返回</router-link>
          <a class="link" @click="payMoney">
            <button>继 续</button>
          </a>
        </div>
      </div>
    </div>
    <div class="loading" v-if="isPay">
      <!-- 扁诞正在确认中... -->
      <img src="https://spider-x.oss-cn-shanghai.aliyuncs.com/temaxd/temaxdServer.png">
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'singleprice',
  data () {
    return {
      isPay: false,
      price: '',
      data: {},
      model: '单项',
      item: '',
      nonce_str: '',
      isPublicTransfer: false,
      isWeixin: false,
      isAlipay: false
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    publicTransfer () {
      this.isPublicTransfer = true
      this.isAlipay = false
      this.isWeixin = false
      document.getElementById('zhifu').style.borderColor = '#979797'
      document.getElementById('zhifu').style.color = '#9B9B9B'
      document.getElementById('wechat').style.borderColor = '#979797'
      document.getElementById('wechat').style.color = '#9B9B9B'
      document.getElementById('zhifu').style.height = '35px'
      document.getElementById('wechat').style.height = '35px'
    },
    alipay () {
      this.isPublicTransfer = false
      this.isWeixin = false
      document.getElementById('wechat').style.height = '35px'
      if (this.isAlipay === false) {
        document.getElementById('zhifu').style.borderColor = '#4A90E2'
        document.getElementById('zhifu').style.color = '#4A90E2'
        document.getElementById('zhifu').style.height = '216px'
        this.isAlipay = true
      } else {
        this.isAlipay = false
        document.getElementById('zhifu').style.borderColor = '#979797'
        document.getElementById('zhifu').style.color = '#9B9B9B'
        document.getElementById('zhifu').style.height = '35px'
      }
    },
    wechat (e) {
      this.isPublicTransfer = false
      this.isAlipay = false
      document.getElementById('zhifu').style.height = '35px'
      if (this.isWeixin === false) {
        this.isWeixin = true
        document.getElementById('wechat').style.borderColor = '#417505'
        document.getElementById('wechat').style.color = '#417505'
        document.getElementById('wechat').style.height = '216px'
        this.weixin()
      } else {
        this.isWeixin = false
        document.getElementById('wechat').style.borderColor = '#979797'
        document.getElementById('wechat').style.color = '#9B9B9B'
        document.getElementById('wechat').style.height = '35px'
      }
    },
    zhifubao () {
      if (confirm('是否进行支付？')) {
        this.pay()
      }
    },
    weixin () {
      let that = this
      that.$http.get('https://www.temaxd.com/getOutNo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        this.item = res.data
        let that = this
        that.$http.get('https://www.temaxd.com/wxPayHtml', {
          params: {
            mchName: this.model,
            // money: this.vip.num * 100,
            money: this.price * 100,
            outTradeNo: this.item
          }
        }).then(res => {
          // console.log(res.data.nonce_str)
          this.nonce_str = res.data.nonce_str
          // 设置参数方式
          let qrcode = new QRCode('qrcode', {
            text: res.data.codeUrl,
            width: 125,
            height: 125,
            colorDark : '#000000',
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.H
          })
          // 使用 API
          qrcode.clear()
          qrcode.makeCode(res.data.codeUrl)
        })
      })
    },
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.model = '套餐'
        this.data = JSON.parse(sessionStorage.getItem('agreement_data_pack'))
        if (this.data) {
          this.price = this.data.price
        }
      } else {
        this.model = '单项'
        this.data = JSON.parse(sessionStorage.getItem('agreement_data'))
        if (this.data) {
          this.price = this.data.price
        }
      }
    },
    payMoney () {
      if (this.isAlipay === true) {
        let that = this
        that.$http.get('https://www.temaxd.com/getAliPayResult', {
          params: {
            outTradeNo: this.item
          }
        }).then(res => {
          if (res.data.alipay_trade_query_response.sub_msg === '交易不存在') {
            alert('支付未成功')
          } else {
            this.localData()
          }
        })
      } else {
        let that = this
        that.$http.get('https://www.temaxd.com/getWxPayResult', {
          params: {
            nonce_str: this.nonce_str,
            oeNo: this.data
          }
        }).then(res => {
          if (res.data.trade_state === 'NOTPAY') {
            confirm('您本次付款未完成或接收失败')
          } else {
            this.localData()
          }
        })
      }
    },
    // 支付宝接口
    pay () {
      let that = this
      that.$http.get('https://www.temaxd.com/getOutNo', {
				params: {
					userId: localStorage.getItem('userId')
				}
			}).then(res => {
        this.item = res.data
        window.open('https://www.temaxd.com/aliPayHtml?money=' + this.price + '&mchName=VIP'+ this.model +'&mchNameText=会员&outTradeNo=' + this.item)
      })
    },
    isWeixinPay () {
      let that = this
      that.$http.get('https://www.temaxd.com/getAliPayResult', {
        params: {
          outTradeNo: this.data
        }
      }).then(res => {
        console.log(res.data.alipay_trade_query_response.out_trade_no)
        if (res.data.alipay_trade_query_response.sub_msg === '交易不存在') {
          alert('支付未成功')
        } else {
          this.localData()
        }
      })
    },
    localData () {
      this.isPay = true
      let type = localStorage.getItem('type')
      let that = this
      if (type === 'package') {
        let str = JSON.parse(sessionStorage.getItem('total')).select
        let arr = []
        str.forEach(v => {
          arr.push([v.classify, v.second, v.text])
        })
        that.$http.get('https://www.temaxd.com/addDocs', {
          params: {
            docId: sessionStorage.getItem('docId'),
            offer: '套餐',
            contract: JSON.stringify(this.data),
            payment_state: 0
          }
        }).then((res) => {
          console.log(res)
          // let iTimer = setInterval(() => {
          //   this.$router.push('/hello')
          //   clearInterval(iTimer)
          // }, 8000)
        })
      } else {
        that.$http.get('https://www.temaxd.com/addDocs', {
          params: {
            docId: sessionStorage.getItem('docId'),
            offer: JSON.stringify(JSON.parse(sessionStorage.getItem('quotation_data'))[2]),
            contract: JSON.stringify(this.data),
            payment_state: 0
          }
        }).then((res) => {
          console.log(res)
          // let iTimer = setInterval(() => {
          //   this.$router.push('/hello')
          //   clearInterval(iTimer)
          // }, 8000)
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
        float: right;
        height: 100%;
        margin-top: -26px;
        span {
          padding-left: 0.1rem;
        }
        .fullname {
          width: 391px;
          height: 28px;
          line-height: 28px;
          text-indent: 15px;
          background: #FFFFFF;
          border: 1px solid #3CC8B4;
          border-radius: 6px;
          margin-bottom: 8px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #9B9B9B;
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
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
      width: 200px;
      height: 200px;
      display: block;
    }
  }
}
.pay_page {
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #00000060;
  top: 0;
  left: 0;
  .box {
    width: 400px;
    min-height: 200px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    top: 300px;
    left: 50%;
    margin-left: -200px;
    .pay_way {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      float: left;
      margin: 40px;
      cursor: pointer;
      img {
        border-radius: 20px;
      }
    }
    #qrcode {
      width: 150px;
      margin: 0 auto 20px;
    }
    .com {
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
      width: 1.5rem;
      height: 0.4rem;
      margin-bottom: 20px;
    }
  }
}
.transfer {
  width: 160px;
  height: 35px;
  background: #FFFFFF;
  border: 1px solid #979797;
  border-radius: 6px;
  float: left;
  margin-right: 35px;
  line-height: 35px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #9B9B9B;
  text-align: center;
  cursor: pointer;
  transition: 1s;
  // &.p:hover {
  //   transition: .4s;
  //   color: #fff;
  //   background: #3cc8b4;
  //   border-color: #3cc8b4;
  // }
  img {
    width: 20px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
  &.z {
    position: relative;
    overflow: hidden;
    button {
      width: 100px;
      height: 25px;
      background: #FFFFFF;
      border: 1px solid #4A90E2;
      box-shadow: 1px 2px 0 0 #4A90E2;
      border-radius: 6px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #000000;
      text-align: center;
      cursor: pointer;
      margin: 77px 0;
    }
    .border {
      border-right: #4A90E2 13px solid;
      border-bottom: #4A90E2 11px solid;
      border-left: #fff 13px solid;
      border-top: #fff 11px solid;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  &.w {
    position: relative;
    overflow: hidden;
    transition: 1s;
    #qrcode {
      position: relative;
      z-index: 9999;
      background: #D8D8D8;
      border-radius: 5px;
      width: 125px;
      height: 125px;
      margin: 33px auto 20px;
      img {
        width: 100%;
      }
    }
    .border {
      border-right: #417505 13px solid;
      border-bottom: #417505 11px solid;
      border-left: #fff 13px solid;
      border-top: #fff 11px solid;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
.public {
  margin-top: 37px;
  padding-top: 35px;
}
</style>
