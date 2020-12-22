<template>
  <div id="content">
    <div class="accept_div">
      <el-button
        class="accept_button"
        type="primary"
        @click="handleAccept"
      >
        接收
      </el-button>
    </div>
    <div>
      <h2 class="detail_title">
        From: 联通AppStore
      </h2>
    </div>
    <div>
      <h4 class="detail_base">
        应用基本信息
      </h4>
      <hr class="linestyle">
      <div class="appdiv_0_1">
        <div class="appdiv_1">
          <span>名称: {{ this.$route.query.detailData.name }}</span><br><br>
          <span>架构: {{ this.$route.query.detailData.affinity }}</span>
        </div>
        <div class="appdiv_1">
          <span>厂商: {{ this.$route.query.detailData.provider }}</span><br><br>
          <span>亲和性: {{ this.$route.query.detailData.releation }}</span>
        </div>
        <div class="appdiv_1">
          <span>版本: {{ this.$route.query.detailData.version }}</span><br><br>
          <span>行业: {{ this.$route.query.detailData.direction }}</span>
        </div>
      </div>
      <div class="appdiv_0_2">
        <span>应用描述: {{ this.$route.query.detailData.description }}</span>
      </div>
      <h4 class="detail_base">
        应用测试报告
      </h4>
      <hr class="linestyle">
      <div class="appdiv_0_3">
        <div class="appdiv_0_3_1">
          <span>测试平台: ATP测试平台</span>
        </div>
        <div class="appdiv_0_3_1">
          <span>测试结果: {{ this.$route.query.detailData.testresult }}</span>
        </div>
      </div>
      <div class="testrepo">
        <img
          :src="imageUrl"
          class="execute_style"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { acceptMsg } from '../../tools/api.js'
export default {
  components: {},
  data () {
    return {
      msgDetail: '',
      imageUrl: require('@/assets/images/testRepo1.png')
    }
  },
  methods: {
    handleAccept () {
      acceptMsg(this.$route.query.detailData.messageId).then((res) => {
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed'),
          type: 'warning'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
#content{
  background: white;
  height: 570px;
  margin: 10px 10px 0px 20px;
  overflow-y: auto;
}
.detail_title {
  width: 30%;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  background: #CEDBE8;
  background-size: 50% auto;
}
.detail_base {
  margin-left: 30px;
  margin-top: 30px;
}
.appdiv_1 {
  float: left;
  margin: 5px 5px;
  width: 300px;
  height: 40px;
}
.appdiv_0_1 {
  position: relative;
  margin: 10px 30px;
  width: 1000px;
  height: 40px;
}
.appdiv_0_2 {
  position: relative;
  margin-top: 35px;
  margin-left: 35px;
}
.appdiv_0_3{
  position: relative;
  margin-top: 35px;
  margin-left: 35px;
}
.appdiv_0_3_1{
  float: left;
  margin: 5px 5px;
  width: 450px;
  height: 40px;
}
.testrepo{
  width: 1100px;
}
.linestyle{
  margin: 2px 20px;
}
.accept_button{
  background: #606266;
  border-color: #606266;
  float: right;
  margin-top: 3px;
}
.accept_div{
  height: 30px;
  margin-right: 8px;
  margin-left: 1175px;
  position:fixed;
}
</style>
