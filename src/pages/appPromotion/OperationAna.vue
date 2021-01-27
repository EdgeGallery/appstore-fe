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
    <el-breadcrumb
      separator=">"
      class="bread-crumb"
    >
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ $t('nav.home') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $t('nav.appShare') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ $t('nav.appPush') }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="my-app-content">
      <div class="app-list">
        <div
          class="analyseAnaNoData"
          v-if="appPackageData.length < 1"
        >
          <p>暂无操作分析数据</p>
          <img
            src="../../assets/images/construct.png"
            alt="a"
          >
        </div>
        <div
          class="analyseAna"
          v-else
        >
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
            class="mychart3"
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
            prop="name"
            :label="$t('apppromotion.appName')"
            width="200"
          />
          <el-table-column
            prop="provider"
            :label="$t('apppromotion.provider')"
          />
          <el-table-column
            prop="version"
            :label="$t('apppromotion.version')"
            width="180"
          />
          <el-table-column
            prop="messageType"
            :label="$t('apppromotion.messageType')"
            width="180"
          />
          <el-table-column
            prop="sourceAppStore"
            :label="$t('apppromotion.sourceAppStore')"
          />
          <el-table-column
            prop="targetAppStore"
            :label="$t('apppromotion.targetAppStore')"
          />
          <el-table-column
            prop="time"
            :label="$t('apppromotion.dateTime')"
            width="200"
          />
          <el-table-column
            prop="description"
            :label="$t('apppromotion.description')"
          />
          <el-table-column
            prop="detailInfo"
            :label="$t('apppromotion.mesOperation')"
            width="190"
          >
            <template slot-scope="scope">
              <el-button
                @click="showDrawer(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('apppromotion.checkDetail') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-drawer
        :size="width"
        :with-header="false"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <div class="detailInfo">
          <p class="title1">
            应用基本信息
          </p>
          <div />
          <p class="basic_p">
            <span>应用名称：</span>{{ middleData.name }}
          </p>
          <p class="basic_p">
            <span>版本：</span>{{ middleData.version }}
          </p>
          <p class="basic_p">
            <span>厂商：</span>{{ middleData.provider }}
          </p>
          <p class="basic_p">
            <span>架构：</span>{{ middleData.affinity }}
          </p>
          <p class="basic_p">
            <span>行业：</span>{{ middleData.industry }}
          </p>
          <p class="basic_p">
            <span>类型：</span>{{ middleData.type }}
          </p>
          <p class="basic_p">
            <span>应用描述：</span>{{ middleData.shortDesc }}
          </p>
          <p class="title2">
            其他信息
          </p>
          <p class="basic_p">
            <span>源AppStore：</span>{{ middleData.sourceAppStore }}
          </p>
          <p class="basic_p">
            <span>目标AppStore：</span>{{ middleData.targetAppStore }}
          </p>
          <p class="basic_p">
            <span>apt测试状态：</span>{{ middleData.atpTestStatus }}
          </p>
          <p class="basic_p">
            <span>操作描述：</span>{{ middleData.description }}
          </p>
        </div>
      </el-drawer>
      <pagination
        style="margin-bottom: 20px;"
        :table-data="appPackageData"
        @getCurrentPageData="getCurrentPageData"
      />
    </div>
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
      width: '500px',
      visible: false,
      appData: [],
      appPackageData: [],
      currentPageData: [],
      middleData: []
    }
  },
  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer (row) {
      console.log(row)
      this.middleData = JSON.parse(JSON.stringify(row))
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
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
          data.forEach(
            (item) => {
              let appDataItem = {
                name: item.basicInfo.name,
                provider: item.basicInfo.provider,
                version: item.basicInfo.version,
                affinity: item.basicInfo.affinity,
                type: item.basicInfo.type,
                shortDesc: item.basicInfo.shortDesc,
                messageType: this.getMessageType(item.messageType),
                sourceAppStore: item.sourceAppStore,
                targetAppStore: item.targetAppStore,
                time: item.time,
                atpTestStatus: item.atpTestStatus,
                description: item.description,
                industry: item.basicInfo.industry,
                detailInfo: this.$t('apppromotion.checkDetail'),
                messageId: item.messageId
              }
              this.appData.push(appDataItem)
              this.appPackageData.push(appDataItem)
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
    getAppStoreNames (appPackageData) {
      let set = new Set()
      this.appPackageData.forEach(
        (item) => {
          set.add(item.sourceAppStore)
          set.add(item.targetAppStore)
        })
      return set
    },
    getTargetAppStoreSet (appPackageData) {
      let set = new Set()
      this.appPackageData.forEach(
        (item) => {
          set.add(item.targetAppStore)
        })
      return set
    },
    getPushNum (name, appPackageData) {
      let number = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.sourceAppStore && item.messageType === this.getMessageType('PUSH')) {
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
          if (name === item.targetAppStore && item.messageType === this.getMessageType('NOTICE')) {
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
    dateDiff (startDateString, endDateString) {
      var separator = '-'
      var startDates = startDateString.split(separator)
      var endDates = endDateString.split(separator)
      var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2])
      var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2])
      return parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) + 1
    },
    getCurrentTime (date) {
      // let date = new Date()
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      date = Y + '-' + M + '-' + D + ' ' + hours + ':' + minutes + ':' + seconds
      console.log(date)
      return date
    },
    getDateValue (datestr) {
      let dayValue = this.dateDiff(this.getCurrentTime(new Date()).split(' ')[0], datestr)
      console.log(dayValue)
      return dayValue
    },
    getRecent7days () {
      // xxxx-xx-xx --> xx/xx
      let recent7daysStr = []
      let now = new Date()
      let day1 = this.getCurrentTime(now).split(' ')[0]
      let temp1 = day1.split('-')
      let temp2 = temp1.splice(1, 3)
      day1 = temp2[0] + '/' + temp2[1]

      for (let i = 6; i > 0; i--) {
        let preday = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        let daytime = this.getCurrentTime(preday).split(' ')[0]
        let tp1 = daytime.split('-')
        let tp2 = tp1.splice(1, 3)
        daytime = tp2[0] + '/' + tp2[1]
        recent7daysStr.push(daytime)
      }
      recent7daysStr.push(day1)
      console.log(recent7daysStr)
      return recent7daysStr
    },
    // 获取最近七天的pull app数量
    getPullAppNum (name, appPackageData) {
      let day1 = 0
      let day2 = 0
      let day3 = 0
      let day4 = 0
      let day5 = 0
      let day6 = 0
      let day7 = 0
      appPackageData.forEach(
        (item) => {
          if (name === item.targetAppStore && item.messageType === this.getMessageType('PULL')) {
            let days = this.getDateValue(item.time.split(' ')[0])
            if (days === 1) {
              day1++
            }
            if (days === 2) {
              day2++
            }
            if (days === 3) {
              day3++
            }
            if (days === 4) {
              day4++
            }
            if (days === 5) {
              day5++
            }
            if (days === 6) {
              day6++
            }
            if (days === 7) {
              day7++
            }
          }
        }
      )
      let pullArr = [day7, day6, day5, day4, day3, day2, day1]
      return pullArr
    }
  },
  mounted () {
    // this.getTableData()
    console.log(this.appData)
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
          let industryPullNum = this.getIndustryPullNum(item, this.appPackageData)
          if (industryPullNum > 0) {
            nameArr.push(item)
          }
          let providerInfo = {
            value: industryPullNum,
            name: item
          }
          industryArr.push(providerInfo)
        }
      )

      let options1 = {
        title: {
          text: this.$t('apppromotion.hotIndustry'),
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: nameArr
        },
        series: [
          {
            name: this.$t('apppromotion.hotIndustry'),
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: industryArr
          }
        ]
      }

      // echart2
      let appStorePushArr = []
      let appStoreNoticeArr = []
      let allAppStoreArr = []
      let appStoreNames = this.getAppStoreNames(this.appPackageData)
      appStoreNames.forEach(
        (item) => {
          let pushNum = this.getPushNum(item, this.appPackageData)
          let noticeNum = this.getNoticeNum(item, this.appPackageData)
          if (pushNum > 0 || noticeNum > 0) {
            allAppStoreArr.push(item)
            appStorePushArr.push(pushNum)
            appStoreNoticeArr.push(noticeNum)
          }
        }
      )

      let options2 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: [this.$t('apppromotion.pushApp'), this.$t('apppromotion.noticeApp')]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0
            },
            data: allAppStoreArr
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.$t('apppromotion.pushApp'),
            type: 'bar',
            stack: 'name',
            barWidth: 40,
            data: appStorePushArr
          },
          {
            name: this.$t('apppromotion.noticeApp'),
            type: 'bar',
            stack: 'name',
            barWidth: 40,
            data: appStoreNoticeArr
          }
        ]
      }

      // echart3
      let targetAppStorePullArr = []
      let targetAppStoreArr = []
      let targetAppStoreSet = this.getTargetAppStoreSet(this.appPackageData)
      let recent7days = this.getRecent7days()
      targetAppStoreSet.forEach(
        (item) => {
          let pullAppNum = this.getPullAppNum(item, this.appPackageData)
          for (let i = 0; i < pullAppNum.length; i++) {
            if (pullAppNum[i] > 0) {
              targetAppStoreArr.push(item)
              let pullInfo = {
                name: item,
                type: 'line',
                stack: this.$t('apppromotion.totalNum'),
                data: pullAppNum
              }
              targetAppStorePullArr.push(pullInfo)
              break
            }
          }
        }
      )

      let options3 = {
        title: {
          text: this.$t('apppromotion.appDownloadTrend')
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: targetAppStoreArr,
          right: 30,
          top: 30
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0
          },
          data: recent7days
        },
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        series: targetAppStorePullArr
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
<style lang="less">
.my-app {
  // margin-top: 65px;
  .my-app-content {
    background: white;
    padding: 20px;
  }
  //padding: 30px 0;
  .pagination {
    margin: 20px;
  }
}
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
  margin-left:23px;
}
.mychart3{
  width:35%;
  height:300px;
  float:left;
  margin-left:23px;
}
.analyseAna{
  width:100%;
  height:300px;
}
.analyseAnaNoData{
  width:100%;
  height:400px;
  text-align: center;
  line-height: 25px;
}
.detailInfo{
  height:110px;
}
.el-drawer__header{
  display: none;
}
.el-drawer__body{
  overflow-y: auto;
  overflow-x: hidden;
}
.title1{
  height: 36px;
  line-height: 36px;
  margin: 75px 0 15px;
  position:relative;
  z-index: 888;
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
}
.title1::before{
  content:'';
  display:inline-block;
  width:3px;
  height:18px;
  position: relative;
  top:4px;
  background:#409EFF;
}
.title2{
  height: 36px;
  line-height: 36px;
  margin: 25px 0 15px;
  position:relative;
  z-index: 888;
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
}
.title2::before{
  content:'';
  display:inline-block;
  width:3px;
  height:18px;
  position: relative;
  top:4px;
  background:#409EFF;
}
.basic_p{
  padding: 2px;
  font-size: 13px;
  margin-bottom: 5px;
  span{
    display: inline-block;
    margin-left: 30px;
    text-align: left;
    line-height: 25px;
  }
}
</style>
