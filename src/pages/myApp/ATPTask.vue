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
  <div class="task">
    <div class="task-search">
      <el-form
        ref="form"
        :model="form"
        label-width="150px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('common.applicationName')">
              <el-input
                id="appName"
                v-model="form.appName"
                :placeholder="$t('common.applicationName')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              id="testStatus"
              :label="$t('myApp.testStatus')"
            >
              <el-select
                v-model="form.status"
                :placeholder="$t('myApp.testStatus')"
                class="statusSelect"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              id="beginTime"
              :label="$t('myApp.startTime')"
            >
              <el-date-picker
                v-model="form.beginTime"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('myApp.startTime')"
                @change="contrastTime"
                :picker-options="expireTimeOption"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              id="endTime"
              :label="$t('myApp.endTime')"
            >
              <el-date-picker
                v-model="form.endTime"
                value-format="yyyy-MM-dd"
                type="date"
                :placeholder="$t('myApp.endTime')"
                @change="contrastTime"
                :picker-options="expireTimeOption"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="search-btn">
          <el-button
            id="resetBtn"
            size="small"
            @click="resetForm"
          >
            {{ $t('myApp.reset') }}
          </el-button>
          <el-button
            id="inquireBtn"
            type="primary"
            size="small"
            @click="getTaskList"
          >
            {{ $t('myApp.inquire') }}
          </el-button>
        </div>
      </el-form>
      <div class="task-content">
        <el-table
          v-loading="dataLoading"
          :data="currentData"
          style="width: 100%;"
          border
        >
          <el-table-column
            prop="task.taskNo"
            :label="$t('myApp.taskNumber')"
          >
            <template slot-scope="scope">
              <el-button
                id="checkReportProess"
                @click="handleClickTaskNo(scope.row)"
                type="text"
                size="small"
              >
                {{ scope.row.task.taskNo }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="task.appName"
            :label="$t('common.appName')"
          />
          <el-table-column :label="$t('myApp.testStatus')">
            <template slot-scope="scope">
              <span
                class="el-icon-loading primary"
                v-if="scope.row.task.status!=='Success' && scope.row.task.status!=='Fail'"
                title="In Progress"
              />
              <span
                v-else-if="scope.row.task.status=='Fail'"
                class="el-icon-error error"
                title="Failed"
              />
              <span
                v-else
                class="el-icon-success success"
                title="Success"
              />
              <el-button
                id="statusBtn"
                style="margin-left:20px;"
                type="text"
                size="small"
                @click="handleClickTaskNo(scope.row)"
              >
                {{ scope.row.task.status }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="task.beginTime"
            :label="$t('myApp.startTime')"
          />
          <el-table-column
            prop="task.endTime"
            :label="$t('myApp.endTime')"
          />
          <el-table-column
            fixed="right"
            :label="$t('myApp.operation')"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                id="checkReportBtn"
                @click="handleClickReport(scope.row)"
                type="text"
                :disabled="(scope.row.task.status==='Success' || scope.row.task.status==='Fail')?false:true"
                size="small"
              >
                {{ $t('myApp.checkReport') }}
              </el-button>
              <el-button
                id="uploadBtn"
                type="text"
                size="small"
                style="margin-left:30px;"
                :disabled="scope.row.task.status==='Success'?false:true"
                @click="uploadTask(scope.row)"
              >
                {{ $t('myApp.upload') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="pagebar"
          style="margin-top: 20px"
        >
          <pagination
            :table-data="pageData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTaskListApi,
  // taskListApp,
  uploadAppTaskApi
} from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  name: 'Task',
  components: { pagination },
  data () {
    return {
      expireTimeOption: {
        disabledDate (date) {
          return date.getTime() > Date.now()
        }
      },
      form: {
        appName: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      pageData: [],
      caseList: [],
      options: [
        {
          value: 1,
          label: 'Virus Scan'
        },
        {
          value: 2,
          label: 'Compliance Test'
        },
        {
          value: 3,
          label: 'Sandbox Test'
        },
        {
          value: 4,
          label: 'Review'
        },
        {
          value: 5,
          label: 'Success'
        },
        {
          value: 6,
          label: 'Fail'
        }
      ],
      value: '',
      interval: '',
      dialogTitle: '',
      step: 1,
      telnetid: '',
      dataLoading: true,
      currentData: [],
      userId: sessionStorage.getItem('userId'),
      userName: sessionStorage.getItem('userName')
    }
  },
  mounted () {
    this.getTaskList()
    this.interval = setInterval(() => {
      this.getTaskList()
      this.step++
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('/test/report') === -1) {
      sessionStorage.removeItem('currentPage')
    }
    next()
  },
  methods: {
    getCurrentPageData (val) {
      this.currentData = val
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    handleClickReport (val) {
      sessionStorage.setItem('taskData', JSON.stringify(val))
      this.$router.push('/atpreport')
    },
    handleClickTaskNo (val) {
      this.$router.push('/atpprocess')
    },
    contrastTime () {
      if (this.form.endTime && this.form.beginTime > this.form.endTime) {
        this.$message({
          message: this.$t('promptMessage.contrastTime'),
          type: 'warning'
        })
        this.form.beginTime = ''
        this.form.endTime = ''
      }
    },
    getTaskList () {
      if (this.form.beginTime == null || this.form.endTime == null) {
        this.form.beginTime = ''
        this.form.endTime = ''
      }
      let userId = sessionStorage.getItem('userId')
      getTaskListApi(this.form, userId).then(
      // taskListApp(this.form, userId).then(
        res => {
          let data = res.data.tasks
          data.forEach((item, index) => {
            let newDateBegin = this.dateChange(item.task.beginTime)
            item.task.beginTime = newDateBegin
            let newDateEnd = this.dateChange(item.task.endTime)
            item.task.endTime = newDateEnd
            if (item.task.status === 'Success' || item.task.status === 'Fail') {
              item.step = 4
            } else if (item.task.status === 'Virus Scan') {
              item.endTime = ''
              item.step = 1
            } else if (item.task.status === 'Compliance Test') {
              item.endTime = ''
              item.step = 2
            } else {
              item.endTime = ''
              item.step = 3
            }
          })
          this.pageData = data
          this.totalNum = this.pageData.length
          this.dataLoading = false
        },
        () => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getTaskListFail')
          })
          this.clearInterval()
        }
      )
    },
    resetForm () {
      this.form = {
        appName: '',
        status: '',
        beginTime: '',
        endTime: ''
      }
      this.getTaskList()
    },
    expandChange (row, expandedRows) {},
    uploadTask (val) {
      let userId = sessionStorage.getItem('userId')
      let userName = sessionStorage.getItem('userName')
      uploadAppTaskApi(val.appId, userId, userName)
        .then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.uploadSuccess'),
            type: 'success'
          })
        })
        .catch(err => {
          this.$message.error(this.$t('promptMessage.operationFailed'))
          console.log(err)
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
        let changeDate =
          Y +
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
        return changeDate
      }
    }
  }
}
</script>

<style lang='less'>
.task {
  .el-input--suffix .el-input__inner {
    padding-right: 20px;
  }
  .task-search {
    background-color: #fff;
    padding: 40px;
    .el-form {
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .search-btn {
    text-align: center;
    .el-button {
      padding: 6px 20px;
    }
    .el-button.el-button--default {
      background-color: none;
      color: #688ef3;
      border: 1px solid #688ef3;
    }
    .el-button.el-button--primary {
      background-color: #688ef3;
      color: #fff;
    }
  }
  .el-form--inline .el-form-item {
    width: 100%;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
  .task-content {
    margin-top: 25px;
  }
  .task-content:after {
    content: "";
    display: block;
    clear: both;
  }
  .statusSelect {
    width: 100%;
  }
  .step1 {
    height: 200px;
    p {
      text-align: center;
    }
  }
}
</style>
