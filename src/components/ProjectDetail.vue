<template>
  <div class="project-detail">
    <sidebar></sidebar>
    <div class="con">
      aqswoudgqweivdia
    </div>
  </div>
</template>

<script>
import Sidebar from './SideBar'
export default {
  name: 'projectdetail',
  mounted () {
    this.getdata()
  },
  methods: {
    getdata () {
      let that = this
      that.$http.get('http://www.temaxd.com/getDocInfo', {
        params: {
          docId: '201805100656455146341'
        }
      }).then(res => {
        console.log(res.data)
        // this.data = res.data
      })
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="less" scoped>
.project-detail {
  background: #f8f8f8;
  height: 100%;
}
.con {
  width: 1000px;
  margin: 0 auto;
}
</style>
