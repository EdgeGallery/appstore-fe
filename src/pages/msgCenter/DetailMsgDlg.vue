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
        <p class="title_line" />
        <p class="title defaultFontLight">
          {{ $t("messageCenter.msgDetailInfo") }}
        </p>
      </div>
      <p
        class="messageClose defaultFontLight"
        @click="returnToList"
      >
        ×
      </p>
    </div>
    <div class="appMessage">
      <div class="appMessageTop">
        <img
          src="../../assets/images/messageAppInfo.png"
          alt=""
        >
        <p class="defaultFontLight">
          {{ $t("messageCenter.appBasicInfo") }}
        </p>
      </div>
      <div class="appMessageContent">
        <div class="appInfoImg">
          <img
            :src="data.iconDownloadUrl"
            alt=""
          >
        </div>
        <div class="appInfo1">
          <p><span class="defaultFontLight">{{ $t('messageCenter.appLabel') }}</span><span class="defaultFontLight">{{ data.basicInfo.name }}</span></p>
          <p><span class="defaultFontLight">{{ $t('messageCenter.appStruct') }}</span><span class="defaultFontLight">{{ data.basicInfo.affinity }}</span></p>
          <p><span class="defaultFontLight">{{ $t('messageCenter.appVersion') }}</span><span class="defaultFontLight">{{ data.basicInfo.version }}</span></p>
        </div>
        <div class="appInfo1 appInfo2">
          <p><span class="defaultFontLight">{{ $t('messageCenter.appProvider') }}</span><span class="defaultFontLight"> {{ data.basicInfo.provider }}</span></p>
          <p><span class="defaultFontLight">{{ $t('messageCenter.appType') }}</span><span class="defaultFontLight">  {{ data.basicInfo.type }}</span></p>
          <p><span class="defaultFontLight">{{ $t('messageCenter.appIndustry') }}</span><span class="defaultFontLight">{{ data.basicInfo.industry }}</span></p>
        </div>
      </div>
      <p class="desc">
        <span class="defaultFontLight">{{ $t('messageCenter.appShortDes') }}</span><span class="defaultFontLight">{{ data.basicInfo.shortDesc }}</span>
      </p>
      <div class="appTestReport">
        <div class="appTestReportTop">
          <img
            src="../../assets/images/messageAppInfo.png"
            alt=""
          >
          <p class="defaultFontLight">
            {{ $t("messageCenter.appTestRepo") }}
          </p>
        </div>
        <div class="appTestReportContent">
          <div class="appTestReportContentImg">
            <img
              src="../../assets/images/logo.png"
              alt=""
            >
          </div>
          <div class="testInfo">
            <p><span class="defaultFontLight">{{ $t('messageCenter.appStoreName') }}</span><span class="defaultFontLight">{{ data.sourceAppStore }}</span></p>
            <p><span>{{ $t('messageCenter.appTestPlatform') }}</span><span class="defaultFontLight">{{ $t("messageCenter.atpTestPlatform") }}</span></p>
          </div>
          <div class="testInfo">
            <p><span class="defaultFontLight">{{ $t('messageCenter.atpTestStatus') }}</span><span class="defaultFontLight"> {{ data.atpTestStatus }}</span></p>
            <p>
              <span class="defaultFontLight">{{ $t('messageCenter.testRepoKey') }}</span><span class="seeTestReport defaultFontLight"> <a
                :href="atpRepoUrl"
                target="_blank"
              >{{ $t("messageCenter.clickToCheckRepo") }}</a></span>
            </p>
          </div>
        </div>
      </div>
      <div class="btns ">
        <p
          @click="handleDelete"
          class="defaultFontLight"
        >
          {{ $t("system.delete") }}
        </p>
        <p
          @click.stop="handleAccept"
          class="defaultFontLight"
        >
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
  padding: 40px 40px;
  background:rgba(46, 20, 124, 0.7);
  border-radius: 12px;
  p{
    margin: 0;
  }
  .messageTop{
    display: flex;
    justify-content: space-between;
    .messageDetile{
      display: flex;
      .title{
        color: #fff;
        font-size: 18px;
      }
      .title_line{
        position: relative;
        top: 10px;
        width: 9px;
        height: 9px;
        margin-right: 10px;
        border-radius: 50%;
        background: #43F6AD;
      }
    }
    .messageClose{
        width: 20px;
        height: 20px;
        font-size: 40px;
        color: #fff;
        position: relative;
        top: -20px;
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
      background: #4E3494;
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
        color: #fff;
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
            font-size: 14px;
            color: #fff;
            min-width: 100px;
          }
           span:nth-child(2){
                font-size: 14px;
                color: #fff;
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
        background: #4E3494;
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
        color: #fff;
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
              font-size: 14px;
              color: #fff;
              min-width:100px;
            }
            span:nth-child(2){
              font-size: 14px;
              color: #fff;
            }
          }
          .seeTestReport{
            a{
              background: #4E3494;
              color:#fff;
              text-decoration: none;
              font-size: 14px;
              padding: 6px 30px;
              border-radius: 10px;
              position: relative;
              top: -14px;
            }
            margin-top: 12px;
            margin-bottom: 25px;
          }
          .seeTestReport:hover{
            cursor: pointer;
            a{
              background: #fff;
              color:#4E3494;
            }
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
      background: #5944C0;
      color: #fff;
    }
    p{
      padding: 4px 20px !important;
      margin-bottom: 25px;
      background: #fff;
      color: #5944C0;
      border-radius: 10px;
      border: none;
      float: right;
      font-size: 14px;
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
    font-size: 14px;
    color: #fff;
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
