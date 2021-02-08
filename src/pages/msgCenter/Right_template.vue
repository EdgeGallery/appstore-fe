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
          class="acceptButton"
          @click="handleAccept"
        >
          {{ $t("messageCenter.acceptMsg") }}
        </el-button>
        <el-button
          type="primary"
          class="deleteButtom"
          @click="handleDelete"
        >
          {{ $t("messageCenter.deleteMsg") }}
        </el-button>
      </div>
      <div class="detailInfo">
        <p class="title">
          {{ $t("messageCenter.appBasicInfo") }}
        </p>
        <el-form
          label-width="100px"
          size="mini"
          id="appForm1"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item :label="$t('messageCenter.appLabel')">
                {{ data.basicInfo.name }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.appStruct')">
                {{ data.basicInfo.affinity }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('messageCenter.appProvider')">
                {{ data.basicInfo.provider }}
              </el-form-item>
              <el-form-item
                :label="$t('messageCenter.appAffinity')"
              >
                {{ data.basicInfo.type }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('messageCenter.appVersion')">
                {{ data.basicInfo.version }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.appIndustry')">
                {{ data.basicInfo.industry }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item
                class="appShortDes"
                :label="$t('messageCenter.appShortDes')"
              >
                {{ data.basicInfo.shortDesc }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="testDetail">
        <p class="title">
          {{ $t("messageCenter.appTestRepo") }}
        </p>
        <el-form
          label-width="100px"
          id="appForm2"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item :label="$t('messageCenter.appTestPlatform')">
                {{ $t("messageCenter.atpTestPlatform") }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('messageCenter.atpTestStatus')">
                {{ data.atpTestStatus }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="detailReport">
        <p class="titleTestRepo">
          {{ $t("messageCenter.testRepoDescription") }}
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
import { acceptMsg, deleteMsg } from '../../tools/api.js'
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
    },
    handleDelete () {
      deleteMsg(this.data.messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
      }).catch((error) => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.deleteMsgFailed') + error.response.data.message,
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
    font-size: 17px;
    font-weight: 600;
  }
  .acceptButton{
    position: relative;
    top: -10px;
    left: 25px;
    float: right
  }
  .deleteButtom{
    position: relative;
    top: -10px;
    margin-left: 10px;
    float: right
  }
}
.title{
  font-size: 17px;
  line-height: 36px;
  color: #000;
  margin-left: 20px;
  position:relative;
  z-index: 888;
}
.titleTestRepo{
  font-size: 15px;
  // margin-top: 15px;
  margin-left: 18px;
  color: #999;
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
.el-form-item{
  margin:0;
  margin-left: 33px;

}
.el-form-item__label{
  font-size: 16px;
  text-align: left;

}
.el-form-item--mini.el-form-item{
  margin-bottom: 10px;
}
.el-form-item__content{
  font-size: 16px;
}
.detailInfo{
  height: 110px;
}
.testDetail{
  height: 70px;
}
.detailReport{
  height: 100%;
  margin-left: 15px;
  margin-top: 85px;
}
.iframeReport{
  height: auto;
  width: 100%;
  margin-left: 15px;
  margin-top: 10px;
  border: 1px solid gray;
}
.appShortDes{
  margin-left: 33px;
}
#appForm1 .el-form-item__label {
  font-size: 15px;
  color: #999;
}
#appForm2 {
  margin-top: 10px;
}
#appForm2 .el-form-item__label {
  font-size: 15px;
  color: #999;
}
</style>
