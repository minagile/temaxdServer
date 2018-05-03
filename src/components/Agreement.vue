<template>
  <div class="agreement">
    <div class="contract">
      <p>请选择扁诞单项报价</p>
      <div class="progress">
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="circle"></span>
        <span class="big circle"></span>
      </div>
      <div class="content" >
        <div class="special">
          <div class="contract" id="content">
            <h2>TEMAX设计专用合同</h2>
            <div>
              <div class="party">甲方：<input class="company_name" type="text" v-model="cName" /><span style="display:none;">{{cName}}</span></div>
              <div class="party">乙方：上海扁诞网络科技有限公司</div> 
              <div class="contrat_con">
                <p>依据《中华人民共和国合同法》和有关法规的规定，乙方接受甲方的委托，就委托设计事项，双方经协商一致，签订本合同，信守执行以下内容：</p>
                <div class="first strip">
                  <div class="strip_title">第一条 设计内容及要求</div>
                  <div class="strip_content">
                    <div class="event">
                      <div class="t">1．委托事项</div>
                      <span class="choose" v-for="(data, index) in list" :key="index">
                        <!-- <input type="checkbox" @click="chooseEvent($event)" /> -->
                        <input type="checkbox" v-model="checkNames" :value="data" />
                        <span>{{ data }}</span>
                      </span>
                    </div>
                    <div class="event">
                      <div class="t">2．{{sOrP}}模式</div>
                      <span class="choose" v-for="(data, index) in listco" :key="index">
                        <input type="radio" @click="chooseCoopration($event, index)" name="choose"/>
                        <span>{{ data }}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="second strip">
                  <div class="strip_title">第二条 费用</div>
                  <div class="strip_content">
                    设计费用总计为：人民币￥<span class="cash">{{ price }}</span>元，(大写：<span class="cash">{{ price | intToChinese }}</span>)。
                  </div>
                </div>
                <div class="third strip">
                  <div class="strip_title">第三条 付款与发票</div>
                  <div class="strip_content">
                    <div class="pay_way">
                      <div class="t">1．支付方式</div>
                      <div class="con">
                        <p class="indent">甲方应当通过银行转账的方式将合同款项支付至乙方以下指定账户</p>
                        <p class="indent"><b>账户全称：上海扁诞网络科技有限公司</b></p>
                        <p class="indent"><b>银行账号：31050 17036 00000 00674</b></p>
                        <p class="indent"><b>开户银行：中国建设银行股份有限公司上海黄浦支行</b></p>
                      </div>
                    </div>
                    <div class="pay_invoice">
                      <div class="t">2．开具发票</div>
                      <div class="con">
                        <p class="indent">(1) 甲方应按约定时间、金额、方式向乙方支付服务费后方可收到乙方开具的等额合法发票。</p>
                        <p class="indent">(2) 如甲方在付款前要求乙方先开具发票的，则甲方知悉并同意乙方预开的发票不能作为甲方已支付服务费的凭证，甲方实际向乙方指定收款账号付款后方视为甲方履行服务费缴纳义务。</p>
                        <p class="indent">(3) 乙方根据合同约定向甲方开具增值税普通发票后，甲方因预开发票但未及时足额付款或因甲方原因导致发票过期/丢失等而要求乙方重新开具发票给乙方造成损失的， 则甲方同意按照增值税发票票面不含税金额的10%赔偿乙方损失。如因甲方提供开票信息错误致使乙方错误开票的，甲方应向乙方退还错误发票并承担因此给乙方造成的实际经济损失(包括但不限于错误发票寄回和重开发票的邮寄配送费用、因甲方不寄回发票导致的税务稽查处罚等)。</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fourth strip">
                  <div class="strip_title">第四条 服务与周期及交付方式</div>
                  <div class="different_type">根据甲方选择的不同服务类型，甲乙方还应遵守以下专用条款:</div>
                  <div class="strip_content">
                    <div class="service" v-if="isPackageShow">
                      <div class="t">1．【单项服务】</div>
                      <div class="ser_con">
                        <div class="indent">
                          <div>1.1 付款期限：</div>
                          <p>
                            (1) 甲方需在合同签订之日起两个工作日内支付委托设计总费用的
                            <span class="cash">50%</span>
                            即人民币￥
                            <span class="cash">{{ price * 0.5 }}</span>
                            元(大写：<span class="cash">{{ price * 0.5 | intToChinese }}</span>)。（乙方收到甲方的银行划帐凭据后作为设计的开始时间）。
                          </p>
                          <p>(2) 合作时间结束后，甲方需在三天内签名或盖章确认，确认后甲方应当即付清设计费用的全部余款（总费用的50%，即人民币￥<span class="cash">{{ price * 0.5 }}</span>元，大写：<span class="cash">{{ price * 0.5 | intToChinese }}</span>)。</p>
                        </div>
                        <p class="indent">
                          1.2 设计工期：从
                          <input class="short" type="text" v-model="year" /><span style="display:none">{{ year }}</span>年
                          <input class="short" type="text" v-model="month" /><span style="display:none">{{ month }}</span>月
                          <input class="short" type="text" v-model="date" /><span style="display:none">{{ date }}</span>日至
                          <input class="short" type="text" v-model="yearp" @input="calcu" /><span style="display:none">{{ yearp }}</span>年
                          <input class="short" type="text" v-model="monthp" @input="calcu" /><span style="display:none">{{ monthp }}</span>月
                          <input class="short" type="text" v-model="datep" @input="calcu" /><span style="display:none">{{ datep }}</span>日，共计 
                          <input class="short" type="text" v-model="howLong" /> 个工作日。
                        </p>
                        <p class="indent">1.3 乙方需在正常设计期间开始后的<input class="short" type="text" v-model="workDay" />个工作日内设计出甲方<span class="cash">{{ design }}</span>（委托事项）初稿，并以电子稿交付方式向甲方交付工作作品。</p>
                        <p class="indent">1.4 经过甲方最终确认的终稿，乙方在收到甲方余款结清后的有关凭据后<input class="short" type="text" v-model="beginWork" />个工作日内通过网络或邮寄快递的方式将设计作品完整电子稿及相关资料交予甲方。</p>
                        <p class="indent">1.5 乙方需在双方约定的时间内完成设计方案。因甲方反复提出修改意见导致乙方工作不能按时完成时，可延期执行，延期时间由双方协商确定。</p>
                        <p class="indent">1.6 如发生人力不可抗拒因素或甲方原因导致乙方不能按时开工或者设计期间中止，由双方协商，设计工期顺延。</p>
                      </div>
                    </div>
                    <div class="service" v-if="!isPackageShow">
                      <div class="t">1. 【套餐服务】</div>
                      <div class="ser_con">
                        <div class="indent">
                          <div>1.1 付款期限：</div>
                          <p>(1) 甲方需在合同签订之日起两个工作日内支付委托设计总费用的85%即人民币￥<span class="cash">{{ price * 0.85 }}</span>元(大写：<span class="cash">{{ price * 0.85 | intToChinese }}</span>)。（乙方收到甲方的银行划帐凭据后作为设计的开始时间）。</p>
                          <p>(2) 合作时间结束后，甲方需在三天内签名或盖章确认，确认后甲方应当即付清设计费用的全部余款（总费用的15%，即人民币￥<span class="cash">{{ price * 0.15 }}</span>元，大写：<span class="cash">{{ price * 0.15 | intToChinese }}</span>）。</p>
                        </div>
                        <p class="indent">1.2 设计工期：从
                          <input class="short" type="text" v-model="year"/><span style="display:none">{{ year }}</span>年
                          <input class="short" type="text" v-model="month" /><span style="display:none">{{ month }}</span>月
                          <input class="short" type="text" v-model="date" /><span style="display:none">{{ date }}</span>日
                          至<input class="short" type="text" v-model="yearp" /><span style="display:none">{{ yearp }}</span>年
                          <input class="short" type="text" v-model="monthp" /><span style="display:none">{{ monthp }}</span>月
                          <input class="short" type="text" v-model="datep" /><span style="display:none">{{ datep }}</span>日。
                        </p>
                        <p class="indent">1.3 甲方在设计工期内需提前1~3天提出设计要求，乙方需根据设计内容制定设计周期并在与甲方确认沟通后开始制作。</p>
                        <p class="indent">1.4 乙方需在双方约定的时间内完成设计方案。因甲方反复提出修改意见导致乙方工作不能按时完成时，可延期执行，延期时间由双方协商确定。</p>
                        <p class="indent">1.5 经过甲方最终确认的终稿，乙方需在服务期内通过网络或邮寄快递的方式将设计作品完整电子稿及相关资料交予甲方。</p>
                        <p class="indent">1.6 如发生人力不可抗拒因素或甲方原因导致乙方不能按时开工或者设计期间中止，由双方协商，设计工期顺延。</p>
                      </div>
                    </div>
                  </div>
                  <div class="remark">
                    注：
                    <p><b>1. 如甲方选择月度体验模式在周期内合作结束，乙方有权力根据合作周期截止而终止项目并与甲方进行项目交接安排工作。</b></p>
                    <p><b>2. 合同结束后，如果甲方逾期不结尾款或者拖延，则合同结束当日起需另外以每日按总金额6%的违约金累积支付乙方，本条解释权归乙方所有，望甲方尊重设计师相关人员知识、脑力等劳动成果。</b></p>
                  </div>
                </div>
                <div class="fixth strip">
                  <div class="strip_title">第五条 双方的权利义务</div>
                  <div class="strip_content">
                    <div class="obligation">
                      <div class="t">甲方权利和义务：</div>
                      <div class="ob_con">
                        <p class="indent">1．甲方有权对乙方的设计提出建议和思路，以使乙方设计的作品更符合甲方企业文化及活动策划目的</p>
                        <p class="indent">2．甲方有权对乙方所设计的作品提出修改意见; </p>
                        <p class="indent">3．甲方在付清所有设计费用后享有设计作品的所有权、使用权、处分权和收益权;</p> 
                        <p class="indent">4．甲方有义务按照合同约定支付相关费用; </p>
                        <p class="indent">5．甲方有义务提供有关企业资料或其他有关资料给乙方;</p>
                        <p class="indent">6．甲方不能参与到设计师以及公司专业任务当中，以此确保让乙方相关专业人员出色的完成设计任务。</p>
                      </div>
                    </div>
                    <div class="obligation">
                      <div class="t">乙方权利和义务：</div>
                      <div class="ob_con">
                        <p class="indent">1．乙方有权要求甲方提供有关相关设计资料供乙方设计参考;</p>
                        <p class="indent">2．乙方有权要求甲方按照合同约定支付相应款项;</p>
                        <p class="indent">3．乙方对设计的作品享有著作权，有权要求甲方在未付清款项之前不得使用该设计作品；</p>
                        <p class="indent">4．乙方需按照甲方的要求进行作品设计与制作。</p>
                        <p class="indent">5．乙方需按照合同约定按时交付设计制作作品。</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sixth strip">
                  <div class="strip_title">第六条 知识产权约定</div>
                  <div class="strip_content">
                    <p class="indent">1．乙方对设计完成的作品享有著作权。甲方将委托设计的所有费用结算完毕后，乙方可将作品著作权转让给甲方。但乙方保留用于参展、评选的权利。</p>
                    <p class="indent">2．甲方在未付清所有委托设计费用之前，乙方设计的作品著作权归乙方，甲方对该作品不享有任何权利。</p>
                    <p class="indent">3．甲方在余款未付清之前擅自使用或者修改使用乙方设计的作品而导致的侵权，乙方有权依据《中华人民共和国著作权法》追究其法律责任。</p>
                  </div>
                </div>
                <div class="seventh strip">
                  <div class="strip_title">第七条 违约责任</div>
                  <div class="strip_content">
                    <p class="indent">1．甲方在设计作品初稿完成前终止合同，其预付的费用无权要求退回；甲方在乙方作品初稿完成后终止合同的，应当支付全额的设计费用。</p>
                    <p class="indent">2．甲方如无正当理由提前终止合同，所收取的费用应当按照本合约签订的总金额的15%退回给乙方。其他合作形式按照设计行业综合规范操作。</p>
                    <p class="indent">3．合同结束后，如果甲方逾期不结尾款或者拖延，则合同结束当日起需另外以每日按总金额6%的违约金累积支付乙方，本条解释权归乙方所有，望甲方尊重设计师相关人员知识、脑力等劳动成果。</p>
                  </div>
                </div>
                <div class="eighth strip">
                  <div class="strip_title">第八条 其他事项</div>
                  <div class="strip_content">
                    <p class="indent">1．	本协议书自双方签字盖章之日起生效。</p>
                    <p class="indent">2．乙方在本协议下仅负责甲方设计服务，费用不包含制作、印刷等费用，如需后期制作、印刷等，则需另外签订合同并支付相关费用。</p>
                    <p class="indent">3．双方之间发生争议的，双方应当进行友好协商解决，在无法通过协商解决的情况下，任何一方均可向仲裁委员会申请仲裁处理。</p>
                    <p class="indent">4．本协议书未尽事宜，甲乙双方应持积极态度友好协商解决，并达成书面的补充协议。</p>
                    <p class="indent">5．本协议书一式二份，甲乙双方各执一份，具有同等的法律效力。</p>
                    <p class="indent">6．其他约定事项：
                      <input type="text" class="other_things" id="input1" maxlength="40" v-model="keyword1" @input="enter">
                      <input type="text" class="other_things" id="input2" maxlength="48" v-model="keyword2" @input="enter">
                      <input type="text" class="other_things" id="input3" maxlength="48" v-model="keyword3" @input="enter">
                      <input type="text" class="other_things" id="input4" maxlength="48" v-model="keyword4" @input="enter">
                      <!-- <textarea class="other_things" type="text" v-model="keyword"  ></textarea> -->
                      <!-- <input class="other_things" type="text" v-model="keyword" @input="calculate($event, keyword)" /><span style="display:none">{{ keyword }}</span> -->
                    </p>
                  </div>
                </div>
              </div>
              <div class="confirm">
                <div class="first_party l">
                  <div>甲方：（签字/盖章）</div>
                  <div>授权人： <input type="text" class="author" v-model="FirstPartyName"/><span style="display:none">{{ FirstPartyName }}</span></div>
                  <div>
                    <input class="short" type="text" v-model="FirstPartyyear" disabled/><span style="display:none">{{ FirstPartyyear }}</span>年
                    <input class="short" type="text" v-model="FirstPartymonth" disabled/><span style="display:none">{{ FirstPartymonth }}</span>月
                    <input class="short" type="text" v-model="FirstPartydate" disabled/><span style="display:none">{{ FirstPartydate }}</span>日
                  </div>
                </div>
                <div class="second_party l">
                  <div>乙方：（签字/盖章）</div>
                  <div>授权人：<input type="text" class="author" v-model="SecondPartyName"/><span style="display:none">{{ SecondPartyName }}</span></div>
                  <div>
                    <input class="short" type="text" v-model="SecondPartyyear" disabled/><span style="display:none">{{ SecondPartyyear }}</span>年
                    <input class="short" type="text" v-model="SecondPartymonth" disabled/><span style="display:none">{{ SecondPartymonth }}</span>月
                    <input class="short" type="text" v-model="SecondPartydate" disabled/><span style="display:none">{{ SecondPartydate }}</span>日
                    <!-- <input type="date"> -->
                  </div>
                </div>   
              </div>
              </div>
          </div>
          <div class="is_paper">
            <span>是否提供纸质版</span>
            <span class="default">
              <input class="choose_radio" type="radio" name="ispaper" @click="isPaper($event)" value="是" v-model="Data">
              <div class="radio_checked"></div>
            </span>
            <span>是</span>
            <span class="default">
              <input class="choose_radio" type="radio" name="ispaper" @click="isPaper($event)" value="否" v-model="Data">
              <div class="radio_checked"></div>
            </span>
            <span>否</span>
          </div>
        </div>
        <div class="btn">
          <a class="back" @click="backPage"><img src="../assets/img/back.jpg" alt="">返回</a>
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
  name: 'agreement',
  data () {
    return {
      list: ['平面设计', '电子商务设计', '网络互动设计', '包装设计', '高端定制'],
      listco: ['次数合作', '月度合作', '季度合作', '年度合作'],
      price: 0,
      keyword: '',
      keyword1: '',
      keyword2: '',
      keyword3: '',
      keyword4: '',
      cooperation: [],
      design: '',
      year: '',
      month: '',
      date: '',
      workDay: '',
      isPackageShow: false,
      sOrP: '',
      FirstPartyName: '',
      SecondPartyName: '',
      FirstPartyyear: '',
      FirstPartymonth: '',
      FirstPartydate: '',
      SecondPartyyear: '',
      SecondPartymonth: '',
      SecondPartydate: '',
      yearp: '',
      monthp: '',
      datep: '',
      Data: '否',
      cName: '',
      coo: '',
      beginWork: '',
      howLong: '',
      checkNames: []
    }
  },
  mounted () {
    this.getType()
  },
  watch: {
    checkNames () {
      this.design = ''
      this.checkNames.forEach(v => {
        this.design += v + ' '
      })
    }
  },
  methods: {
    enter () {
      if (this.keyword1.length === 40) {
        document.getElementById('input1').blur()
        document.getElementById('input2').style.display = 'block'
        document.getElementById('input2').focus()
      }
      if (this.keyword2.length === 48) {
        document.getElementById('input2').blur()
        document.getElementById('input3').style.display = 'block'
        document.getElementById('input3').focus()
      }
      if (this.keyword3.length === 48) {
        document.getElementById('input3').blur()
        document.getElementById('input4').style.display = 'block'
        document.getElementById('input4').focus()
      }
      // if (this.keyword4.length >= 48) {
      //   alert('以达到最大文字输入内容')
      // }
    },
    calcu () {
      this.howLong = datedifference(this.year + '-' + this.month + '-' + this.date, this.yearp + '-' + this.monthp + '-' + this.datep)
    },
    isPaper (ev) {
      // console.log(ev.path[0].value)
      this.Data = ev.path[0].value
    },
    getType () {
      let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.date = date.getDate()
      this.FirstPartyyear = date.getFullYear()
      this.FirstPartymonth = date.getMonth() + 1
      this.FirstPartydate = date.getDate()
      this.SecondPartyyear = date.getFullYear()
      this.SecondPartymonth = date.getMonth() + 1
      this.SecondPartydate = date.getDate()
      let type = localStorage.getItem('type')
      if (type === 'package') {
        let checkList = JSON.parse(sessionStorage.getItem('slist'))
        checkList.forEach(v => {
          if (v === '网络互动') {
            v = '网络互动设计'
          } else if (v === '电子商务') {
            v = '电子商务设计'
          }
          this.checkNames.push(v)
        })
        this.isPackageShow = false
        this.listco = ['次数合作', '月度合作', '季度合作', '年度合作']
        this.sOrP = '套餐'
        let total = JSON.parse(sessionStorage.getItem('total'))
        this.price = total.TotalPrice
        let agreeData = JSON.parse(sessionStorage.getItem('agreement_data_pack'))
        if (agreeData) {
          this.cName = agreeData.first_part
          this.keyword = agreeData.Event
          this.FirstPartyName = agreeData.first_part_p
          this.SecondPartyName = agreeData.second_part_p
        }
      } else {
        let checkList = JSON.parse(sessionStorage.getItem('slist'))
        // console.log(checkList)
        checkList.forEach(v => {
          if (v === '网络互动') {
            v = '网络互动设计'
          } else if (v === '电商') {
            v = '电子商务设计'
          } else if (v === '包装') {
            v = '包装设计'
          }
          this.checkNames.push(v)
        })
        this.isPackageShow = true
        this.listco = ['单项合作']
        this.sOrP = '单项'
        this.price = JSON.parse(sessionStorage.getItem('quotation_data'))[0]
        let agreeData = JSON.parse(sessionStorage.getItem('agreement_data'))
        if (agreeData) {
          this.cName = agreeData.first_part
          this.keyword = agreeData.Event
          this.FirstPartyName = agreeData.first_part_p
          this.SecondPartyName = agreeData.second_part_p
          this.workDay = agreeData.work_day
          this.beginWork = agreeData.begin_work
          this.howLong = agreeData.howlong
        }
      }
    },
    next () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        let packData = {
          'first_part': this.cName,
          'price': this.price,
          'design': this.design,
          'paper': this.Data,
          'cooperation': this.coo,
          'time':[this.year + '/' + this.month + '/' + this.date, this.yearp + '/' + this.monthp + '/' + this.datep, this.FirstPartyyear + '/' + this.FirstPartymonth + '/' + this.FirstPartydate, this.SecondPartyyear + '/' + this.SecondPartymonth + '/' + this.SecondPartydate],
          'Event': this.keyword1 + this.keyword2 + this.keyword3 + this.keyword4,
          'first_part_p': this.FirstPartyName,
          'second_part_p': this.SecondPartyName
        }
        sessionStorage.setItem('agreement_data_pack', JSON.stringify(packData))
        this.$router.push({name: 'SinglePrice'})
      } else {
        let packData = {
          'first_part': this.cName,//甲方公司
          'price': this.price,//价格
          'design': this.design,//选择事项
          'paper': this.Data,//是否需要纸质版
          'cooperation': this.coo,// 合作模式
          'time':[this.year + '/' + this.month + '/' + this.date, this.yearp + '/' + this.monthp + '/' + this.datep, this.FirstPartyyear + '/' + this.FirstPartymonth + '/' + this.FirstPartydate, this.SecondPartyyear + '/' + this.SecondPartymonth + '/' + this.SecondPartydate],//其实日期 结束日期 甲方日期 乙方日期
          'Event': this.keyword1 + this.keyword2 + this.keyword3 + this.keyword4,//注意事项
          'first_part_p': this.FirstPartyName,//甲方授权人
          'second_part_p': this.SecondPartyName,//一方授权人
          'work_day': this.workDay,//共计n工作日
          'begin_work': this.beginWork,//起始工作日
          'howlong': this.howLong//邮寄工作日
        }
        sessionStorage.setItem('agreement_data', JSON.stringify(packData))
        this.$router.push({name: 'SinglePrice'})
      }
    },
    chooseCoopration (ev, index) {
      // console.log(ev)
      this.coo = ev.path[1].innerText
      if (ev.path[2].children.length > 2) {
        let date = new Date()
        if (index === 0 || index === 3) {
          this.yearp = date.getFullYear() + 1
          this.monthp = date.getMonth() + 1
          this.datep = date.getDate()
        } else if (index === 1) {
          this.yearp = date.getFullYear()
          this.datep = date.getDate()
          this.monthp = date.getMonth() + 1
          if (this.monthp > 11) {
            this.monthp = date.getMonth() - 10
            this.yearp = date.getFullYear() + 1
          } else {
            this.monthp = date.getMonth() + 2
          }
        } else if (index === 2) {
          this.yearp = date.getFullYear()
          this.datep = date.getDate()
          this.monthp = date.getMonth() + 1
          if (this.monthp > 8) {
            this.monthp = date.getMonth() - 7
            this.yearp = date.getFullYear() + 1
          } else {
            this.monthp = date.getMonth() + 5
          }
        }
      }
    },
    backPage () {
      let type = localStorage.getItem('type')
      if (type === 'package') {
        this.$router.push('/ChoosePage/SimpleSelect')
      } else {
        this.$router.push('/ChoosePage/introcompany')
      }
    }
  },
  filters: {
    intToChinese (str) {
      let mnum = parseFloat(str)
      let strOutput = '', strTemp = '', strInTemp = ''
      let unitArray = new Array('元万亿', '仟佰拾', '零壹贰叁肆伍陆柒捌玖')
      let mnumArray = mnum.toString().split('.')
      let integralnum = mnumArray[0]
      let integrallen = integralnum.length
      let decimalnum = (mnum.toString().indexOf('.') >= 0) ? mnumArray[1].substr(0, 2) : '0'
      let decimallen = decimalnum.length
      let ints = parseInt(integrallen / 4)
      let inty = integrallen % 4
      if (ints > 3 || (ints === 3 && inty > 0)) return '超出范围'
      if (inty > 0) {
        ints++
        integralnum = '0000'.substr(inty) + integralnum
        integrallen = integralnum.length
      }
      let i = 0
      while (i < integrallen) {
        let strOutTemp = ''
        strTemp = integralnum.substr(i, 4)
        i += 4
        for (var j = 0; j < 4; j++) {
          strInTemp = parseInt(strTemp.substr(j, 1))
          strOutTemp += unitArray[2].substr(strInTemp, 1)
          if (strInTemp > 0 && j < 3) strOutTemp += unitArray[1].substr(j, 1)
        }
        strOutTemp = strOutTemp.replace(/零+$/, '')
        ints--
        if (strOutTemp !== '') strOutTemp += unitArray[0].substr(ints, 1)
        if (strTemp.substr(3,1) === '0') strOutTemp += '零'
        strOutput += strOutTemp
      }
      strOutput = strOutput.replace(/零+/g, '零').replace(/^零/, '').replace(/零$/, '')
      if (strOutput === '圆') strOutput = ''
      if (decimallen === 2) {
        strOutput += (decimalnum.charAt(0) !== '0') ? unitArray[2].substr(parseInt(decimalnum.charAt(0)), 1) + '角' : '零'
        if (strOutput === '零') strOutput = ''
        strOutput += unitArray[2].substr(parseInt(decimalnum.charAt(1)), 1) + '分'
      } else {
        if (decimalnum !== '0') strOutput += unitArray[2].substr(parseInt(decimalnum), 1) + '角'
        if (strOutput !== '') strOutput += '整'
      }
      if (strOutput === '') strOutput = '金额为零'
      return strOutput
    }
  }
}
function datedifference(sDate1, sDate2) {
  var dateSpan, tempDate, iDays
  sDate1 = Date.parse(sDate1)
  sDate2 = Date.parse(sDate2)
  dateSpan = sDate2 - sDate1
  dateSpan = Math.abs(dateSpan)
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
  return iDays
}
</script>

<style lang="less">
.agreement {
  width: 8.1rem;
  font-size: 0.13rem;
  margin: 0.75rem auto;
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
    p{
      padding: 0;
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
  .contract {
    .special {
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eaeaea;
    }
    .contract {
      width: 7.3rem;
      min-height: 6.6rem;
      line-height: 0.2rem;
      padding: 0 0.4rem;
      border: 1px solid #eaeaea;
      box-shadow: #eaeaea 0 0 5px;
      margin: 0 auto;
      font-size: 0.13rem;
      p {
        font-size: 0.13rem;
        &.indent {
          padding-left: 0.2rem;
        }
      }
      .party {
        line-height: 0.4rem;
        font-weight: 700;
        font-size: 0.16rem;
        .company_name {
          width: 2rem;
          font-size: 0.16rem;
        }
      }
      input {
        outline: none;
        border: 0;
        border-bottom: 1px solid #000;
        outline: none;
        &.author {
          text-indent: 5px;
        }
        &.short {
          width: 40px;
          text-align: center;
        }
      }
      .contrat_con {
        .other_things {
          width: 560px;
          height: 20px;
          &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4) {
            // margin-left: 116px;
            width: 676px;
            display: none;
          }
          // height: 60px;
        }
        .first {
          .choose {
            padding-right: 0.3rem;
            // line-height: 0.3rem;
            font-size: 0.13rem;
            &:first-of-type {
              padding-left: 0.2rem;
            }
          }
        }
        .second {
          .strip_content {
            text-indent: 0.2rem;
          }
        }
        .fourth {
          div.indent {
            padding-left: 0.2rem;
            p {
              padding-left: 0.15rem;
            }
          }
          .different_type {
            font-weight: 700;
            font-size: 0.14rem;
          }
          .remark {
            p {
              padding-left: 0.1rem;
            }
          }
          .strip_content {
            .service {
              .ser_tit {
                font-weight: 700;
              }
            }
          }
        }
        .strip {
          padding-top: 0.1rem;
          .strip_title {
            font-size: 0.16rem;
            font-weight: 600;
            padding-bottom: 0.1rem;
          }
          .strip_content {
            .t {
              font-size: 0.14rem;
              font-weight: 700;
              line-height: 0.3rem;
            }
          }
          .cash {
            text-decoration: underline;
            color: #000;
            font-weight: bolder;
            padding: 0 0.04rem;
          }
        }
      }
      .confirm {
        overflow: hidden;
        margin: 0.2rem 0 0.4rem;
        padding-left: 0.2rem;
        .l {
          float: left;
          width: 3rem;
          div {
            line-height: 0.5rem;
          }
        }
        .second_party {
          float: right;
        }
      }
      h2 {
        height: 0.26rem;
        padding: 0.34rem 0;
        width: 100%;
        text-align: center;
        font-weight: normal;
        font-size: 0.18rem;
      }
    }
    .is_paper {
      padding-top: 0.2rem;
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
        margin-right: 6px;
        top: 3px;
        &:hover {
          border: 1px solid #3cc8b4;
        }
        input {
          position: relative;
          top: -3px;
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
        padding-right: 0.2rem;
      }
      // input {
      //   margin-right: 0.1rem;
      // }
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
}
</style>
