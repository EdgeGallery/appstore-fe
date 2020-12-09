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
                :disabled="scope.row.status !== 'Test success'"
                type="text"
                size="small"
                @click="publishPackage(scope.row)"
              >
                {{ $t('myApp.publish') }}
              </el-button>
              <el-button
                id="appdetail_delete"
                :disabled="scope.row.status == 'Test running' || scope.row.status == 'Test waiting'"
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
      currentPageData: [
        {
          'name': 'postition',
          'provider': 'edgegalery',
          'version': '1.0',
          'type': 'video',
          'affinity': 'GPU',
          'shortDesc': 'shortDesc##应用包详情页',
          'status': 'Upload',
          'appId': 'ffft565g5g54',
          'packageId': 'desf34r534t53',
          'userId': 'f435f54t',
          'userName': 'baizhenzhen',
          'testTaskId': ''
        }, {
          'name': 'postition',
          'provider': 'edgegalery',
          'version': '1.0',
          'type': 'video',
          'affinity': 'GPU',
          'shortDesc': 'shortDesc##应用包详情页',
          'status': 'Test running',
          'appId': 'ffft565g5g54',
          'userId': 'f435f54t',
          'userName': 'baizhenzhen',
          'testTaskId': ''
        }, {
          'name': 'postition',
          'provider': 'edgegalery',
          'version': '1.0',
          'type': 'video',
          'affinity': 'GPU',
          'shortDesc': 'shortDesc##应用包详情页',
          'status': 'Test created',
          'appId': 'ffft565g5g54',
          'userId': 'f435f54t',
          'userName': 'baizhenzhen',
          'testTaskId': ''
        }
      ],
      taskId: '',
      interval: ''
    }
  },
  methods: {
    getAppData () {
      myApp.getMyAppApi(this.userId)
        .then(res => {
          this.appData = res.data
          // this.getAppPackageData()
          this.dataLoading = false
        }, () => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.getMyAppFail'),
            type: 'warning'
          })
        })
    },
    getAppPackageData () {
      this.appData.forEach(item => {
        let appId = item.appId
        myApp.getMyAppPackageApi(appId, this.userId).then(res => {
          this.appPackageData.push(res.data)
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
      })
    },
    getDetail (item) {
      this.$router.push({ name: 'myappdetail', params: { item } })
      sessionStorage.setItem('myappdetail', JSON.stringify(item))
    },
    testMessage (row) {
      if (row.status === 'Upload') {
        this.$confirm('是否创建测试任务?', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转atp首页加参数taskId,
          // 暂时跳转，先调接口，成功后跳转
          this.$router.push('atptestcase')
          this.testPackage(row.appId, row.packageId)
          this.$message({
            type: 'success',
            message: '创建成功!'
          })
        })
      } else if (row.status === 'Test create failed') {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('测试任务检查失败')
        })
      } else if (row.status === 'Test failed') {
        this.$confirm('测试任务失败，请前往查看测试报告', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '再次测试',
          type: 'warning'
        }).then(() => {
          // 跳转测试任务列表  或者测试报告+taskId
          this.$message({
            type: 'success',
            message: '成功!'
          })
        }).catch(() => {
          // 再次测试// 跳转测试任务列表
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else if (row.status === 'Test success') {
        this.$confirm('测试任务成功，请前往查看测试报告', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转测试任务列表  或者测试报告
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      } else if (row.status === 'Test running') {
        this.$confirm('测试任务正在运行，请前往查看测试进展', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转测试进展页面，—+taskId
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      } else if (row.status === 'Test waiting') {
        this.$confirm('测试任务正在等待运行，请前往查看测试进展', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转测试进展页面，—+taskId
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      } else if (row.status === 'Test created') {
        this.$confirm('测试任务已创建，请前往运行测试任务', this.$t('promptMessage.prompt'), {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转测试进展页面，—+taskId
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
      }
    },
    testPackage (appId, packageId) {
      // this.$router.push('atptestcase')
      myApp.testPackageApi(appId, packageId).then(res => {
        this.taskId = res.data.atpTaskId
        this.$router.push('atptestcase')
      })
    },
    publishPackage (row) {
      myApp.publishAppApi(row.appId, row.packageId).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.publishSuccess'),
          type: 'success'
        })
        // 回到首页
        // this.$router.push('/index')
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
          // 刷新页面
          this.getAppData()
          this.getAppPackageData()
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
    this.getAppPackageData()
    this.interval = setInterval(() => {
      this.getAppPackageData()
    }, 30000)
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
