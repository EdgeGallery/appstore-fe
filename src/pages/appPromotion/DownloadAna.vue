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
import { getAppdownAnaApi } from '../../tools/api.js'
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
    getMessageType (messageType) {
      switch (messageType) {
        case 'PULL':
          return this.$t('apppromotion.messagePull')
        case 'PUSH':
          return this.$t('apppromotion.messagePush')
        case 'NOTICE':
          return this.$t('apppromotion.messageNotice')
        case 'BE_DOWNLOADED':
          return this.$t('apppromotion.messageBeDownload')
        default:
          return this.$t('apppromotion.messageUnknow')
      }
    },

    getTableEx () {
      return new Promise((resolve, reject) => {
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
                messageType: this.getMessageType(item.messageType),
                sourceAppStore: item.sourceAppStore,
                targetAppStore: item.targetAppStore,
                time: item.time,
                description: item.description,
                industry: item.basicInfo.industry,
                detailInfo: this.$t('apppromotion.checkDetail')
              }
              this.appData.push(appDataItem)
              this.appPackageData.push(appDataItem)
              index++
            }
          )
          resolve(res)
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.getOperatorInfoFailed'),
            type: 'warning'
          })
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
    },
    getProviderNames (appPackageData) {
      let set = new Set()
      this.appPackageData.forEach(
        (item) => {
          set.add(item.provider)
        })
      return set
    },
    getPushNum (name, appPackageData) {
      let number = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.provider && item.messageType === this.getMessageType('PUSH')) {
            number++
          }
        }
      )
      return number
    },
    getNoticeNum (name, appPackageData) {
      let number = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.provider && item.messageType === this.getMessageType('NOTICE')) {
            number++
          }
        }
      )
      return number
    },
    getIndustryNames (appPackageData) {
      let industryNameSet = new Set()
      this.appPackageData.forEach(
        (item) => {
          industryNameSet.add(item.industry)
        })
      return industryNameSet
    },
    getIndustryPullNum (name, appPackageData) {
      let number = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.industry && item.messageType === this.getMessageType('BE_DOWNLOADED')) {
            number++
          }
        }
      )
      return number
    },

    getQuarter (datestr) {
      let month = new Date(datestr).getMonth()
      let m = month + 1
      if (m >= 1 && m <= 3) {
        return 1
      }
      if (m > 3 && m <= 6) {
        return 2
      }
      if (m > 6 && m <= 9) {
        return 3
      }
      if (m > 9 && m <= 12) {
        return 4
      }
    },
    // 获取四个季度的pull app数量
    getPullAppNum (name, appPackageData) {
      let quarter1 = 0
      let quarter2 = 0
      let quarter3 = 0
      let quarter4 = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.provider && item.messageType === this.getMessageType('PULL')) {
            // let date = item.time.split(' ')[0]
            let quarter = this.getQuarter(item.time.split(' ')[0])
            if (quarter === 1) {
              quarter1++
            }
            if (quarter === 2) {
              quarter2++
            }
            if (quarter === 3) {
              quarter3++
            }
            if (quarter === 4) {
              quarter4++
            }
          }
        }
      )
      let pullArr = [quarter1, quarter2, quarter3, quarter4]
      return pullArr
    }
  },
  mounted () {
    // this.getTableData()
    this.getTableEx().then((res) => {
      const myCharts1 = this.$echarts.init(this.$refs.myCharts1)
      const myCharts2 = this.$echarts.init(this.$refs.myCharts2)
      const myCharts3 = this.$echarts.init(this.$refs.myCharts3)

      // echart1
      let industryArr = []
      let nameArr = []
      let industryNames = this.getIndustryNames(this.appPackageData)
      industryNames.forEach(
        (item) => {
          nameArr.push(item)
          let industryPullNum = this.getIndustryPullNum(item, this.appPackageData)
          let providerInfo = {
            value: industryPullNum,
            name: item
          }
          industryArr.push(providerInfo)
        }
      )

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
          data: nameArr
        },
        series: [
          {
            name: '行业',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: industryArr,
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

      // echart2
      let providerArr = []
      let providerNameArr = []
      let providerNames = this.getProviderNames(this.appPackageData)
      providerNames.forEach(
        (item) => {
          providerNameArr.push(item)
          let pushNum = this.getPushNum(item, this.appPackageData)
          let noticeNum = this.getNoticeNum(item, this.appPackageData)
          let providerInfo = {
            provider: item,
            '对外推广': pushNum,
            '收到推广': noticeNum
          }
          providerArr.push(providerInfo)
        }
      )

      let options2 = {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['provider', '对外推广', '收到推广'],
          source: providerArr
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' }
        ]
      }

      // echart3
      let providerAppPullArr = []
      // let providerNames = this.getProviderNames(this.appPackageData)
      providerNames.forEach(
        (item) => {
          providerNameArr.push(item)
          let pullAppNum = this.getPullAppNum(item, this.appPackageData)
          let providerPullInfo = {
            name: item,
            type: 'line',
            stack: '总量',
            data: pullAppNum
          }
          providerAppPullArr.push(providerPullInfo)
        }
      )

      let options3 = {
        title: {
          text: 'APP下载趋势图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: providerNameArr
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
        series: providerAppPullArr
      }
      myCharts1.setOption(options1)
      myCharts2.setOption(options2)
      myCharts3.setOption(options3)
    }).catch(() => {
      this.$message({
        duration: 2000,
        message: this.$t('apppromotion.getPromInfoFailed'),
        type: 'warning'
      })
    })
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
