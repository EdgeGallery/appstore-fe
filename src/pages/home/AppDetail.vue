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
    <div class="common_title">
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
        <div class="div_title">
          <el-tooltip
            class="item"
            effect="light"
            :content="currentData.name"
            placement="right-start"
          >
            <p
              class="app_title"
            >
              {{ currentData.name }}
            </p>
          </el-tooltip>

          <el-rate
            v-model="score"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          />
        </div>
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
          {{ downloadNum }}{{ this.$t('store.downloadNum') }}
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
      <div class="app_score">
        <p class="score_btn">
          <el-button
            type="primary"
            class="batchProButton"
            @click="download(currentData)"
          >
            {{ $t('store.download') }}{{ currentData.size }} {{ ')' }}
          </el-button>
        </p>
        <p
          class="score_btn"
          v-show="ifSubscribe"
        >
          <el-button
            type="primary"
            class="subscribeButton"
            @click="beforeBuyIt()"
          >
            {{ $t('order.subscribe') }}{{ this.price }}{{ $t('order.price') }}
          </el-button>
        </p>
      </div>
    </div>

    <div
      class="app_content"
    >
      <div>
        <ul class="list_top clear">
          <li
            @click="activeName='appDetail'"
            :class="{'appDetail_active':activeName==='appDetail','appDetail_comment':activeName==='comment',
                     'appDetail_vedio':activeName==='vedio' || activeName==='appShow' || activeName==='meao',
                     'appDetail_comment_meao_no_appShow':ifExperience===false && activeName==='meao'}"
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
                     'comment_default_appShow_meao':ifSynchronize === true && ifExperience===true && activeName==='appShow',
                     'comment_default_appShow_nomeao':ifSynchronize === false && activeName==='appShow',
                     'comment_default_no_appShow_meao':ifSynchronize === false && ifExperience===false && activeName==='vedio',
                     'comment_default_meao_noAppShow':ifExperience === false && activeName==='meao',
                     'comment_default_vedio_noAppShow':ifExperience === false && ifSynchronize === true && activeName ==='vedio'}"
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
          <div
            v-if="activeName!=='appShow'&& ifSynchronize===false && ifExperience===false && activeName ==='appDetail'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
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
            :class="{'appShow_active':activeName==='appShow',
                     'appShow_no_active':activeName !=='appShow',
                     'appShow_default_meao':activeName ==='vedio',
                     'appShow_default':activeName==='comment',
                     'appShow_default3':activeName==='meao',
                     'appShow_default3':ifSynchronize===false && activeName==='vedio',
                     'appShow_default_vedio':ifSynchronize===true && activeName==='vedio'}"
          >
            <span>
              {{ $t('store.showOnline') }}
            </span>
          </li>
          <div
            v-if="activeName!=='meao'&& ifExperience === true && ifSynchronize===true && activeName !=='appShow'&& activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='meao'&& ifExperience === true && ifSynchronize===true && activeName !=='appShow'&& activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='appDetail'&& ifExperience === true && ifSynchronize===false"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="activeName ==='comment'&& ifExperience === true && ifSynchronize===false"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <div
            v-if="ifSynchronize===true && ifExperience===false && activeName !=='comment' && activeName !=='vedio'"
            class="horizontal-cell"
          >
            <link-right
              class="link-right"
            />
          </div>
          <li
            @click="activeName='vedio'"
            :class="{'vedio_active': ifSynchronize == true &&activeName==='vedio',
                     'vedio_active_no_Meao': ifSynchronize == false && activeName==='vedio',
                     'vedio_default_appshow':ifSynchronize===false && ifExperience===true && activeName ==='appShow',
                     'vedio_default_appshow_meao':ifSynchronize===true && ifExperience===true && activeName ==='appShow',
                     'vedio_default':activeName ==='meao',
                     'vedio_default':ifExperience===true && ifSynchronize == true && activeName ==='appDetail',
                     'vedio_default_noMeao': ifExperience===true && ifSynchronize == false &&activeName ==='appDetail',
                     'vedio_default_no_AppshowMeao':ifSynchronize===false && ifExperience===false && activeName==='appDetail',
                     'vedio_default2_appShow_meao': ifExperience===true && ifSynchronize == true &&activeName==='meao',
                     'vedio_default2_no_AppshowMeao':ifSynchronize===false && ifExperience===false && activeName==='comment',
                     'vedio_default2_comment_no_Meao':ifSynchronize===false && ifExperience===true && activeName==='comment',
                     'vedio_default2_meao_no_Appshow':ifExperience===false && activeName==='meao',
                     'vedio_default2_comment_no_Appshow':ifExperience===false && ifSynchronize ===true && activeName==='comment'}"
          >
            <span>
              {{ $t('store.demo') }}
            </span>
          </li>
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
            v-if="ifSynchronize"
            @click="activeName='meao'"
            :class="{'meao_active':activeName==='meao','meao_default':activeName ==='appShow',
                     'meao_default_comment_noappShow':ifExperience === false && activeName ==='comment',
                     'meao_default_vedio_appShow':activeName ==='vedio',
                     'meao_default_vedio_appDetail':activeName ==='appDetail',
                     'meao_default_comment':activeName ==='comment'}"
          >
            <span>
              {{ $t('store.synchronizeToMeao') }}
            </span>
          </li>
          <li
            class="last_li"
            :class="{'appShow_active':ifSynchronize == true && activeName==='meao',
                     'last_default':ifSynchronize == true && activeName!=='meao',
                     'last_default2':ifSynchronize == true && activeName==='meao',
                     'appShow_active':ifSynchronize == false && activeName==='vedio',
                     'last_default_vedio':ifSynchronize == false && activeName!=='vedio',
                     'last_default2_vedio':ifSynchronize == false && activeName==='vedio'}"
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
          v-if="activeName==='appDetail'"
          :source="this.source"
          ref="appIntroduction"
        />
        <appComments
          v-if="activeName==='comment'"
          :app-id="this.appId"
          :current-data="this.currentData"
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
          v-if="activeName==='meao'"
          :package-id="this.packageId"
          :current-data="this.currentData"
          ref="synchronizeMeao"
        />
        <appVideo
          v-if="activeName==='vedio'"
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
        {{ $t('myApp.subscribe') }}
      </div>
      <div class="buy_content">
        <el-form>
          <el-form-item
            :label="$t('order.appNameLabel')"
          >
            <p class="val_span">
              {{ currentData.name }}
            </p>
          </el-form-item>
          <el-form-item
            :label="$t('order.subPrice')"
          >
            <p class="val_span">
              {{ price }}{{ $t('myApp.price') }}
            </p>
          </el-form-item>
          <el-form-item
            :label="$t('system.address')"
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
          @click="showSubDialog = false,btnLoading = false"
          class="bgBtn"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          @click="confirmToBuy"
          class="bgBtn"
          :loading="btnLoading"
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
  downloadAppPackageApi,
  URL_PREFIX,
  getAppListApi,
  myApp,
  subscribe
} from '../../tools/api.js'
import { INDUSTRY, TYPES, MEAO } from '../../tools/constant.js'
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
      MEAO: MEAO,
      activeName: 'appDetail',
      ifSubscribe: true,
      ifExperience: false,
      ifSynchronize: false,
      canDownload: false,
      userId: sessionStorage.getItem('userId'),
      details: '',
      appId: '',
      tableData: [],
      isDownloadImage: false,
      isShowDownload: false,
      currentData: {},
      comments: {
        score: 0,
        message: ''
      },
      source: 'this is test',
      appIconPath: '',
      playerOptions: {
        muted: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        language: 'en',
        aspectRatio: '16:9',
        sources: []
      },
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
      mechostCity: '',
      role: sessionStorage.getItem('userNameRole'),
      price: 0,
      btnLoading: false,
      score: ''
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
      this.language = localStorage.getItem('language')
      this.checkProjectData()
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('fromPath', from.path)
    next(true)
  },
  methods: {
    beforeBuyIt () {
      if (sessionStorage.getItem('userNameRole') === 'tenant' || sessionStorage.getItem('userNameRole') === 'admin') {
        this.showSubDialog = true
        subscribe.getMechosts(this.appId, this.packageId).then(res => {
          this.options = []
          if (res.data && res.data.data.length > 0) {
            res.data.data.forEach(item => {
              let obj = {}
              obj.value = item.mechostIp
              obj.label = item.mechostCity
              this.options.push(obj)
            })
          } else {
            this.$message.warning(this.$t('order.noNodes'))
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.$message.warning(this.$t('system.guestPrompt'))
      }
    },
    confirmToBuy () {
      for (let item of this.options) {
        if (this.mechostIp === item.value) {
          this.mechostCity = item.label
        }
      }
      let param = {
        'appId': this.appId,
        'mecHostIp': this.mechostIp,
        'appPackageId': this.packageId,
        'appName': this.currentData.name,
        'mecHostCity': this.mechostCity
      }
      if (this.mechostIp !== '') {
        this.btnLoading = true
        subscribe.createOrder(param).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('order.subSuccess'),
            type: 'success'
          })
          this.$router.push('/orders')
        }).catch((error) => {
          let defaultMsg = this.$t('order.subFail')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
          this.showSubDialog = false
        })
      } else {
        this.$message.warning(this.$t('order.chooseArea'))
      }
    },
    getTableData () {
      let userId = null
      if (this.pathSource === 'myapp') {
        userId = sessionStorage.getItem('userId')
      }
      getAppDetailTableApi(this.appId, userId, this.limit, this.offset).then(res => {
        let data = res.data
        console.log(data)
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
          this.appIconPath = URL_PREFIX + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
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
            src: URL_PREFIX + 'apps/' + this.appId + '/demoVideo'
          }
          this.playerOptions.sources.push(val)
        }
      })
    },
    updateData () {
      this.ifExperience = this.currentData.experienceAble
      this.source = this.currentData.details
      this.appIconPath = URL_PREFIX + 'apps/' + this.currentData.appId + '/packages/' + this.currentData.packageId + '/icon'
      this.checkProjectData()
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
      downloadAppPackageApi(this.appId, row, this.isDownloadImage)
      this.isShowDownload = false
      this.isDownloadImage = false
    },
    downloadImage (currentData, row) {
      if (this.currentData.deployMode === 'vm') {
        this.isShowDownload = true
      } else {
        this.isDownloadImage = false
        downloadAppPackageApi(this.appId, row, this.isDownloadImage)
      }
    },
    download (row) {
      if (sessionStorage.getItem('userId') === this.currentData.userId || sessionStorage.getItem('userNameRole') === 'admin') {
        this.downloadImage(this.currentData, row)
        this.getAppData()
      } else {
        this.$message.warning(this.$t('system.downloadPrompt'))
      }
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
          this.downloadNum = res.data.downloadCount
          if (!res.data.free) {
            this.price = res.data.price
          }
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
        let size = (Number(data.size) / 1024).toFixed(2)
        if (size >= 1024) {
          data.size = (size / 1024).toFixed(2) + ' MB'
        } else {
          data.size = size + ' KB'
        }
        this.tableData.push(data)
        if (data) {
          this.source = data.details
        }
      })
    },
    getAppDetailApi () {
      myApp.getAppDetailApi(this.appId).then(res => {
        let data = res.data.data
        this.score = data.score
        this.downloadNum = data.downloadCount
      })
    }
  },
  mounted () {
    this.language = localStorage.getItem('language')
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('appstordetail'))
    this.details = params
    this.price = this.details.price
    this.appId = this.details.appId
    this.packageId = this.details.packageId
    this.ifExperience = this.details.experienceAble
    if (this.details.score) {
      this.score = this.details.score
      this.downloadNum = this.details.downloadCount
    }
    if (this.details.packageId) {
      this.packageId = this.details.packageId
      if (this.pathSource === 'myapp') {
        this.ifSubscribe = false
        this.source = this.details.details
        this.getMyAppData()
      }
    }
    this.appIconPath = URL_PREFIX + 'apps/' + this.appId + '/packages/' + this.packageId + '/icon'
    this.getTableData()
    this.checkProjectData()
    this.getAppDetailApi()
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
  color: #fff;
  .title_top{
    padding: 60px 0 20px !important;
    position: relative;
    font-size: 26px;
    font-family: HarmonyOS Sans SC, sans-serif;
    font-weight: bold;
    color: #5D3DA0;
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
  .app_info_div{
    border-radius: 16px;
    background: #2E147C;
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
      min-width: 450px;
      .div_title{
        display: flex;
        .app_title{
          font-size: 36px;
          color: #fff;
          font-weight: bold;
          width: 193px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .el-rate{
          text-align: left;
          line-height: 86px;
          .el-rate__icon{
            font-size: 22px;
            margin: 0 0 0 6px;
          }
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
          width: 2px;
          height: 15px;
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
          padding: 4px 10px;
          background:#4E3494;
          margin-right: 10px;
          border-radius: 4px;
        }
        .industry{
          background-size: contain;
          color: #FFB800;
        }
        .architecture{
          background-size: contain;
          color: #16E9EF;
        }
        .type{
          background-size: contain;
          color: #9374FF;
        }
        .deployMode{
          background-size: contain;
          color: #FF7C50;
        }
      }
    }
    .app_score{
      width: 31%;
      text-align: right;
      float: right;
      .score_btn{
        width: 100%;
        margin-bottom: 0;
        font-size: 14px;
        float: right;
        .batchProButton{
          padding: 0px;
          margin-top: 10px;
          text-align: center;
          height: 40px !important;
          width: 183px !important;
          border-radius: 25px !important;
          color: #0F0D87;
          font-size: 18px;
          background:#fff;
          .el-button--primary{
            font-size: 20px;
            background-color: #fff;
            border: none;
            color: #FFFFFF;
          }
        }
        .batchProButton:hover{
          color: #fff;
          font-size: 18px;
          background:#0F0D87;
        }
        .subscribeButton:hover{
          color: #fff;
          font-size: 18px;
          background:#0F0D87;
        }
        .subscribeButton{
          padding: 0px;
          margin-top: 20px;
          text-align: center;
          height: 40px !important;
          width: 183px !important;
          border-radius: 25px !important;
          color: #0F0D87;
          font-size: 18px;
          background: #fff;
      }
      }
    }
  }
  .app_content{
    border-radius: 0 16px 16px 16px;
    background: #fff;
    margin-top: 38px;
    .horizontal-cell{
        padding: 12px 0;
        float: left;
        width: 2px;
        height: 50px;
        background-color: #4E3494;
    }
    .separator{
        position: relative;
        height: 100%;
    }
    .separator:after{
      position: absolute;
      top:10px;
      height: calc(100% - 2px);
      left:0;
      content: '';
      width:0;
    }
    .list_top{
      background-color: #3e279b;
      margin-top: 58px;
      li{
        float: left;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        background: #2E147C;
        span{
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 26px;
          font-size: 16px;
          color: #fff;
          transition: all 0.1s;
          background: #4E3494;
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
        background: #4E3494;
        border-radius: 16px 0 0 0;
        transition: all 0.1s;
        span{
          background: #2E147C;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .appDetail_comment{
        background: #2E147C;
        border-radius: 16px 0 0 0;
        span{
          background: #4E3494;
          border-radius: 16px 0 16px 0;
          transition: all 0.1s;
        }
      }
      .appDetail_comment_meao_no_appShow{
        background: #fff;
        border-radius: 16px 0 0 0;
        span{
          background: #d4d1ec;
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
        }
      }
      .appDetail_vedio{
        background: #d4d1ec;
        border-radius: 16px 0 0 0;
        span{
          border-radius: 16px 0 0 0;
          transition: all 0.1s;
        }
      }
      .comment_active{
        background: #4E3494;
        transition: all 0.1s;
        span{
          background: #2E147C;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .comment_default{
        background: #2E147C;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .comment_default_appShow_meao{
        background: #2E147C;
        span{
          background: #4E3494;
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
          border-radius: 0 0 0 0;
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
      .comment_default_vedio_noAppShow{
        background: #fff;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
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
        background: #4E3494;
        span{
          background: #3e279b;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .last_li.last_default2{
        background: #2E147C;
        span{
          background: #3e279b;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .last_li.last_default_vedio{
        background: #d4d1ec;
        span{
          background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .last_li.last_default2_vedio{
        background: #fff;
        span{
          background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_active{
        background: #4E3494;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #2E147C;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .appShow_no_active{
        background: #2E147C;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .appShow_default{
        background: #2E147C;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .appShow_default_meao{
        background: #2E147C;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .meao_default_comment{
        background: #3e279b;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
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
        background: #4E3494;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #2E147C;
          border-radius: 16px 16px 0 0;
          color: #5e40c8;
          transition: all 0.1s;
        }
      }
      .meao_default{
        background: #3e279b;
        border-radius: 0 16px 0 16px;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default_appshow_meao{
        background: #2E147C;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
      .meao_default_comment_noappShow{
        background: #f4f3f7;
        border-radius: 0 0 0 16px;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
        }

      }
      .meao_default_vedio_noappShow{
        background: #f4f3f7;
        border-radius: 0 0 0 16px;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appShow{
        background: #3e279b;
        border-radius: 0 16px 0 0;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .meao_default_vedio_appDetail{
        background: #3e279b;
        span{
          background: #4E3494;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_active{
        background: #4E3494;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #2E147C;
          border-radius: 16px 16px 0 0;
          color: #fff;
          transition: all 0.1s;
        }
      }
      .vedio_active_no_Meao{
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
        background: #2E147C;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_noMeao{
        background: #f4f3f7;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default_no_AppshowMeao{
        background: #f4f3f7;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2{
        background: #fff;
        border-radius: 0 16px 0 16px;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 16px;
          transition: all 0.1s;
        }
      }
      .vedio_default2_appShow_meao{
        background: #2E147C;
        border-radius: 0 0 0 0;
        transition: all 0.1s;
        span{
          background: #4E3494;
          border-radius: 0 0 16px 0;
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
      .vedio_default2_comment_no_Meao{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 16px 0 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2_meao_no_Appshow{
       background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 16px 0;
          transition: all 0.1s;
        }
      }
      .vedio_default2_comment_no_Appshow{
        background: #fff;
        border-radius: 0 16px 0 0;
        transition: all 0.1s;
        span{
          background: #d4d1ec;
          border-radius: 0 0 0 16px;
          transition: all 0.1s;
        }
      }
    }
    .link-right {
      width: 3px;
      height: 10px;
      border-right: solid #B3B0CA 2px;
    }
  }
  .val_span {
    line-height: 32px;
    padding-left: 71px;
  }
  .container_div{
    background: #fff;
    border-radius: 0 16px 16px 16px;
    transition: all 0.1s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .container_div_active{
    background: #4E3494;
    border-radius: 0 16px 16px 16px;
  }
}
</style>
