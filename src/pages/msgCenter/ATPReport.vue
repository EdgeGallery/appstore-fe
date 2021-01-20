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
  <div class="report padding20">
    <div class="report-content">
      <div class="logo">
        <img
          src="../../assets/images/logo.png"
          alt=""
        >
        <div class="report-tap">
          <h3> {{ $t('report.testReport') }}</h3>
          <img
            :src="resulticon"
            alt=""
          >
        </div>
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
        <div class="report_analysis">
          <el-row :gutter="20">
            <el-col
              :span="12"
            >
              <div class="left">
                <div
                  class="sumchart"
                  id="leftchart"
                />
                <el-table :data="chartData">
                  <el-table-column
                    prop="name"
                    :label="$t('report.model')"
                  >
                    <template slot-scope="scope">
                      <span
                        v-if="scope.row.name==='社区标准'"
                        class="modelone"
                      />
                      <span
                        v-else-if="scope.row.name==='移动企标'"
                        class="modeltwo"
                      />
                      <span
                        v-else-if="scope.row.name==='联通企标'"
                        class="modelthree"
                      />
                      <span
                        v-else-if="scope.row.name==='电信企标'"
                        class="modelfour"
                      />
                      <span
                        v-else-if="scope.row.name==='自定义标准'"
                        class="modelfive"
                      />
                      <span>{{ scope.row.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    label="数量"
                    width="100"
                  />
                </el-table>
              </div>
            </el-col>
            <el-col
              :span="12"
            >
              <div
                class="detailchart"
                id="rightchart"
              />
            </el-col>
          </el-row>
        </div>
        <div class="report_detail">
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
      successData: [],
      failData: [],
      passRateData: [],
      activeNames: ['securityTest'],
      securityTest: [],
      complianceTest: [],
      sandboxTest: [],
      chartData: [
        { name: '社区标准', value: 0 },
        { name: '移动企标', value: 0 },
        { name: '联通企标', value: 0 },
        { name: '电信企标', value: 0 },
        { name: '自定义标准', value: 0 }
      ],
      resulticon: ''
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
        if (this.tableData[0].status === 'success') {
          this.resulticon = require('../../assets/images/chenggong.png')
        } else {
          this.resulticon = require('../../assets/images/shibai.png')
        }
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
        this.getRightChart()
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
        let chartitem = this.chartData[index]
        const item = this.modelData[index]
        chartitem.value = item.success + item.fail
        // item.passRate = (item.success / (item.success + item.fail) * 100).toFixed(2) + '%'
        item.passRate = (item.success / (item.success + item.fail) * 100).toFixed(2)
      }
      this.drawLeftLine()
    },
    getRightChart () {
      this.modelData.forEach((item) => {
        this.successData.push(item.success)
        this.failData.push(item.fail)
        this.passRateData.push(item.passRate)
      })
      this.drawRightLine()
    },
    drawLeftLine () {
      let Chart = this.$echarts.init(document.getElementById('leftchart'))
      let colors = ['#89a6e6', '#a8d89b', '#9ed0c9', '#deba69', '#baa3d4']
      let option = {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '认证模板',
            type: 'pie',
            radius: ['20%', '40%'],
            avoidLabelOverlap: false,
            labelLine: {
              show: false
            },
            data: this.chartData
          }
        ]
      }
      Chart.setOption(option)
    },
    drawRightLine () {
      let passChart = this.$echarts.init(document.getElementById('rightchart'))
      var colors = ['#89a6e6', '#f59898', '#675bba']
      let option = {
        color: colors,
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          right: '25%'
        },
        legend: {
          left: 10,
          data: ['成功数量', '失败数量', '通过率']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: ['社区标准', '移动企标', '联通企标', '电信企标', '自定义标准']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '成功数量',
            min: 0,
            max: 80,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '失败数量',
            min: 0,
            max: 80,
            position: 'right',
            offset: 80,
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '成功率',
            min: 0,
            max: 100,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '成功数量',
            type: 'bar',
            data: this.successData
          },
          {
            name: '失败数量',
            type: 'bar',
            yAxisIndex: 1,
            data: this.failData
          },
          {
            name: '通过率',
            type: 'line',
            symbolSize: 15,
            lineStyle: {
              color: '#6c50f3'
            },
            yAxisIndex: 2,
            data: this.passRateData
          }
        ]
      }
      passChart.setOption(option)
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

<style lang='less'>
.report {
  .report-content {
    background: white;
    background-image: url('../../assets/images/edgegallery.png');
     .logo {
      display: flex;
      justify-content: space-between;
      height: 65px;
      line-height: 65px;
      padding-left: 25px;
      img {
        height: 65px;
      }
      .report-tap {
        display: flex;
        margin: auto;
        line-height: 65px;
        img{
          margin-top: 5px;
          width: 50px;
          height: 50px;
          line-height: 65px;
        }
        h3 {
          text-align: center;
          font-size: 25px;
          color: #55565df2;
        }
        p {
          color: #3399ff;
          text-align: center;
        }
      }
      .download{
        text-align: right;
        margin-right: 30px;
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
      font-size: 20px;
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
      .report_analysis{
        .left{
          display: flex;
          .el-table{
            margin-top: 45px;
          }
          .el-table::before{
            background-color: #fff;
          }
        }
        .sumchart{
          width: 60%;
          height: 400px;
        }
        .modelone,.modeltwo,.modelthree,.modelfour,.modelfive{
          width: 8px;
            height: 8px;
            display: inline-block;
            margin-right: 10px;
            border-radius: 50%;
        }
        .modelone{
          background-color: #89a6e6;
        }
        .modeltwo{
          background-color: #a8d89b;
        }
        .modelthree{
          background-color: #9ed0c9;
        }
        .modelfour{
          background-color: #deba69;
        }
        .modelfive{
          background-color: #baa3d4;
        }
        .detailchart{
          width: 100%;
          height: 400px;
        }
      }
      .report_detail{
        .el-collapse-item__header{
            font-size: 17px;
            background-color: #FAFAFA;
            padding-left: 20px;
          }
        // .el-collapse-item__header:before {
        //   content: "";
        //   display: inline-block;
        //   border: 8px solid #fff;
        //   border-left-color: rgb(101, 129, 221);
        //   border-right: 0;
        //   position: relative;
        //   right: 10px;
        //   animation: rotate 1s infinite;
        // }
        // .isActive{
        //   animation: rotate 1s infinite;
        // }
        // @keyframes rotate {
        //   from {
        //       transform: rotate(0deg);
        //   }
        //   to {
        //       transform: rotate(90deg);
        //   }
        // }
      }
    }
    @media screen and (max-width: 1380) {
      .sumchart{
          width: 60%;
          height: 300px;
      }
    }
    .el-table{
      font-size: 16px;
    }
  }
}
</style>
