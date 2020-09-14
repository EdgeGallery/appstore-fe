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
  <div class="report padding56">
    <div class="report-content padding20">
      <div class="report-tap">
        <h3>ATP report</h3>
        <p>{{ $t('atp.ticketNumber') }}: {{ taskNo }}</p>
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
                :label="$t('common.applicationName')"
              />
              <el-table-column
                prop="appVersion"
                :label="$t('common.version')"
              />
              <el-table-column
                prop="appName"
                :label="$t('common.userName')"
              />
              <el-table-column
                prop="task.beginTime"
                :label="$t('atp.startTime')"
              />
              <el-table-column
                prop="task.endTime"
                :label="$t('atp.endTime')"
              />
              <el-table-column
                :label="$t('atp.result')"
                width="180"
              >
                <template slot-scope="scope">
                  <span
                    :class="scope.row.task.status==='Success'?'success':'failed'"
                  >{{ scope.row.task.status }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="title">
        {{ $t('atp.detail') }}
      </div>
      <div class="report-chart">
        <el-row :gutter="20">
          <el-col
            :span="23"
            class="app-table"
          >
            <el-tabs type="card">
              <el-tab-pane :label="$t('atp.testReport')">
                <template>
                  <ve-pie
                    :data="chartData1"
                  />
                </template>
              </el-tab-pane>
              <el-tab-pane :label="$t('atp.step1')">
                <template>
                  <el-table
                    :data="VirusScanDate"
                    border
                  >
                    <el-table-column
                      prop="caseName"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="caseDetail"
                      :label="$t('atp.caseDetail')"
                    />
                    <el-table-column
                      prop="testResult"
                      :label="$t('atp.result')"
                    />
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane :label="$t('atp.step2')">
                <template>
                  <el-table
                    :data="ComplianceTestDate"
                    border
                  >
                    <el-table-column
                      prop="caseName"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="caseDetail"
                      :label="$t('atp.caseDetail')"
                    />
                    <el-table-column
                      prop="testResult"
                      :label="$t('atp.result')"
                    />
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane :label="$t('atp.step3')">
                <template>
                  <el-table
                    :data="SandboxTestDate"
                    border
                  >
                    <el-table-column
                      prop="caseName"
                      :label="$t('atp.caseName')"
                    />
                    <el-table-column
                      prop="caseDetail"
                      :label="$t('atp.caseDetail')"
                    />
                    <el-table-column
                      prop="testResult"
                      :label="$t('atp.result')"
                    />
                  </el-table>
                </template>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data () {
    return {
      tableData: [],
      SandboxTestDate: [],
      ComplianceTestDate: [],
      VirusScanDate: [],
      taskNo: '',
      chartData1: {
        columns: ['status', 'case'],
        rows: [{ status: 'Virus Scan', case: 4 }, { status: 'Compliance Test', case: 1 }, { status: 'Sandbox Test', case: 1 }]
      }
    }
  },
  mounted () {
    this.tableData.push(JSON.parse(sessionStorage.getItem('taskData')))
    this.taskNo = this.tableData[0].task.taskNo
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.report {
  .report-content {
    background: white;
    .report-tap {
      padding: 20px 0;
      h3 {
        text-align: center;
        margin: 25px 0;
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
      margin-top: 25px;
    }
  }
}
</style>
