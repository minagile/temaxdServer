<template>
  <div class="specific-demand">
    <p>其次，请简单描述您的创意需求？</p>
    <div class="progress" v-show="isPackageShow">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle big"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
    </div>
    <div class="progress" v-show="!isPackageShow">
      <span class="circle"></span>
      <span class="circle big"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
    </div>
    <div class="content">
      <div class="pro-pro time">
        <div class="title">项目开始时间</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="灵活（和扁诞协调）" v-model="beginTime" />
              <div class="radio_checked"></div>
            </span>
            <span>灵活（和扁诞协调）</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="马上开始" v-model="beginTime" />
              <div class="radio_checked"></div>
            </span>
            <span>马上开始</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="有具体开始时间" v-model="beginTime" />
              <div class="radio_checked"></div>
            </span>
            <span>有具体开始时间</span>
          </div>
        </div>
      </div>
      <div class="pro-pro cycle">
        <div class="title">项目周期</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="cycle" value="小于一周" v-model="proCycle" />
              <div class="radio_checked"></div>
            </span>
            <span>小于一周</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="cycle" value="1~2周" v-model="proCycle" />
              <div class="radio_checked"></div>
            </span>
            <span>1~2周</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="cycle" value="1月之内" v-model="proCycle" />
              <div class="radio_checked"></div>
            </span>
            <span>1月之内</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="cycle" value="不确定" v-model="proCycle" />
              <div class="radio_checked"></div>
            </span>
            <span>不确定</span>
          </div>
        </div>
      </div>
      <div class="pro-pro ele" v-show="!isPackageShow">
        <div class="title">项目预算</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="小于5000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>小于5000</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="5000-10000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>5000-10000</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="10000-30000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>10000-30000</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="30000-50000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>30000-50000</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="50000-100000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>50000-100000</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="price" value="大于100000" v-model="proPrice" />
              <div class="radio_checked"></div>
            </span>
            <span>大于100000</span>
          </div>
        </div>
      </div>
      <div class="pro-pro command">
        <div class="title">发票</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="invoice" value="需要" v-model="invoice" />
              <div class="radio_checked"></div>
            </span>
            <span>需要</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="invoice" value="不需要" v-model="invoice" />
              <div class="radio_checked"></div>
            </span>
            <span>不需要</span>
          </div>
        </div>
      </div>
      <div class="pro-name area">
        <div class="title">工作地点</div>
        <div class="title-con">
          <div @click="showPlace">
            <input class="choose_place"
            type="text"
            
            placeholder="如：澳门特别行政区"
            disabled
            v-model="workPlace" />
            <!-- placeholder="国家/省市/城市" -->
          </div>
          <div class="work_area" v-show="isChoosePlace">
            <div class="country p">
              <div
              class="coun" v-for="(it, i) in CountryData"
              :key="i"
              @mouseenter="countryMove($event, it.country)"
              >{{ it.country }}</div>
            </div>
            <div class="province p" v-if="isProvinceShow">
              <div class="coun"
              v-for="(it, i) in CountryData[0].data"
              :key="i"
              @mouseenter="provinceMove($event, i, it.province)"
              >{{ it.province }}</div>
            </div>
            <div class="city p" v-if="isCityShow" @mouseenter="cityEnter($event)">
              <div class="coun"
              v-for="(it, i) in CountryData[0].data[oIndex].data"
              :key="i"
              @click="confirm(it.cityName, i, $event)"
              >{{ it.cityName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <router-link class="back" to="Demand"><img src="../assets/img/back.jpg" alt="">返回</router-link>
        <a @click="getData">
          <button>继 续</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'specificdemand',
  data () {
    return {
      beginTime: '',
      proCycle: '',
      invoice: '',
      proPrice: '',
      workPlace: '',
      isChoosePlace: false,
      CountryData: [],
      isProvinceShow: false,
      isCityShow: false,
      oIndex: 0,
      dataCountry: '',
      dataProvince: '',
      isPackageShow: true
    }
  },
  mounted () {
    this.getPlace()
    this.getType()
    // console.log(JSON.parse(sessionStorage.getItem('specific_demand_data')))
  },
  methods: {
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
        let specificData = JSON.parse(sessionStorage.getItem('specific_demand_data_pack'))
        if (specificData) {
          this.beginTime = specificData[1].BeginTime
          this.proCycle = specificData[1].ProCycle
          this.invoice = specificData[1].Invoice
          this.proPrice = specificData[1].ProPrice
          this.workPlace = specificData[1].WorkPlace
        }
      } else {
        this.isPackageShow = true
        let specificData = JSON.parse(sessionStorage.getItem('specific_demand_data'))
        if (specificData) {
          this.beginTime = specificData[2].BeginTime
          this.proCycle = specificData[2].ProCycle
          this.invoice = specificData[2].Invoice
          this.proPrice = specificData[2].ProPrice
          this.workPlace = specificData[2].WorkPlace
        }
      }
    },
    // 工作地点
    showPlace () {
      if (this.isChoosePlace === false) {
        this.isChoosePlace = true
      } else {
        this.isChoosePlace = false
      }
    },
    countryMove (e, data) {
      this.dataCountry = data
      e.path[0].style.background = 'rgb(247, 247, 247)'
      this.isProvinceShow = true
      this.isCityShow = false
    },
    provinceMove (ev, i, data) {
      this.dataProvince = data
      this.oIndex = i
      this.isCityShow = true
      let bg = ev.path[1].children
      for (var x = 0; x < bg.length; x++) {
        if (x === i) {
          bg[x].style.background = 'rgb(247, 247, 247)'
        } else {
          bg[x].style.background = '#fff'
        }
      }
    },
    cityEnter (ev) {
      ev.path[1].children[1].children[this.oIndex].style.background = 'rgb(247, 247, 247)'
    },
    confirm (data, i, ev) {
      let bg = ev.path[1].children
      for (var x = 0; x < bg.length; x++) {
        if (x === i) {
          bg[x].style.background = 'rgb(247, 247, 247)'
        } else {
          bg[x].style.background = '#fff'
        }
      }
      this.workPlace = this.dataCountry + ' / ' + this.dataProvince + ' / ' + data
      this.isChoosePlace = false
    },
    // 工作地点
    getPlace () {
      let that = this
      that.$http({
        method: 'GET',
        url: 'https://www.temaxd.com/regionQuery'
      }).then((res) => {
        this.CountryData.push(res.body)
      }).catch(err => {
        console.log(err)
      })
    },
    getData () {
      if (this.beginTime === '') {
        alert('您还没有选择项目开始时间')
      } else if (this.proCycle === '') {
        alert('您还没有选择项目周期')
      } else if (this.invoice === '') {
        alert('您还没有选择是否需要发票')
      } else if (this.workPlace === '') {
        alert('您还没有选择工作地点')
      } else {
        let type = localStorage.getItem('type')
        let specific = {
          'BeginTime': this.beginTime,
          'ProCycle': this.proCycle,
          'Invoice': this.invoice,
          'ProPrice': this.proPrice,
          'WorkPlace': this.workPlace
        }
        if (type === 'package') {
          if (this.proPrice === '') {
            alert('您还没有选择项目预算')
          } else {
            let SpecificDemandData = [
              JSON.parse(sessionStorage.getItem('page_demand_data_pack')),
              specific
            ]
            this.$router.push('/ChoosePage/attachment')
            sessionStorage.setItem('specific_demand_data_pack', JSON.stringify(SpecificDemandData))
          }
        } else {
          let SpecificDemandData = [
            JSON.parse(sessionStorage.getItem('page_select_data')).select,
            JSON.parse(sessionStorage.getItem('page_demand_data')),
            specific
          ]
          this.$router.push('/ChoosePage/attachment')
          sessionStorage.setItem('specific_demand_data', JSON.stringify(SpecificDemandData))
        }
      }
    }
  }
}
</script>

<style lang="less" escoped>
.specific-demand {
  width: 8.1rem;
  margin: 75px auto 300px;
  font-size: 12px;
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
    min-height: 5rem;
    // border: 0.01rem solid #00ff00;
    position: relative;
  }
  .area {
    height: 0.7rem;
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    .title {
      font-size: 0.14rem;
      width: 2.3rem;
      line-height: 0.7rem;
      text-align: center;
      float: left;
      padding: 0;
    }
    .title-con {
      float: left;
      width: 4.4rem;
      height: 0.3rem;
      border: 1px solid #eaeaea;
      margin-top: 0.2rem;
      border-radius: 0.04rem;
      position: relative;
      .work_area {
        position: absolute;
        top: 0.33rem;
        left: -1px;
        // width: 4.3rem;
        height: 1.8rem;
        padding: 0.05rem;
        border: 1px solid #eaeaea;
        box-shadow: 0 2px 0.12rem 0 rgba(0, 0, 0, .1);
        background: #fff;
        z-index: 99;
        .p {
          width: 1.42rem;
          height: 1.8rem;
          border-right: 1px solid #eaeaea;
          float: left;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 0.05rem;
          }
          &::-webkit-scrollbar-track {
            background: #fff;
          }
          &::-webkit-scrollbar-thumb {
            box-shadow: 0 0 0.1rem 0 rgba(0, 0, 0, .4) inset;
            border-radius: 0.05rem;
          }
          .coun {
            height: 20px;
            padding: 7px 26px 7px 16px;
            cursor: pointer;
            &:hover {
              background:  rgb(247, 247, 247);
            }
          }
          &:last-of-type {
            border: 0;
          }
        }
      }
      input {
        display: block;
        line-height: 0.3rem;
        width: 100%;
        border: 0;
        text-indent: 20px;
        outline: none;
        cursor: pointer;
        border-radius: 0.04rem;
      }
      &:hover {
        border: 1px solid #3cc8b4;
      }
    }
  }
  .title {
    height: 100%;
    font-size: 0.14rem;
    width: 2.3rem;
    line-height: 0.26rem;
    padding-top: 0.6rem;
    text-align: center;
    float: left;
  }
  .pro-pro {
    overflow: hidden;
    height: 1.6rem;
    border-bottom: 1px solid #eaeaea;
    width: 100%;
    .progress-con {
      font-size: 0.14rem;
      padding-top: 0.4rem;
      .choose-progress {
        height: 0.26rem;
        line-height: 0.26rem;
        margin-bottom: 0.16rem;
        .default {
          position: relative;
          padding: 0;
          cursor: pointer;
          z-index: 10;
          background: #eaeaea;
          width: 14px;
          height: 14px;
          display: inline-block;
          border: 1px solid #eaeaea;
          border-radius: 50%;
          top: 6px;
          &:hover {
            border: 1px solid #3cc8b4;
          }
          input {
            position: relative;
            top: -7px;
            left: 1px;
            opacity: 0;
            cursor: pointer;
          }
          .radio_checked {
            width: 14px;
            height: 14px;
            position: absolute;
            z-index: 99;
            left: -1px;
            border-radius: 50%;
          }
          .choose_radio:checked + .radio_checked {
            top: -1px;
            background: #eaeaea;
            border: 1px solid #eaeaea;
            cursor: pointer;
            &:hover {
              border: 1px solid #3cc8b4;
            }
          }
          .choose_radio:checked + .radio_checked::after {
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
        input {
          cursor: pointer;
        }
        span {
          padding-left: 10px;
        }
      }
    }
  }
  .ele {
    height: 3.2rem;
  }
  .cycle {
    height: 2.2rem;
  }
  .command {
    height: 1.3rem;
  }
  .area {
    height: 1.2rem;
    .title {
      line-height: 1.15rem;
    }
    .title-con {
      margin-top: 0.4rem;
    }
  }
  .style {
    height: 1.2rem;
    border-bottom: 1px solid #eaeaea;
    overflow: hidden;
    .title {
      padding-top: 0.54rem;
    }
    .lab-con {
      float: left;
      height: 1.2rem;
      a {
        display: block;
        float: left;
        margin-top: 0.54rem;
        padding: 0 0.2rem;
        font-size: 0.14rem;
        border: 1px solid #eaeaea;
        box-shadow: #eaeaea 0 0 5px;
        margin-right: 0.43rem;
        line-height: 0.26rem;
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
    a {
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
}
</style>
