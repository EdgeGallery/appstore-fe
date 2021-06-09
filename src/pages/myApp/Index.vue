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
          :default-sort="defaultSort"
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
        :page-size="curPageSize"
        :page-sizes="pageSizes"
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
      dataLoading: true,
      taskId: '',
      interval: '',
      pageSizes: [10, 20, 30],
      curPageSize: 10,
      pageNumCache: 1,
      offsetPage: sessionStorage.getItem('offsetMyApp') || 0,
      language: localStorage.getItem('language'),
      filterValue: { status: [] },
      nameQueryVal: '',
      appName: '',
      prop: 'createTime',
      order: 'desc',
      defaultSort: { prop: 'createTime', order: 'descending' },
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
      this.defaultSort = {
        prop: this.prop,
        order: this.order
      }
      sessionStorage.setItem('myAppSortVal', JSON.stringify(this.defaultSort))
      this.getAppData()
    },
    filterChange (filters) {
      this.filterValue = filters
      sessionStorage.setItem('myAppStatusFilterValue', JSON.stringify(this.filterValue))
    },
    filterStatus (val, row) {
      return row.status === val
    },
    sizeChange (val) {
      this.curPageSize = val
      sessionStorage.setItem('myAppPageSize', val)
    },
    currentChange (val) {
      this.pageNumCache = val
      this.offsetPage = this.curPageSize * (this.pageNumCache - 1)
      sessionStorage.setItem('offsetMyApp', this.offsetPage)
      sessionStorage.setItem('myAppPageNum', this.pageNumCache)
      this.getAppData()
    },
    queryApp () {
      if (this.nameQueryVal.toLowerCase()) {
        this.offsetPage = 0
        this.pageNumCache = 1
        sessionStorage.setItem('myAppPageNum', this.pageNumCache)
      }
      this.getAppData()
    },
    isReloadData (value) {
      if (value) {
        this.getAppData()
      }
    },
    // 只调用一个接口
    getAppData () {
      this.appPackageData = []
      this.appName = this.nameQueryVal.toLowerCase()
      if (this.prop === 'name') {
        this.prop = 'appName'
      }
      myApp.getMyAppPackageApi(this.userId, this.curPageSize, this.offsetPage, this.appName, '', this.prop, this.order)
        .then(res => {
          this.appPackageData = res.data.results
          this.total = res.data.total
          this.appPackageData.forEach(item => {
            let formatedTime = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = formatedTime
          })
          this.dataLoading = false
        }).catch(() => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.getMyAppFail'),
            type: 'warning'
          })
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
          })
        }
      })
    },
    getDetail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'myapp')
    },
    jumperToTestRepo (testTaskId) {
      let currUrl = window.location.host
      let language = localStorage.getItem('language')
      if (currUrl.indexOf('30091') !== -1) {
        currUrl = 'https://' + currUrl.split(':')[0] + ':30094' + '/#/atpreport' + '?taskId=' + testTaskId + '&language=' + language
      } else {
        currUrl = currUrl.replace('appstore', 'atp')
        currUrl = 'https://' + currUrl + '/#/atpreport' + '?taskId=' + testTaskId + '&language=' + language
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
          // 跳转atp首页加参数taskId,
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
          // 再次测试,首页+taskId，
            if (action === 'cancel') {
              this.testPackage(row.appId, row.packageId)
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
          // 跳转测试进展页面，—+taskId
            this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
          })
          break
        case 'Test_waiting':
          this.$confirm(this.$t('promptMessage.testWaiting'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // 跳转测试进展页面，—+taskId
            this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
          })
          break
        case 'Test_created':
          this.$confirm(this.$t('promptMessage.testCreated'), this.$t('promptMessage.prompt'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
          // 跳转首页页面，—+taskId+直接运行；
          // this.$router.push({ name: 'atptestcase', params: { taskId: testTaskId } })
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
      }).catch(() => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.createFail')
        })
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
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.operationFailed'),
          type: 'success'
        })
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
          // 刷新数据
          this.getAppData()
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        })
      }).catch((error) => {
        console.log(error)
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
      let curLabelKey = 'labelCn'
      let nextLabelKey = 'labelEn'
      if (this.language === 'en') {
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
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getAppData()
    }

  },
  computed: {
    getLanguage () {
      let language
      this.language === 'cn' ? language = 'English' : language = '中文'
      return language
    },
    findedData: function () {
      sessionStorage.setItem('myAppNameQueryVal', this.nameQueryVal)
      this.changeLanguege()
      return this.appPackageData
    },
    filteredData: function () {
      if (this.filterValue.status.length === 0) {
        return this.findedData
      } else {
        return this.findedData.filter(item => this.filterValue.status.includes(item.status))
      }
    },
    sortedData: function () {
      let tempData = [].concat(this.filteredData)
      let sortProp = this.defaultSort.prop
      let sortOrder = this.defaultSort.order
      tempData.sort((a, b) => {
        let aProp = a[sortProp].toLowerCase()
        let bProp = b[sortProp].toLowerCase()
        if (sortOrder === 'descending') {
          if (aProp > bProp) {
            return -1
          }
          if (aProp < bProp) {
            return 1
          }
          return 0
        } else {
          if (aProp > bProp) {
            return 1
          }
          if (aProp < bProp) {
            return -1
          }
          return 0
        }
      })
      return tempData
    },
    pageNum: function () {
      if (this.curPageSize * (this.pageNumCache - 1) >= this.total) {
        sessionStorage.setItem('myAppPageNum', 1)
        return 1
      }
      sessionStorage.setItem('myAppPageNum', this.pageNumCache)
      return this.pageNumCache
    },
    // offsetPage: function () {
    //   let calPageNum = this.curPageSize * (this.pageNumCache - 1) >= this.total ? 1 : this.pageNumCache
    //   return this.curPageSize * (calPageNum - 1)
    // },
    // 暂时删除
    currentPageData: function () {
      // let calPageNum = this.curPageSize * (this.pageNumCache - 1) >= this.total ? 1 : this.pageNumCache
      // let start = this.curPageSize * (calPageNum - 1)
      // let end = this.curPageSize * calPageNum
      return this.sortedData
    }
  },
  beforeMount () {
    this.pageNumCache = sessionStorage.getItem('myAppPageNum') ? parseInt(sessionStorage.getItem('myAppPageNum'), 10) : this.pageNumCache
    this.curPageSize = sessionStorage.getItem('myAppPageSize') ? parseInt(sessionStorage.getItem('myAppPageSize'), 10) : this.curPageSize
    this.filterValue = JSON.parse(sessionStorage.getItem('myAppStatusFilterValue')) ? JSON.parse(sessionStorage.getItem('myAppStatusFilterValue')) : this.filterValue
    this.nameQueryVal = sessionStorage.getItem('myAppNameQueryVal') ? sessionStorage.getItem('myAppNameQueryVal') : ''
    this.defaultSort = JSON.parse(sessionStorage.getItem('myAppSortVal')) ? JSON.parse(sessionStorage.getItem('myAppSortVal')) : this.defaultSort
  },
  mounted () {
    sessionStorage.removeItem('currentPage')
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
    this.interval = setInterval(() => {
      this.getAppStatus()
    }, 10000)
  },
  destroyed () {
    sessionStorage.removeItem('offsetMyApp')
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
