<template>
  <div class="intro-company">
    <div class="introduce">
      <p>介绍一下您的企业</p>
      <div class="progress" v-show="isPackageShow">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle big"></span>
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
                <input type="text" v-model="companyWeb"  />
              </div>
            </td>
          </tr>
          <tr>
            <td><div>联系人信息</div></td>
            <td>
              <div class="contact">
                <div class="info"><input type="text" placeholder="姓名" v-model="fullname" /></div>
                <div class="info"><input type="text" placeholder="微信号" v-model="position" /></div>
                <div class="info"><input type="mail" placeholder="邮箱" v-model="mail" /></div>
                <div class="info"><input type="text" placeholder="电话" v-model="phone" @blur="phoneChange(phone)" /></div>
              </div>
            </td>
          </tr>
        </table>
        <div class="btn">
          <router-link class="back" to="attachment"><img src="../assets/img/back.jpg" alt="">返回</router-link>
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
      fullname: '',
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
    // console.log(JSON.parse(sessionStorage.getItem('file_data')))
  },
  methods: {
    phoneChange (data) {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(data))) {
        alert('手机号码填写不正确')
        this.phone = ''
      }
    },
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
        let data = JSON.parse(sessionStorage.getItem('intro_data_pack'))
        console.log(data)
        if (data) {
          this.companyName = data[1].company_name
          this.desc = data[1].company_profile
          this.companyWeb = data[1].company_url
          this.fullname = data[1].contact_name
          this.position = data[1].contact_position
          this.mail = data[1].contact_mail
          this.phone = data[1].contact_phone
        }
      } else {
        this.isPackageShow = true
        let data = JSON.parse(sessionStorage.getItem('intro_data'))
        if (data) {
          this.companyName = data.company_name
          this.desc = data.company_profile
          this.companyWeb = data.company_url
          this.fullname = data.contact_name
          this.position = data.contact_position
          this.mail = data.contact_mail
          this.phone = data.contact_phone
        }
      }
    },
    // 下一页
    nextPage () {
      let type = localStorage.getItem('type')
      if (this.companyName === '') {
        alert('您还没有填写公司名称')
      } else if (this.desc === '') {
        alert('您还没有填写公司简介')
      } else if (this.companyWeb === '') {
        alert('您还没有填写网站地址')
      } else if (this.fullname === '') {
        alert('您还没有填写姓名')
      } else if (this.position === '') {
        alert('您还没有填写地址')
      } else if (this.mail === '') {
        alert('您还没有填写邮箱')
      } else if (this.phone === '') {
        alert('您还没有填写电话')
      } else {
        if (type === 'individual') {
          sessionStorage.setItem('intro_data', JSON.stringify(
            {
              'company_name': this.companyName,
              'company_profile': this.desc,
              'company_url': this.companyWeb,
              'contact_name': this.fullname,
              'contact_position': this.position,
              'contact_mail': this.mail,
              'contact_phone': this.phone
            }
          ))
          // 存入数据
          let that = this
          let data = JSON.parse(sessionStorage.getItem('file_data'))
          console.log(localStorage.getItem('userId'))
          that.$http.get('https://www.temaxd.com/addDoc', {
            params: {
              designs_type: JSON.stringify([['单项'], data[0][0]]), // 设计类型
              project_name: data[0][1].ProjectName, // 项目名称
              project_phase: data[0][1].ProjectProgress, // 项目阶段
              project_element: data[0][1].HasElement, // 项目元素
              target_user: data[0][1].TargetUser, //目标用户
              industry_field: data[0][1].Industry, // 行业领域
              creative_style: JSON.stringify(data[0][1].Style), // 创意风格
              project_start_time: data[0][2].BeginTime, // 开始时间
              project_cycle: data[0][2].ProCycle, // 项目周期
              project_budget: data[0][2].ProPrice, // 项目预算
              invoice: data[0][2].Invoice, // 发票
              work_place: data[0][2].WorkPlace.replace(' / ', '-').replace(' / ', '-'), // 工作地点
              attachment: data[1].file, // 补充附件(选填)
              supp_info: data[1].info, // 补充信息
              company_name: this.companyName, // 公司名称
              company_profile: this.desc, // 公司简介
              company_url: this.companyWeb, // 公司网址
              contact_information: this.fullname + '/' + this.position + '/' + this.mail + '/' + this.phone, // 公司联系人信息
              userId: localStorage.getItem('userId')
            }
          }).then((res) => {
            // console.log(res)
            sessionStorage.setItem('docId', JSON.stringify(res.data.split(':')[1]))
            this.$router.push({name: 'Agreement'})
          }).catch(err => {
            console.log(err)
          })
        } else if (type === 'package') {
          let data = {
            'company_name': this.companyName,
            'company_profile': this.desc,
            'company_url': this.companyWeb,
            'contact_information': this.fullname + '/' + this.position + '/' + this.mail + '/' + this.phone
          }
          this.$router.push({name: 'SimpleSelect',
            params: {
              selectData: this.$route.params.Introcompany,
              introduceCompany: data
            }
          })
          sessionStorage.setItem('intro_data_pack', JSON.stringify(
            [JSON.parse(sessionStorage.getItem('file_data_pack')), {
              'company_name': this.companyName,
              'company_profile': this.desc,
              'company_url': this.companyWeb,
              'contact_name': this.fullname,
              'contact_position': this.position,
              'contact_mail': this.mail,
              'contact_phone': this.phone
            }]
          ))
        }
      }
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
