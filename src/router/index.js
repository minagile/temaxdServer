import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import ChoosePage from '@/components/ChoosePage'
import SimpleSelect from '@/components/SimpleSelect'
import Demand from '@/components/Demand'
import SpecificDemand from '@/components/SpecificDemand'
import Attachment from '@/components/Attachment'
import IntroCompany from '@/components/IntroCompany'
import Quotation from '@/components/Quotation'
import Agreement from '@/components/Agreement'
import SinglePrice from '@/components/SinglePrice'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Forget from '@/components/Forget'
import MyPros from '@/components/MyPros'
import ProjectDetail from '@/components/ProjectDetail'
import ModelHomePage from "@/components/model/ModelHomePage"
import ModelSecond from "@/components/model/ModelSecond"

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: "/hello",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/projectdetail",
      name: "ProjectDetail",
      component: ProjectDetail
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/forget",
      name: "Forget",
      component: Forget
    },
    {
      path: "/mypros",
      name: "MyPros",
      component: MyPros
    },
    {
      path: "/choose",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/ChoosePage",
      name: "ChoosePage",
      component: ChoosePage
    },
    // 单项选择
    {
      path: "/ChoosePage/SimpleSelect",
      name: "SimpleSelect",
      component: SimpleSelect
    },
    // 需求
    {
      path: "/ChoosePage/Demand",
      name: "Demand",
      component: Demand
    },
    // 具体需求
    {
      path: "/ChoosePage/SpecificDemand",
      name: "SpecificDemand",
      component: SpecificDemand
    },
    // 附件
    {
      path: "/ChoosePage/attachment",
      name: "Attachment",
      component: Attachment
    },
    // 介绍公司
    {
      path: "/ChoosePage/introcompany",
      name: "IntroCompany",
      component: IntroCompany
    },
    // 单项报价
    {
      path: "/ChoosePage/quotation",
      name: "Quotation",
      component: Quotation
    },
    // 合同
    {
      path: "/ChoosePage/agreement",
      name: "Agreement",
      component: Agreement
    },
    // 单项价格 报价 支付
    {
      path: "/ChoosePage/singleprice",
      name: "SinglePrice",
      component: SinglePrice
    },
    {
      path: "/",
      name: "ModelHomePage",
      component: ModelHomePage
    },
    {
      path: "/model/ModelSecond",
      name: "ModelSecond",
      component: ModelSecond
    }
  ]
});
