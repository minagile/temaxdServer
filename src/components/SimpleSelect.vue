<template>
  <div class="simple-select">
    <p>首先，请告诉我们您需要什么类型的创意？</p>
    <div class="progress" v-show="isPackageShow">
      <span class="circle big"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
    </div>
    <div class="progress" v-show="!isPackageShow">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle big"></span>
      <span class="circle c"></span>
    </div>
    <div class="content" id="content">
      <div class="classify" id="kinds">
        <div class="classify-box" v-for="(item, index) in data" :key="index"
          @click="chooseKind($event, index)"
          @mouseenter="move($event, index)"
          @mouseleave="leave($event, index)">
          <div class="icon">
            <img :src="imgIcon" alt="">
          </div>
          <div class="kind-name">
            <img :src="item.img" alt="">
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="mouse-enter" id="detail">
          <div class="classify-detail" v-for="(items, index) in data" :key="index">
            <span class="arrow"></span>
            <div class="cover">
              <div class="popup" v-for="(item, i) in obj[index]" :key="i">
                <img :src="item.imgsrc" alt="">
                <span>{{item.text}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- click 单项选择 -->
      <div class="deposit" v-show="isSingel">
        <!-- 选中后出现的内容 -->
        <div class="border" v-for="(data, index) in chooseList" :key="index">
          <div class="choose" style="overflow:hidden;">
            <div class="left_part">
              <h2>{{data.chooseObj.type}}</h2>
              <!-- 点击切换选择 -->
              <div class="kinds" v-for="(laberItem, i) in data.chooseObj.typeList" :key="i">
                <div class="first" @click="selectType($event, i)">{{laberItem.listSingel}}</div>
              </div>
            </div>
            <div class="right_part">
              <div class="right_top">
                <h6>请选择任务明细</h6>
                <div class="changeTab">
                  <div class="task" v-for="(laberItem, i) in data.chooseObj.typeList" :key="i">
                    <div class="checkbox" v-for="(m, iIndex) in laberItem.selectList" :key="iIndex">
                      <input type="checkbox" name="logo" :value="m" @click="taskChoose($event, i, index, iIndex, m.id, data.chooseObj.type, laberItem)" />
                      <span>{{m.name}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right_bottom" v-if="isclick">
                <h6>可填写确定数量和大概范围</h6>
                <div class="range" v-for="(num, n) in datalist[index].select" :key="n">
                  <div class="tit">{{num.text}}</div>
                  <div class="add">
                    <div class="num">
                      <span @click="chooseNumOrRange($event)">数量</span>
                      <div class="rangeChangeNum">
                        <span @click="numberRange($event, 0)">数量</span>
                        <span @click="numberRange($event, 1)">范围</span>
                      </div>
                      <div class="over">
                        <div class="inputNum">
                          <div class="range_box">
                            <input type="number" @input="writeNumber($event, index)" />
                          </div>
                          <!-- <div class="range_box" @change="writeRange($event, index)">
                            <input class="r" type="number"><span style="display:none;">{{bLNum}}</span>~<input class="r" type="number"><span style="display:none;">{{bRNum}}</span>
                          </div> -->
                        </div>
                      </div>
                    </div>
                    <span class="ge">个</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- click 套餐模式 -->
      <div class="deposit model" v-show="!isSingel">
        <!-- choose content -->
        <div class="border" v-for="(data, index) in chooseList" :key="index">
          <div class="choose">
            <div class="left_part">
              <h2>{{ data.chooseObj.type }}</h2>
              <div class="level" v-for="(item, i) in data.chooseObj.level" :key="i">
                <div class="first" @click="levelList($event, i)">{{ item.Title }}</div>
              </div>
            </div>
            <div class="right_part">
              <div class="right_top">
                <h6>请选择任务明细</h6>
                <div class="task">
                  <div class="checkbox" v-for="(data, k) in data.chooseObj.list" :key="k">
                    <input type="checkbox" name="logo" :value="data" @click="taskChoose($event, k, index)" />{{data}}
                  </div>
                </div>
              </div>
              <div class="choose_price">
                <div class="all_price" v-for="(idata, iIndex) in data.chooseObj.level" :key="iIndex">
                  <div class="price_c" v-for="(items, k) in idata.Price" :key="k" @click.stop="HowLong($event, items, index)">
                    <!-- <div class="icon"> -->
                      <!-- <div class="circle_icon"> -->
                        <img :src="longList[k].imgUrl" alt="">
                      <!-- </div> -->
                    <!-- </div> -->
                    <!-- <span>{{items[1]}}</span> -->
                    <span>{{items[0]}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="remarks" >
              <div class="remarkbox">
                <div class="remarks-words" v-for="(item, i) in data.chooseObj.level" :key="i">
                  <p v-for="(data, index) in item.Remarks.split(' ')" :key="index">{{data}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="total-money" v-show="isClick">
          <div class="server_model">服务模式</div>
          <div class="choice">
            <input class="laber_radio" type="radio" checked/>
            <div class="laber_checked"></div>
            <span>套餐</span>
          </div>
          <div class="tol">总计 {{ totalPrice }}元</div>
        </div>
      </div>
      <div class="btn" v-show="isClick">
        <router-link class="back"  v-show="!isSingel" to="introcompany">
          <img src="../assets/img/back.jpg" alt="">
          返回
        </router-link>
        <a class="link" @click="nextPage">
          <button>继 续</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// 单项数据
import DataType from '../assets/singleList.json'
// 套餐数据
import PackageData from '../assets/levelPrice.json'
// 图片
import { ImgUrl, Graphic, Retailers, Interaction, PackingDesign, Category, Complete, howLong } from '../assets/img/index'
export default {
  name: 'simpleselect',
  data () {
    return {
      data: [
        {
          'title':'平面',
          'img': ImgUrl.plane
        }, 
        {
          'title':'电商',
          'img': ImgUrl.online
        }, 
        {
          'title':'网络互动',
          'img': ImgUrl.web
        }, 
        {
          'title':'包装',
          'img': ImgUrl.pack
        }
      ],
      chooseList: [],
      list: [],
      // 鼠标移动显示
      obj: [
        [
          {
            'text':'品牌形象',
            'imgsrc': Graphic.BrandImg
          },
          {
            'text':'海报/平面广告',
            'imgsrc': Graphic.Poster
          },
          {
            'text':'画册/书籍',
            'imgsrc': Graphic.Album
          },
          {
            'text':'宣传品',
            'imgsrc': Graphic.Propaganda
          },
          {
            'text':'PPT/演示',
            'imgsrc': Graphic.Demonstration
          },
          {
            'text':'卡劵创意',
            'imgsrc': Graphic.Originality
          },
          {
            'text':'其他创意',
            'imgsrc': Graphic.OtherIdeas
          }
        ],
        [
          {'text': '品牌形象', 'imgsrc': Retailers.onlineOne}
        ],
        [
          {
            'text': '网站WEB',
            'imgsrc': Interaction.webOne
          }, 
          {
            'text': '移动应用APP',
            'imgsrc': Interaction.webSecond
          }, 
          {
            'text': 'ICON/图标',
            'imgsrc': Interaction.webThird
          }, 
          {
            'text': 'Banner',
            'imgsrc': Interaction.webFour
          }
        ],
        [
          {'text': '包装', 'imgsrc': PackingDesign.Packing}
        ]
      ],
      // 存放选中的数据
      selected: [],
      isClick: false,
      // 是否选择单项模式
      isSingel: true,
      Data: {},
      totalPrice: 0,
      firstPrice: 0,
      secondPrice: 0,
      thirdPrice: 0,
      fourPrice: 0,
      datalist: [{}, {}, {}, {}],
      isclick: false,
      imgIcon: Complete,
      isPackageShow: true,
      PackageSelectData: [],
      keynumber: '',
      indexi: 0,
      longList: [
        {
          imgUrl: howLong.time
        },
        {
          imgUrl: howLong.month
        },
        {
          imgUrl: howLong.quater
        },
        {
          imgUrl: howLong.year
        }
      ],
      numberNum: '',
      bLNum: 0,
      bRNum: ''
    }
  },
  mounted () {
    this.getType()
  },
  methods: {
    writeNumber (event, index) {
      this.numberNum = event.target.value
      this.selected.forEach((v, k) => {
        if (v.text === event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].textContent) {
          v.value = this.numberNum
        }
      })
    },
    writeRange (event, index) {
      this.bLNum = event.path[1].children[0].value
      this.bRNum = event.path[1].children[2].value
      if (Number(this.bLNum) > Number(this.bRNum)) {
        alert('请填写正确的范围')
      } else  {
        this.selected.forEach((v, k) => {
          if (v.text === event.path[6].children[0].textContent) {
            v.value = event.path[1].textContent + this.bRNum
          }
        })
      }
    },
    // 选择数量或范围
    chooseNumOrRange (e) {
      // if (e.path[0].nextElementSibling.style.display === 'block') {
      //   e.path[0].nextElementSibling.style.display = 'none'
      // } else {
      //   e.path[0].nextElementSibling.style.display = 'block'
      // }
    },
    numberRange (e, data) {
      // console.log(e.path[2].children[0].innerHTML)
      if (data === 0) {
        e.path[2].children[0].innerHTML = '数量'
        e.path[2].children[2].children[0].style.top = '0'
        e.path[1].style.display = 'none'
      } else if (data === 1) {
        e.path[2].children[0].innerHTML = '范围'
        e.path[2].children[2].children[0].style.top = '-30px'
        e.path[1].style.display = 'none'
      }
    },
    // 套餐 总价计算
    HowLong (e, data, index) {
      let target = e.currentTarget.parentNode.parentNode
      target.style.display = 'none'
      if (data[1].indexOf('/') === -1) {
        if (index === 0) {
          this.firstPrice = data[1]
        } else if (index === 1) {
          this.secondPrice = data[1]
        } else if (index === 2) {
          this.thirdPrice = data[1]
        } else if (index === 3) {
          this.fourPrice = data[1]
        }
      } else {
        if (index === 0) {
          this.firstPrice = data[1].split('/')[0]
        } else if (index === 1) {
          this.secondPrice = data[1].split('/')[0]
        } else if (index === 2) {
          this.thirdPrice = data[1].split('/')[0]
        } else if (index === 3) {
          this.fourPrice = data[1].split('/')[0]
        }
      }
      // 总价
      this.totalPrice = Number(this.firstPrice) + Number(this.secondPrice) + Number(this.thirdPrice) + Number(this.fourPrice)
    },
    // 下一页
    nextPage () {
      sessionStorage.setItem('select', JSON.stringify(this.selected))
      // console.log(this.chooseList)
      let slist = []
      this.chooseList.forEach(v => {
        slist.push(v.chooseObj.type)
      })
      sessionStorage.setItem('slist', JSON.stringify(slist))
      let type = localStorage.getItem('type')
      if (type === 'individual') {
        if (this.selected.length === 0) {
          alert('您还没有选择您需要哪种类型的创意')
        } else if (this.numberNum === '' && this.bRNum === '') {
          alert('您还有数量尚未填写')
        } else {
          let pageData = {
            list: this.chooseList,
            select: this.selected,
            datalist: this.datalist
          }
          sessionStorage.setItem('page_select_data', JSON.stringify(pageData))
          this.$router.push({name: 'Quotation'})
        }
      } else if (type === 'package') {
        if (this.totalPrice === 0) {
          alert('您还没有选择你需要的创意类型')
        } else {
          let sdata = {
            'TotalPrice': this.totalPrice,
            'select': this.selected
          }
          sessionStorage.setItem('page_select_data_pack', JSON.stringify([sdata, this.chooseList, this.datalist]))
          // 存入数据
          let that = this
          let data = JSON.parse(sessionStorage.getItem('intro_data_pack'))
          // console.log(data)
          that.$http.get('https://www.temaxd.com/addDoc', {
            params: {
              designs_type: JSON.stringify([['套餐'], sdata]), // 设计类型
              project_name: data[0][0][0].ProjectName, // 项目名称
              project_phase: data[0][0][0].ProjectProgress, // 项目阶段
              project_element: data[0][0][0].HasElement, // 项目元素
              target_user: data[0][0][0].TargetUser, //目标用户
              industry_field: data[0][0][0].Industry, // 行业领域
              creative_style: JSON.stringify(data[0][0][0].Style), // 创意风格
              project_start_time: data[0][0][1].BeginTime, // 开始时间
              project_cycle: data[0][0][1].ProCycle, // 项目周期
              project_budget: data[0][0][1].ProPrice, // 项目预算
              invoice: data[0][0][1].Invoice, // 发票
              work_place: data[0][0][1].WorkPlace.replace(' / ', '-').replace(' / ', '-'), // 工作地点
              // attachment: data[0][1].file, // 补充附件(选填)
              supp_info: data[0][1].info, // 补充信息
              company_name: data[1].company_name, // 公司名称
              company_profile: data[1].company_profile, // 公司简介
              company_url: data[1].company_url, // 公司网址
              contact_information: data[1].contact_name + '/' + data[1].contact_position + '/' + data[1].contact_mail + '/' + data[1].contact_phone, // 公司联系人信息
              userId: localStorage.getItem('userId')
            }
          }).then((res) => {
            // console.log(res)
            sessionStorage.setItem('docId', JSON.stringify(res.data.split(':')[1]))
            sessionStorage.setItem('total', JSON.stringify({
              'TotalPrice': this.totalPrice,
              'select': this.selected
            }))
            this.$router.push({name: 'Agreement'})
          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
        this.Data = PackageData
        this.isSingel = false
        this.obj = [
          [{'text': '初级', 'imgsrc': Category.Primary}, {'text': '中级', 'imgsrc': Category.Middle}, {'text': '高级', 'imgsrc': Category.Senior}, {'text': '特级', 'imgsrc': Category.Super}],
          [{'text': '初级', 'imgsrc': Category.Primary}, {'text': '中级', 'imgsrc': Category.Middle}, {'text': '高级', 'imgsrc': Category.Senior}, {'text': '特级', 'imgsrc': Category.Super}],
          [{'text': '初级', 'imgsrc': Category.Primary}, {'text': '中级', 'imgsrc': Category.Middle}, {'text': '高级', 'imgsrc': Category.Senior}, {'text': '特级', 'imgsrc': Category.Super}],
          [{'text': '初级', 'imgsrc': Category.Primary}, {'text': '中级', 'imgsrc': Category.Middle}, {'text': '高级', 'imgsrc': Category.Senior}, {'text': '特级', 'imgsrc': Category.Super}]
        ]
      } else {
        this.Data = DataType
        this.isPackageShow = true
        if (this.selected.length === 0) {
          this.isNumShow = false
        } else {
          this.isNumShow = true
        }
      }
    },
    // 选中存入数据、、左边第i个、第iIndex个多选项、chooseList中第index个
    taskChoose (e, i, index, iIndex, id, data, erdata) {
      this.datalist = [{'select': []}, {'select': []}, {'select': []}, {'select': []}]
      // 判断是否选中
      if (e.target.checked === true) {
        let type = localStorage.getItem('type')
        if (type === 'package') {
          this.selected.push({'whichBox': index, 'which': i, 'text': e.target.parentNode.innerText, 'classify': e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].innerText, 'second': e.target.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[this.indexi + 1].textContent})
        } else {
          this.selected.push({'whichBox': index, 'whichOne': iIndex, 'which': i, 'text': e.target.parentNode.innerText, 'Id': id, 'classify': data, 'second': erdata.listSingel})
        }
        this.selected.forEach((m, n) => {
          this.datalist.forEach((v, k) => {
            if (k === m.whichBox) {
              v.select.push({'text': m.text})
            }
          })
        })
      } else if (e.target.checked === false) {
        this.selected.forEach((v, k) => {
          if (v.whichBox === index && v.whichOne === iIndex && v.which === i) {
            this.selected.splice(k, 1)
          }
        })
        this.selected.forEach((m, n) => {
          this.datalist.forEach((v, k) => {
            if (k === m.whichBox) {
              v.select.push({'text': m.text})
            }
          })
        })
      }
      if (this.selected.length === 0) {
        this.isclick = false
      } else {
        this.isclick = true
      }
    },
    // 移动鼠标
    move (e, index) {
      if (e.target.children[0].style.display === 'block') {
        e.target.parentNode.children[4].style.display = 'none'
      } else {
        e.target.parentNode.children[4].style.display = 'block'
        let detailArr = e.target.parentNode.children[4].children
        for (var j = 0; j < detailArr.length; j++) {
          if (j === index) {
            detailArr[j].style.display = 'block'
            detailArr[index].children[0].style.left = 51 + j * 230 + 'px'
          } else {
            detailArr[j].style.display = 'none'
          }
        }
      }
    },
    leave (e, index) {
      e.target.parentNode.children[4].style.display = 'none'
    },
    // 点击左侧列表
    // 单项
    selectType (e, i) {
      let bgColor = e.target.parentNode.parentNode.children
      for (var m = 1; m < bgColor.length; m++) {
        if (m - 1 === i) {
          bgColor[m].style.background = '#eaeaea'
          bgColor[m].children[0].style.color = '#000'
        } else {
          bgColor[m].style.background = '#fff'
          bgColor[m].children[0].style.color = '#666'
        }
      }
      e.target.parentNode.parentNode.nextElementSibling.children[0].lastChild.style.top = 0.5 - i * 1.5 + 'rem'
    },
    // 套餐
    levelList (e, i) {
      this.indexi = i
      let bgColor = e.target.parentNode.parentNode.children
      for (var m = 1; m < bgColor.length; m++) {
        if (m - 1 === i) {
          bgColor[m].style.background = '#eaeaea'
          bgColor[m].children[0].style.color = '#000'
        } else {
          bgColor[m].style.background = '#fff'
          bgColor[m].children[0].style.color = '#666'
        }
      }
      e.target.parentNode.parentNode.parentNode.children[2].children[0].style.top = -i * 3.55 + 'rem'
      e.target.parentNode.parentNode.parentNode.children[1].children[1].style.top = -i * 3.5 + 'rem'
      e.target.parentNode.parentNode.parentNode.children[1].children[1].style.display = 'block'
    },
    // 点击事件
    chooseKind (event, i) {
      let detail = document.getElementById('detail')
      if (detail.style.display === 'none') {
        detail.style.display = 'block'
      } else {
        detail.style.display = 'none'
      }
      let kinds = document.getElementById('kinds')
      let element = kinds.children[i].children[0]
      // 勾选按钮
      let chooseObj = {}
      if (element.style.display !== 'block') {
        element.style.display = 'block'
        chooseObj = this.Data.data[i]
        this.chooseList.push({chooseObj: chooseObj, id: i})
      } else {
        element.style.display = 'none'
        this.chooseList.forEach((v, k) => {
          if (v.id === i) {
            this.chooseList.splice(k, 1)
          }
        })
      }
      if (this.chooseList.length === 0) {
        this.isClick = false
      } else {
        this.isClick = true
      }
    }
  }
}
</script>

<style lang="less" escoped>
.simple-select {
  width: 8.1rem;
  margin: 75px auto;
  font-size: 12px;
  p {
    margin-bottom: 30px;
    font-size: 20px;
  }
  .progress {
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 30px;
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
  .content {
    width: 8.1rem;
    min-height: 500px;
    position: relative;
    .classify {
      width: 100%;
      height: 142px;
      position: relative;
    }
  }
  .classify-box {
    text-align: center;
    float: left;
    margin-right: 110px;
    cursor: pointer;
    width: 120px;
    height: 140px;
    // border: 1px solid #eaeaea;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, .1);
    position: relative;
    &:nth-of-type(4) {
      margin-right: 0;
    }
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 24px 0 rgba(0, 0, 0, .1);
    }
    .icon {
      display: none;
      width: 20px;
      height: 20px;
      // background: #eaeaea;
      font-size: 10px;
      position: absolute;
      top: 0;
      right: 0;
      img {
        display: block;
        width: 100%;
      }
    }
    .kind-name {
      // padding-top: 100px;
      img {
        display: block;
        width: 50px;
        margin: 30px auto 20px;
      }
      span {
        font-size: 16px;
      }
    }
  }
  .mouse-enter {
    position: absolute;
    top: 172px;
    width: 810px;
    height: 365px;
    border-radius: 0.04rem;
    .classify-detail {
      display: none;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      clear: both;
      background: #fff;
      border-radius: 0.04rem;
      border: 1px solid #eaeaea;
      box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
      .arrow {
        border-top: 7px solid #fff;
        border-left: 7px solid #fff;
        border-bottom: 7px solid rgba(255, 255, 255, 0);
        border-right: 7px solid rgba(255, 255, 255, 0);
        font-size: 0;
        z-index: 998;
        transform: rotate(45deg);
        position: absolute;
        top: -7px;
        left: 51px;
        box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
        z-index: 8;
      }
      .cover {
        background: #fff;
        position: relative;
        height: 98%;
        z-index: 9;
        padding: 10px 0 0 5px;
        overflow: hidden;
        border-radius: 0.04rem;
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        // flex-wrap: wrap;
      }
      .popup {
        float: left;
        width: 124px;
        margin: 10px 18px;
        height: 150px;
        // border: 1px solid #eaeaea;
        box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
        background: #fff;
        text-align: center;
        img {
          width: 50px;
          margin: 30px auto;
          display: block;
        }
        span {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
  .border {
    width: 8.1rem;
    padding-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    background: #fff;
    // margin: 0 auto;
    .choose {
      width: 100%;
      min-height: 3.65rem;
      margin-top: 30px;
      border-radius: 0.04rem;
      box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
      border: 1px solid #eaeaea;
      // overflow: hidden;
      position: relative;
      .left_part {
        // float: left;
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 100%;
        border-right: 1px solid #eaeaea;
        box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
        h2 {
          font-size: 18px;
          padding-left: 0.45rem;
          line-height: 65px;
          font-weight: normal;
          border-bottom: 1px solid #eaeaea;
        }
        .kinds {
          width: 100%;
          text-align: left;
          text-indent: 45px;
          line-height: 0.5rem;
          &:nth-of-type(1) {
            background: rgba(234, 234, 234, 1);
          }
          .first {
            cursor: pointer;
            font-size: 14px;
            color: #666;
            &:hover {
              color: #000;
              background: #eaeaea;
            }
          }
        }
      }
      .right_part {
        width: 609px;
        float: right;
        .right_top {
          height: 195px;
          width: 100%;
          position: relative;
          overflow: hidden;
          h6 {
            font-size: 14px;
            line-height: 50px;
            padding-left: 35px;
            font-weight: normal;
          }
          .changeTab {
            width: 100%;
            position: absolute;
            top: 0.5rem;
          }
          .task {
            padding-left: 35px;
            width: 100%;
            height: 1.5rem;
            .checkbox {
              float: left;
              margin-right: 50px;
              // height: 30px;
              line-height: 40px;
              font-size: 14px;
              color: #666;
              input {
                width: 27px;
                height: 15px;
                float: left;
                display: block;
                margin-top: 12px;
              }
            }
          }
        }
        .right_bottom {
          width: 100%;
          margin-bottom: 70px;
          border-top: 1px solid #eaeaea;
          h6 {
            font-size: 12px;
            line-height: 50px;
            padding-left: 35px;
            font-weight: normal;
          }
          .range {
            padding-left: 48px;
            margin-bottom: 20px;
            .tit {
              float: left;
              font-size: 12px;
              color: #8a8a8a;
              line-height: 30px;
              width: 0.6rem;
              text-align: center;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .ge {
              line-height: 0.3rem;
              padding-left: 0.05rem;
            }
            .num {
              float: left;
              width: 402px;
              height: 30px;
              border: 1px solid #eaeaea;
              margin-left: 20px;
              position: relative;
              .over {
                position: absolute;
                top: 0;
                left: 94px;
                width: 302px;
                height: 30px;
                overflow: hidden;
              }
              .inputNum {
                position: absolute;
                top: 0;
                left: 0;
                width: 280px;
                line-height: 30px;
                outline: none;
                padding-left: 20px;
                .range_box {
                  input {
                    width: 100%;
                    height: 28px;
                    border: 0;
                  }
                  .r {
                    width: 110px;
                    height: 28px;
                    margin: 0 10px;
                  }
                }
              }
              .rangeChangeNum {
                display: none;
                position: absolute;
                width: 90px;
                background: #fff;
                border: 1px solid #eaeaea;
                border-radius: 4px;
                top: 32px;
                z-index: 9999;
                span {
                  float: none;
                  &:hover {
                    background: #eaeaea;
                  }
                }
              }
              span {
                display: block;
                float: left;
                width: 90px;
                line-height: 30px;
                text-align: center;
                border-right: 1px solid #eaeaea;
                font-size: 12px;
                color: #8a8a8a;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .model {
    position: relative;
    width: 8rem;
    .border {
      position: relative;
    }
    .left_part {
      box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
      .level {
        text-align: left;
        text-indent: 0.45rem;
        line-height: 0.5rem;
        &:nth-of-type(1) {
          background: #eaeaea;
        }
        .first {
          width: 100%;
          height: 0.5rem;
          cursor: pointer;
          color: #666;
          &:hover {
            color: #000;
            background: #eaeaea;
          }
        }
      }
    }
    .right_part {
      height: 3.65rem;
      overflow: hidden;
      position: relative;
      .right_top {
        height: 100% !important;
      }
      .choose_price {
        position: absolute;
        width: 100%;
        // height: 3.5rem;
        top: 0;
        transition: 1s;
        background: #fff;
        .all_price {
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          height: 3.5rem;
        }
        .price_c {
          width: 1.2rem;
          height: 1.4rem;
          // border: 1px solid #eaeaea;
          box-shadow: 0 2px 0.12rem 0 rgba(0,0,0,.1);
          // float: left;
          cursor: pointer;
          font-size: 14px;
          text-align: center;
          &:hover {
            // background: #eaeaea;
            transform: scale(1.1);
          }
          img {
            width: 46%;
            display: block;
            margin: 20px auto 20px;
          }
          .icon {
            height: 0.4rem;
            width: 100%;
            // background: #eaeaea;
            // padding: 0.3rem 0;
            .circle_icon {
              width: 0.4rem;
              height: 0.4rem;
              background: #fff;
              border-radius: 50%;
              margin: 0 auto;
              line-height: 0.4rem;
              text-align: center;
            }
          }
        }
      }
    }
    .remarks {
      width: 1.8rem;
      padding: 0.1rem;
      position: absolute;
      right: -2.02rem;
      border: 1px solid #eaeaea;
      background: #fff;
      top: -1px;
      box-shadow: 6px 3px 0.12rem 0 rgba(0,0,0,.1);
      height: 3.45rem;
      overflow: hidden;
      transition: 1s;
      line-height: 24px;
      font-size: 14px;
      p{
        // font-size: 12px;
        margin: 0;
        font-size: 14px;
      }
      .remarkbox {
        transition: 1s;
        position: relative;
      }
      .remarks-words {
        height: 3.55rem;
      }
    }
    .total-money {
      height: 0.8rem;
      border-bottom: 1px solid #eaeaea;
      width: 8.1rem;
      .server_model {
        width: 0.7rem;
        text-align: center;
        line-height: 0.8rem;
        float: left;
      }
      .choice {
        float: left;
        padding-left: 0.4rem;
        line-height: 0.8rem;
        position: relative;
        .laber_checked {
          width: 14px;
          height: 14px;
          // background: rgba(0, 0, 0, .4);
          position: absolute;
          top: 0;
          margin-top: -8px;
          left: 38px;
          border-radius: 50%;
        }
        input {
          opacity: 0;
        }
        .laber_radio:checked + .laber_checked {
          top: 50%;
          background: #eaeaea;
          border: 1px solid #eaeaea;
          cursor: pointer;
          &:hover {
            border: 1px solid #3cc8b4;
          }
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
        span {
          padding-left: 0.1rem;
        }
      }
      .tol {
        float: right;
        line-height: 0.8rem;
      }
    }
  }
  // .classify-box:hover ~ .mouse-enter {
  //   display: block;
  // }
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
}
</style>
