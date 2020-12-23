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
  <div>
    <div class="app-list">
      <div class="analyseAna">
        <div
          class="mychart"
          id="myCharts1"
          ref="myCharts1"
        />
        <div
          class="mychart"
          id="myCharts2"
          ref="myCharts2"
        />
        <div
          class="mychart2"
          id="myCharts3"
          ref="myCharts3"
        />
      </div>
      <el-table
        :data="currentPageData"
        border
        stripe="true"
        style="width: 100%"
        :header-cell-style="{ background: '#eeeeee'}"
      >
        <el-table-column
          prop="number"
          :label="$t('apppromotion.number')"
          width="120"
        />
        <el-table-column
          prop="name"
          :label="$t('apppromotion.appName')"
          width="200"
        />
        <el-table-column
          prop="provider"
          :label="$t('apppromotion.provider')"
          width="185"
        />
        <el-table-column
          prop="version"
          :label="$t('apppromotion.version')"
          width="110"
        />
        <el-table-column
          prop="messageType"
          :label="$t('apppromotion.messageType')"
          width="110"
        />
        <el-table-column
          prop="sourceAppStore"
          :label="$t('apppromotion.sourceAppStore')"
          width="200"
        />
        <el-table-column
          prop="targetAppStore"
          :label="$t('apppromotion.targetAppStore')"
          width="200"
        />
        <el-table-column
          prop="time"
          :label="$t('apppromotion.dateTime')"
          width="200"
        />
        <el-table-column
          prop="description"
          :label="$t('apppromotion.description')"
          width="200"
        />
        <el-table-column
          prop="detailInfo"
          :label="$t('apppromotion.mesOperation')"
          width="200"
        />
      </el-table>
    </div>
    <pagination
      :table-data="appPackageData"
      @getCurrentPageData="getCurrentPageData"
    />
  </div>
</template>

<script>
import { deleteAppApi, getAppdownAnaApi } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    pagination
  },
  data () {
    return {
      appData: [],
      appPackageData: [],
      currentPageData: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getTableData () {
      this.appPackageData = []
      getAppdownAnaApi().then((res) => {
        let data = res.data
        let index = 1
        data.forEach(
          (item) => {
            let appDataItem = {
              number: index,
              name: item.basicInfo.name,
              provider: item.basicInfo.provider,
              version: item.basicInfo.version,
              messageType: item.messageType,
              sourceAppStore: item.sourceAppStore,
              targetAppStore: item.targetAppStore,
              time: item.time,
              description: item.description,
              detailInfo: this.$t('apppromotion.checkDetail')
            }
            this.appData.push(appDataItem)
            this.appPackageData.push(appDataItem)
            index++
          }
        )
        if (data.length !== 0) {
        }
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.getOperatorInfoFailed'),
          type: 'warning'
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    isDisabled (deleteRow) {
      if (deleteRow.userId === sessionStorage.getItem('userId')) {
        return false
      }
    },
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
    },
    deleteRow (row) {
      this.$confirm(
        this.$t('promptMessage.deletePrompt'),
        this.$t('promptMessage.prompt'),
        {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          deleteAppApi(row.appId, userId, userName)
            .then((res) => {
              this.$emit('getAppData')
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.deleteSuccess'),
                type: 'success'
              })
            })
            .catch(() => {
              this.$message({
                duration: 2000,
                message: this.$t('promptMessage.operationFailed'),
                type: 'warning'
              })
            })
        })
        .catch(() => {})
    }
  },
  mounted () {
    const myCharts1 = this.$echarts.init(this.$refs.myCharts1)
    const myCharts2 = this.$echarts.init(this.$refs.myCharts2)
    const myCharts3 = this.$echarts.init(this.$refs.myCharts3)
    let options1 = {
      title: {
        text: '最受欢迎的边缘应用行业分布',
        subtext: '仅供参考',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['APP1', 'APP2', 'APP3', 'APP4', 'APP5']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'APP1' },
            { value: 310, name: 'APP2' },
            { value: 234, name: 'APP3' },
            { value: 135, name: 'APP4' },
            { value: 1548, name: 'APP5' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    // options2
    let options2 = {
      title: {
        text: '应用推广次数'
      },
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '对外推广', '收到推广'],
          ['移动', 43, 85],
          ['联通', 83, 73],
          ['电信', 86, 65]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
      ]
    }

    // APP下载趋势图
    let options3 = {
      title: {
        text: 'APP下载趋势图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['联通', '移动', '电信']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['第一季度', '第二季度', '第三季度', '第四季度']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '联通',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134]
        },
        {
          name: '移动',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234]
        },
        {
          name: '电信',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154]
        }
      ]
    }
    myCharts1.setOption(options1)
    myCharts2.setOption(options2)
    myCharts3.setOption(options3)
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.app-list {
  .el-table {
    font-size: 14px;
  }
  padding: 20px 0;
  .pagination {
    margin: 20px;
  }
}
.mychart{
  width:30%;
  height:300px;
  float:left;
  margin-left:30px;
}
.mychart2{
  width:30%;
  height:260px;
  float:left;
  margin-left:30px;
}
.analyseAna{
  width:100%;
  height:300px;
}
</style>
