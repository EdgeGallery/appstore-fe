<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="report padding56">
    <div class="report-content padding20">
      <div class="download">
        <el-button
          size="large"
          type="primary"
          icon="el-icon-download"
          plain
          @click="downLoadReport()"
        >
          {{ $t('report.downloadReport') }}
        </el-button>
      </div>
      <div class="report-tap">
        <h3> {{ $t('report.testReport') }}</h3>
      </div>
      <div class="title">
        {{ $t('atp.baseInfo') }}
      </div>
      <div class="report-app--info">
        <el-row :gutter="20">
          <el-col
            :span="23"
            class="app-table"
          >
            <el-table
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="appName"
                :label="$t('atp.applicationName')"
              />
              <el-table-column
                prop="appVersion"
                :label="$t('atp.version')"
              />
              <el-table-column
                prop="providerId"
                :label="$t('myApp.provider')"
              />
              <el-table-column
                prop="user.userName"
                :label="$t('report.uploadUser')"
              />
              <el-table-column
                prop="createTime"
                :label="$t('atp.startTime')"
              />
              <el-table-column
                prop="endTime"
                :label="$t('atp.endTime')"
              />
              <el-table-column
                :label="$t('atp.result')"
                width="180"
              >
                <template slot-scope="scope">
                  <span
                    :class="scope.row.status==='success'?'success':'failed'"
                  >{{ scope.row.status }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="report-chart">
        <div class="title">
          {{ $t('report.reportanalysis') }}
        </div>
        <div>
          <el-row :gutter="20">
            <el-col
              :span="12"
              class="chartPie"
            >
              <ve-pie :data="chartData" />
            </el-col>
            <el-col
              :span="10"
              class="chartLine"
              style="margin-top:40px;"
            >
              <el-table
                :data="modelData"
                border
                stripe
              >
                <el-table-column
                  prop="model"
                  :label="$t('report.model')"
                />
                <el-table-column
                  prop="success"
                  :label="$t('atp.success')"
                />
                <el-table-column
                  prop="fail"
                  :label="$t('atp.failed')"
                />
                <el-table-column
                  prop="passRate"
                  :label="$t('report.rate')"
                />
              </el-table>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="title">
            {{ $t('report.reportDetail') }}
          </div>
          <el-row :gutter="20">
            <el-col :span="23">
              <el-collapse
                v-model="activeNames"
              >
                <el-collapse-item
                  :title="$t('atp.security')"
                  name="securityTest"
                >
                  <el-table
                    :data="securityTest"
                  >
                    <el-table-column
                      prop="name"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="result"
                      :label="$t('atp.result')"
                    />
                    <el-table-column
                      prop="reason"
                      :label="$t('report.failReason')"
                    />
                    <el-table-column
                      prop="verificationModel"
                      :label="$t('report.model')"
                    />
                  </el-table>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('atp.complianceTest')"
                  name="complianceTest"
                >
                  <el-table
                    :data="complianceTest"
                  >
                    <el-table-column
                      prop="name"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="result"
                      :label="$t('atp.result')"
                    />
                    <el-table-column
                      prop="reason"
                      :label="$t('report.failReason')"
                    />
                    <el-table-column
                      prop="verificationModel"
                      :label="$t('report.model')"
                    />
                  </el-table>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('atp.sandboxTest')"
                  name="sandboxTest"
                >
                  <el-table
                    :data="sandboxTest"
                  >
                    <el-table-column
                      prop="name"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="result"
                      :label="$t('atp.result')"
                    />
                    <el-table-column
                      prop="reason"
                      :label="$t('report.failReason')"
                    />
                    <el-table-column
                      prop="verificationModel"
                      :label="$t('report.model')"
                    />
                  </el-table>
                </el-collapse-item>
              </el-collapse>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Atp } from '../../tools/api.js'
import { TESTNAME } from '../../tools/testdataname.js'
import { processApi } from '../../tools/api.js'
export default {
  name: 'Atpreport',
  props: {
    dataurl: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      // currUrl: window.location.href,
      taskId: '',
      tableData: [],
      modelData: [
        {
          model: '社区标准',
          success: 0,
          fail: 0,
          passRate: 0
        }, {
          model: '移动企标',
          success: 0,
          fail: 0,
          passRate: 0
        }, {
          model: '联通企标',
          success: 0,
          fail: 0,
          passRate: 0
        }, {
          model: '电信企标',
          success: 0,
          fail: 0,
          passRate: 0
        }, {
          model: '自定义标准',
          success: 0,
          fail: 0,
          passRate: 0
        }
      ],
      activeNames: ['securityTest'],
      securityTest: [],
      complianceTest: [],
      sandboxTest: [],
      chartData: {
        columns: ['status', 'case'],
        rows: [
          { status: '社区标准用例数', case: 0 },
          { status: '移动企标用例数', case: 0 },
          { status: '联通企标用例数', case: 0 },
          { status: '电信企标用例数', case: 0 },
          { status: '自定义标准用例数', case: 0 }
        ]
      }
    }
  },
  mounted () {
    // this.getTaskId()
    this.getReport()
  },
  methods: {
    // 待修改，截取taskid
    // getTaskId () {
    //   this.taskId = this.dataurl.split('=')[1]
    // },
    getReport () {
      processApi(this.dataurl).then(res => {
        this.tableData.push(res.data)
        this.tableData.forEach(item => {
          let newDateBegin = this.dateChange(item.createTime)
          item.createTime = newDateBegin
          let newDateEnd = this.dateChange(item.endTime)
          item.endTime = newDateEnd
        })
        let testCaseDetail = res.data.testCaseDetail
        for (const key in testCaseDetail) {
          let casedata = testCaseDetail[key][0]
          for (const keyin in casedata) {
            let obj = {
              name: '',
              result: '',
              reason: '',
              verificationModel: ''
            }
            obj.name = keyin
            obj.result = casedata[keyin].result
            obj.reason = casedata[keyin].reason
            obj.verificationModel = casedata[keyin].verificationModel
            if (key === 'securityTest') {
              this.securityTest.push(obj)
            } else if (key === 'complianceTest') {
              this.complianceTest.push(obj)
            } else {
              this.sandboxTest.push(obj)
            }
          }
        }
        this.getModelData()
        this.getChartData()
      })
    },
    getModelData () {
      // 模板data
      this.securityTest.forEach(item => {
        if (item.result === 'success') {
          item.reason = '---'
        }
        if (item.verificationModel.indexOf('EdgeGallery') !== -1) {
          if (item.result === 'success') {
            this.modelData[0].success++
          } else {
            this.modelData[0].fail++
          }
        }
        if (item.verificationModel.indexOf('Mobile') !== -1) {
          if (item.result === 'success') {
            this.modelData[1].success++
          } else {
            this.modelData[1].fail++
          }
        }
        if (item.verificationModel.indexOf('Unicom') !== -1) {
          if (item.result === 'success') {
            this.modelData[2].success++
          } else {
            this.modelData[2].fail++
          }
        }
        if (item.verificationModel.indexOf('Telecom') !== -1) {
          if (item.result === 'success') {
            this.modelData[3].success++
          } else {
            this.modelData[3].fail++
          }
        }
        if (item.verificationModel.indexOf('Definition') !== -1) {
          if (item.result === 'success') {
            this.modelData[4].success++
          } else {
            this.modelData[4].fail++
          }
        }
      })
      this.complianceTest.forEach(item => {
        if (item.result === 'success') {
          item.reason = '---'
        }
        if (item.verificationModel.indexOf('EdgeGallery') !== -1) {
          if (item.result === 'success') {
            this.modelData[0].success++
          } else {
            this.modelData[0].fail++
          }
        }
        if (item.verificationModel.indexOf('Mobile') !== -1) {
          if (item.result === 'success') {
            this.modelData[1].success++
          } else {
            this.modelData[1].fail++
          }
        }
        if (item.verificationModel.indexOf('Unicom') !== -1) {
          if (item.result === 'success') {
            this.modelData[2].success++
          } else {
            this.modelData[2].fail++
          }
        }
        if (item.verificationModel.indexOf('Telecom') !== -1) {
          if (item.result === 'success') {
            this.modelData[3].success++
          } else {
            this.modelData[3].fail++
          }
        }
        if (item.verificationModel.indexOf('Definition') !== -1) {
          if (item.result === 'success') {
            this.modelData[4].success++
          } else {
            this.modelData[4].fail++
          }
        }
      })
      this.sandboxTest.forEach(item => {
        if (item.result === 'success') {
          item.reason = '---'
        }
        if (item.verificationModel.indexOf('EdgeGallery') !== -1) {
          if (item.result === 'success') {
            this.modelData[0].success++
          } else {
            this.modelData[0].fail++
          }
        }
        if (item.verificationModel.indexOf('Mobile') !== -1) {
          if (item.result === 'success') {
            this.modelData[1].success++
          } else {
            this.modelData[1].fail++
          }
        }
        if (item.verificationModel.indexOf('Unicom') !== -1) {
          if (item.result === 'success') {
            this.modelData[2].success++
          } else {
            this.modelData[2].fail++
          }
        }
        if (item.verificationModel.indexOf('Telecom') !== -1) {
          if (item.result === 'success') {
            this.modelData[3].success++
          } else {
            this.modelData[3].fail++
          }
        }
        if (item.verificationModel.indexOf('Definition') !== -1) {
          if (item.result === 'success') {
            this.modelData[4].success++
          } else {
            this.modelData[4].fail++
          }
        }
      })
    },
    getChartData () {
      // 通过率
      for (let index = 0; index < this.modelData.length; index++) {
        let chartitem = this.chartData.rows[index]
        const item = this.modelData[index]
        chartitem.case = item.success + item.fail
        item.passRate = (item.success / (item.success + item.fail) * 100).toFixed(2) + '%'
      }
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
    },
    changeName () {
      if (this.language === 'en') {
        this.TestDataSum[0].name = TESTNAME[0].label[1]
        this.TestDataSum[1].name = TESTNAME[1].label[1]
        this.TestDataSum[2].name = TESTNAME[2].label[1]
      } else if (this.language === 'cn') {
        this.TestDataSum[0].name = TESTNAME[0].label[0]
        this.TestDataSum[1].name = TESTNAME[1].label[0]
        this.TestDataSum[2].name = TESTNAME[2].label[0]
      }
    },
    downLoadReport () {
      // Atp.downLoadReportApi(this.taskId).then(res => {
      //   this.$message({
      //     duration: 2000,
      //     message: this.$t('promptMessage.downloadSuccess'),
      //     type: 'success'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     duration: 2000,
      //     message: this.$t('promptMessage.downloadFail'),
      //     type: 'warning'
      //   })
      // })
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      // this.changeName()
    }
  }
}
</script>

<style lang='less' scoped>
.report {
  .report-content {
    background: white;
    background-image: url('../../assets/images/edgegallery.png');
    .download{
      text-align: right;
      margin-right: 30px;
    }
    .report-tap {
      h3 {
        text-align: center;
        // margin: 25px 0;
        font-size: 25px;
        color: #55565df2;
      }
      p {
        color: #3399ff;
        text-align: center;
      }
    }
    .app-img {
      text-align: center;
      border: 1px solid #ddd;
      border-right: 0;
      height: 97px;
      img {
        width: 85px;
      }
    }
    .app-table {
      padding-left: 0 !important;
      margin-left: 25px;
    }
    .title {
      margin: 15px 0;
    }
    .title::before {
      content: "";
      display: inline-block;
      width: 3px;
      background: #3399ff;
      height: 20px;
      position: relative;
      top: 5px;
    }
    .report-chart {
      margin: 25px 0;
      .el-table thead {
          color: #909399;
          font-weight: 800;
          th{
            background: #f5f5f6;
          }
        }
          .el-collapse-item__header{
            font-size: 16px;
            background-color: #FAFAFA;
            margin-left: 20px;
          }
    }
  }
}
</style>
