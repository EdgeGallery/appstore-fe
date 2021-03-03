<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="detailContent">
    <div class="part1">
      <div class="part1Div">
        <div class="part1First">
          <img
            src="../../assets/images/backMsg.png"
            alt=""
            class="operatorLine"
            @click="returnToList"
          >
          <span>
            {{ $t("messageCenter.returnToList") }}
          </span>
          <span class="part1MsgDetails">
            {{ $t("messageCenter.msgDetailInfo") }}
          </span>
        </div>
        <div
          class="part1Second"
          @click="handleDelete"
        >
          <img
            src="../../assets/images/detailDelete.png"
            alt=""
            class="operatorLine"
          >
          <span>{{ $t("messageCenter.deleteMsg") }}</span>
        </div>
        <div
          class="part1Three"
          @click="handleAccept"
        >
          <img
            src="../../assets/images/detailAccept.png"
            alt=""
            class="operatorLine"
          >
          <span>{{ $t("messageCenter.acceptMsg") }}</span>
        </div>
      </div>
      <hr class="linestyle">
    </div>
    <div class="part2">
      <div class="part2TitleDiv">
        <img
          src="../../assets/images/appBasicImg.png"
          alt=""
          class="appBasicImg"
        >
        <h3 class="appBasicInfoTitle">
          {{ $t("messageCenter.appBasicInfo") }}
        </h3>
        <div class="linestyle2">
          <hr>
        </div>
      </div>
      <div class="appBasicInfoContent">
        <el-form
          label-width="100px"
          size="mini"
        >
          <el-row :gutter="24">
            <el-col :span="4">
              <img
                src="../../assets/images/logo.png"
                alt=""
                class="appIcon"
              >
            </el-col>
            <el-col
              :span="8"
              class="detailInfo"
            >
              <el-form-item :label="$t('messageCenter.appLabel')">
                {{ data.basicInfo.name }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.appStruct')">
                {{ data.basicInfo.affinity }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.appVersion')">
                {{ data.basicInfo.version }}
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              class="detailInfo"
            >
              <el-form-item :label="$t('messageCenter.appProvider')">
                {{ data.basicInfo.provider }}
              </el-form-item>
              <el-form-item
                :label="$t('messageCenter.appAffinity')"
              >
                {{ data.basicInfo.type }}
              </el-form-item>
              <el-form-item
                :label="$t('messageCenter.appIndustry')"
              >
                {{ data.basicInfo.industry }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="part2">
      <div class="part2TitleDiv">
        <img
          src="../../assets/images/appTestRepoImg.png"
          alt=""
          class="appBasicImg"
        >
        <h3 class="appBasicInfoTitle">
          {{ $t("messageCenter.appTestRepo") }}
        </h3>
        <div class="linestyle2">
          <hr>
        </div>
      </div>
      <div class="appBasicInfoContent2">
        <el-form
          label-width="100px"
          size="mini"
          justify-content-start
        >
          <el-row :gutter="24">
            <el-col :span="4">
              <img
                :src="data.iconDownloadUrl"
                alt=""
                class="appIcon"
              >
            </el-col>
            <el-col
              :span="8"
              class="detailInfo2"
            >
              <el-form-item :label="$t('messageCenter.appStoreName')">
                {{ data.sourceAppStore }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.appTestPlatform')">
                {{ $t("messageCenter.appTestPlatform") }}
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              class="detailInfo2"
            >
              <el-form-item :label="$t('messageCenter.atpTestStatus')">
                {{ data.atpTestStatus }}
              </el-form-item>
              <el-form-item :label="$t('messageCenter.urlLink')">
                <a
                  :href="data.atpTestReportUrl"
                  target="_blank"
                >{{ $t("messageCenter.clickToCheckRepo") }}</a>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { acceptMsg, deleteMsg } from '../../tools/api.js'
export default {
  components: {

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
    returnToList () {
      this.$emit('isShowDetailMsgDlg', false)
    },
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
.detailContent{
  height: 100%;
  .part1{
    width: 95%;
    height: 15%;
    .part1Div{
      width: 100%;
      height: 30px;
      .part1First{
        float: left;
        .part1MsgDetails{
          margin-left: 300px;
          font-weight: 800;
        }
        .operatorLine{
          width: 25px;
          height: 20px;
        }
      }
      .part1Second{
        float: right;
        margin-right: 30px;
        .operatorLine{
          width: 17px;
          height: 17px;
        }
      }
      .part1Three{
        float: right;
        .operatorLine{
          width: 17px;
          height: 17px;
        }
      }
    }
    .linestyle{
      width: 95%;
      margin: 4px 20px;
    }
  }
  .part2{
    width: 95%;
    height: 25%;
    // margin-top: -40px;
    .part2TitleDiv{
      width: 100%;
      height: 30px;
      margin-left: 15px;
      .linestyle2{
        margin: 4px 20px;
        width: 78%;
        float: left;
        margin-top: 14px;
      }
      .appBasicImg{
        float: left;
        width: 30px;
        height: 30px;
      }
      .appBasicInfoTitle{
        float: left;
        margin-top: 7px;
        margin-left: 14px;
      }
    }
    .appBasicInfoContent{
      height: 100px;
      margin-top: 30px;
      .el-form-item__label{
        font-size: 14px;
        text-align: left;
        color: #999;
      }
      .appIcon{
        height: 80px;
        width: 170px;
        margin-top: 20px;
        margin-left: 30px;
      }
      .detailInfo{
        margin-left: 50px;
      }
    }
    .appBasicInfoContent2{
      height: 100px;
      margin-top: 30px;
      .el-form-item__label{
        font-size: 14px;
        text-align: left;
        color: #999;
      }
      .appIcon{
        height: 80px;
        width: 170px;
        margin-top: 20px;
        margin-left: 30px;
      }
      .detailInfo2{
        margin-left: 50px;
        margin-top: 30px;
      }
    }
  }
}

</style>
