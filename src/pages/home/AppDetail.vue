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
      <div
        class="app_score"
        style="position:relative;top:25px;margin-left:0;"
        v-if="role==='tenant'||role==='admin'"
      >
        <p
          class="download_num"
          style="color:#ff5c02;"
        >
          1.99元（RMB）/小时
        </p>
        <p class="score_btn">
          <el-button
            type="primary"
            class="batchProButton"
            @click="beforeBuyIt()"
          >
            订购
          </el-button>
        </p>
      </div>
      <!-- <div class="app_synchronize">
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
      </div> -->
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
      <div>
        <ul class="list_top clear">
          <li
            @click="activeName='appDetail'"
            :class="{'appDetail_active':activeName==='appDetail','appDetail_default':activeName==='comment','appDetail_default2':activeName==='comment',
                     'appDetail_default3':activeName==='vedio' || activeName==='appShow' || activeName==='meao',
                     'appDetail_default2_meao_no_Appshow':ifExperience===false && activeName==='meao'}"
          >
            <span>
              {{ $t('store.introduction') }}
            </span>
          </li>
          <div
            v-if="activeName !=='appDetail' && activeName !== 'comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            @click="activeName='comment'"
            :class="{'comment_active':activeName==='comment','comment_default':activeName==='appDetail',
                     'comment_default2_appShow_meao':ifSynchronize === true && ifExperience===true && activeName==='appShow',
                     'comment_default2':ifExperience === false && activeName==='meao', 'comment_default_appShow_nomeao':ifSynchronize === false && activeName==='appShow',
                     'comment_default_no_appShow_meao':ifSynchronize === false && ifExperience===false && activeName==='vedio',
                     'comment_default_meao_noAppShow':ifExperience === false && activeName==='meao',
                     'comment_default_vedio_noappShow':ifExperience === false && ifSynchronize === true && activeName ==='vedio'}"
          >
            <span>
              {{ $t('store.comments') }}
            </span>
          </li>

          <div
            v-if="activeName!=='appShow'&& ifSynchronize===false && ifExperience===true && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <!-- <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div> -->
          <div
            v-if="activeName!=='appShow'&& ifExperience === true && ifSynchronize===true && activeName !=='comment'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            v-if="ifExperience"
            @click="activeName='appShow'"
            :class="{'appShow_active':activeName==='appShow','appShow_no_active':activeName !=='appShow','appShow_default_meao':activeName ==='meao',
                     'appShow_default':activeName==='comment','appShow_default3':activeName==='meao','appShow_default3':ifSynchronize===false && activeName==='vedio',
                     'appShow_default_vedio':ifSynchronize===true && activeName==='vedio'}"
          >
            <span>
              {{ $t('store.showOnline') }}
            </span>
          </li>
          <!-- <div
            v-if="activeName!=='meao' && ifSynchronize===false && ifExperience===true && activeName !=='appShow'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div> -->
          <div
            v-if="activeName!=='meao'&& ifExperience === true && ifSynchronize===true && activeName !=='appShow'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='comment' && activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <li
            v-if="ifSynchronize"
            @click="activeName='meao'"
            :class="{'meao_active':activeName==='meao','meao_default':activeName ==='appShow','meao_default_comment_noappShow':ifExperience === false && activeName ==='comment',
                     'meao_default_vedio_noappShow':ifExperience === false && activeName ==='vedio',
                     'meao_default_vedio_appShow':ifExperience === true && activeName ==='vedio',
                     'meao_default_comment':activeName ==='comment'}"
          >
            <span>
              {{ $t('store.synchronizeToMeao') }}
            </span>
          </li>
          <div
            v-if="ifSynchronize===false && ifExperience === true && activeName !== 'appShow' && activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===false && ifExperience === false && activeName ==='appDetail'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience === true && activeName !=='vedio' && activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='vedio'&& activeName !=='meao'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>

          <li
            @click="activeName='vedio'"
            :class="{'vedio_active':activeName==='vedio','vedio_default_appshow':activeName ==='appShow','vedio_default':activeName !=='vedio',
                     'vedio_default2_appShow_meao': ifExperience===true && ifSynchronize == true &&activeName==='meao',
                     'vedio_default2':ifSynchronize===false && activeName==='appShow',
                     'vedio_default2_no_AppshowMeao':ifSynchronize===false && ifExperience===false && activeName==='comment',
                     'vedio_default2_meao_no_Appshow':ifExperience===false && activeName==='meao',
                     'vedio_default2_comment_no_Appshow':ifExperience===false && ifSynchronize ===true && activeName==='comment'}"
          >
            <span>
              {{ $t('store.demo') }}
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
        <appShowOnline
          v-show="activeName==='appShow'"
          :package-id="this.packageId"
          :app-id="this.appId"
          :if-experience="this.ifExperience"
          ref="appShowOnline"
        />
        <synchronizeMeao
          v-show="activeName==='meao'"
          :package-id="this.packageId"
          :current-data="this.currentData"
          ref="synchronizeMeao"
        />
        <appVideo
          v-show="activeName==='vedio'"
          :player-options="this.playerOptions"
          ref="appVideo"
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
    <!-- 订购弹框 -->
    <el-dialog
      width="30%"
      :visible.sync="showSubDialog"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        订购确认
      </div>
      <div class="buy_content">
        <el-form>
          <el-form-item
            label="应用名称："
          >
            <span class="val_span">{{ currentData.name }}</span>
          </el-form-item>
          <el-form-item
            label="订购价格:"
          >
            <span class="val_span">1.99元（RMB）/小时</span>
          </el-form-item>
          <el-form-item
            label="部署区域:"
          >
            <el-select
              v-model="mechostIp"
              :placeholder="$t('common.choose')"
              style="width: 260px;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="showSubDialog = false"
          class="bgBtn"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          @click="confirmToBuy"
          class="bgBtn"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appIntroduction from './AppIntroduction.vue'
import appComments from './AppComments.vue'
import appVideo from './AppVideo.vue'
import appShowOnline from './AppShowOnline.vue'
import synchronizeMeao from './SynchronizeMeao.vue'
import {
  getAppDetailTableApi,
  downloadAppPakageApi,
  URL_PREFIX,
  URL_PREFIXV2,
  getAppListApi,
  myApp,
  subscribe
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
    appShowOnline,
    synchronizeMeao
  },
  data () {
    return {
      noAppShowPage: false,
      appShowPage: true,
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
      comments: {
        score: 0,
        message: ''
      },

      historyComentsList: [],
      source: 'this is test',
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
      showlun: false,
      showSubDialog: false,
      options: [],
      mechostIp: '',
      role: sessionStorage.getItem('userNameRole')
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
    beforeBuyIt () {
      subscribe.getMechosts().then(res => {
        res.data.data.forEach(item => {
          let obj = {}
          obj.value = item.mechostIp
          obj.label = item.mechostCity
          this.options.push(obj)
        })
        this.showSubDialog = true
      }).then(error => {
        console.log(error)
        this.$message.warning('没有可供使用的边缘节点！')
      })
    },
    formatter (thistime, fmt) {
      let $this = new Date(thistime)
      let o = {
        'M+': $this.getMonth() + 1,
        'd+': $this.getDate(),
        'h+': $this.getHours(),
        'm+': $this.getMinutes(),
        's+': $this.getSeconds(),
        'q+': Math.floor(($this.getMonth() + 3) / 3),
        'S': $this.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ($this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    confirmToBuy () {
      let param = {
        'appId': this.appId,
        'mecHostIp': this.mechostIp,
        'appPackageId': this.packageId
      }
      subscribe.createOrder(param).then(res => {
        this.showSubDialog = false
        this.$router.push('/orders')
      })
    },
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
            this.packageId = item.packageId
          }
        })
        this.handleTableTada(data)
        if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
          this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
          this.source = this.currentData.details
          this.ifExperience = this.currentData.experienceAble
          if (sessionStorage.getItem('userNameRole') === 'tenant' && this.userId !== this.currentData.userId) {
            this.ifSynchronize = false
          }
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
    console.log(this.currentData.userId)
    console.log(this.packageId)
    if ((sessionStorage.getItem('userNameRole') === 'guest')) {
      this.ifSynchronize = false
    } else {
      this.ifSynchronize = true
    }
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
  }
 .el-dialog__header{
   border-bottom: 2px solid #e0e0e0;
   background: transparent !important;
 }
  .down_radio{
    padding: 18px 25px;
    width: 400px;
    text-align: left;
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
    text-align: right;
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
    padding: 20px 0 20px 70px;
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
      text-align: center;
      float: right;
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
        width: 120px;
        margin-top: 10px;
        text-align: center;
        height: 40px !important;
        width: 120px !important;
        font-size:20px !important;
        border-radius: 25px !important;
         color: #FFFFFF;
        font-family: HarmonyHeiTi;
        font-weight: 300;
        // box-shadow: 0px 16px 8px rgba(94, 44, 204, 0.3);
        .el-button--primary{
          font-size: 20px;
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
      height: 135px;
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
    .horizontal-cell{
        padding: 12px 0;
        float: left;
        width: 2px;
        height: 50px;
        // background: #d4d1ec;
        background-color: #d4d1ec;
    }
    .separator{
        position: relative;
        height: 100%;
    }
    .separator:after{
      position: absolute;
      top:10px;
      height: calc(100% - 2px);
      // height: 60%;
      left:0;
      content: '';
      width:0;
      // border-left: solid  darkblue 1px;
    }
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
          padding: 0 26px;
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
      .appDetail_default2_meao_no_Appshow{
        background: #fff;
        border-radius: 16px 0 0 0;
        span{
          background: #d4d1ec;
          border-radius: 16px 0 0 0;
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
      .comment_default2_appShow_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_nomeao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_meao_noAppShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .comment_default_no_appShow_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
        }
      }
      .comment_default_vedio_noappShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
        }
      }
      .appShow_default_vedio{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
        }
      }
      .comment_default_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
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
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #fff;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .appShow_no_active{
         background: #f4f3f7;
         border-radius: 0 0 0 0;
        // border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .appShow_default{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_default_meao{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
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
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_active{
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
      .meao_default{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment_noappShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
        }

      }
      .meao_default_vedio_noappShow{
        background: #f4f3f7;
        border-radius: 0 0 0 16px;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_no_active{
         background: #f4f3f7;
         border-radius: 0 0 0 0;
        // border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }

      }
      .meao_default2{
        background: #f3f1f7;
        border-radius: 0 0 0 16px;

        span{
          border-radius: 0 16px 0 0;
        }
      }
      .meao_default3{
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
        border-radius: 0 16px 0 0;
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
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }

      }
      .vedio_default2{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_appShow_meao{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_no_AppshowMeao{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_meao_no_Appshow{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_comment_no_Appshow{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
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
.el-progress-bar__innerText {
    display: inline-block;
    vertical-align: middle;
    color: #5E40C8;
    font-size: 14px;
    margin: 0 5px;
    margin-top: -8px;
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
// 订购
.buy_content{
  margin-top: 25px;
  .val_span{
    line-height: 33px;
  }
}
.popper__arrow{
  display: none!important;
}
</style>
