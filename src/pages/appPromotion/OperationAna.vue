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
  <div class="my-app common_bg">
    <div class="common_title defaultFontBlod">
      {{ $t("nav.operAna") }}
    </div>
    <div class="chart-content">
      <div
        class="analyseAnaNoData"
        v-if="appPackageDataChart.length < 1"
      >
        <p style="color:#fff">
          {{ $t('apppromotion.haveNoAnaData') }}
        </p>
        <img
          src="../../assets/images/construct.png"
          alt="a"
        >
      </div>
      <div
        class="analyseAna"
        v-else
      >
        <div class="levelTop">
          <div class="mychartDiv1">
            <div
              class="mychart"
              id="myCharts1"
              ref="myCharts1"
            />
            <div class="chartDesc">
              <span class="desc-font">{{ $t("apppromotion.appHotIndustryDesc") }}</span>
            </div>
          </div>
          <div class="mychartDiv2">
            <div
              class="mychart"
              id="myCharts2"
              ref="myCharts2"
            />
            <div class="chartDesc">
              <span class="desc-font">{{ $t("apppromotion.appPushStatisticDesc") }}</span>
            </div>
          </div>
        </div>
        <div class="levelBottom">
          <div class="mychartDiv1">
            <div
              class="mychart"
              id="myCharts3"
              ref="myCharts3"
            />
            <div class="chartDesc">
              <span class="desc-font">{{ $t("apppromotion.appNoticeStatisticDesc") }}</span>
            </div>
          </div>
          <div class="mychartDiv2">
            <div
              class="mychart"
              id="myCharts4"
              ref="myCharts4"
            />
            <div class="chartDesc">
              <span class="desc-font">{{ $t("apppromotion.appPullStatisticDesc") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-app-content">
      <div class="app-list">
        <div class="searchRow clearfix">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="queryApp"
            :placeholder="$t('common.appName')"
            class="search_input topSearch"
          />
        </div>
        <el-table
          :data="currentPageData"
          :default-sort="{prop: 'time', order: 'descending'}"
          @sort-change="sortChanged"
          style="width: 100%"
          class="common_table"
        >
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
            width="180"
            sortable="custom"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="180"
                trigger="hover"
                v-if="scope.row.name.length>20"
              >
                <div>{{ scope.row.name }}</div>
                <div slot="reference">
                  {{ scope.row.name }}
                </div>
              </el-popover>
              <div v-else>
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="provider"
            width="120"
            :label="$t('apppromotion.provider')"
          />
          <el-table-column
            prop="version"
            :label="$t('apppromotion.version')"
          />
          <el-table-column
            prop="messageType"
            :label="$t('apppromotion.messageType')"
            width="150"
          />
          <el-table-column
            prop="description"
            :label="$t('apppromotion.description')"
            width="320"
          />
          <el-table-column
            prop="time"
            :label="$t('apppromotion.dateTime')"
            width="200"
            sortable="custom"
          />
          <el-table-column
            prop="detailInfo"
            :label="$t('apppromotion.mesOperation')"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                class="common_operationBtn"
                @click="showDrawer(scope.row)"
              >
                {{ $t('apppromotion.checkDetail') }}
              </el-button>
            </template>
          </el-table-column>
          <template slot="empty">
            <div>
              <img
                src="../../assets/images/empty.png"
                alt=""
                style="padding: 10px;"
              >
              <p>{{ $t('common.noData') }}</p>
            </div>
          </template>
        </el-table>
      </div>
      <el-drawer
        :size="width"
        :with-header="false"
        :closable="false"
        :visible="visible"
        @close="onClose"
      >
        <div class="detailInfo">
          <p class="title1">
            {{ $t("messageCenter.appBasicInfo") }}
          </p>
          <div />
          <p class="basic_p">
            <span>{{ $t("messageCenter.appLabel") }}</span>{{ middleData.name }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appVersion") }}</span>{{ middleData.version }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appProvider") }}</span>{{ middleData.provider }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appStruct") }}</span>{{ middleData.affinity }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appIndustry") }}</span>{{ middleData.industry }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appType") }}</span>{{ middleData.type }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.appShortDes") }}</span>{{ middleData.shortDesc }}
          </p>
          <p class="title2">
            {{ $t("messageCenter.otherInfo") }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.sourceAppStore") }}</span>{{ middleData.sourceAppStore }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.targetAppStore") }}</span>{{ middleData.targetAppStore }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.atpTestStatus") }}</span>{{ middleData.atpTestStatus }}
          </p>
          <p class="basic_p">
            <span>{{ $t("messageCenter.operationType") }}</span>{{ middleData.description }}
          </p>
        </div>
      </el-drawer>
    </div>
    <div class="paginations">
      <eg-pagination
        class="pagination"
        :page-num="pageNum"
        :page-size="curPageSize"
        :page-sizes="pageSizes"
        :total="total"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { getMessages, getAllMessages } from '../../tools/api.js'
import egPagination from 'eg-view/src/components/EgPagination.vue'
import eCharts from 'echarts'
import commonUtil from '../../tools/commonUtil.js'
import { INDUSTRY } from '../../tools/constant.js'
export default {
  components: {
    egPagination
  },
  data () {
    return {
      appIndustry: INDUSTRY,
      width: '500px',
      visible: false,
      appData: [],
      appPackageData: [],
      appPackageDataChart: [],
      currentPageData: [],
      middleData: [],
      nameQuery: '',
      findAppData: [],
      pageSizes: [10, 20, 30],
      curPageSize: 10,
      total: 0,
      limitSize: 10,
      offsetPage: 0,
      language: localStorage.getItem('language'),
      appName: '',
      pageNum: 1,
      messageType: '',
      prop: 'time',
      order: 'desc',
      legendWidth: '430'
    }
  },
  computed: {
  },
  methods: {
    showDrawer (row) {
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
    queryApp () {
      this.offsetPage = 0
      this.pageNum = 1
      this.getTableData()
    },

    getTableData () {
      this.appName = this.nameQuery.toLowerCase()
      this.appPackageData = []
      this.currentPageData = []
      this.findAppData = []
      let params = {
        appName: this.appName,
        offset: this.offsetPage,
        limit: this.curPageSize,
        sortItem: this.prop,
        sortType: this.order,
        messageType: this.messageType,
        timeFlag: 'EARLIER',
        readable: ''

      }
      return new Promise((resolve, reject) => {
        getMessages(params).then((res) => {
          let data = res.data.results
          this.total = res.data.total
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
              this.appPackageData.push(appDataItem)
            }
          )
          this.currentPageData = this.findAppData = this.appPackageData
          resolve(res)
        }).catch((error) => {
          let defaultMsg = this.$t('apppromotion.getOperatorInfoFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getTargetAppStoreSet () {
      let set = new Set()
      this.appPackageDataChart.forEach(
        (item) => {
          set.add(item.targetAppStore)
        })
      return set
    },
    getSourceAppStoreSet () {
      let set = new Set()
      this.appPackageDataChart.forEach(
        (item) => {
          set.add(item.sourceAppStore)
        })
      return set
    },
    getPushNum (name) {
      let number = 0
      this.appPackageDataChart.forEach(
        (item) => {
          if (name === item.targetAppStore && item.messageType === this.getMessageType('PUSH')) {
            number++
          }
        }
      )
      return number
    },
    getNoticeNum (name) {
      let number = 0
      this.appPackageDataChart.forEach(
        (item) => {
          if (name === item.sourceAppStore && item.messageType === this.getMessageType('NOTICE')) {
            number++
          }
        }
      )
      return number
    },
    getIndustryNames () {
      let industryNameSet = new Set()
      this.appPackageDataChart.forEach(
        (item) => {
          industryNameSet.add(item.industry)
        })
      return industryNameSet
    },
    getIndustrybeDownloadNum (name) {
      let number = 0
      this.appPackageDataChart.forEach(
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
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let D = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      date = Y + '-' + M + '-' + D + ' ' + hours + ':' + minutes + ':' + seconds
      return date
    },
    getDateValue (datestr) {
      return this.dateDiff(this.getCurrentTime(new Date()).split(' ')[0], datestr)
    },
    getRecent7days () {
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
      return recent7daysStr
    },
    // Get the last seven days pull app counts
    getPullAppNum (name) {
      let day1 = 0
      let day2 = 0
      let day3 = 0
      let day4 = 0
      let day5 = 0
      let day6 = 0
      let day7 = 0
      this.appPackageDataChart.forEach(
        (item) => {
          if (name === item.sourceAppStore && item.messageType === this.getMessageType('PULL')) {
            let days = this.getDateValue(item.time.split(' ')[0])
            switch (days) {
              case 1:
                day1++
                break
              case 2:
                day2++
                break
              case 3:
                day3++
                break
              case 4:
                day4++
                break
              case 5:
                day5++
                break
              case 6:
                day6++
                break
              case 7:
                day7++
                break
              default:
            }
          }
        }
      )
      return [day7, day6, day5, day4, day3, day2, day1]
    },
    sortChanged (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'time'
        this.order = 'desc'
      } else {
        this.prop = column.prop
        if (column.order === 'ascending') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
      }
      this.getTableData()
    },
    filterSort (fieldArr, typePa, appSort) {
      fieldArr.forEach((fieldItem) => {
        this.findAppData.forEach((item) => {
          if (typePa === 'name' || typePa === 'provider' || typePa === 'version' || typePa === 'messageType') {
            if (item[typePa].toLowerCase() === fieldItem) {
              appSort.push(item)
            }
          } else {
            if (item[typePa] === fieldItem) {
              appSort.push(item)
            }
          }
        })
      })
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getTableData()
    },
    getChartData () {
      return new Promise((resolve, reject) => {
        getAllMessages().then((res) => {
          this.appPackageDataChart = []
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
              this.appPackageDataChart.push(appDataItem)
            }
          )
          resolve(res)
        }).catch((error) => {
          let defaultMsg = this.$t('apppromotion.getOperatorInfoFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      })
    },
    getHotIndustryName (appName) {
      let _isCn = this.language === 'cn'
      for (let item of this.appIndustry) {
        if (item.value === appName) {
          if (_isCn) {
            this.legendWidth = '430'
            return item.labelcn
          } else {
            this.legendWidth = '375'
            return item.labelen
          }
        }
      }
    },
    initChart1 () {
      let industryArr = []
      let nameArr = []
      let industryNames = this.getIndustryNames()
      industryNames.forEach(
        (item) => {
          let industryPullNum = this.getIndustrybeDownloadNum(item)
          if (industryPullNum > 0) {
            let industryName = this.getHotIndustryName(item)
            nameArr.push(industryName)
            let providerInfo = {
              value: industryPullNum,
              name: industryName
            }
            industryArr.push(providerInfo)
          }
        }
      )
      if (industryArr < 1) {
        let defaultData = {
          value: 0,
          name: 'No Data'
        }
        industryArr.push(defaultData)
      }
      let colors = ['#3AC372', '#FF4A55', '#1FCAA8', '#FAC858', '#EE6666']
      return {
        color: colors,
        title: {
          text: this.$t('apppromotion.hotIndustry'),
          align: 'left',
          subtextStyle: {
            color: '#fff', // 主标题文字的颜色。
            fontSize: 18 // 字体大小
          },
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 14
          },
          padding: 20
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: this.legendWidth,
          top: '50',
          data: nameArr,
          textStyle: {
            color: '#f2f2f2',
            fontSize: 14
          }
        },
        series: [
          {
            name: 'Hot edge APP Distribution',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            center: [ '33%', '50%' ],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: industryArr
          },
          {
            radius: ['65%', '75%'],
            center: ['33%', '50%'],
            type: 'pie',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#4E3494'
              }
            },
            data: [
              {
                value: 1
              }
            ]
          },
          {
            radius: ['30%', '35%'],
            center: ['33%', '50%'],
            type: 'pie',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: '#4E3494'
              }
            },
            data: [
              {
                value: 1
              }
            ]
          }
        ]
      }
    },
    initChart2 () {
      let appStorePushArr = []
      let statisticPushArr = []
      let appStoreNames = this.getTargetAppStoreSet()
      appStoreNames.forEach(
        (item) => {
          let pushNum = this.getPushNum(item)
          if (pushNum > 0) {
            appStorePushArr.push(pushNum)
            let tempObj = {
              name: item,
              count: pushNum
            }
            statisticPushArr.push(tempObj)
          }
        }
      )
      let sortNumber = (a, b) => {
        return b - a
      }
      // Count the target warehouses of top 5 push applications
      let top5Name = []
      appStorePushArr.sort(sortNumber)
      appStorePushArr = appStorePushArr.slice(0, 5)
      let finalNumArr = []
      for (let numItem of appStorePushArr) {
        if (finalNumArr.indexOf(numItem) === -1) {
          finalNumArr.push(numItem)
        }
      }

      for (let num of finalNumArr) {
        for (let item of statisticPushArr) {
          if (item.count === num) {
            top5Name.push(item.name)
          }
        }
      }
      top5Name = top5Name.slice(0, 5)

      return {
        title: {
          text: this.$t('apppromotion.appPushStatistic'),
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          },
          padding: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '6%',
          top: '24%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#f4f3f7',
                width: 0.5
              }
            },
            axisLabel: {
              interval: 0,
              formatter: function (value, index) {
                var v = value.substring(0, 6) + '...'
                return value.length > 9 ? v : value
              }
            },
            splitLine: {
              type: true,
              lineStyle: {
                color: '#4E3494',
                type: 'dashed'
              }
            },
            data: top5Name
          }
        ],
        yAxis: [
          {
            axisLine: {
              lineStyle: {
                color: '#f4f3f7',
                width: 0.5
              }
            },
            type: 'value',
            splitLine: {
              type: true,
              lineStyle: {
                color: '#4E3494',
                type: 'dashed'
              }
            },
            name: this.$t('apppromotion.pushChartUnit')
          }
        ],
        series: [
          {
            name: 'PUSH',
            type: 'bar',
            stack: 'name',
            barWidth: 18,
            data: appStorePushArr,
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0],
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                color: new eCharts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#03D4B9'
                }, {
                  offset: 1,
                  color: '#54AAF3'
                }])
              }
            }
          }
        ]
      }
    },
    initChart3 () {
      let appStoreNoticeArr = []
      let statisticNoticeArr = []
      let noticeAppStoreNames = this.getSourceAppStoreSet()
      noticeAppStoreNames.forEach(
        (item) => {
          let noticeNum = this.getNoticeNum(item)
          if (noticeNum > 0) {
            appStoreNoticeArr.push(noticeNum)
            let tempNoticeObj = {
              name: item,
              count: noticeNum
            }
            statisticNoticeArr.push(tempNoticeObj)
          }
        }
      )
      let noticeSortNumber = (a, b) => {
        return b - a
      }
      // Count the source warehouses of top 5 received push applications
      let top5NoticeName = []
      appStoreNoticeArr.sort(noticeSortNumber)
      appStoreNoticeArr = appStoreNoticeArr.slice(0, 5)
      let noticeFinalNumArr = []
      for (let numItem of appStoreNoticeArr) {
        if (noticeFinalNumArr.indexOf(numItem) === -1) {
          noticeFinalNumArr.push(numItem)
        }
      }

      for (let num of noticeFinalNumArr) {
        for (let item of statisticNoticeArr) {
          if (item.count === num) {
            top5NoticeName.push(item.name)
          }
        }
      }
      top5NoticeName = top5NoticeName.slice(0, 5)

      return {
        title: {
          text: this.$t('apppromotion.appNoticeStatistic'),
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          },
          padding: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '6%',
          top: '24%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#f4f3f7',
                width: 0.5
              }
            },
            axisLabel: {
              interval: 0,
              formatter: function (value, index) {
                var v = value.substring(0, 6) + '...'
                return value.length > 9 ? v : value
              }
            },
            data: top5NoticeName
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#f4f3f7',
                width: 0.5
              }
            },
            splitLine: {
              type: true,
              lineStyle: {
                color: '#4E3494',
                type: 'dashed'
              }
            },
            name: this.$t('apppromotion.pushChartUnit')
          }
        ],
        series: [
          {
            name: 'NOTICE',
            type: 'bar',
            stack: 'name',
            barWidth: 18,
            data: appStoreNoticeArr,
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0],
              normal: {
                barBorderRadius: [30, 30, 0, 0],
                color: new eCharts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#C16BE2'
                }, {
                  offset: 1,
                  color: '#6931FC'
                }])
              }
            }
          }
        ]
      }
    },
    initChart4 () {
      let sourceAppStorePullArr = []
      let sourceAppStoreArr = []
      let sourceAppStoreSet = this.getSourceAppStoreSet()
      let recent7days = this.getRecent7days()
      sourceAppStoreSet.forEach(
        (item) => {
          let pullAppNum = this.getPullAppNum(item)
          for (let pullAppNumItem of pullAppNum) {
            if (pullAppNumItem > 0) {
              sourceAppStoreArr.push(item)
              let pullInfo = {
                name: item,
                type: 'line',
                stack: this.$t('apppromotion.totalNum'),
                data: pullAppNum,
                smooth: true,
                areaStyle: {
                  normal: {
                    color: new eCharts.graphic.LinearGradient(
                      0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(67, 246, 173, 0.6)'
                        },
                        {
                          offset: 1,
                          color: 'rgba(67, 246, 173, 0.1)'
                        }
                      ])
                  }
                }
              }
              sourceAppStorePullArr.push(pullInfo)
              break
            }
          }
        }
      )

      return {
        title: {
          text: this.$t('apppromotion.appDownloadTrend'),
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 14
          },
          padding: 20
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: sourceAppStoreArr,
          right: 30,
          top: 30,
          textStyle: {
            color: '#f2f2f2',
            fontSize: 14
          }
        },
        grid: {
          left: '6%',
          top: '24%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#f4f3f7',
              width: 0.5
            }
          },
          boundaryGap: false,
          axisLabel: {
            interval: 0
          },
          data: recent7days
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#f4f3f7',
              width: 0.5
            }
          },
          minInterval: 1,
          splitLine: {
            type: true,
            lineStyle: {
              color: '#4E3494',
              type: 'dashed'
            }
          },
          name: this.$t('apppromotion.pushChartUnit')
        },
        series: sourceAppStorePullArr
      }
    },
    initOperationAnaChart () {
      this.getChartData().then((res) => {
        if (res.data.length <= 0) {
          return
        }
        const myCharts1 = this.$echarts.init(this.$refs.myCharts1)
        const myCharts2 = this.$echarts.init(this.$refs.myCharts2)
        const myCharts3 = this.$echarts.init(this.$refs.myCharts3)
        const myCharts4 = this.$echarts.init(this.$refs.myCharts4)
        myCharts1.setOption(this.initChart1())
        myCharts2.setOption(this.initChart2())
        myCharts3.setOption(this.initChart3())
        myCharts4.setOption(this.initChart4())
      })
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initOperationAnaChart()
    })
    this.getTableData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.$router.replace('/refresh')
    },
    curPageSize: function () {
      this.getTableData()
    }
  }
}
</script>
<style lang="less" scoped>
.my-app {
  width: 100%;
  background-size: 100% 180px !important;
  .title{
    margin: 61px 13.18%;
    .title_line{
      margin-left: 140px;
    }
  }
  .chart-content{
    width: 73.64%;
    margin: auto;
    min-width: 1200px;
    .analyseAna{
      width: 100%;
      display: inline-block;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .levelTop{
        width: 100% ;
        height: 375px;
        display: flex;
        justify-content: space-between;
      }
      .levelBottom{
        width: 100% ;
        height: 375px;
        display: flex;
        justify-content: space-between;
      }
      .chartDesc{
        width: 100%;
        height: 30px;
        margin: auto;
        text-align: center;
        margin-top: 10px;
        .desc-font{
          font-size: 14px;
          color: #fff;
        }
      }
      .mychartDiv1{
        width: 48%;
        height: 375px;
        .mychart{
          width: 100%;
          height: 325px;
          border-radius: 16px;
          background: rgba(46,20,124,0.7);
        }
      }
      .mychartDiv2{
        width: 48%;
        height: 325px;
        .mychart{
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: rgba(46,20,124,0.7);
        }
      }
    }
    .analyseAnaNoData{
      width: 100%;
      height: 471px;
      text-align: center;
      line-height: 25px;
    }
  }
  .my-app-content {
    background: rgba(46,20,124,0.7);
    padding: 20px;
    width: 73.64%;
    margin: auto;
    min-width: 1200px;
    border-radius: 16px 16px 0 0;
  }
  .paginations {
    width:73.64%;
    height: 100px;
    margin: auto;
    min-width: 1200px;
    background: rgba(46,20,124,0.7);
    position: relative;
    border-radius: 0 0 16px 16px;
    .pagination{
      position: absolute;
      right: 50px;
      bottom: 40px;
      background: transparent;
    }
  }
}
.app-list {
  .pagination {
    margin: 20px;
  }
  .searchRow {
    margin-bottom: 25px ;
    .search_input{
      float: left;
      width: 200px;
    }
  }
  .detailInfo{
    height: 110px;
  }
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
  position: relative;
  z-index: 888;
  color: #fff;
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
}
.title1::before{
  content: '';
  display: inline-block;
  width: 9px;
  height: 9px;
  position: relative;
  top: -1px;
  margin-right: 10px;
  border-radius: 50%;
  background: #43F6AD;
}
.title2{
  height: 36px;
  line-height: 36px;
  margin: 25px 0 15px;
  position: relative;
  z-index: 888;
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
  color: #fff;
}
.title2::before{
  content: '';
  display: inline-block;
  width: 9px;
  height: 9px;
  position: relative;
  top: -1px;
  margin-right: 10px;
  border-radius: 50%;
  background: #43F6AD;
}
.basic_p{
  padding: 2px;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 25px;
  color: #fff;
  span{
    float: left;
    width: 100px;
    margin-left: 30px;
    color: #fff;
  }
  span:last-child{
    text-align: left;
    padding-right: 10px;
  }
}
</style>
