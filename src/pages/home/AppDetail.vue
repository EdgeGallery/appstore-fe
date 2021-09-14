<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="app_detail padding56">
    <div class="title_top">
      {{ $t('store.introduction') }}
    </div>
    <div class="app_info_div">
      <div class="app_icon">
        <img
          :src="appIconPath"
          alt=""
        >
      </div>
      <div class="app_info">
        <p class="app_title">
          {{ currentData.name }}
          <span class="createTime">{{ currentData.createTime }}</span>
        </p>
        <div class="app_version">
          <select
            class="drop-down"
            v-model="currentData"
            v-show="pathSource==='index'"
            @change="updateData"
          >
            <option
              v-for="(data, index) in tableData"
              :value="data"
              :key="index"
            >
              {{ data.version }}
            </option>
          </select>
          <span v-show="pathSource==='myapp'">{{ currentData.version }}</span>
          <span class="fg" />
          {{ currentData.provider }}
          <span class="fg" />
          {{ currentData.size }}
        </div>
        <p class="app_desc">
          {{ currentData.shortDesc }}
        </p>
        <p class="app_tag clearfix">
          <span class="industry">
            {{ currentData.industry }}
          </span>
          <span class="architecture">
            {{ currentData.affinity }}
          </span>
          <span class="type">
            {{ currentData.type }}
          </span>
          <span class="deployMode">
            {{ currentData.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
          </span>
        </p>
      </div>
      <div class="app_synchronize">
        <p class="synchronize_info">
          可同步应用到MEAO，可方便对应用生命周期进行管理
        </p>
        <div
          class="stepApp"
          v-if="showlun"
        >
          <el-carousel
            :interval="5000"
            arrow="always"
          >
            <el-carousel-item v-if="hwMeAO">
              <p
                class="stepNames"
              >
                {{ language === 'cn'?this.MEAO[0].labelcn:this.MEAO[0].labelen }}
              </p>
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="huaweiper"
                style="width:116px;"
              />
            </el-carousel-item>
            <el-carousel-item v-if="jzyMEAO">
              <p
                class="stepNames"
              >
                {{ language === 'cn'?this.MEAO[1].labelcn:this.MEAO[1].labelen }}
              </p>
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="jiuzhouyunper"
                style="width:116px;"
              />
            </el-carousel-item>
            <p class="stepIng">
              正在同步应用
            </p>
          </el-carousel>
        </div>
        <div class="stepDromdown">
          <el-dropdown
            @command="handleClick"
            trigger="click"
          >
            <el-button
              type="primary"
            >
              同步应用到MEAO
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              @change="handleClick"
            >
              <el-dropdown-item
                v-for="(item,index) in this.MEAO"
                :key="index"
                :command="index"
              >
                <span>{{ language === 'cn'?item.labelcn:item.labelen }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="app_score">
        <p class="score_num">
          {{ score }}
        </p>
        <el-rate
          v-model="score"
          disabled
          text-color="#ff9900"
          score-template="{value}"
        />
        <p class="download_num">
          {{ downloadNum }}{{ this.$t('store.downloadNum') }}
        </p>

        <el-button
          type="primary"
          class="batchProButton"
          :disabled="ifDownload || currentData.userId===userId ? false : true"
          @click="download(currentData)"
        >
          {{ $t('store.download') }}
        </el-button>
      </div>
    </div>

    <div
      class="app_content"
    >
      <div
        v-if="noAppShowPage"
      >
        <ul class="list_top clear">
          <li
            @click="activeName='appDetail'"
            :class="{'appDetail_active':activeName==='appDetail','appDetail_default':activeName==='comment','appDetail_default2':activeName==='comment','appDetail_default3':activeName==='vedio'}"
          >
            <span>
              <em />{{ $t('store.introduction') }}
            </span>
          </li>
          <li
            @click="activeName='comment'"
            :class="{'comment_active':activeName==='comment','comment_default':activeName==='appDetail','comment_default2':activeName==='vedio'}"
          >
            <span>
              <link-right
                v-if="activeName !=='appDetail' && activeName !== 'comment'"
                padding-right="5px"
                margin="5px"
                class="link-right"
              />
              <em />{{ $t('store.comments') }}
            </span>
          </li>
          <li
            @click="activeName='vedio'"
            :class="{'vedio_active_notry':activeName==='vedio','vedio_default_notry':activeName!=='vedio', 'vedio_default_notry1':activeName==='comment'}"
          >
            <span>
              <link-right
                v-if="activeName!=='vedio' && activeName!=='comment'"
                padding-right="5px"
                margin="5px"
                class="link-right"
              />
              <em />{{ $t('store.demo') }}
            </span>
          </li>
          <li
            class="last_li"
            :class="{'appShow_active':activeName==='vedio','last_default':activeName!=='vedio','last_default2':activeName==='vedio'}"
          >
            <span />
          </li>
        </ul>
      </div>
      <div
        v-if="appShowPage"
      >
        <ul class="list_top clear">
          <li
            @click="activeName='appDetail'"
            :class="{'appDetail_active':activeName==='appDetail','appDetail_default':activeName==='comment','appDetail_default2':activeName==='comment','appDetail_default3':activeName==='vedio' || activeName==='appShow'}"
          >
            <span>
              <em />{{ $t('store.introduction') }}
            </span>
          </li>
          <li
            @click="activeName='comment'"
            :class="{'comment_active':activeName==='comment','comment_default':activeName==='appDetail','comment_default2':activeName==='vedio'}"
          >
            <span>
              <link-right
                v-if="activeName !=='appDetail' && activeName !== 'comment'"
                padding-right="5px"
                margin="5px"
                class="link-right"
              />
              <em />{{ $t('store.comments') }}
            </span>
          </li>
          <li
            @click="activeName='vedio'"
            :class="{'vedio_active':activeName==='vedio','vedio_default':activeName!=='vedio','vedio_default2':activeName==='appShow', 'vedio_default3':activeName==='comment'}"
          >
            <span>
              <link-right
                v-if="activeName!=='vedio' && activeName!=='comment'"
                padding-right="5px"
                margin="5px"
                class="link-right"
              />
              <em />{{ $t('store.demo') }}
            </span>
          </li>
          <li
            v-if="ifExperience"
            @click="activeName='appShow'"
            :class="{'appShow_active':activeName==='appShow','appShow_default':activeName!=='appShow','appShow_default2':activeName==='comment','appShow_default3':activeName==='vedio'}"
          >
            <span>
              <link-right
                v-if="activeName!=='appShow' && activeName!=='vedio'"
                padding-right="5px"
                margin="5px"
                class="link-right"
              />
              <em />{{ $t('store.showOnline') }}
            </span>
          </li>

          <li
            class="last_li"
            :class="{'appShow_active':activeName==='appShow','last_default':activeName!=='appShow','last_default2':activeName==='appShow'}"
          >
            <span />
          </li>
        </ul>
      </div>
      <div
        class="container_div"
        :class="{'container_div_active':activeName!=='appDetail'}"
      >
        <appIntroduction
          v-show="activeName==='appDetail'"
          :source="this.source"
          ref="appIntroduction"
        />
        <appComments
          v-show="activeName==='comment'"
          :app-id="this.appId"
          ref="appComments"
        />
        <appVideo
          v-show="activeName==='vedio'"
          :player-options="this.playerOptions"
          ref="appVideo"
        />
        <appShowOnline
          v-show="activeName==='appShow'"
          :package-id="this.packageId"
          :app-id="this.appId"
          :if-experience="this.ifExperience"
          ref="appShowOnline"
        />
      </div>
    </div>
    <el-dialog
      :title="$t('store.downloadImage')"
      :visible.sync="isShowDownload"
      :show-close="false"
      center
    >
      <el-radio-group
        v-model="isDownloadImage"
        @change="handleSlect()"
        class="down_radio"
      >
        <el-radio :label="false">
          {{ $t('store.noNeed') }}
        </el-radio>
        <p class="p_bot">
          <em class="el-icon-warning" />
          {{ $t('store.downloadImageTip') }}
        </p>
        <el-radio :label="true">
          {{ $t('store.need') }}
        </el-radio>
        <p class="p_bot">
          <em class="el-icon-warning" />
          {{ $t('store.downloadImageTip2') }}
        </p>
      </el-radio-group>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelImage(currentData)"
          class="cancle_btn"
        >{{ $t('atp.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="confirmImage(currentData)"
        >{{ $t('atp.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appIntroduction from './AppIntroduction.vue'
import appComments from './AppComments.vue'
import appVideo from './AppVideo.vue'
import appShowOnline from './AppShowOnline.vue'
import {
  // getCommentsApi,
  getAppDetailTableApi,
  // submitAppCommentApi,
  downloadAppPakageApi,
  synchronizedPakageApi,
  URL_PREFIX,
  URL_PREFIXV2,
  getAppListApi,
  myApp
} from '../../tools/api.js'
import { INDUSTRY, TYPES, MEAO } from '../../tools/constant.js'
import appTry from '@/assets/images/apptry.png'
import startTry from '@/assets/images/startTry.png'
import commonUtil from '../../tools/commonUtil.js'
export default {
  name: '',
  components: {
    appIntroduction,
    appComments,
    appVideo,
    appShowOnline
  },
  data () {
    return {
      noAppShowPage: false,
      appShowPage: false,
      MEAO: MEAO,
      stepApp: [
      ],
      activeName: 'appDetail',
      activeTabIndex: '0',
      deployMode: '',
      ifExperience: false,
      ifSynchronize: false,
      appTry: appTry,
      startTry: startTry,
      ifDownload: 'true',
      ifCarousel: true,
      userId: sessionStorage.getItem('userId'),
      details: '',
      appId: '',
      tableData: [],
      isDownloadImage: false,
      isShowDownload: false,
      currentData: { },
      // activeName: 'introduction',
      comments: {
        score: 0,
        message: ''
      },

      historyComentsList: [],
      source: '',
      appIconPath: '',
      playerOptions: {
        muted: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        language: 'en',
        sources: []
      },
      userIconUrl: require('../../assets/images/app_detail_user.jpg'),
      noCommentIcon: require('../../assets/images/app_detail_info_icon.png'),
      videoIconUrl: require('../../assets/images/app_detail_video.png'),
      language: localStorage.getItem('language'),
      pathSource: sessionStorage.getItem('pathSource'),
      packageId: '',
      downloadNum: 0,
      limit: 100,
      offset: 0,
      name: '',
      ip: '',
      nodePort: '',
      experienceData: [
        {
          serviceName: '',
          nodePort: '',
          mecHost: ''
        }
      ],
      btnInstantiate: false,
      btnClean: true,
      deployStatus: 'NOTDEPLOY',
      workStatus: '',
      instantiateInfo: '',

      displayDom: false,
      version: '',
      showSynchronize: false,
      customColor: '#1ececa',
      huaweiper: 0,
      jiuzhouyunper: 0,
      startSync: false,
      hwMeAO: false,
      jzyMEAO: false,
      hwinterval: '',
      jzyinterval: '',
      showlun: false

    }
  },
  watch: {
    tableData: function (val) {
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
        this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
        this.ifExperience = this.currentData.experienceAble
        this.source = this.currentData.details
        this.checkProjectData()
      }
      return ''
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.checkProjectData()
    },
    ifExperience (newVal) {
      this.ifExperience = newVal
      if (this.ifExperience) {
        this.noAppShowPage = false
        this.appShowPage = true
      } else {
        this.noAppShowPage = true
        this.appShowPage = false
      }
    }

  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('fromPath', from.path)
    next(true)
  },
  beforeDestroy () {
    this.clearInterval()
  },
  methods: {
    getTableData () {
      let userId = null
      if (this.pathSource === 'myapp') {
        userId = sessionStorage.getItem('userId')
      }
      getAppDetailTableApi(this.appId, userId, this.limit, this.offset).then(res => {
        let data = res.data
        data.forEach(item => {
          if (this.pathSource !== 'myapp' && item.status === 'Published') {
            this.ifExperience = item.experienceAble
            console.log(this.ifExperience)
            this.packageId = item.packageId
          }
        })
        this.handleTableTada(data)
        if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
          console.log(this.tableData)
          this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
          this.source = this.currentData.details
          this.ifExperience = this.currentData.experienceAble
          if (this.ifExperience) {
            this.noAppShowPage = false
            this.appShowPage = true
          } else {
            this.noAppShowPage = true
            this.appShowPage = false
          }
          console.log(this.currentData)
          this.checkProjectData()
        }
      })
    },
    handleTableTada (data) {
      data.forEach(item => {
        let newDateBegin = this.dateChange(item.createTime)
        item.createTime = newDateBegin
        let size = (Number(item.size) / 1024).toFixed(2)
        if (size >= 1024) {
          item.size = (size / 1024).toFixed(2) + ' MB'
        } else {
          item.size = size + ' KB'
        }
        this.tableData.push(item)
        if (item.demoVideoName) {
          let val = {
            type: 'video/mp4',
            src: URL_PREFIXV2 + 'apps/' + this.appId + '/demoVideo'
          }
          this.playerOptions.sources.push(val)
        }
      })
    },
    updateData () {
      this.ifExperience = this.currentData.experienceAble
      this.source = this.currentData.details
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        return Y +
          '-' +
          (M > 9 ? M : '0' + M) +
          '-' +
          (D > 9 ? D : '0' + D) +
          ' ' +
          (H > 9 ? H : '0' + H) +
          ':' +
          (m > 9 ? m : '0' + m) +
          ':' +
          (s > 9 ? s : '0' + s)
      }
    },
    cancelImage (row) {
      this.isDownloadImage = false
      this.isShowDownload = false
    },
    confirmImage (row) {
      downloadAppPakageApi(this.appId, row, this.isDownloadImage)
      this.isShowDownload = false
      this.isDownloadImage = false
    },
    ifDownloadImage (currentData, row) {
      if (this.currentData.deployMode === 'vm') {
        this.isShowDownload = true
      } else {
        this.isDownloadImage = false
        downloadAppPakageApi(this.appId, row, this.isDownloadImage)
      }
    },
    download (row) {
      console.log(this.currentData)
      this.ifDownloadImage(this.currentData, row)
      this.getAppData()
    },
    handleClick (index) {
      console.log(index)
      if (index === 0) {
        this.synchronizePackage(this.currentData)
      } else if (index === 1) {
        console.log(this.jzyinterval)
        this.synchronizeJzy()
      }
      this.showlun = true
    },
    synchronizeJzy () {
      this.startSync = true
      this.jzyMEAO = true
      this.jiuzhouyunper = 10
      this.jzyinterval = setInterval(() => {
        if (this.jiuzhouyunper < 100) {
          this.jiuzhouyunper += 10
        }
      }, 6000)
    },
    clearInterval () {
      clearTimeout(this.jzyinterval)
      clearTimeout(this.hwinterval)
      this.jzyinterval = null
      this.hwinterval = null
    },
    synchronizePackage (row) {
      console.log(row)
      synchronizedPakageApi(this.appId, row).then(res => {
        this.startSync = true
        this.hwMeAO = true
        this.huaweiper = 10
        this.hwinterval = setInterval(() => {
          if (this.huaweiper < 100) {
            this.huaweiper += 10
          }
        }, 6000)
        this.$message({
          duration: 2000,
          message: this.$t('store.synchronizedwaiting'),
          type: 'success'
        })
        this.getAppData()
      }).catch(error => {
        let retCode = error.response.data.retCode
        let params = error.response.data.params
        let errMsg = error.response.data.message
        if (retCode) {
          commonUtil.showTipMsg(this.language, retCode, params, errMsg)
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        }
      })
    },
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.industry === itemFe.labelen) {
            this.currentData.industry = itemFe.labelcn
          }
        } else {
          if (this.currentData.industry === itemFe.labelcn) {
            this.currentData.industry = itemFe.labelen
          }
        }
      })
      TYPES.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.type === itemFe.labelen) {
            this.currentData.type = itemFe.labelcn
          }
        } else {
          if (this.currentData.type === itemFe.labelcn) {
            this.currentData.type = itemFe.labelen
          }
        }
      })
    },
    getAppData () {
      getAppListApi(this.appId).then(
        (res) => {
          this.score = res.data.score
          console.log(res.data.score)
          this.downloadNum = res.data.downloadCount
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getAppFail')
          })
        }
      )
    },
    getMyAppData () {
      myApp.getPackageDetailApi(this.appId, this.packageId).then(res => {
        let data = res.data
        this.deployMode = data.deployMode
        let newDateBegin = this.dateChange(data.createTime)
        data.createTime = newDateBegin
        this.tableData.push(data)

        if (data) {
          this.source = data.details
        }
      })
    },
    handleUploadSuccess () {
      this.$message({
        duration: 2000,
        message: this.$t('promptMessage.getNodePortSuccess'),
        type: 'success'
      })
    },
    handleExceptionMsg (error) {
      console.log(error.response.data.retCode)
      if (error.response.data.code === 403) {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.guestUser'),
          type: 'warning'
        })
      } else {
        this.$message({
          duration: 2000,
          message: error.response.data.message,
          type: 'warning'
        })
      }
    },
    showChangeErrorMessage (error) {
      this.stepClean()
      let retCode = error.response.data.retCode
      let params = error.response.data.params
      let errMsg = error.response.data.message
      if (retCode) {
        commonUtil.showTipMsg(this.language, retCode, params, errMsg)
      } else {
        this.handleExceptionMsg()
      }
    }
  },
  mounted () {
    if ((sessionStorage.getItem('userNameRole') === 'guest') || (sessionStorage.getItem('userNameRole') === 'tenant')) {
      this.ifDownload = false
    } else {
      this.ifDownload = true
    }
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('appstordetail'))
    this.details = params
    this.appId = this.details.appId
    this.ifExperience = this.details.experienceAble
    if (this.ifExperience) {
      this.noAppShowPage = false
      this.appShowPage = true
    } else {
      this.noAppShowPage = true
      this.appShowPage = false
    }
    if (this.details.score) {
      this.score = this.details.score
      this.downloadNum = this.details.downloadCount
    }
    if (this.details.packageId) {
      this.packageId = this.details.packageId
      if (this.pathSource === 'myapp') {
        this.source = this.details.details
        this.getMyAppData()
      }
    }

    this.getAppData()
    this.getTableData()
    this.appIconPath = URL_PREFIX + 'apps/' + this.appId + '/icon'
    this.checkProjectData()
    console.log(this.ifExperience)
  }
}
</script>

<style lang="less">
.app_detail{
  .title_top{
    padding: 60px 0 20px !important;
    position: relative;
    font-size: 26px;
    font-family: HarmonyOS Sans SC;
    font-weight: bold;
    color: #5D3DA0;
    font-family:defaultFontBlod, Arial, Helvetica, sans-serif;
  }
  .btnPasses{
    background: #fff !important;
    color:#67C23A !important;
  }
  .el-dialog{
  text-align: left;
    box-shadow: 2px 5px 23px 10px rgba(104, 142, 243, 0.2) inset;
    width: 535px;
    height: 333px;
  }
 .el-dialog__header{
   border-bottom: 2px solid #e0e0e0;
   background: transparent !important;
 }
  .down_radio{
    padding: 18px 20px;
    width: 400px;
    .el-radio{
      width: 350px;
      .el-radio__label{
        font-size: 20px;
      }
      .el-radio__input.is-checked + .el-radio__label{
        color: #606266;
      }
    }
    .p_bot{
      width: 360px;
      margin:0 0 30px 0px;
      color: #aaa;
      font-size: 14px;
    }
  }
  .dialog-footer {
    text-align: center;
    .cancle_btn{
      background: #d0dbf7;
      color: #587fe7;
      margin-right: 30px !important;
    }
  }
  p{
    margin-bottom: 0;
    font-size: 14px;
    width: 100%;
  }

  .app_info_div{
    border-radius: 16px;
    background: #fff;
    padding: 20px 70px;
    display: flex;
    align-items: center;
    .app_icon{
      width: 130px;
      img{
        width: 100%;
      }
    }
    .app_info{
      width: calc(100% - 610px);
      padding: 0 20px;
      word-wrap: break-word;
      .app_title{
        font-size: 36px;
        color: #380879;
        font-weight: bold;
        .createTime{
          font-size: 16px;
          font-weight: normal;
          color: #666;
          margin-left: 10px;
        }
      }
      .app_version{
        height: 24px;
        line-height: 24px;
        .drop-down{
          top:-2px;
          margin-right: 5px;
        }
        .fg{
          display: inline-block;
          width: 1px;
          height: 14px;
          background: #A1A7E6;
          margin: 0 10px;
          position: relative;
          top: 1px;
        }
      }
      .app_desc{
        margin: 15px 0;
        line-height: 23px;
      }
      .app_tag{
        span{
          float: left;
          font-size: 12pt;
          font-weight: Light;
          padding: 5px 20px 5px 10px;
          margin-right: 20px;
          border-radius: 12pt  12pt   12pt  0pt;
        }
        .industry{
          background: center right no-repeat #eaf6f9;
          background-size: contain;
          color: #54AAF3;

        }
        .architecture{
          background: center right no-repeat #effafa;
          background-size: contain;
          color: #61CDD0;
        }
        .type{
          background: center right no-repeat #effcf9;
          background-size: contain;
          color: #5E40C8;
        }
        .deployMode{
          background: center right no-repeat #fff2ed;
          background-size: contain;
          color: #FF7C50;
        }
      }
    }

    .app_score{
      width: 240px;
      .download_num{
        float: left;
        height: 26px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 5px;
        color: #5E40C8;
        font-size: 14px;
      }

      .score_num{
        color: #5E40C8;
        float: left;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 24px;
        font-weight: bold;
        margin: 5px 0;
      }
      .el-rate{
        float: left;
        width: 100%;
        text-align: center;
        .el-rate__icon{
          font-size: 22px;
          margin: 0 0 0 6px;
        }
      }
      .batchProButton{
        float: left;
        width: 100%;
        margin-left: 35px;
        margin-top: 10px;
        text-align: center;
        height: 54px !important;
        width: 160px !important;
        border-radius: 25px !important;
         color: #FFFFFF;
        font-family: HarmonyHeiTi;
        font-weight: 300;
        box-shadow: 0px 16px 8px rgba(94, 44, 204, 0.3);
        .el-button--primary{
          font-size: 24px;
          background-color: #fff;
          border: none;
          color: #FFFFFF;
        }

      }

    }
    .app_synchronize /deep/ .el-button--primary{
      height: 40px !important;
      border-radius:20px ;
      background:  linear-gradient(to right, #4444D0, #6724CB) !important;
    }
    .app_synchronize{
      height: 128px;
      width: 300px;
      position: relative;
      .synchronize_info{
        width: 194px;
        font-size: 14px;
        font-family: HarmonyHeiTi;
        font-weight: 300;
        color: #5E40C8;
        margin-top: 24px;
        margin-bottom: 20px;
      }
      .synchronize_process{
        text-align: left;
        font-size: 14px;
        p{
          font-size: 16px;
          font-weight: 600;
        }
        .process{
          display: flex;
          align-items: center;
          margin-top: 8px;
          span{
            width: 86px;
          }
          .el-progress{
            width: 200px;
          }
        }
      }

      .addOutStore{
        margin-top: 35px;
        font-size: 20px;
        height: 50px !important;
        width: 222px !important;
        border-radius: 25px !important;
        font-family: HarmonyHeiTi;
        font-weight: 300;
        box-shadow: 0px 16px 8px rgba(94, 44, 204, 0.3);
      }
    }

    .synchronize_div{
      position: absolute;
      top: 35px;
      left: 0;
      background: #688ef3;
      width: 56%;
      .transition-box{
        line-height: 25px;
      }
      .transition-box:first-child{
        border-bottom: 1px solid rgb(38, 19, 209);
      }
    }
  }
  .app_content{
    border-radius: 0 16px 16px 16px;
    background: #fff;
    margin-top: 38px;
    .list_top{
      background-color: #f0f2f5;
      margin-top: 58px;
      li{
        float: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        background: #D4D1EC;
        span{
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 30px;
          font-size: 20px;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .last_li{
        cursor: default;
      }
      em{
        display: inline-block;
        width: 19px;
        height: 22px;
        position: relative;
        top: 4px;
        margin-right: 10px;
      }
      .appDetail_active{
        background: #d4d1ec;
        border-radius: 16px 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .appDetail_default{
        background: #d4d1ec;
        border-radius: 16px 0 16x 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 16px 0 16px 0;
          transition: all 0.1s;
        }
      }
      .appDetail_default2{
        background: #fff;
        border-radius: 16px 0 0 0;
        span{
          background: #d4d1ec;
          border-radius: 16px 0 16px 0;
          transition: all 0.1s;
        }
      }
      .appDetail_default3{
        background: #d4d1ec;
        border-radius: 16px 0 0 0;
        span{
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
        }
      }
      .comment_active{
        background: #d4d1ec;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .comment_default{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .comment_default2{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
        }
      }
      .last_li.last_active{
        background: #fff;
        span{
          background: #f5f6f8;
          border-radius: 0 0 0 0;
        }
      }
      .last_li.last_default{
        background: #d4d1ec;
        span{
          background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .last_li.last_default2{
        background: #fff;
        span{
          background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_active{
        background: #d4d1ec;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .appShow_default{
        background: #f4f3f7;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0px;
          transition: all 0.1s;
        }

      }
      .appShow_default2{
        background: #f3f1f7;
        border-radius: 0 0 0 0;

        span{
          border-radius: 0 16px 0 0;
        }
      }
      .appShow_default3{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_active{
        background: #d4d1ec;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .vedio_default{
        background: #f4f3f7;
        // border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }

      }
      .vedio_default2{
       background: #fff;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0px;
          transition: all 0.1s;
        }
      }
      .vedio_default3{
        background: #fff;
        span{

          border-radius: 0 0 0 16px;
        }
      }
      .vedio_active_notry{
        background: #d4d1ec;
        border-radius: 0 16px 16px 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .vedio_default_notry{
        background: #f4f3f7;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_notry1{
        background: #fff;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
  }
  .link-right {
    width: 3px;
    height: 10px;
    border-right: solid #B3B0CA 2px;
  }
    //老样式
    .submit_comment{
      padding: 20px;
      .score_span{
        float: left;
        font-size: 18px;
        font-weight: bold;
      }
      .el-rate{
        float: left;
        margin: 3px 0 0 10px;
        .el-rate__icon{
          font-size: 22px;
        }
      }
      .comment_input{
        float: left;
        width: 100%;
        margin: 40px 0 20px;
        display: flex;
        .user_icon{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .el-textarea__inner{
          height: 80px;
        }
      }
      .submit_btn{
        float: left;
        width: 100%;
        text-align: right;
        .el-button{
          border-radius: 0;
        }
      }
    }
    //老样式
    .show_app {
      .show_common {
        display: inline-block;
        width: 43%;
        margin-top: 20px;
        text-align: center;
        .show_btn{
          // width: 25%;
          display: inline-block;
        }
      }
      .show_step{
        display: inline-block;
        width: 57%;
        .top_titile{
          font-size: 18px;
          font-weight: bold;
          color: #282B33;
          margin-bottom: 20px;
          margin-top: 35px;
        }
        .bottom_titile{
          font-size: 14px;
          font-weight: 400;
          color: #A680D7;
          margin-bottom: 20px;
        }
        .footer_title{
          width: 575px;
          .bottom_titile1{
          width: 20%;
          font-size: 18px;
          font-weight: bold;
          color: #282B33;
          }
          .el-upload__tip{
            width: 86%;
            font-size: 14px;
            font-weight: 400;
            color: #8E8E8E;
          }
        }
        .nodePortTable{
          .el-table .cell {
            text-align: center;
          }
        }
        .card_content{
          margin-left: 30px;
          margin-bottom: 20px;
          .line_top{
            background: url('../../assets/images/startTry.png') left top no-repeat;
            .el-timeline-item__node{
              background: none;
            }
            .el-timeline-item__tail{
              top: 12px;
            }
          }
          .line_list{
            .el-timeline-item__node--normal{
              background: url('../../assets/images/inprogressTry.png') left top no-repeat;
            }
          }
          .el-timeline-item__tail{
            border-left: 1px dashed #7093EF;
            left: 9px;
          }
          .el-timeline-item__node--normal{
            width: 20px;
            height: 20px;
          }
        }

      }
    }
    //老样式
    .no_comment{
      color: #bbb;
      text-align: center;
      p{
        margin: 10px 0 30px;
      }
    }
    //老样式
    .show_comment{
      padding: 20px;
      li{
        border-top: 1px solid #ddd;
        margin-left: 80px;
        padding: 20px 0;
        display: flex;
        // align-items: center;
        .user_icon{
          img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .user_info{
          margin: 0 20px 0 10px;
          min-width: 115px;
          .commentTime{
            font-size: 12px;
            color: #aaa;
          }
        }
        .el-rate{
          margin-top: 5px;
        }
      }
    }
    .video-js{
      width: 80%;
      min-height: 300px;
      margin: 0px auto 50px;
    }
  }
  .container_div{
    background: #fff;
    border-radius: 0 16px 16px 16px;
    transition: all 0.1s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .container_div_active{
    background: #d4d1ec;
    border-radius: 0 16px 16px 16px;
  }
}
.app_detail .app_info_div .app_synchronize .addOutStore {
  background: linear-gradient(to right, #4444D0, #6724CB) !important;
}
.app_detail .app_info_div .app_score .batchProButton {
  font-size: 24px;
  background: linear-gradient(to right, #4444D0, #6724CB) !important;
}
.stepApp{
  width: 249px;
  height: 100px;
  background: #FFFFFF;
  box-shadow: 5px 9px 63px 5px rgba(94, 64, 200, 0.06);
  border-radius: 4px;
  overflow: hidden;
  margin-top: -10px;
  .stepIng{
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-shadow: 5px 9px 63px 5px rgba(94, 64, 200, 0.06);
    font-size: 14px;
    font-family: HarmonyHeiTi;
    font-weight: 300;
    color: #5E40C8;
    position: absolute;
    left: 0;
    top: 0;
  }
  .stepNames{
    margin-top: 10px;
    margin-left:20px ;
    font-size: 14px;
    font-family: HarmonyHeiTi;
    font-weight: 200;
    color: #8F859B;
  }

}
.el-carousel__arrow--left {
    position: relative;
    left: 160px;
    top: 16px;
}
.el-carousel__arrow--right {
    position: relative;
    left: 170px;
    top: 16px;
}
.el-carousel__container {
    position: relative;
    height: 100px;
}
.el-carousel__item {
    width: 249;
    height: 60px;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
    position: absolute;
    left: 0;
    top: 46px;
}
.el-carousel--horizontal {
     overflow-x: none !important;
     height: 106px;
}
.el-carousel__arrow {
    height: 20px;
    width: 20px;
    border-radius: 10%;
}
.el-progress-bar__innerText {
    display: inline-block;
    vertical-align: middle;
    color: #5E40C8;
    font-size: 14px;
    margin: 0 5px;
    margin-top: -8px;
}
.el-carousel__indicators {
    display: none;
}
.el-progress-bar__outer {
    position: relative;
    left: 110px;
    top:-20px;
}
.el-progress-bar__inner{
  background: linear-gradient(-37deg, #53DABD, #54AAF3);
}
.el-progress-bar__outer{
  box-shadow: 2px 2px 12px 0px rgba(36, 20, 119, 0.13);
}
.stepDromdown{
  .el-button--primary {
      background: linear-gradient(122deg, #4444D0, #6724CB);
      color: #FFFFFF;
      font-size: 20px;
      font-family: HarmonyHeiTi;
      height: 54px;
      border-radius: 23px;
      font-weight: 300;
      box-shadow: 0px 16px 8px rgba(94, 44, 204 , 0.3);
  }
}
  .el-popper .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color:#4444D0!important;
}
  .el-dropdown-menu__item {
    padding: 0 20px;
    font-size: 14px;
    color: #fff;
    border-bottom:1px solid  #4215C8;
    background: linear-gradient(122deg, #4444D0, #6724CB);
}
.el-dropdown-menu {
     padding: 0px 0px;
     border-radius:5px ;
     .el-dropdown-menu__item:first-child{
       border-top-left-radius: 5px;
       border-top-right-radius: 5px;
     }
     .el-dropdown-menu__item:last-child{
       border-bottom-left-radius: 10px !important;
       border-bottom-right-radius: 10px !important;
     }
}
</style>
