<template>
  <div class="attachment">
    <div class="file" >
      <p>请添加项目附件和补充信息</p>
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
        <span class="circle"></span>
        <span class="circle big"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
        <span class="circle c"></span>
      </div>
      <div class="content">
        <div class="pro-prog">
          <div class="title">补充说明</div>
          <div class="con">
            <div class="choose">
              <div class="upload_file">
                <img src="../assets/img/upload.png" alt="">
                <div class="text">上传文件</div>
              </div>
              <input type="file" @change="upLoadFile" multiple>
            </div>
            {{path.name}}
          </div>
        </div>
        <div class="pro-progress target">
          <div class="title">补充信息</div>
          <div class="target-con">
            <textarea placeholder="字数请控制在500以内"
            maxlength="500"
            @input="descInput"
            v-model="desc"
            ></textarea>
            <div class="limit">{{remnant}}/500</div>
          </div>
        </div>
        <div class="btn">
          <router-link class="back" to="SpecificDemand">返回</router-link>
          <a class="link" @click="next">
            <button>继 续</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attachment',
  data () {
    return {
      desc: '',
      remnant: 500,
      isPackageShow: true,
      path: ''
    }
  },
  mounted () {
    this.getType()
    console.log(this.$route.params.attachment)
  },
  methods: {
    upLoadFile (e) {
      this.path = e.target.files[0]
      let zipFormData = new FormData()
      zipFormData.append('file', e.target.files[0]) //filename是键，file是值，就是要传的文件，test.zip是要传的文件名
      // this.path.type
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.$http.post('https://www.temaxd.com/uploadFile?fileName=' + this.path.name, zipFormData, config).then(function (response) {
        console.log(response.data)
      })
    },
    getType () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.isPackageShow = false
      } else {
        this.isPackageShow = true
      }
    },
    next () {
      this.$router.push({name: 'IntroCompany', params: {Introcompany: [this.$route.params.attachment, {'file': this.path.name, 'info': this.desc}]}})
    },
    descInput () {
      let val = this.desc.length
      this.remnant = 500 - val
    }
  }
}
</script>

<style lang="less" escoped>
* {
  outline: none;
}
.attachment {
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
      height: 0.8rem;
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
  .file {
    .title {
      height: 100%;
      font-size: 0.14rem;
      width: 2.3rem;
      line-height: 0.26rem;
      padding-top: 0.4rem;
      text-align: center;
      float: left;
    }
    .pro-prog {
      overflow: hidden;
      height: 3.7rem;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      .con {
        font-size: 0.14rem;
        padding-top: 0.4rem;
        position: relative;
        .choose {
          width: 5.7rem;
          height: 2.6rem;
          border: 1px dashed #ccc;
          background: #F2F2F2;
          float: left;
          .upload_file {
            width: 100%;
            height: 100%;
            text-align: center;
            img {
              width: 90px;
              display: block;
              margin: 30px auto 20px;
            }
          }
          input {
            position: absolute;
            width: 570px;
            height: 260px;
            top: 40px;
            cursor: pointer;
            opacity: 0;
          }
        }
      }
    }
    .target {
      height: 2rem;
      border-bottom: 1px solid #eaeaea;
      overflow: hidden;
      .target-con {
        height: 1rem;
        width: 4.4rem;
        border: 1px solid #eaeaea;
        float: left;
        margin-top: 0.4rem;
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
  }
}
</style>
