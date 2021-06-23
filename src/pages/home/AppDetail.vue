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
        </p>
      </div>
      <div class="app_score">
        <p class="download_num">
          {{ downloadNum }}{{ this.$t('store.downloadNum') }}
        </p>
        <p class="score_num">
          {{ score }}
        </p>
        <el-rate
          v-model="score"
          disabled
          text-color="#ff9900"
          score-template="{value}"
        />
        <p class="score_btn">
          <el-button
            type="primary"
            class="batchProButton"
            :disabled="ifDownload || currentData.userId===userId ? false : true"
            @click="download(currentData)"
          >
            {{ $t('store.download') }}
          </el-button>
        </p>
      </div>
    </div>
    <div class="app_content">
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          :label="$t('store.introduction')"
          name="introduction"
        >
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
            :box-shadow="false"
            preview-background="#ffffff"
          />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('store.comments')"
          name="comments"
        >
          <div class="submit_comment clearfix">
            <span class="score_span">{{ $t('store.score') }}</span>
            <el-rate
              v-model="comments.score"
              allow-half
              show-score
            />
            <div class="comment_input">
              <img
                :src="userIconUrl"
                alt=""
                class="user_icon"
              >
              <el-input
                type="textarea"
                v-model="comments.message"
                rows="5"
                maxlength="200"
                show-word-limit
                :placeholder="$t('store.commentInfo')"
              />
            </div>
            <p class="submit_btn">
              <el-button
                type="primary"
                @click="submitComment"
              >
                {{ $t('myApp.publish') }}
              </el-button>
            </p>
          </div>
          <div
            class="no_comment"
            v-if="historyComentsList.length===0"
          >
            <img
              :src="noCommentIcon"
              alt=""
            >
            <p>
              {{ $t('store.noComment') }}
            </p>
          </div>
          <div
            class="show_comment"
            v-if="historyComentsList.length!==0"
          >
            <ul>
              <li
                v-for="(item,index) in historyComentsList"
                :key="index"
              >
                <div class="user_icon">
                  <img
                    :src="userIconUrl"
                    alt=""
                    v-if="!item.userIconUrl"
                  >
                  <img
                    :src="item.userIconUrl"
                    alt=""
                    v-if="item.userIconUrl"
                  >
                </div>
                <div class="user_info">
                  <p>{{ item.user.userName }}</p>
                  <p class="commentTime">
                    {{ item.commentTime }}
                  </p>
                </div>
                <div class="comment_content">
                  {{ item.body }}
                  <el-rate
                    v-model="item.score"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                    show-score
                  />
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('store.demo')"
          name="demo"
        >
          <div
            class="no_comment"
            v-show="playerOptions.sources.length===0"
          >
            <img
              :src="videoIconUrl"
              alt=""
            >
            <p>
              {{ $t('store.hasNotVideo') }}
            </p>
          </div>
          <div v-show="playerOptions.sources.length!==0">
            <video-player
              class="video-player-box vjs-big-play-centered demo-tab"
              ref="videoPlayer"
              :options="playerOptions"
              :playsinline="true"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane
          v-if="ifExperience"
          :label="$t('store.showOnline')"
          name="showOnline"
        >
          <div class="show_app clearfix">
            <div
              class="show_common lt"
            >
              <img
                class="status3-pic"
                :src="appTry"
                alt=""
              >
              <p class="show_btn">
                <el-button
                  type="primary"
                  class="batchProButton"
                  style="width:110px;height:35px;"
                  :disabled="btnInstantiate"
                  @click="getNodePort(currentData)"
                >
                  {{ $t('store.showOnline') }}
                </el-button>
                <el-button
                  type="primary"
                  class="batchProButton"
                  style="width:110px;height:35px;margin-left:40px;"
                  :disabled="btnClean"
                  @click="cleanTestEnv(currentData)"
                >
                  {{ $t('store.releaseResource') }}
                </el-button>
              </p>
            </div>

            <div class="show_step lt">
              <p class="top_titile">
                {{ $t('store.experiencePhase') }}
              </p>
              <div
                class="card_content"
              >
                <el-timeline class="timeline-class">
                  <el-timeline>
                    <el-timeline-item
                      placement="top"
                      :type="primary"
                      :autofocus="true"
                      :icon="iconStart"
                      class="line_top"
                    />
                    <el-timeline-item
                      placement="top"
                      :class="{'line_list':btnType==='primary'}"
                    >
                      <el-button
                        :plain="true"
                        :type="btnType"
                        @click="step1"
                        :autofocus="true"
                        style="width:170px;margin-bottom:15px;"
                        :icon="el-icon-check"
                      >
                        {{ $t('store.assignTestNodes') }}
                      </el-button>

                      <p v-show="tip11">
                        {{ $t('store.step11') }}
                      </p>
                      <p v-show="tip12">
                        {{ $t('store.step12') }}
                      </p>
                      <p v-show="tip13">
                        {{ $t('store.step13') }}
                      </p>
                    </el-timeline-item>
                    <el-timeline-item
                      placement="top"
                      :class="{'line_list':btnType1==='primary'}"
                    >
                      <el-button
                        :plain="true"
                        :type="btnType2"
                        @click="step2"
                        :autofocus="true"
                        style="width:170px;margin-bottom:15px;"
                      >
                        {{ $t('store.instantiateApplication') }}
                      </el-button>

                      <p v-show="tip21">
                        {{ $t('store.pleaseInstantiateApp') }}
                      </p>
                      <p v-show="tip22">
                        {{ $t('store.waitInstantiatedApp') }}
                      </p>
                      <p v-show="tip23">
                        {{ $t('store.StartDeployApp') }}
                      </p>
                    </el-timeline-item>
                    <el-timeline-item
                      placement="top"
                      :class="{'line_list':btnType2==='primary'}"
                    >
                      <el-button
                        :plain="true"
                        :type="btnType2"
                        @click="step3"
                        style="width:170px;margin-bottom:15px;"
                      >
                        {{ $t('store.getDeploymentStatus') }}
                      </el-button>
                      <p v-show="tip31">
                        {{ $t('store.queryDeployStatus') }}
                      </p>
                      <p v-show="tip32">
                        {{ $t('store.waitQueryStatus') }}
                      </p>
                      <p v-show="tip33">
                        {{ $t('store.deployFinished') }}
                      </p>
                    </el-timeline-item>
                    <el-timeline-item
                      :icon="iconStart"
                      placement="top"
                      class="line_top"
                    />
                  </el-timeline>
                </el-timeline>
              </div>
              <p class="bottom_titile">
                {{ $t('store.tryAppDes') }}
              </p>
              <div class="footer_title">
                <p class="bottom_titile1">
                  {{ $t('store.serviceNodeInfo') }}
                </p>
                <div
                  class="el-upload__tip"
                  slot="tip"
                >
                  <em class="el-icon-warning" />
                  {{ $t('store.releaseAppResource') }}
                </div>
              </div>
              <div class="experienceData">
                <el-table
                  v-loading="dataLoading"
                  :data="experienceData"
                  header-cell-class-name="headerStyle"
                >
                  <el-table-column
                    prop="serviceName"
                    :label="$t('store.serviceName')"
                    width="235"
                  />
                  <el-table-column
                    prop="mecHost"
                    :label="$t('store.Ip')"
                    width="235"
                  />
                  <el-table-column
                    prop="nodePort"
                    :label="$t('store.port')"
                    width="235"
                  />
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
import {
  getCommentsApi,
  getAppDetailTableApi,
  submitAppCommentApi,
  downloadAppPakageApi,
  URL_PREFIX,
  getAppListApi,
  myApp
} from '../../tools/api.js'
import { INDUSTRY, TYPES } from '../../tools/constant.js'
import appTry from '@/assets/images/apptry.png'
import startTry from '@/assets/images/startTry.png'
export default {
  name: '',
  data () {
    return {
      ifExperience: true,
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
      currentData: {},
      activeName: 'introduction',
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
      btnType: 'info',
      btnType1: 'info',
      btnType2: 'info',
      tip11: true,
      tip12: false,
      tip13: false,

      tip21: true,
      tip22: false,
      tip23: false,

      tip31: true,
      tip32: false,
      tip33: false,
      iconStart: 'el-icon-more',
      icon1: 'el-icon-more',
      icon2: 'el-icon-more',
      icon3: 'el-icon-more'
    }
  },
  watch: {
    tableData: function (val) {
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
        this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
        this.source = this.currentData.details
        this.checkProjectData()
      }
      return ''
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.checkProjectData()
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('fromPath', from.path)
    next(true)
  },
  methods: {
    submitComment () {
      if (this.comments.score && this.comments.message) {
        let params = {
          score: this.comments.score,
          body: this.comments.message
        }
        params = JSON.stringify(params)
        let userId = sessionStorage.getItem('userId')
        let userName = sessionStorage.getItem('userName')
        submitAppCommentApi(this.appId, params, userId, userName).then(res => {
          this.getComments()
          this.comments.score = 0
          this.comments.message = ''
          this.getAppData()
        }).catch(error => {
          if (error.response.data.code === 403) {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.guestUser'),
              type: 'warning'
            })
          } else if (error.response.data.message.indexOf('can not comment own app') !== -1) {
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.cannotComment')
            })
          } else {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.subCommentFail'),
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.subCommentFailReason')
        })
      }
    },
    getComments () {
      getCommentsApi(this.appId, this.limit, this.offset).then(res => {
        this.historyComentsList = res.data.results
        this.handleDate()
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
      })
    },
    getTableData () {
      let userId = null
      if (this.pathSource === 'myapp') {
        userId = sessionStorage.getItem('userId')
      }
      getAppDetailTableApi(this.appId, userId, this.limit, this.offset).then(res => {
        let data = res.data
        this.handleTableTada(data)
        if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
          this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
          this.source = this.currentData.details
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
            src: URL_PREFIX + 'apps/' + this.appId + '/demoVideo'
          }
          this.playerOptions.sources.push(val)
        }
      })
    },
    updateData () {
      this.source = this.currentData.details
    },
    handleDate () {
      this.historyComentsList.sort(function (a, b) {
        return b.commentTime < a.commentTime ? -1 : 1
      })
      let year = new Date().getFullYear()
      this.historyComentsList.forEach(item => {
        if (item.commentTime.indexOf(year) !== -1) {
          item.commentTime = item.commentTime.replace((year + '-'), '')
        }
      })
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
    checkProjectData () {
      INDUSTRY.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.industry === itemFe.label[1]) {
            this.currentData.industry = itemFe.label[0]
          }
        } else {
          if (this.currentData.industry === itemFe.label[0]) {
            this.currentData.industry = itemFe.label[1]
          }
        }
      })
      TYPES.forEach(itemFe => {
        if (this.language === 'cn') {
          if (this.currentData.type === itemFe.label[1]) {
            this.currentData.type = itemFe.label[0]
          }
        } else {
          if (this.currentData.type === itemFe.label[0]) {
            this.currentData.type = itemFe.label[1]
          }
        }
      })
    },
    getAppData () {
      getAppListApi(this.appId).then(
        (res) => {
          this.score = res.data.score
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
        let newDateBegin = this.dateChange(data.createTime)
        data.createTime = newDateBegin
        this.handleTableTada(data)
        this.tableData.push(data)
        let experienceAble = data.experienceAble
        if (experienceAble) {
          this.ifExperience = true
        }
        if (data) {
          this.source = data.details
        }
      })
    },
    step () {
      // sleep 3 s
      this.tip11 = false
      this.tip12 = true
      setTimeout(() => this.step1(), 3000)
    },
    step1 () {
      this.btnType = 'primary'
      this.tip12 = false
      this.tip13 = true
      this.tip21 = false
      this.tip22 = true
      setTimeout(() => this.step2(), 3000)
    },
    step2 () {
      this.btnType1 = 'primary'
      this.tip22 = false
      this.tip23 = true
      this.tip31 = false
      this.tip32 = true
      setTimeout(() => this.step3(), 3000)
    },
    step3 () {
      setTimeout(3000)
      this.btnType2 = 'primary'
      this.tip32 = false
      this.tip33 = true
    },
    stepClean () {
      this.tip33 = false
      this.tip31 = true
      this.tip23 = false
      this.tip21 = true
      this.tip13 = false
      this.tip11 = true
    },
    getNodePort () {
      this.step()
      myApp.getNodePort(this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          // this.nodePort = res.data
          let experienceInfo = res.data.data
          if (experienceInfo) {
            let tmpExperienceData = experienceInfo.split(':')
            console.log(tmpExperienceData)
            this.experienceData[0].serviceName = tmpExperienceData[0]
            this.experienceData[0].nodePort = tmpExperienceData[1]
            this.experienceData[0].mecHost = tmpExperienceData[2]
          }
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getNodePortFail')
          })
        }
      )
      this.btnInstantiate = true
      this.btnClean = false
    },
    cleanTestEnv () {
      this.btnClean = true
      this.btnInstantiate = false
      this.stepClean()
      myApp.cleanTestEnv(this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          this.score = res.data.score
          this.nodePort = res.data.getNodePort
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.cleanTestEnvFail')
          })
        }
      )
    },
    initStatus () {
      myApp.getNodeStatus(this.packageId, this.userId, this.name, this.ip).then(
        (res) => {
          // this.nodePort = res.data.data
          let experienceInfo = res.data.data
          if (experienceInfo) {
            let tmpExperienceData = experienceInfo.split(':')
            console.log(tmpExperienceData)
            this.experienceData[0].serviceName = tmpExperienceData[0]
            this.experienceData[0].nodePort = tmpExperienceData[1]
            this.experienceData[0].mecHost = tmpExperienceData[2]
            this.btnInstantiate = true
            this.btnClean = false
          } else {
            this.btnInstantiate = false
            this.btnClean = true
          }
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getNodePortFail')
          })
        }
      )
    }
  },
  mounted () {
    this.initStatus()
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
    this.getComments()
    this.appIconPath = URL_PREFIX + 'apps/' + this.appId + '/icon'
    this.checkProjectData()
  }
}
</script>

<style lang="less">
.app_detail{
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
    padding: 18px 30px;
    width: 350px;
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
      width: 400px;
      margin:0 0 30px 20px;
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
      width: calc(100% - 310px);
      padding: 0 20px;
      word-wrap: break-word;
      .app_title{
        font-size: 26px;
        font-weight: bold;
        .createTime{
          font-size: 14px;
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
          background: #000;
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
          font-size: 14px;
          font-weight: bold;
          border-radius: 5px 0 0 5px;
          padding: 5px 20px 5px 10px;
          margin-right: 20px;
        }
        .industry{
          background: url('../../assets/images/app_detail_industry_bg.png') center right no-repeat #1ececa;
          background-size: contain;
        }
        .architecture{
          background: url('../../assets/images/app_detail_architecture_bg.png') center right no-repeat #fcb722;
          background-size: contain;
        }
        .type{
          background: url('../../assets/images/app_detail_type_bg.png') center right no-repeat #a680d7;
          background-size: contain;
        }
      }
    }

    .app_score{
      width: 180px;
      .download_num{
        float: left;
        height: 26px;
        line-height: 26px;
        text-align: center;
        margin-bottom: 5px;
      }

      .score_num{
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
      .score_btn{
        float: left;
        width: 100%;
        margin-top: 15px;
        text-align: center;
        .el-button{
          width: 130px;
          border-radius: 0;
        }
      }
    }
  }
  .app_content{
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
      .el-tabs__item{
        font-size: 16px;
      }
    }
    .el-tabs__nav-wrap::after{
      height: 0;
    }
    .el-tabs__content{
      padding: 0 50px;
    }
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
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #282B33;
          margin-bottom: 20px;
          margin-top: 35px;
        }
        .bottom_titile{
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #A680D7;
          margin-bottom: 20px;
        }
        .footer_title{
          width: 575px;
          .bottom_titile1{
          width: 20%;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #282B33;
          }
          .el-upload__tip{
            width: 86%;
            font-size: 14px;
            font-family: Microsoft YaHei;
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
          }
          .el-timeline-item__node--normal{
            width: 20px;
            height: 20px;
          }
          .el-timeline-item__tail{
            left: 9px;
          }
        }

      }
    }
    .no_comment{
      color: #bbb;
      text-align: center;
      p{
        margin: 10px 0 30px;
      }
    }
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
      margin: 30px auto 50px;
    }
  }
}
</style>
