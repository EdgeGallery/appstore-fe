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
  <div class="myApp padding56">
    <div class="myApp-content">
      <div class="myApp-operArea">
        <el-button
          id="myapp_checktest"
          type="primary"
          class="rt"
          @click="jumpTo"
        >
          {{ $t('myApp.checkTest') }}
        </el-button>
        <el-input
          suffix-icon="el-icon-search"
          v-model="nameQueryVal"
          @change="queryApp"
          :placeholder="$t('common.appName')"
          class="search_input"
        />
      </div>
      <div class="packageTable">
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          header-cell-class-name="headerStyle"
          :default-sort="{ prop: 'createTime', order: 'descending' }"
          @sort-change="sortChange"
          @filter-change="filterChange"
        >
          <el-table-column
            prop="name"
            :label="$t('common.appName')"
            sortable="custom"
            width="210"
            :cell-class-name="hiddenClass"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="hover"
                v-if="scope.row.name.length>20"
              >
                <div>{{ scope.row.name }}</div>
                <div slot="reference">
                  {{ scope.row.name }}
                </div>
              </el-popover>
              <div v-else>
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="provider"
            :label="$t('common.provider')"
            width="120"
          />
          <el-table-column
            prop="version"
            :label="$t('common.version')"
            width="120"
          />
          <el-table-column
            prop="type"
            :label="$t('common.type')"
            width="150"
          />
          <el-table-column
            prop="affinity"
            :label="$t('common.architecture')"
            width="140"
          />
          <el-table-column
            prop="deployMode"
            :label="$t('store.workloadType')"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.row.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t('common.uploadTime')"
            width="160"
            sortable="custom"
          />
          <el-table-column
            prop="shortDesc"
            :label="$t('common.description')"
            :cell-class-name="hiddenClass"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="260"
                trigger="hover"
                v-if="scope.row.shortDesc.length>20"
              >
                <div>{{ scope.row.shortDesc }}</div>
                <div slot="reference">
                  {{ scope.row.shortDesc }}
                </div>
              </el-popover>
              <div v-else>
                {{ scope.row.shortDesc }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :column-key="'status'"
            prop="status"
            width="130"
            :label="$t('myApp.status')"
            :filters="[{text: 'Upload', value: 'Upload'}, {text: 'Test_created', value: 'Test_created'}, {text: 'Test_running', value: 'Test_running'}, {text: 'Test_waiting', value: 'Test_waiting'},{text: 'Test_failed', value: 'Test_failed'}, {text: 'Test_success', value: 'Test_success'}, {text: 'Published', value: 'Published'}]"
            :filtered-value="filterValue.status"
          />
          <el-table-column
            fixed="right"
            :label="$t('myApp.operation')"
            width="220"
          >
            <template slot-scope="scope">
              <el-button
                @click="getDetail(scope.row)"
                type="text"
              >
                {{ $t('common.detail') }}
              </el-button>
              <span class="buttonRight" />
              <el-button
                :disabled="scope.row.status == 'Published'"
                @click="testMessage(scope.row)"
                type="text"
              >
                {{ $t('myApp.test') }}
              </el-button>
              <span class="buttonRight" />
              <el-button
                :disabled="scope.row.status !== 'Test_success'"
                @click="publishPackage(scope.row)"
                type="text"
              >
                {{ $t('myApp.publish') }}
              </el-button>
              <span class="buttonRight" />
              <el-button
                @click="appModify(scope.row)"
                type="text"
              >
                {{ $t('common.appModify') }}
              </el-button>
              <span class="buttonRight" />
              <el-button
                :disabled="scope.row.status == 'Test_running' || scope.row.status == 'Test_waiting'"
                @click="getDelete(scope.row)"
                type="text"
              >
                {{ $t('common.delete') }}
              </el-button>
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
        class="rt"
        :page-num="pageNum"
        :page-size="pageSize"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
import { myApp, deleteAppPackageApi } from '../../tools/api.js'
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
      appData: [],
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
      language: localStorage.getItem('language'),
      filterValue: { status: [] },
      nameQueryVal: '',
      appName: '',
      prop: 'createTime',
      order: 'desc',
      isShowModifyDlg: false,
      rowAppModifyInfo: {},
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
      myApp.getMyAppPackageApi(this.userId, this.curPageSize, this.offsetPage, this.appName, this.status, this.prop, this.order)
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
      let currUrl = window.location.origin
      let language = localStorage.getItem('language')
      if (currUrl.indexOf('30091') !== -1) {
        let originUrl = currUrl.replace('30091', '30094')
        currUrl = originUrl + '/#/atpreport' + '?taskId=' + testTaskId + '&language=' + language
      } else {
        currUrl = currUrl.replace('appstore', 'atp')
        currUrl = currUrl + '/#/atpreport' + '?taskId=' + testTaskId + '&language=' + language
      }
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
    publishPackage (row) {
      myApp.publishAppApi(row.appId, row.packageId).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.publishSuccess'),
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
    jumpTo () {
      this.$router.push('/app/test/task')
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    hiddenClass (row) {
      if (row.columnIndex === 5 || row.columnIndex === 0) {
        return 'hiddenClass'
      }
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
      let language = localStorage.getItem('language')
      this.language = language
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
.myApp {
  .myApp-content {
    background: white;
    margin-top: 95px;
    padding: 20px;
    // height: calc(100% - 10px);
    .myApp-operArea {
      height: 40px;
      .el-button{
        float: left;
      }
      .search_input{
        float: right;
        width: 200px;
      }
    }
    .packageTable{
      margin: 20px 0;
      .headerStyle{
        background: #e1e7f5;
        color: #575d6c;
        border-right: 2px solid #fff;
        padding: 0;
        height: 40px;
        line-height: 40px;
      }
      .el-table td{
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      .buttonRight{
        padding: 0 1px;
        margin: 0 5px;
        background: #dfe1e6;
      }
    }
  }
}
</style>
