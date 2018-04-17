<template>
  <div class="demand">
    <p>其次，请简单描述您的创意需求？</p>
    <div class="progress" v-show="isPackageShow">
      <span class="circle"></span>
      <span class="circle big"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
    </div>
    <div class="progress" v-show="!isPackageShow">
      <span class="circle big"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
      <span class="circle c"></span>
    </div>
    <div class="content">
      <div class="pro-name">
        <div class="title">项目名称</div>
        <div class="title-con">
          <input type="text"
          placeholder="如：扁诞海报"
          required
          v-model="keyword"
          @input="projectName"/>
        </div>
      </div>
      <div class="pro-progress">
        <div class="title">项目阶段</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="已有清晰的概念，就缺设计" v-model="progress" />
              <div class="radio_checked"></div>
            </span>
            <span>已有清晰的概念，就缺设计</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="概念比较清晰，需要扁诞房一起头脑风暴" v-model="progress" />
              <div class="radio_checked"></div>
            </span>
            <span>概念比较清晰，需要扁诞房一起头脑风暴</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="progress" value="还没有概念，需要扁诞方策划" v-model="progress" />
              <div class="radio_checked"></div>
            </span>
            <span>还没有概念，需要扁诞方策划</span>
          </div>
        </div>
      </div>
      <div class="pro-progress element">
        <div class="title">已有元素</div>
        <div class="progress-con">
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="element" value="没有任何视觉创意" v-model="element" />
              <div class="radio_checked"></div>
            </span>
            <span>没有任何视觉创意</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="element" value="已有一些核心元素，如LOGO" v-model="element" />
              <div class="radio_checked"></div>
            </span>
            <span>已有一些核心元素，如LOGO</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="element" value="有标识使用手册，创意方可以直接使用我们的视觉系统" v-model="element" />
              <div class="radio_checked"></div>
            </span>
            <span>有标识使用手册，创意方可以直接使用我们的视觉系统</span>
          </div>
          <div class="choose-progress">
            <span class="default">
              <input class="choose_radio" type="radio" name="element" value="有标识使用手册，但是仍需要创意方重新设计" v-model="element" />
              <div class="radio_checked"></div>
            </span>
            <span>有标识使用手册，但是仍需要创意方重新设计</span>
          </div>
        </div>
      </div>
      <div class="pro-progress target">
        <div class="title">目标用户</div>
        <div class="target-con">
          <textarea placeholder="字数请控制在500以内"
          maxlength="500"
          @input="descInput"
          v-model="desc"
          ></textarea>
          <div class="limit">{{remnant}}/500</div>
        </div>
      </div>
      <div class="pro-name area">
        <div class="title">行业领域</div>
        <div class="title-con">
          <div class="con_field" @click="industryClick">
            <a class="area_btn" v-for="(btn, index) in areaBtnList" :key="index">{{btn.text}}</a>
            <input type="text"
            v-if="isBtnShow"
            placeholder="最多选择两个行业"
            v-model="industry"/>
          </div>
          <div class="industry_field" id="industry_field" v-show="isListShow">
            <div class="a_field"
            v-for="(data, index) in item"
            :key="index"
            @click="fieldChoose(index, data.field)"
            >{{ data.field }}</div>
          </div>
        </div>
      </div>
      <div class="style">
        <div class="title">创意风格</div>
        <div class="lab-con">
          <!-- <a>极简</a><a>扁平</a><a>活泼</a><a>商业</a><a>拟物</a> -->
          <a v-for="(v, index) in Data" :key="index" @click="creativeStyle($event)">{{ v }}</a>
        </div>
      </div>
      <div class="btn">
        <a class="back" @click="backPage">返回</a>
        <a @click="getData">
          <button>继 续</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demand',
  data () {
    return {
      keyword: '',
      remnant: 500,
      desc: '',
      industry: '',
      progress: '',
      element: '',
      Data: ['极简', '扁平', '活泼', '商业', '拟物', '插画'],
      style: [],
      item: [],
      areaBtnList: [],
      isBtnShow: true,
      isListShow: false,
      isPackageShow: true
    }
  },
  mounted () {
    this.getDemandData()
    this.getType()
  },
  methods: {
    backPage () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.$router.push('/ChoosePage')
      } else {
        this.$router.push('/ChoosePage/SimpleSelect')
      }
    },
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
      } else {
        this.isPackageShow = true
      }
    },
    industryClick () {
      let oBtn = document.getElementById('industry_field').children
      for (var i = 0; i < oBtn.length; i++) {
        this.areaBtnList.forEach((v, k) => {
          if (v.id === i) {
            // oBtn[i].style.background = 'rgb(247, 247, 247)'
          }
        })
      }
      if (this.isListShow === false) {
        this.isListShow = true
      } else {
        this.isListShow = false
      }
    },
    fieldChoose (index, data) {
      if (this.areaBtnList.length < 2) {
        this.areaBtnList.push({'text': data, 'id': index})
      } else {
        this.areaBtnList.splice(0, 1)
        this.areaBtnList.push({'text': data, 'id': index})
      }
      this.isListShow = false
    },
    getDemandData () {
      let that = this
      that.$http({
        method: 'GET',
        url: 'http://www.temaxd.com/industryJson'
      }).then((res) => {
        // console.log(res.body)
        this.item = res.body
      }).catch(err => {
        console.log(err)
      })
    },
    creativeStyle (e) {
      if (e.path[0].className === 'active') {
        e.path[0].className = ''
        let i = this.style.indexOf(e.path[0].innerText)
        this.style.splice(i, 1)
      } else {
        e.path[0].className = 'active'
        this.style.push(e.path[0].innerText)
      }
    },
    projectName () {
      // console.log(this.keyword)
    },
    descInput () {
      let val = this.desc.length
      this.remnant = 500 - val
    },
    getData () {
      let type = localStorage.getItem('type')
      if (this.keyword === '') {
        alert('您还没有填写项目名称')
      } else if (this.progress === '') {
        alert('您还没有选择项目阶段')
      } else if (this.element === '') {
        alert('您还没有选择元素')
      } else if (this.desc === '') {
        alert('您还没有填写目标用户')
      } else if (this.areaBtnList.length === 0) {
        alert('您还没有选择行业领域')
      } else if (this.style.length === 0) {
        alert('您还没有选择创意风格')
      } else {
        if (type === 'package') {
          let data = [{
            'ProjectName': this.keyword,
            'ProjectProgress': this.progress,
            'HasElement': this.element,
            'TargetUser': this.desc,
            'Industry': JSON.stringify(this.areaBtnList),
            'Style': this.style
          }]
          this.$router.push({name: 'SpecificDemand', params: {SpecificDemand: data}})
        } else {
          let data = [this.$route.params.designs_type, {
            'ProjectName': this.keyword,
            'ProjectProgress': this.progress,
            'HasElement': this.element,
            'TargetUser': this.desc,
            'Industry': JSON.stringify(this.areaBtnList),
            'Style': this.style
          }]
          this.$router.push({name: 'SpecificDemand', params: {SpecificDemand: data}})
        }
      }
    }
  }
}
</script>

<style lang="less" escope>
.demand {
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
    min-height: 5rem;
    // border: 0.01rem solid #00ff00;
    position: relative;
  }
  .pro-name {
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
      input {
        display: block;
        line-height: 0.3rem;
        width: 100%;
        border: 0;
        text-indent: 20px;
        outline: none;
      }
    }
  }
  .title {
    height: 100%;
    font-size: 0.14rem;
    width: 2.3rem;
    line-height: 0.26rem;
    padding-top: 0.4rem;
    text-align: center;
    float: left;
  }
  .pro-progress {
    overflow: hidden;
    height: 2rem;
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
        span {
          padding-left: 10px;
        }
      }
    }
  }
  .element {
    height: 2.6rem;
  }
  .target {
    height: 2rem;
    .target-con {
      height: 1rem;
      width: 4.4rem;
      border: 1px solid #eaeaea;
      margin-top: 0.4rem;
      float: left;
      position: relative;
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
  .area {
    height: 1.2rem;
    .title {
      line-height: 1.15rem;
    }
    .title-con {
      margin-top: 0.4rem;
      position: relative;
      .con_field {
        width: 100%;
        height: 100%;
        .area_btn {
          float: left;
          display: block;
          padding: 4px 14px;
          font-size: 12px;
          background: #39beab;
          border-radius: 20px;
          cursor: pointer;
          color: #fff;
          margin: 2.5px 3px;
        }
        input {
          float: left;
          width: 200px;
        }
      }
      .industry_field {
        width: 100%;
        height: 2.5rem;
        border: 1px solid #eaeaea;
        position: absolute;
        left: -1px;
        background: #fff;
        top: 0.36rem;
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
        .a_field {
          height: 20px;
          line-height: 20px;
          padding: 12px;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            background: #eaeaea;
          }
        }
      }
    }
  }
  .style {
    min-height: 1.2rem;
    border-bottom: 1px solid #eaeaea;
    overflow: hidden;
    .title {
      padding-top: 0.54rem;
    }
    .lab-con {
      float: left;
      min-height: 1.2rem;
      width: 570px;
      padding-top: 0.3rem;
      a {
        cursor: pointer;
        display: block;
        float: left;
        margin-bottom: 0.3rem;
        padding: 0 0.2rem;
        font-size: 0.14rem;
        border: 1px solid #eaeaea;
        box-shadow: #eaeaea 0 0 5px;
        margin-right: 0.43rem;
        line-height: 0.26rem;
      }
      .active:hover {
        border: 1px solid #39beab;
        // border-radius: 0.3rem;
        box-shadow: #39beab 0 0 5px;
      }
      .active {
        background: #39beab;
        color: #fff;
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
