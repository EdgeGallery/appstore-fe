<template>
  <div id="content">
    <div class="detailcContent">
      <div class="detailTitle">
        <span class="lt">FROM:{{ data.targetAppStore }}</span>
        <el-button
          type="primary"
          class="rt"
        >
          接受
        </el-button>
      </div>
      <div class="detailInfo">
        <p class="title">
          应用基本信息
        </p>
        <el-form label-width="100px">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="应用名称：">
                {{ data.basicInfo.name }}
              </el-form-item>
              <el-form-item label="应用描述：">
                {{ data.description }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="厂商：">
                {{ data.basicInfo.provider }}
              </el-form-item>
              <el-form-item label="架构：">
                {{ data.basicInfo.affinity }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="版本：">
                {{ data.basicInfo.version }}
              </el-form-item>
              <el-form-item label="行业：">
                {{ data.basicInfo.industry }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="testDetail">
        <p class="title">
          应用测试报告
        </p>
        <el-form label-width="100px">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="测试平台：">
                ATP测试平台
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="测试结果：">
                {{ data.atpTestStatus }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="detailReport">
        <p class="title">
          报告详情
        </p>
        <iframe
          id="iframeReport"
          :src="data.atpTestReportUrl"
          title=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { acceptMsg } from '../../tools/api.js'
export default {
  components: {},
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      imageUrl: require('@/assets/images/testRepo1.png')
    }
  },
  methods: {
    handleAccept () {
      acceptMsg(this.$route.query.detailData.messageId).then((res) => {
        console.log('zhaolongfei' + res)
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
#content,.detailcContent{
  height:100%;
}
.detailTitle{
  height:36px;
  .lt{
    font-size: 18px;
    font-weight: 600;
  }
  .rt{
    position: relative;
    top: -10px;
    left: 25px;
  }
}
.title{
  height: 36px;
  line-height: 36px;
  color: #000;
  margin-top: 25px;
}
.title::before{
  content:'';
  display:inline-block;
  width:3px;
  height:18px;
  position: relative;
  top:4px;
  background:#409EFF;
}
.el-form-item{
  margin:0;
}
.detailInfo{
  height:110px;
}
.testDetail{
  height:70px;
}
.detailReport{
  height:100%;
}
#iframeReport{
  height:100%;
  width:100%;
  border:none;
}
</style>
