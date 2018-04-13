<template>
  <div class="intro-company">
    <div class="introduce">
      <p>介绍一下您的企业</p>
      <div class="progress" v-show="isPackageShow">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle big"></span>
        <span class="circle c"></span>
      </div>
      <div class="progress" v-show="!isPackageShow">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle big"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
      </div>
      <div class="content">
        <table>
          <tr>
            <td><div>公司名称</div></td>
            <td>
              <div class="company_name">
                <input type="text"
                placeholder="如：上海扁诞网络科技有限公司"
                v-model="companyName"/>
              </div>
            </td>
          </tr>
          <tr>
            <td><div>公司简介</div></td>
            <td>
              <div class="brief">
                <textarea placeholder="字数请控制在500以内"
                maxlength="500"
                @input="descInput"
                v-model="desc"
                ></textarea>
                <div class="limit">{{remnant}}/500</div>
              </div>
            </td>
          </tr>
          <tr>
            <td><div>公司网址</div></td>
            <td>
              <div class="company_name">
                <input type="text" v-model="companyWeb" />
              </div>
            </td>
          </tr>
          <tr>
            <td><div>联系人信息</div></td>
            <td>
              <div class="contact">
                <div class="info"><input type="text" placeholder="姓名" v-model="name" /></div>
                <div class="info"><input type="text" placeholder="职位" v-model="position" /></div>
                <div class="info"><input type="mail" placeholder="邮箱" v-model="mail" /></div>
                <div class="info"><input type="text" placeholder="电话" v-model="phone" /></div>
              </div>
            </td>
          </tr>
        </table>
        <div class="btn">
          <router-link class="back" to="attachment">返回</router-link>
          <a class="link" @click="nextPage">
            <button>继 续</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'introcompany',
  data () {
    return {
      desc: '',
      remnant: 500,
      name: '',
      position: '',
      mail: '',
      phone: '',
      companyName: '',
      companyWeb: '',
      isPackageShow: true
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
      } else {
        this.isPackageShow = true
      }
    },
    // 下一页
    nextPage () {
      let type = localStorage.getItem('type')
      if (type === 'individual') {
        this.$router.push('/ChoosePage/quotation')
      } else if (type === 'package') {
        this.$router.push('/ChoosePage/SimpleSelect')
      }
      let companyData = {
        'CompanyName': this.companyName,
        'CompanyBrief': this.desc,
        'CompanyHref': this.companyWeb,
        'LinkMessage': [this.name, this.position, this.mail, this.phone] 
      }
      // checkMobile(this.phone)
      sessionStorage.setItem('CompanyData', JSON.stringify(companyData))
    },
    descInput () {
      let val = this.desc.length
      this.remnant = 500 - val
    }
  }
}
function checkMobile (data) {
  if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(data))) {
    alert("手机号填写不正确")
  }
}
</script>

<style lang="less" escoped>
* {
  outline: none;
}
.intro-company {
  width: 8.1rem;
  font-size: 0.14rem;
  margin: 0.75rem auto;
  p {
    font-size: 0.2rem;
    padding-bottom: 0.3rem;
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
      &:nth-of-type(6) {
        left: 810px;
      }
    }
    .big {
      width: 0.18rem;
      height: 0.18rem;
      display: block;
      background: #3cc8b4;
      top: -9px;
      position: absolute;
      border-radius: 50%;
    }
    .c {
      width: 12px;
      height: 12px;
      top: -5px;
      display: block;
      background: #eaeaea;
    }
  }
  .content {
    width: 8.1rem;
    min-height: 500px;
    // border: 1px solid #eaeaea;
    position: relative;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    tr {
      td {
        border-bottom: 1px solid #eaeaea;
        &:nth-of-type(1) {
          width: 2.3rem;
          line-height: 0.26rem;
          height: 0.74rem;
          text-align: center;
        }
        .company_name {
          width: 4.4rem;
          height: 0.3rem;
          border: 1px solid #eaeaea;
          overflow: hidden;
          input {
            width: 100%;
            height: 100%;
            border: 0;
            padding-left: 0.1rem;
          }
        }
        .brief {
          height: 1rem;
          width: 4.4rem;
          border: 1px solid #eaeaea;
          margin: 0.44rem 0;
          // overflow: hidden;
          .limit {
            color: #666;
            position: relative;
            bottom: -4px;
            left: 3.9rem;
            width: 80px;
            font-size: 12px;
          }
          textarea {
            display: block;
            width: 4.3rem;
            height: 100%;
            border: 0;
            line-height: 0.3rem;
            outline: none;
            padding-left: 0.1rem;
          }
        }
      }
      &:nth-of-type(2) {
        td {
          div {
            height: 0.96rem;
          }
        }
      }
      &:nth-of-type(3) {
        td {
          .company_name {
            margin: 0.4rem 0;
          }
        }
      }
      &:nth-of-type(4) {
        .contact {
          padding-top: 0.3rem;
          .info {
            width: 1.73rem;
            height: 0.3rem;
            border: 1px solid #eaeaea;
            margin-right: 1rem;
            float: left;
            margin-bottom: 0.3rem;
            overflow: hidden;
            input {
              border: 0;
              width: 100%;
              height: 100%;
              padding-left: 0.05rem;
            }
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
</style>
