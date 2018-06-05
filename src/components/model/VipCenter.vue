<template>
  <div class="demo">
    <div class="left">
			<div class="logo">
				<img src="../../assets/img/logo.png" alt="">
				<p>Temaxd会员</p>
				<span><i style="font-style:normal;">15</i>元/月</span>
			</div>
			<ul class="info">
				<li>会员好处很多1号</li>
				<li>会员好处很多1号</li>
				<li>会员好处很多1号</li>
				<li>会员好处很多1号</li>
				<li>会员好处很多1号</li>
				<button>查看会员</button>
			</ul>
			<div class="terms">
				<input type="checkbox" >
				同意并接受《服务条款》
			</div>
		</div>
		<div class="right">
			<div class="user">
				<p><span>{{ Data.userName }}</span>(来自<i>{{ lo }}</i>登录)</p>
			</div>
			<div class="classify">会员分类</div>
			<div class="kinds">
				<a :class="{'active': a}" @click="vip.num = '30', vip.time = '月', a = true, b = false, c = false, d = false">
					<p>月度会员</p>
					<div class="yuan">30元/月</div>
					<div class="border"></div>
				</a>
				<a :class="{'active': b}" @click="vip.num = '100', vip.time = '季', a = false, b = true, c = false, d = false">
					<p>季度会员</p>
					<div class="yuan">100元/月</div>
					<div class="border"></div>
				</a>
				<a :class="{'active': c}" @click="vip.num = '300', vip.time = '年', a = false, b = false, c = true, d = false">
					<p>年度会员</p>
					<div class="yuan">300元/月</div>
					<div class="border"></div>
				</a>
			</div>
			<div class="classify">支付方式</div>
			<div class="pay-way">
				<div class="zhifubao r" id="zhifu" @click="clickZhi">
					<img src="../../assets/img/zhifubao.jpeg" alt="">
					<span>支付宝支付</span>
					<button v-if="iszhifubao" @click="pay">前去支付</button>
					<div class="border" v-if="iszhifubao"></div>
				</div>
				<div class="weixin r" id="wechat" @click="weixin()">
					<img src="../../assets/img/weixin.jpeg" alt="">
					<span>微信支付</span>
					<div id="qrcode" v-if="isWeixin"></div>
					<div class="border" v-if="isWeixin"></div>
				</div>
			</div>
			<div class="close" @click="close"><img src="../../assets/img/close.png" alt=""></div>
		</div>
    <div class="alert" v-if="isPay">
      <div class="box">
        <p>是否支付成功</p>
        <button @click="yes">是</button>
        <button @click="isPay = false">否</button>
      </div>
    </div>
		<!-- <div class="alert" v-if="isWeixin">
      <div class="box qr">
        <p>请扫描下方的二维码进行支付</p>
				<div id="qrcode"></div>
				<button @click="weixinOk">支付成功</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'demo',
  data () {
		return {
			vip: {
				num: '30',
				time: '月'
			},
			a: true,
			b: false,
			c: false,
			d: false,
			isPay: false,
			data: '',
			Data: {},
			lo: '',
			isWeixin: false,
			nonce_str: '',
			iszhifubao: false
		}
	},
	mounted () {
		this.getInfo()
		// this.weixin()
	},
	methods: {
		clickZhi () {
			if (this.iszhifubao === false) {
        document.getElementById('wechat').style.height = '50px'
        document.getElementById('zhifu').style.height = '218px'
				this.iszhifubao = true
				this.isWeixin = false
			} else {
				this.iszhifubao = false
        document.getElementById('zhifu').style.height = '50px'
				this.isWeixin = false
			}
		},
		close () {
			this.$emit('closeVip', false)
		},
		// 获取用户数据
		getInfo () {
      let that = this
      that.$http.get('https://www.temaxd.com/getUserInfo', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(res => {
        console.log(res.data)
        // this.avatar = res.data.userAvatar
        this.Data = res.data
				if (this.Data.userEmail) {
					this.lo = '邮箱' + this.Data.userEmail
				} else {
					this.lo = '手机号' + this.Data.userPhone
				}
      })
		},
		// 支付成功
    yes () {
			let date = new Date()
			if (this.vip.time === '月') {
				var time = date.getFullYear() + '-' + (date.getMonth() + 2) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			} else if (this.vip.time === '季') {
				var time = date.getFullYear() + '-' + (date.getMonth() + 4) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			} else if (this.vip.time === '年') {
				var time = (date.getFullYear() + 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()				
			}
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
					this.isPay = false
					// 添加交易记录
					that.$http.get('https://www.temaxd.com/addPayRecords', {
						params: {
							userId: localStorage.getItem('userId'),
							outTradeNo: this.data,
							resultCode: '交易成功',
							money: this.vip.num,
							mchName: this.vip.time + '度VIP',
							timeEnd: time
						}
					}).then(res => {
						console.log(res.data)
						// 修改会员
						that.$http.get('https://www.temaxd.com/upgradeMembership', {
							params: {
								levelName: this.vip.time + '会员',
								userId: localStorage.getItem('userId')
							}
						}).then(res => {
							console.log(res.data)
							if (res.data.code === '200') {
								this.getInfo()
								this.$emit('closeClient', false)
							}
						})
					})
        }
      })
		},
		// 支付宝支付
		pay () {
      this.isPay = true
      let that = this
      that.$http.get('https://www.temaxd.com/getOutNo', {
				params: {
					userId: localStorage.getItem('userId')
				}
			}).then(res => {
				// console.log(res.data)
        this.data = res.data
				// 支付宝接口
        window.open('https://www.temaxd.com/aliPayHtml?money=' + this.vip.num + '&mchName=VIP'+ this.vip.time +'素材&mchNameText=会员&outTradeNo=' + this.data)
        // window.open('https://www.temaxd.com/aliPayHtml?money=0.01' + '&mchName=VIP'+ this.vip.time +'素材&mchNameText=会员&outTradeNo=' + this.data)
      })
		},
		// 微信支付
		weixin () {
			this.iszhifubao = false
			if (this.isWeixin === false) {
        document.getElementById('zhifu').style.height = '50px'
        document.getElementById('wechat').style.height = '218px'
				this.isWeixin = true
				let that = this
				that.$http.get('https://www.temaxd.com/getOutNo', {
					params: {
						userId: localStorage.getItem('userId')
					}
				}).then(res => {
					this.data = res.data
					let that = this
					that.$http.get('https://www.temaxd.com/wxPayHtml', {
						params: {
							mchName: this.vip.time + '度会员',
							money: this.vip.num * 100,
							// money: '1',
							outTradeNo: this.data
						}
					}).then(res => {
						console.log(res.data.nonce_str)
						this.nonce_str = res.data.nonce_str
						// 设置参数方式
						let qrcode = new QRCode('qrcode', {
							text: res.data.codeUrl,
							width: 140,
							height: 140,
							colorDark : '#000000',
							colorLight : '#ffffff',
							correctLevel : QRCode.CorrectLevel.H
						})
						// 使用 API
						qrcode.clear()
						qrcode.makeCode(res.data.codeUrl)
					})
				})
			} else {
				this.isWeixin = false
        document.getElementById('wechat').style.height = '50px'
			}
		},
		weixinOk () {
			let date = new Date()
			if (this.vip.time === '月') {
				var time = date.getFullYear() + '-' + (date.getMonth() + 2) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			} else if (this.vip.time === '季') {
				var time = date.getFullYear() + '-' + (date.getMonth() + 4) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
			} else if (this.vip.time === '年') {
				var time = (date.getFullYear() + 1) + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()				
			}
			let that = this
      that.$http.get('https://www.temaxd.com/getWxPayResult', {
        params: {
					nonce_str: this.nonce_str,
					oeNo: this.data
        }
      }).then(res => {
				if (res.data.trade_state === 'NOTPAY') {
					this.isWeixin = false
					confirm('您本次付款未完成或接收失败')
				} else {
					// 添加交易记录
					that.$http.get('https://www.temaxd.com/addPayRecords', {
						params: {
							userId: localStorage.getItem('userId'),
							outTradeNo: this.data,
							resultCode: '交易成功',
							money: this.vip.num,
							mchName: this.vip.time + '度VIP',
							timeEnd: time
						}
					}).then(res => {
						console.log(res.data)
						// 修改会员
						that.$http.get('https://www.temaxd.com/upgradeMembership', {
							params: {
								levelName: this.vip.time + '会员',
								userId: localStorage.getItem('userId')
							}
						}).then(res => {
							console.log(res.data)
							if (res.data.code === '200') {
								this.getInfo()
								this.$emit('closeClient', false)
							}
						})
					})
				}
      })
		}
	}
}
</script>

<style lang="less" scoped>
.demo {
  width: 1000px;
	height: 600px;
	text-align: center;
	background: #fff;
	margin: 100px auto;
	border-radius: 8px;
	overflow: hidden;
	.left{
		float: left;
		width: 300px;
		height: 100%;
		background: #D8D8D8;
		border-radius: 8px 0 0 8px;
	}
	.right {
		float: left;
	}
}
.left {
	position: relative;
	.logo {
		width: 164px;
		padding: 63px 0 15px 0;
		margin: 0 auto;
		border-bottom: 1px solid #979797;
		img {
			width: 100px;
			border-radius: 6px;
		}
		p {
			padding-top: 12px;
			line-height: 25px;
			font-family: PingFangSC-Regular;
			font-size: 18px;
			color: #000000;
			text-align: center;
		}
		span {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #9B9B9B;
			text-align: center;
		}
	}
	.info {
		width: 164px;
		margin: 0 auto;
		padding-top: 10px;
		li {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #000000;
			padding-top: 15px;
			text-align: left;
			margin-left: 40px;
			list-style: disc;
		}
		button {
			cursor: pointer;
			background: #FFFFFF;
			border: 1px solid #979797;
			border-radius: 6px;
			margin-top: 35px;
			width: 100px;
			height: 25px;
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #000000;
			text-align: center;
		}
	}
	.terms {
		position: absolute;
		left: 75px;
		bottom: 40px;
		font-family: PingFangSC-Regular;
		font-size: 10px;
		color: #9B9B9B;
		text-align: center;
	}
}
.right {
	position: relative;
	width: 650px;
	.close {
		position: absolute;
		width: 22px;
		top: 20px;
		right: 20px;
		cursor: pointer;
		img {
			width: 22px;
		}
	}
	padding: 63px 0 0 50px;
	text-align: left;
	.user {
		p {
			font-family: PingFangSC-Regular;
			font-size: 12px;
			color: #9B9B9B;
			span {
				font-family: PingFangSC-Semibold;
				font-size: 18px;
				color: #000000;
				font-weight: 700;
				padding: 0 10px 0 0;
			}
			i {
				font-style: normal;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #417505;
				text-decoration: underline;
				line-height: 17px;
			}
		}
	}
	.classify {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #9B9B9B;
		padding-top: 45px;
	}
	.kinds {
		padding: 10px 0;
    // overflow: hidden;
    height: 88px;
		a {
      display: block;
      overflow: hidden;
			width: 160px;
			height: 50px;
			float: left;
			margin-right: 35px;
			text-align: center;
			background: #FFFFFF;
			border: 2px solid #979797;
      border-radius: 6px;
      transition: .3s;
			p {
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #9B9B9B;
				text-align: center;
        line-height: 50px;
        transition: .3s;
			}
			.yuan {
        display: none;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #9B9B9B;
				text-align: center;
				line-height: 20px;
			}
			// transition: 1s;			
			// &:hover {
			// 	transition: 1s;
			// 	border: 2px solid #D0021B;				
			// }
		}
		.active {
			background: #FFFFFF;
			border: 2px solid #D0021B;
      border-radius: 6px;
      height: 88px;
      transition: .3s;
			position: relative;
			p {
        color: #D0021B;
        padding-top: 19px;
        line-height: 25px;
        transition: .3s;   
			}
			.yuan {
        display: block;
				color: #D0021B;
			}
			.border {
				border-right: #D0021B 13px solid;
				border-bottom: #D0021B 11px solid;
				border-left: #fff 13px solid;
				border-top: #fff 11px solid;
				position: absolute;
				bottom: 0;
				right: 0;
			}
		}
	}
	.pay-way {
		margin-top: 10px;
		// overflow: hidden;
		.r {
			float: left;
			width: 160px;
			position: relative;
			height: 50px;
			background: #FFFFFF;
			border: 2px solid #4A90E2;
			border-radius: 6px;
			cursor: pointer;
      text-align: center;
      overflow: hidden;
      margin-right: 35px;
      transition: 1s;
			span {
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #4A90E2;
				text-align: left;
				line-height: 50px;
			}
			img {
				width: 25px;
				margin: 13px 0 0 20px;
				float: left;
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
		.zhifubao {
			button {
				background: #FFFFFF;
				border: 1px solid #4A90E2;
				box-shadow: 1px 2px 0 0 #4A90E2;
				border-radius: 6px;
				width: 100px;
				height: 25px;
				margin: 62px 0 77px 0;
				font-family: PingFangSC-Regular;
				font-size: 12px;
				color: #000000;
				text-align: center;
				cursor: pointer;
			}
		}
		.weixin {
			border: 2px solid #417505;
			#qrcode {
				width: 140px;
				height: 140px;
				margin: 12px auto;
				position: relative;
				border-radius: 5px;
				background: #D8D8D8;
				z-index: 9900;
			}
			span {
				color: #417505;
			}
			.border {
				border-right: #417505 13px solid;
				border-bottom: #417505 11px solid;
				z-index: 1;
			}
		}
	}
}
.alert {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
	background: #00000040;
  .box {
    width: 200px;
    background: #fff;
    height: 80px;
    border-radius: 5px;
		margin: 300px auto;
		&.qr {
			width: 300px;
			height: 300px;
			#qrcode {
				width: 150px;
				height: 150px;
				margin: 0 auto 20px;
			}
			button {
				width: 100px;
				height: 30px;
				background: #39BEAB;
				color: #ffff;
				border: 0;
			}
		}
    p {
      line-height: 50px;
    }
    button {
      width: 60px;
      background: #ccc;
      height: 25px;
      font-size: 14px;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
