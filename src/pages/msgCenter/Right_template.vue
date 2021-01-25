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
        <hr class="linestyle">
        <el-form
          label-width="100px"
          size="mini"
          id="appForm1"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="名称：">
                {{ data.basicInfo.name }}
              </el-form-item>
              <el-form-item label="架构：">
                {{ data.basicInfo.affinity }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="厂商：">
                {{ data.basicInfo.provider }}
              </el-form-item>
              <el-form-item
                class="appType"
                label="亲和性："
              >
                {{ data.basicInfo.type }}
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
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item
                class="appShortDes"
                label="应用描述："
              >
                {{ data.basicInfo.shortDesc }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="testDetail">
        <p class="title">
          应用测试报告
        </p>
        <hr class="linestyle2">
        <el-form
          class="testInfo"
          label-width="100px"
          size="mini"
          id="appForm2"
        >
          <el-row :gutter="24">
            <el-col :span="8">
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
        <p class="titleTestRepo">
          报告详情
        </p>
        <div
          class="iframeReport"
        >
          <ATPReport
            :dataurl="data.messageId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ATPReport from './ATPReport'
import { acceptMsg } from '../../tools/api.js'
export default {
  components: {
    ATPReport
  },
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleAccept () {
      acceptMsg(this.data.messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.acceptSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.acceptFailed') + error.response.data.message,
          type: 'warning'
        })
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
#content,.detailcContent{
  height:100%;
}
.detailTitle{
  height:36px;
  .lt{
    font-size: 20px;
    font-weight: 600;
  }
  .rt{
    position: relative;
    top: -10px;
    left: 25px;
  }
}
.title{
  font-size: 20px;
  height: 36px;
  line-height: 36px;
  color: #000;
  margin-top: 25px;
  margin-left: 20px;
  position:relative;
  z-index: 888;
}
.titleTestRepo{
  font-size: 20px;
  height: 36px;
  line-height: 36px;
  color: #000;
  margin-top: 65px;
  margin-left: 20px;
  position:relative;
  z-index: 888;
}
.title::before{
  content:'';
  display:inline-block;
  width:3px;
  height:20px;
  position: relative;
  top:4px;
  background:#409EFF;
}
.titleTestRepo::before{
  content:'';
  display:inline-block;
  width:3px;
  height:20px;
  position: relative;
  top:4px;
  background:#409EFF;
}
.el-form-item{
  margin:0;
}
.el-form-item__label{
  font-size: 17px;
}
.el-form-item__content{
  font-size: 17px;
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
.iframeReport{
  height:100%;
  width:100%;
  border:none;
}
.linestyle{
  margin: 2px 20px;
}
.linestyle2{
  margin: 49px 20px 0px;
}
.appType{
  margin-left: 14px;
}
.appShortDes{
  margin-left: 28px;
  // font-size: 17px;
}
.testInfo{
  margin-left: 30px;
}
#appForm1 .el-form-item__label {
  font-size: 17px;
}
#appForm2 .el-form-item__label {
  font-size: 17px;
}
</style>
