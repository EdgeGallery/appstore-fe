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
          style="width: 100%"
          border
        >
          <el-table-column
            prop="task.taskNo"
            :label="$t('myApp.taskNumber')"
          />
          <el-table-column
            prop="appName"
            :label="$t('common.appName')"
          />
          <el-table-column
            prop="appVersion"
            :label="$t('common.version')"
            width="90"
          />
          <el-table-column :label="$t('myApp.testStatus')">
            <template slot-scope="scope">
              <span
                class="el-icon-loading primary"
                v-if="scope.row.task.status!=='COMPLETED'"
                title="In Progress"
              />
              <span
                v-else
                class="el-icon-success success"
                title="Completed"
              />
              <el-button
                id="statusBtn"
                style="margin-left:15px;"
                type="text"
                size="small"
                @click="getData(scope.row.task.taskNo,scope.row.appId,scope.row.task.taskId,scope.row.step)"
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
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                id="checkReportBtn"
                @click="handleClick(scope.row)"
                type="text"
                :disabled="scope.row.task.status==='COMPLETED'?false:true"
                size="small"
              >
                {{ $t('myApp.checkReport') }}
              </el-button>
              <el-button
                id="uploadBtn"
                type="text"
                size="small"
                :disabled="scope.row.task.status==='COMPLETED'?false:true"
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
    <el-dialog
      :visible.sync="dialogVisible23"
      :title="dialogTitle"
    >
      <el-table
        :data="caseList"
        style="width: 100%"
      >
        <el-table-column
          prop="testcaseid"
          label="Case Id"
          width="80"
        />
        <el-table-column
          prop="name"
          label="Name"
          sortable
        />
        <el-table-column label="Progress">
          <template slot-scope="scope">
            <div>
              <el-progress
                :percentage="scope.row.percentage"
                :color="customColors"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="160"
        >
          <template slot-scope="scope">
            <span :class="scope.row.status==='IN_PROGRESS'?'red':'green'">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogVisible1"
      title="Environmental Preparation"
    >
      <div class="step1">
        <el-row :gutter="20">
          <el-col
            :span="8"
            class="chartPie"
          >
            <ve-pie
              :extend="chartExtend"
              :settings="chartSettings"
              :data="chartData"
              height="165px"
            />
            <p>Chart1-1:CPU Usage Info</p>
          </el-col>
          <el-col
            :span="8"
            class="chartLine"
          >
            <ve-pie
              :extend="chartExtend"
              :settings="chartSettings"
              :data="chartData1"
              height="165px"
            />
            <p>Chart1-2:GPU Usage Info</p>
          </el-col>
          <el-col
            :span="8"
            class="chartLine"
          >
            <ve-pie
              :extend="chartExtend"
              :settings="chartSettings"
              :data="chartData2"
              height="165px"
            />
            <p>Chart1-3:Memory Usage Info</p>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskListApi,
  // taskListApp,
  getSubTasksApi,
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
      chartData: {
        columns: ['type', 'total'],
        rows: [
          { type: 'Occupyed', total: 2 },
          { type: 'Usable', total: 6 }
        ]
      },
      chartData1: {
        columns: ['type', 'total'],
        rows: [
          { type: 'Occupyed', total: 4 },
          { type: 'Usable', total: 2 }
        ]
      },
      chartData2: {
        columns: ['type', 'total'],
        rows: [
          { type: 'Occupyed', total: 265 },
          { type: 'Usable', total: 850 }
        ]
      },
      chartSettings: {
        radius: 50,
        offsetY: 70
      },
      chartExtend: {
        color: ['#fa6e86', '#19d4ae'],
        legend: {
          bottom: 100,
          left: 'bottom'
        }
      },
      form: {
        appName: '',
        status: '',
        beginTime: '',
        endTime: ''
      },
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#6f7ad3', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#5cb87a', percentage: 100 }
      ],
      dialogVisible23: false,
      dialogVisible1: false,
      pageData: [],
      caseList: [],
      options: [
        {
          value: 1,
          label: 'Environmental preparation'
        },
        {
          value: 2,
          label: 'Test preparation'
        },
        {
          value: 3,
          label: 'Test execution'
        },
        {
          value: 4,
          label: 'IN_PROGRESS'
        },
        {
          value: 5,
          label: 'COMPLETED'
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
    handleClick (val) {
      sessionStorage.setItem('taskData', JSON.stringify(val))
      this.$router.push('/atpreport')
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
        res => {
          let data = res.data.tasks
          data.forEach((item, index) => {
            let newDateBegin = this.dateChange(item.task.beginTime)
            item.task.beginTime = newDateBegin
            let newDateEnd = this.dateChange(item.task.endTime)
            item.task.endTime = newDateEnd
            if (item.task.status === 'COMPLETED') {
              item.step = 4
            } else if (item.task.status === 'Environmental preparation') {
              item.endTime = ''
              item.step = 1
            } else if (item.task.status === 'Test preparation') {
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
    getData (num, appId, taskId, step) {
      if (step === 2 || step === 3) {
        this.dialogTitle = 'Test Execution'
        getSubTasksApi(appId, taskId).then(res => {
          let data = res.data.subTasks
          data.forEach((item, index) => {
            item.testcaseid = index + 1
            const crypto = window.crypto || window.msCrypto
            let randomArr = crypto.getRandomValues(new Uint8Array(1) * 0.001)
            item.name =
              'csar-validate-r13390' +
              'mectest' +
              Math.floor(randomArr * 10 + 1)
            if (step === 2) {
              this.dialogTitle = 'Test Preparation'
              item.percentage = 0
              item.status = 'IN_PROGRESS'
            } else {
              if (item.status === 'COMPLETED') {
                item.percentage = 100
              } else {
                item.percentage = Math.floor(randomArr * 99 + 1)
              }
            }
          })
          this.caseList = data
        })
        this.dialogVisible23 = true
      } else if (step === 1) {
        this.dialogVisible1 = true
      } else {
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.completedTest'),
          type: 'success'
        })
      }
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
