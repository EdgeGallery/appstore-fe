<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div id="content">
    <div class="detailcContent">
      <div class="detailTitle">
        <span class="lt">FROM:{{ data.sourceAppStore }}</span>
        <el-button
          type="primary"
          class="rt"
          @click="handleAccept"
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
                {{ data.basicInfo.shortDesc }}
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
          <el-button
            type="text"
            @click="checkReport"
          >
            查看
          </el-button>
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
      acceptMsg(this.data.messageId).then((res) => {
        this.$message.success('已成功接收！')
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed'),
          type: 'warning'
        })
      })
    },
    checkReport () {
      window.open(this.data.atpTestReportUrl)
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
