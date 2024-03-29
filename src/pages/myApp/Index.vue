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
  <div class="myApp common_bg">
    <div class="myApp_top">
      <p class="myApp_title defaultFontBlod">
        {{ $t('nav.myApp') }}
      </p>
      <el-button
        class="common_button"
        id="myapp_checktest"
        @click="jumpTo"
      >
        {{ $t('myApp.checkTest') }}
      </el-button>
    </div>
    <div class="myApp-content">
      <el-input
        v-model="nameQueryVal"
        :placeholder="$t('common.appName')"
        id="myAppSearch"
        class="search_input"
        suffix-icon="el-icon-search"
        @clear="queryApp"
        @change="queryApp"
      />
      <div class="packageTable">
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          class="common_table"
          :default-sort="{ prop: 'createTime', order: 'descending' }"
          @sort-change="sortChange"
          @filter-change="filterChange"
        >
          <el-table-column
            prop="name"
            :label="$t('common.appName')"
            width="160"
          >
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                width="160"
                effect="dark"
                :content="scope.row.name"
                v-if="scope.row.name.length>20"
              >
                <div>{{ scope.row.name }}</div>
                <div slot="reference">
                  {{ scope.row.name }}
                </div>
              </el-tooltip>
              <div v-else>
                <a
                  @click="getDetail(scope.row) "
                >{{ scope.row.name }}</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="provider"
            :label="$t('common.provider')"
            width="106"
          />
          <el-table-column
            prop="version"
            :label="$t('common.version')"
            width="80"
          />
          <el-table-column
            prop="deployMode"
            :label="$t('store.workloadType')"
            width="140"
          >
            <template slot-scope="scope">
              {{ scope.row.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="userName"
            :label="$t('myApp.uploader')"
            width="100"
          />
          <el-table-column
            prop="createTime"
            :label="$t('common.uploadTime')"
            width="175"
            sortable="custom"
          />
          <el-table-column
            prop="shortDesc"
            :label="$t('common.description')"
            width="160"
          >
            <template slot-scope="scope">
              <el-tooltip
                placement="top"
                width="160"
                effect="dark"
                :content="scope.row.shortDesc"
                v-if="scope.row.shortDesc.length>20"
              >
                <div>{{ scope.row.shortDesc }}</div>
                <div slot="reference">
                  {{ scope.row.shortDesc }}
                </div>
              </el-tooltip>
              <div v-else>
                {{ scope.row.shortDesc }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :column-key="'status'"
            width="150"
            :label="$t('myApp.status')"
            :filters="[{text: 'Upload', value: 'Upload'}, {text: 'Test_created', value: 'Test_created'}, {text: 'Test_running', value: 'Test_running'}, {text: 'Test_waiting', value: 'Test_waiting'},{text: 'Test_failed', value: 'Test_failed'}, {text: 'Test_success', value: 'Test_success'}, {text: 'Published', value: 'Published'}, {text: 'Unpublished', value: 'Unpublished'}]"
            :filtered-value="filterValue.status"
          >
            <template slot-scope="scope">
              <em
                v-if="scope.row.status==='Upload'"
                class="upload"
              />
              <em
                v-if="scope.row.status==='Test_created'"
                class="test_created"
              />
              <em
                v-if="scope.row.status==='Test_running'"
                class="test_running"
              />
              <em
                v-if="scope.row.status==='Test_waiting'"
                class="test_waiting"
              />
              <em
                v-if="scope.row.status==='Test_failed'"
                class="test_failed"
              />
              <em
                v-if="scope.row.status==='Test_success'"
                class="test_success"
              />
              <em
                v-if="scope.row.status==='Published'"
                class="published"
              />
              <em
                v-if="scope.row.status==='Unpublished'"
                class="upload"
              />
              <span v-if="scope.row.status==='Upload'">Upload</span>
              <span v-if="scope.row.status==='Test_created'">Test_created</span>
              <span v-if="scope.row.status==='Test_running'">Test_running</span>
              <span v-if="scope.row.status==='Test_waiting'">Test_waiting</span>
              <span v-if="scope.row.status==='Test_failed'">Test_failed</span>
              <span v-if="scope.row.status==='Test_success'">Test_success</span>
              <span v-if="scope.row.status==='Published'">Published</span>
              <span v-if="scope.row.status==='Unpublished'">Unpublished</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('myApp.operation')"
            width="220"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  class="common_operationBtn"
                  :disabled="scope.row.status == 'Published' || scope.row.status == 'Unpublished'"
                  @click="testMessage(scope.row)"
                  type="text"
                >
                  {{ $t('myApp.test') }}
                </el-button>
                <el-button
                  class="common_operationBtn"
                  :disabled="scope.row.status == 'Upload'
                    || scope.row.status == 'Test_created'
                    || scope.row.status == 'Test_running'
                    || scope.row.status == 'Test_waiting'
                    || scope.row.status == 'Test_failed'
                    || scope.row.status == 'Published'"
                  @click="beforePublishPackage(scope.row)"
                  type="text"
                >
                  {{ $t('myApp.publish') }}
                </el-button>
                <el-dropdown>
                  <el-button
                    class="common_operationBtn"
                    type="text"
                    style="margin:10px;"
                  >
                    {{ $t('myApp.more') }}
                  </el-button>
                  <el-dropdown-menu
                    slot="dropdown"
                    class="drop-menu"
                    size="mini"
                  >
                    <el-dropdown-item
                      class="common_operationBtn"
                      @click.native="getDetail(scope.row)"
                      type="text"
                    >
                      {{ $t('common.detail') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="common_operationBtn"
                      @click.native="appModify(scope.row)"
                      type="text"
                    >
                      {{ $t('common.appModify') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="common_operationBtn"
                      :disabled="scope.row.status == 'Test_running' || scope.row.status == 'Test_waiting'"
                      @click.native="getDelete(scope.row)"
                      type="text"
                    >
                      {{ $t('common.delete') }}
                    </el-dropdown-item>
                    <el-dropdown-item
                      class="common_operationBtn"
                      :disabled="scope.row.status == 'Test_running' || scope.row.status == 'Test_waiting'"
                      @click.native="offShelfPackage(scope.row)"
                      type="text"
                    >
                      {{ $t('common.offShelf') }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
          <template slot="empty">
            <div>
              <img
                src="../../assets/images/empty.png"
                alt=""
                style="padding: 10px;"
              >
              <p>{{ $t('common.noData') }}</p>
            </div>
          </template>
        </el-table>
      </div>
      <div v-if="isShowModifyDlg">
        <appModify
          v-model="isShowModifyDlg"
          :row-app-modify-info="rowAppModifyInfo"
          @reloadData="isReloadData"
        />
      </div>
      <eg-pagination
        class="eg_pagination"
        :page-num="pageNum"
        :page-size="pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
      <div class="clearfix" />
    </div>
    <!-- 定价设置 -->
    <el-dialog
      :visible.sync="setPriceDialog"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
    >
      <div
        class="buyTitle"
      >
        <p class="title_icon" />
        <p class="title">
          {{ $t('myApp.priceTitle') }}
        </p>
      </div>
      <div>
        <el-form class="priceForm">
          <el-form-item>
            <div class="priceRadio">
              <el-radio
                v-model="price"
                label="1"
                style="margin-bottom:10px;"
              >
                {{ $t('myApp.free') }}
              </el-radio>
            </div>
            <div class="priceRadio">
              <el-radio
                v-model="price"
                label="2"
              >
                <el-input
                  v-model="priceSet"
                  style="width:100px;"
                />  {{ $t('myApp.price') }}
              </el-radio>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="btnRightPadding"
      >
        <el-button
          @click="setPriceDialog = false"
          class="footer-button"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="publishPackage()"
          class="footer-button"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { myApp, deleteAppPackageApi, offShelfAppApi } from '../../tools/api.js'
import { common } from '../../tools/comon.js'
import { PLATFORMNAME_ATP } from '../../tools/constant.js'
import timeFormatTools from '../../tools/timeFormatTools.js'
import egPagination from 'eg-view/src/components/EgPagination.vue'
import appModify from './AppModify.vue'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    egPagination,
    appModify
  },
  data () {
    return {
      userId: '',
      appPackageData: [],
      currentPageData: [],
      dataLoading: true,
      taskId: '',
      interval: '',
      pageSize: 10,
      curPageSize: 10,
      pageNum: 1,
      status: [],
      offsetPage: 0,
      total: 0,
      language: localStorage.getItem('language'),
      filterValue: { status: [] },
      nameQueryVal: '',
      appName: '',
      prop: 'createTime',
      order: 'desc',
      isShowModifyDlg: false,
      rowAppModifyInfo: {},
      setPriceDialog: false,
      price: '1',
      priceSet: 0,
      packageInfo: null,
      typeList: [
        {
          labelEn: 'Video Application',
          labelCn: '视频应用'
        },
        {
          labelEn: 'Game',
          labelCn: '游戏'
        },
        {
          labelEn: 'Video Surveillance',
          labelCn: '视频监控'
        },
        {
          labelEn: 'Safety',
          labelCn: '安全'
        },
        {
          labelEn: 'Blockchain',
          labelCn: '区块链'
        },
        {
          labelEn: 'Smart Device',
          labelCn: '智能设备'
        },
        {
          labelEn: 'Internet of Things',
          labelCn: '物联网'
        },
        {
          labelEn: 'Big Data',
          labelCn: '大数据'
        },
        {
          labelEn: 'AR/VR',
          labelCn: 'AR/VR'
        },
        {
          labelEn: 'API',
          labelCn: 'API'
        },
        {
          labelEn: 'SDK',
          labelCn: 'SDK'
        },
        {
          labelEn: 'MEP',
          labelCn: 'MEP'
        }
      ],
      statusList: [
        {
          labelEn: 'Upload',
          labelCn: '已上传'
        },
        {
          labelEn: 'Test_created',
          labelCn: '测试任务已创建'
        },
        {
          labelEn: 'Test_running',
          labelCn: '测试中'
        },
        {
          labelEn: 'Test_waiting',
          labelCn: '等待测试'
        },
        {
          labelEn: 'Test_failed',
          labelCn: '测试失败'
        },
        {
          labelEn: 'Test_success',
          labelCn: '测试成功'
        },
        {
          labelEn: 'Published',
          labelCn: '已发布'
        }
      ]
    }
  },
  methods: {
    sortChange (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'createTime'
        this.order = 'desc'
      } else {
        this.prop = column.prop
        if (column.order === 'ascending') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
      }
      this.getAppData()
    },
    filterChange (filters) {
      this.filterValue = filters
      this.offsetPage = 0
      this.pageNum = 1
      this.status = filters.status
      this.getAppData()
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getAppData()
    },
    queryApp () {
      this.offsetPage = 0
      this.pageNum = 1
      this.getAppData()
    },
    isReloadData (value) {
      if (value) {
        this.getAppData()
      }
    },
    // Only call one interface
    getAppData () {
      this.appPackageData = []
      this.appName = this.nameQueryVal.toLowerCase()
      if (this.prop === 'name') {
        this.prop = 'appName'
      }
      let params = {
        limit: this.curPageSize,
        offset: this.offsetPage,
        appName: this.appName,
        status: this.status,
        sortItem: this.prop,
        sortType: this.order
      }
      myApp.getMyAppPackage(params)
        .then(res => {
          this.appPackageData = res.data.results
          this.total = res.data.total
          this.appPackageData.forEach(item => {
            let formatedTime = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = formatedTime
          })
          this.currentPageData = this.appPackageData
          this.dataLoading = false
        }).catch((error) => {
          this.dataLoading = false
          let defaultMsg = this.$t('promptMessage.getMyAppFail')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
          this.clearInterval()
        })
    },
    getAppStatus () {
      this.appPackageData.forEach((item, index) => {
        let appId = item.appId
        let packageId = item.packageId
        if (item.status !== 'Published') {
          myApp.getPackageDetailApi(appId, packageId).then(res => {
            let data = res.data
            data.createTime = timeFormatTools.formatDateTime(data.createTime)
            this.appPackageData.splice(index, 1, data)
          }).catch((error) => {
            let defaultMsg = this.$t('myApp.getStatusFailed')
            commonUtil.showTipMsg(this.language, error, defaultMsg)
          })
        }
      })
    },
    getDetail (item) {
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'myapp')
      sessionStorage.setItem('myAppCurPageSize', this.curPageSize)
      sessionStorage.setItem('myAppOffsetPage', this.offsetPage)
      sessionStorage.setItem('myAppPageNum', this.pageNum)
      sessionStorage.setItem('myAppAppName', this.appName)
      sessionStorage.setItem('myAppStatus', this.status)
      sessionStorage.setItem('myAppProp', this.prop)
      sessionStorage.setItem('myAppOrder', this.order)
      this.$router.push({ name: 'appstordetail', params: { item } })
    },
    jumperToTestRepo (testTaskId) {
      let language = localStorage.getItem('language')
      let currUrl = common.getPlatformUrlPrefix(PLATFORMNAME_ATP)
      currUrl = currUrl + '/#/atpreport' + '?taskId=' + testTaskId + '&language=' + language
      window.open(currUrl, '_blank')
    },
    testMessage (row) {
      let testTaskId = row.testTaskId
      switch (row.status) {
        case 'Upload':
          this.$confirm(this.$t('promptMessage.createtask'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // Jump to the atp homepage and add the parameter taskId
            this.testPackage(row.appId, row.packageId)
          })
          break
        case 'Test_create_failed':
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.createFail')
          })
          break
        case 'Test_failed':
          this.$confirm(this.$t('promptMessage.testFail'), this.$t('promptMessage.prompt'), {
            distinguishCancelAndClose: true,
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('promptMessage.testAgain'),
            type: 'warning'
          }).then(() => {
            this.jumperToTestRepo(testTaskId)
          }).catch(action => {
            if (action === 'cancel') {
              this.$router.push({ name: 'selectscene', params: { taskId: testTaskId } })
            }
          })
          break
        case 'Test_success':
          this.$confirm(this.$t('promptMessage.testSuccess'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
            this.jumperToTestRepo(testTaskId)
          })
          break
        case 'Test_running':
          this.$confirm(this.$t('promptMessage.testRunning'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // Jump to the test progress page, —+taskId
            this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
          })
          break
        case 'Test_waiting':
          this.$confirm(this.$t('promptMessage.testWaiting'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // Jump to the test progress page, —+taskId
            this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
          })
          break
        case 'Test_created':
          this.$confirm(this.$t('promptMessage.testCreated'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // Jump to the home page, —+taskId+ run directly
            this.$router.push({ name: 'selectscene', params: { taskId: testTaskId } })
          })
          break
        default:
      }
    },
    testPackage (appId, packageId) {
      myApp.testPackageApi(appId, packageId).then(res => {
        this.taskId = res.data.atpTaskId
        this.$router.push({ name: 'selectscene', params: { taskId: this.taskId } })
      }).catch((error) => {
        let defaultMsg = this.$t('promptMessage.createFail')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    beforePublishPackage (row) {
      this.setPriceDialog = true
      this.packageInfo = row
    },
    publishPackage () {
      let row = this.packageInfo
      let parameter = {
        isFree: this.price === '1',
        price: this.priceSet
      }
      myApp.publishAppApi(row.appId, row.packageId, parameter).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.publishSuccess'),
          type: 'success'
        })
        this.setPriceDialog = false
        this.getAppData()
      }).catch(error => {
        let retCode = error.response.data.retCode
        let errMsg = error.response.data.message
        if (retCode) {
          commonUtil.showTipMsg(this.language, error, errMsg)
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        }
      })
    },
    appModify (row) {
      this.rowAppModifyInfo = row
      this.isShowModifyDlg = true
    },
    getDelete (row) {
      this.$confirm(this.$t('promptMessage.deletePrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let userId = sessionStorage.getItem('userId')
        let userName = sessionStorage.getItem('userName')
        deleteAppPackageApi(row.appId, row.packageId, userId, userName).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.deleteSuccess'),
            type: 'success'
          })
          // Refresh data
          this.getAppData()
        }).catch((error) => {
          let defaultMsg = this.$t('promptMessage.operationFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      }).catch(() => {
        // cancel
      })
    },
    offShelfPackage (row) {
      if (sessionStorage.getItem('userId') === row.userId || sessionStorage.getItem('userNameRole') === 'admin') {
        this.$confirm(this.$t('promptMessage.offShelfPrompt'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          offShelfAppApi(row.appId, row.packageId, userId, userName).then(res => {
            this.$emit('getAppData')
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.offShelfSuccess'),
              type: 'success'
            })
            this.getAppData()
          }).catch((error) => {
            let defaultMsg = this.$t('promptMessage.operationFailed')
            commonUtil.showTipMsg(this.language, error, defaultMsg)
          })
        })
      } else {
        this.$message.warning(this.$t('system.noPermissionOffShelf'))
      }
    },
    jumpTo () {
      this.$router.push('/app/test/task')
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    changeLanguege () {
      // translate to English
      let curLabelKey = 'labelCn'
      let nextLabelKey = 'labelEn'
      if (this.language === 'cn') { // translate to Chinese
        curLabelKey = 'labelEn'
        nextLabelKey = 'labelCn'
      }
      this.appPackageData.forEach(item => {
        for (let type of this.typeList) {
          if (item.type === type[curLabelKey]) {
            item.type = type[nextLabelKey]
            break
          }
        }
      })
    }
  },
  beforeMount () {
    this.curPageSize = sessionStorage.getItem('myAppCurPageSize') ? parseInt(sessionStorage.getItem('myAppCurPageSize'), 10) : this.curPageSize
    this.offsetPage = sessionStorage.getItem('myAppOffsetPage') ? parseInt(sessionStorage.getItem('myAppOffsetPage'), 10) : this.offsetPage
    this.pageNum = sessionStorage.getItem('myAppPageNum') ? parseInt(sessionStorage.getItem('myAppPageNum'), 10) : this.pageNum
    this.appName = sessionStorage.getItem('myAppAppName') ? sessionStorage.getItem('myAppAppName') : this.appName
    this.status = sessionStorage.getItem('myAppStatus') ? sessionStorage.getItem('myAppStatus') : this.status
    this.prop = sessionStorage.getItem('myAppProp') ? sessionStorage.getItem('myAppProp') : this.prop
    this.order = sessionStorage.getItem('myAppOrder') ? sessionStorage.getItem('myAppOrder') : this.order
    window.sessionStorage.removeItem('myAppCurPageSize')
    window.sessionStorage.removeItem('myAppOffsetPage')
    window.sessionStorage.removeItem('myAppPageNum')
    window.sessionStorage.removeItem('myAppAppName')
    window.sessionStorage.removeItem('myAppStatus')
    window.sessionStorage.removeItem('myAppProp')
    window.sessionStorage.removeItem('myAppOrder')
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getAppData()
    },
    curPageSize: function () {
      this.getAppData()
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
    this.interval = setInterval(() => {
      this.getAppStatus()
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>
<style lang='less'>
a:hover{
cursor:pointer
}
.myApp {
  width: 100%;
  padding: 0 13.18%;
  .myApp_top{
    padding: 54px 0 54px !important;
    display: flex;
    justify-content: space-between;
    .myApp_title{
      color: #fff;
      letter-spacing: 4px;
      font-size: 30px;
    }
  }
  .checkTestTask_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    box-shadow: 0px 16px 10px  rgba(83,201,208,0.3);
  }
  .myApp-content {
    background: rgba(46,20,124,0.7);
    border-radius: 20px;
    padding: 30px 60px;
    min-height: 500px;
    position: relative;
    .search_input {
      float: left;
      width: 200px;
    }
    .packageTable{
      margin: 50px 0 86px 0;
      .el-table td{
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      em {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        position: relative;
        top: 3px;
      }
      .upload {
        background: url('../../assets/images/status_upload.png') no-repeat;
        background-size: cover;
      }
      .test_created {
        background: url('../../assets/images/Test-created.png') no-repeat;
        background-size: cover;
      }
      .test_running {
        background: url('../../assets/images/Test-running.png') no-repeat;
        background-size: cover;
      }
      .test_waiting {
        background: url('../../assets/images/Test-waiting.png') no-repeat;
        background-size: cover;
      }
      .test_failed {
        background: url('../../assets/images/Test-failed.png') no-repeat;
        background-size: cover;
      }
      .test_success {
        background: url('../../assets/images/Test-success.png') no-repeat;
        background-size: cover;
      }
      .published {
        background: url('../../assets/images/Published.png') no-repeat;
        background-size: cover;
      }
      .drop-menu{
        width: 50px !important;
        height: 200px !important;
        background-color: #EFEFEF !important;
      }
    }
  }
}
.eg_pagination{
  position: absolute;
  bottom: 40px;
  right: 50px;
}
.buyTitle{
  display: flex;
  padding: 3px 0 20px 40px;
  .title_icon{
    position: relative;
    top: 8px;
    height: 9px;
    width: 9px;
    background: #43F6AD;
    border-radius: 50%;
    margin-right: 10px;
  }
  .title{
    color: #fff;
    font-size: 18px;
  }
}
.priceForm{
  padding-left: 70px;
  .priceRadio{
    margin-bottom:16px;
    .el-radio__label{
      font-size: 16px;
    }
  }
  .el-radio__input.is-checked + .el-radio__label{
    color: #fff;
  }
  .el-radio__label{
    color: #fff;
  }
  .el-input__inner{
    height: 25px;
    background:#4E3494;
    border: none;
    color: #fff;
  }
}
.btnRightPadding{
  padding-right: 20px;
  margin-right: 14px;
}
.el-select-dropdown__item.selected {
  color: #fff !important;
}
</style>
