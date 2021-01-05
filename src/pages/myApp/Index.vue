<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="my-app padding56">
    <div class="my-app-content">
      <el-row>
        <el-col :span="24">
          <el-button
            id="myapp_checktest"
            type="primary"
            class="rt"
            @click="jumpTo"
          >
            {{ $t('myApp.checkTest') }}
          </el-button>
        </el-col>
      </el-row>
      <div class="packageTable">
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          border
        >
          <el-table-column
            prop="name"
            :label="$t('common.appName')"
          />
          <el-table-column
            prop="provider"
            :label="$t('common.provider')"
          />
          <el-table-column
            prop="version"
            :label="$t('common.version')"
          />

          <el-table-column
            prop="type"
            :label="$t('common.type')"
          />
          <el-table-column
            prop="affinity"
            :label="$t('common.affinity')"
          />
          <el-table-column
            prop="shortDesc"
            :label="$t('common.description')"
          />
          <el-table-column
            prop="status"
            :label="$t('myApp.status')"
          />
          <el-table-column
            fixed="right"
            :label="$t('myApp.operation')"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                id="appdetail_detail"
                @click="getDetail(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.detail') }}
              </el-button>
              <el-button
                :disabled="scope.row.status == 'Published'"
                type="text"
                size="small"
                @click="testMessage(scope.row)"
              >
                {{ $t('myApp.test') }}
              </el-button>
              <el-button
                :disabled="scope.row.status !== 'Test_success'"
                type="text"
                size="small"
                @click="publishPackage(scope.row)"
              >
                {{ $t('myApp.publish') }}
              </el-button>
              <el-button
                id="appdetail_delete"
                :disabled="scope.row.status == 'Test_running' || scope.row.status == 'Test_waiting'"
                @click="getDelete(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :table-data="appPackageData"
        @getCurrentPageData="getCurrentPageData"
      />
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
// import appList from '../home/AppList.vue'
import { myApp, deleteAppPackageApi } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    // appList,
    pagination
  },
  data () {
    return {
      userId: '',
      appData: [],
      appPackageData: [],
      dataLoading: true,
      currentPageData: [],
      taskId: '',
      interval: ''
    }
  },
  methods: {
    // 只调用一个接口
    getAppData () {
      this.appPackageData = []
      myApp.getMyAppPackageApi(this.userId)
        .then(res => {
          this.appPackageData = res.data
          this.dataLoading = false
        }, () => {
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
            this.appPackageData.splice(index, 1, data)
          })
        }
      })
    },
    getDetail (item) {
      this.$router.push({ name: 'myappdetail', params: { item } })
      sessionStorage.setItem('myappdetail', JSON.stringify(item))
    },
    testMessage (row) {
      let testTaskId = row.testTaskId
      if (row.status === 'Upload') {
        this.$confirm(this.$t('promptMessage.createtask'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          // 跳转atp首页加参数taskId,
          this.testPackage(row.appId, row.packageId)
        })
      } else if (row.status === 'Test_create_failed') {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.createFail')
        })
      } else if (row.status === 'Test_failed') {
        this.$confirm(this.$t('promptMessage.testFail'), this.$t('promptMessage.prompt'), {
          distinguishCancelAndClose: true,
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('promptMessage.testAgain'),
          type: 'warning'
        }).then(() => {
          // 跳转测试报告+taskId
          // this.$router.push({ name: 'atpreport', params: { taskId: testTaskId } })
          let routeData = this.$router.resolve({ name: 'atpreport', query: { taskId: testTaskId } })
          window.open(routeData.href, '_blank')
        }).catch(action => {
          // 再次测试,首页+taskId，
          if (action === 'cancel') {
            this.testPackage(row.appId, row.packageId)
          }
        })
      } else if (row.status === 'Test_success') {
        this.$confirm(this.$t('promptMessage.testSuccess'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          // 跳转测试报告
          // this.$router.push({ name: 'atpreport', params: { taskId: testTaskId } })
          let routeData = this.$router.resolve({ name: 'atpreport', query: { taskId: testTaskId } })
          window.open(routeData.href, '_blank')
        })
      } else if (row.status === 'Test_running') {
        this.$confirm(this.$t('promptMessage.testRunning'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          // 跳转测试进展页面，—+taskId
          this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
        })
      } else if (row.status === 'Test_waiting') {
        this.$confirm(this.$t('promptMessage.testWaiting'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          // 跳转测试进展页面，—+taskId
          this.$router.push({ name: 'atpprocess', params: { taskId: testTaskId } })
        })
      } else if (row.status === 'Test_created') {
        this.$confirm(this.$t('promptMessage.testCreated'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          // 跳转首页页面，—+taskId+直接运行；
          this.$router.push({ name: 'atptestcase', params: { taskId: testTaskId } })
        })
      }
    },
    testPackage (appId, packageId) {
      myApp.testPackageApi(appId, packageId).then(res => {
        this.taskId = res.data.atpTaskId
        this.$router.push({ name: 'atptestcase', params: { taskId: this.taskId } })
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
      }).catch(() => {
      })
    },
    jumpTo () {
      this.$router.push('/app/test/task')
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
    this.interval = setInterval(() => {
      // this.getAppData()
      this.getAppStatus()
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  }
}
</script>
<style lang='less' scoped>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
    .packageTable{
      margin: 20px 0;
    }
  }
}
</style>
