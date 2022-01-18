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
    <div class="messageTop">
      <div class="messageDetile">
        <img
          src="../../assets/images/messageTop.png"
          alt=""
        >
        <p>{{ $t("messageCenter.msgDetailInfo") }}</p>
      </div>
      <img
        src="../../assets/images/messageClose.png"
        alt=""
        class="messageClose"
        @click="returnToList"
      >
    </div>
    <div class="appMessage">
      <div class="appMessageTop">
        <img
          src="../../assets/images/messageAppInfo.png"
          alt=""
        >
        <p>{{ $t("messageCenter.appBasicInfo") }}</p>
      </div>
      <div class="appMessageContent">
        <div class="appInfoImg">
          <img
            :src="data.iconDownloadUrl"
            alt=""
          >
        </div>
        <div class="appInfo1">
          <p><span>{{ $t('messageCenter.appLabel') }}</span><span>{{ data.basicInfo.name }}</span></p>
          <p><span>{{ $t('messageCenter.appStruct') }}</span><span>{{ data.basicInfo.affinity }}</span></p>
          <p><span>{{ $t('messageCenter.appVersion') }}</span><span>{{ data.basicInfo.version }}</span></p>
        </div>
        <div class="appInfo1 appInfo2">
          <p><span>{{ $t('messageCenter.appProvider') }}</span><span> {{ data.basicInfo.provider }}</span></p>
          <p><span>{{ $t('messageCenter.appType') }}</span><span>  {{ data.basicInfo.type }}</span></p>
          <p><span>{{ $t('messageCenter.appIndustry') }}</span><span>{{ data.basicInfo.industry }}</span></p>
        </div>
      </div>
      <p class="desc">
        <span>{{ $t('messageCenter.appShortDes') }}</span><span>{{ data.basicInfo.shortDesc }}</span>
      </p>
      <div class="appTestReport">
        <div class="appTestReportTop">
          <img
            src="../../assets/images/messageAppInfo.png"
            alt=""
          >
          <p> {{ $t("messageCenter.appTestRepo") }}</p>
        </div>
        <div class="appTestReportContent">
          <div class="appTestReportContentImg">
            <img
              src="../../assets/images/logo.png"
              alt=""
            >
          </div>
          <div class="testInfo">
            <p><span>{{ $t('messageCenter.appStoreName') }}</span><span>{{ data.sourceAppStore }}</span></p>
            <p><span>{{ $t('messageCenter.appTestPlatform') }}</span><span>{{ $t("messageCenter.atpTestPlatform") }}</span></p>
          </div>
          <div class="testInfo">
            <p><span>{{ $t('messageCenter.atpTestStatus') }}</span><span> {{ data.atpTestStatus }}</span></p>
            <p>
              <span>{{ $t('messageCenter.testRepoKey') }}</span><span class="seeTestReport"> <a
                :href="atpRepoUrl"
                target="_blank"
              >{{ $t("messageCenter.clickToCheckRepo") }}</a></span>
            </p>
          </div>
        </div>
      </div>
      <div class="btns">
        <p @click="handleDelete">
          {{ $t("system.delete") }}
        </p>
        <p @click.stop="handleAccept">
          {{ $t("apppromotion.accept") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { acceptMsg, deleteMsg } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
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
      isButtonActive: false,
      language: localStorage.getItem('language'),
      atpRepoUrl: ''
    }
  },
  methods: {
    returnToList () {
      this.$emit('isShowDetailMsgDlg', false)
    },
    handleAccept () {
      acceptMsg(this.data.messageId).then((res) => {
        this.$message({
          duration: 2000,
          type: 'success',
          customClass: 'zZindex',
          message: this.$t('apppromotion.acceptSuccess')
        })
        this.$emit('deletedMsgId', this.data.messageId)
        this.$emit('isShowDetailMsgDlg', false)
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.acceptFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.$emit('deletedMsgId', this.data.messageId)
        this.$emit('isShowDetailMsgDlg', false)
      })
    },
    handleDelete () {
      deleteMsg(this.data.messageId).then((res) => {
        this.$message.success(this.$t('apppromotion.deleteMsgSuccess'))
        this.$emit('deletedMsgId', this.data.messageId)
        this.$emit('isShowDetailMsgDlg', false)
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.deleteMsgFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.$emit('deletedMsgId', this.data.messageId)
        this.$emit('isShowDetailMsgDlg', false)
      })
    }

  },
  mounted () {
    this.atpRepoUrl = this.data.atpTestReportUrl + (this.language === 'cn' ? '&language=cn' : '&language=en')
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.atpRepoUrl = this.data.atpTestReportUrl + (this.language === 'cn' ? '&language=cn' : '&language=en')
    }
  }
}

</script>

<style lang="less">
.detailContent{
  width: 911px;
  height: 560px;
  padding: 39px 42px;
  background: #EFEFEF;
  border-radius: 12px;
  p{
    margin: 0;
  }
  .messageTop{
    display: flex;
    justify-content: space-between;
    .messageDetile{
      display: flex;
      p{
        font-size: 20px;
        font-family: HarmonyHeiTi, sans-serif;
        font-weight: 300;
        color: #380879;
        }
      img{
        width: 17px;
        margin-top: 6.5px;
        height: 17px;
        background: #55D8BF;
        border-radius: 3px;
        margin-right: 21px;
      }
    }
    .messageClose{
        width: 20px;
        height: 20px;
      }
    .messageClose:hover{
        cursor: pointer;
      }
  }
  .appMessage{
    margin-top: 30px;
    height: 214px;
    width: 100%;
    .appMessageTop{
      display: flex;
      height: 32px;
      align-items: center;
      width: 100%;
      padding-left: 10px;
      background: #fff;
      box-shadow: 0px 7px 21px 0px rgba(40, 12, 128, 0.08);
      border-radius: 6px;
      img{
        width: 16px;
        height: 16px;
        background: #55D8BF;
        border-radius: 2px;
        margin-right: 21px;
        margin-top: 6px;
      }
      p{
        font-size: 16px;
        font-family: HarmonyHeiTi, sans-serif;
        font-weight: 300;
        color: #380879;
      }
    }
    .appMessageContent{
      width: 100%;
      height: 182px;
      display: flex;
      .appInfoImg{
        height: 182px;
        width: 158px;
        display: flex;
        justify-content: center;
        align-items: center;
      img{
        width: 80px;
        height: 80px;
      }
      }
      .appInfo1{
        height: 182px;
        width: 334px;
        padding-top: 20px;
        p{
          display: flex;
          line-height: 36px;
          span:first-child{
            display: block;
                font-size: 16px;
                font-family: HarmonyHeiTi, sans-serif;
                font-weight: 300;
                color: #662FB2;
                min-width: 100px;
          }
           span:nth-child(2){
                font-size: 16px;
                font-family: HarmonyHeiTi, sans-serif;
                font-weight: 400;
                color: #380879;
          }
        }
      }
      .appInfo2{
        p{
          span:first-child{
                min-width: 80px;
          }
        }
      }
    }
  }
  .appTestReport{
    height: 178px;
    width: 100%;
    .appTestReportTop{
        display: flex;
        height: 32px;
        align-items: center;
        width: 100%;
        padding-left: 10px;
        background: #fff;
        box-shadow: 0px 7px 21px 0px rgba(40, 12, 128, 0.08);
        border-radius: 6px;
      img{
        width: 16px;
        height: 16px;
        background: #55D8BF;
        border-radius: 2px;
        margin-right: 21px;
        margin-top: 6px;
      }
      p{
        font-size: 16px;
        font-family: HarmonyHeiTi, sans-serif;
        font-weight: 300;
        color: #380879;
      }
  }
  .appTestReportContent{
    height: 146px;
    width: 100%;
    display: flex;
      .appTestReportContentImg{
          width: 158px;
          height: 146px;
          display: flex;
          justify-content: center;
          align-items: center;
        img{
          width: 102px;
          height: 29px;
        }
      }
      .testInfo{
          height: 146px;
          width: 334px;
          padding-top: 20px;
          p{
            display: flex;
            line-height: 50px;
            span:first-child{
              display: block;
                  font-size: 16px;
                  font-family: HarmonyHeiTi, sans-serif;
                  font-weight: 300;
                  color: #662FB2;
                  min-width:100px;
            }
            span:nth-child(2){
                  font-size: 16px;
                  font-family: HarmonyHeiTi, sans-serif;
                  font-weight: 400;
                  color: #380879;
            }
          }
          .seeTestReport{
            a{
              color:#fff !important;
              text-decoration: none;
              font-size: 14px;
            }
            margin-top: 12px;
            border-radius: 20px;
            padding: 0 10px;
            height: 25px;
            line-height: 23px;
            background: #59508f;
            color:#fff !important;
            box-shadow: 2px 2px 29px 0px rgba(36, 20, 119, 0.13);
          }
          .seeTestReport:hover{
            cursor: pointer;
          }
        }
  }
  }
  .btns{
    width: 100%;
    height: 33px;
    p:nth-child(2){
      margin-right: 15px;
    }
    p:hover{
      cursor: pointer;
      color: #fff;
      background-color: #380879;
    }
    p{
      float: right;
      font-size: 14px;
      font-family: HarmonyHeiTi, sans-serif;
      font-weight: 300;
      width: 67px;
      height: 33px;
      background-color: #fff ;
      color: #380879 ;
      border: 1px solid #380879;
      line-height: 33px;
      border-radius: 10px;
      text-align: center;
    }
  }
}
.desc{
   margin-top: -50px !important;
   margin-left: 155px !important;
   margin-bottom: 30px !important;
}
.desc span:first-child{
    font-size: 16px;
    font-family: HarmonyHeiTi, sans-serif;
    font-weight: 300;
    color: #662FB2;
    min-width: 100px;
    margin-right: 20px;
}
.desc span:nth-child(2){
    font-size: 16px;
    font-family: HarmonyHeiTi, sans-serif;
    font-weight: 400;
    color: #380879;
    word-wrap: break-word;
    word-break: break-all;
}
.zZindex {
  z-index: 3000 !important;
}
</style>
