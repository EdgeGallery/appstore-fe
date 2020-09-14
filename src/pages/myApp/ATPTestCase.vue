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
  <div class="testcase padding56">
    <div class="testcase-content padding20">
      <div class="testcase-tap">
        <h3>测试用例管理</h3>
        <p>任务序号: {{ taskNo }}</p>
      </div>
      <div class="title">
        {{ $t('report.baseInfo') }}
      </div>
      <div class="report-app--info">
        <el-row :gutter="20">
          <el-col
            :span="22"
            class="app-table"
          >
            <el-table
              :data="tableData"
              border
              style="width: 100%"
            >
              <el-table-column
                fixed
                prop="task.taskNo"
                :label="$t('myApp.taskNumber')"
                width="250"
              />
              <el-table-column
                prop="appVersion"
                :label="$t('common.version')"
                width="120"
              />
              <el-table-column
                prop="appName"
                :label="$t('report.packageName')"
              />
              <el-table-column
                prop="uploadUser"
                :label="$t('report.uploadUser')"
              />
              <el-table-column
                prop="task.beginTime"
                :label="$t('report.startTime')"
                width="200"
              />
              <el-table-column
                prop="task.endTime"
                :label="$t('report.endTime')"
                width="200"
              />
            </el-table>
          </el-col>
        </el-row>
      </div>
      <div class="testCasetitle">
        <div class="title">
          {{ $t('atp.testCase') }}
        </div>
        <div class="case-main">
          <div class="test-tree">
            <el-tree
              :data="testCase"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </div>
          <div class="case-detail">
            <el-table
              :data="caseData"
              style="width: 100%"
              :row-style="tableRowStyle"
            >
              <el-table-column
                fixed
                prop="casename"
                label="用例名称"
                width="300"
              />
              <el-table-column
                prop="Prerequisites"
                label="预置条件"
                width="300"
              />
              <el-table-column
                prop="testprocedure"
                label="测试步骤"
                width="300"
              />
              <el-table-column
                prop="expectedresult"
                label="预期结果"
                width="300"
              />
            </el-table>
          </div>
        </div>
        <div class="start-button">
          <el-button
            id="start_test_button"
            type="primary"
            @click="jumpTo"
          >
            {{ $t('atp.startTest') }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestCase',
  data () {
    return {
      testCase: [
        {
          label: '病毒扫描',
          children: [
            {
              label: '待添加'
            }
          ]
        },
        {
          label: '遵从性测试',
          children: [
            {
              label: '应用打包规范检测',
              children: [
                { label: 'CSAR包校验' },
                { label: 'TOSCA校验' }
              ]
            }
          ]
        },
        {
          label: '沙箱测试',
          children: [
            { label: '部署测试' },
            { label: '健康检查' },
            { label: '卸载测试' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      caseData: [
        {
          casename: '遵从性测试',
          Prerequisites: '遵从性测试',
          testprocedure: '遵从性测试',
          expectedresult: 'PASS'
        },
        {
          casename: '遵从性测试',
          Prerequisites: '遵从性测试',
          testprocedure: '遵从性测试',
          expectedresult: 'PASS'
        },
        {
          casename: '遵从性测试',
          Prerequisites: '遵从性测试',
          testprocedure: '遵从性测试',
          expectedresult: 'PASS'
        },
        {
          casename: '遵从性测试',
          Prerequisites: '遵从性测试',
          testprocedure: '遵从性测试',
          expectedresult: 'PASS'
        }
      ],
      taskNo: ''
    }
  },
  mounted () {
    // this.tableData.push(JSON.parse(sessionStorage.getItem('taskData')))
    // this.taskNo = this.tableData[0].task.taskNo
  },
  methods: {
    tableRowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'background-color:#ffffff;'
      } else if (rowIndex % 2 === 1) {
        return 'background-color:#a4c6ca;'
      }
      return ''
    },
    jumpTo () {
      this.$router.push('atpprocess')
    }

  }
}
</script>

<style lang='less' scoped>
.testcase {
  .testcase-content {
    background: white;
    .testcase-tap {
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
    .testCasetitle{
      padding-top: 20px;
      .case-main{
        display: flex;
        justify-content: space-around;
        .test-tree{
          width: 300px;
          padding-top: 16px;
          // margin-left: 25px;
          background-color: #fafafa;
          .el-tree{
            background-color: #fafafa;
            // .el-tree-node__content{
            //   background-color: #47b4bf;
            // }

          }
        }
        .case-detail{
          // margin-left: 50px;
          // .el-table-row{
          //   background-color: #688ef3;
          // }
          .el-table__body tr:hover>td{
            background-color: #e1e7f0!important;
          }
        }
      }
      .start-button{
        text-align: center;
        margin-top: 30px;
        #start_test_button{
          color: #fff;
          background-color: #5abdc7;
          border-color: #5abdc7;
        }
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
  }
}
</style>
