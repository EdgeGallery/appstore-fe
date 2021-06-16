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
  <div class="my-app padding56">
    <div class="chart-content">
      <div
        class="analyseAnaNoData"
        v-if="appPackageData.length < 1"
      >
        <p>{{ $t('apppromotion.haveNoAnaData') }}</p>
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
            class="search_input"
          />
        </div>
        <el-table
          :data="currentPageData"
          :default-sort="{prop: 'time', order: 'descending'}"
          @sort-change="sortChanged"
          style="width: 100%"
          header-cell-class-name="headerStyle"
        >
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
            width="300"
            sortable="custom"
            :cell-class-name="hiddenClass"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="300"
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
            width="300"
            :cell-class-name="hiddenClass"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="300"
                trigger="hover"
                v-if="scope.row.description.length>20"
              >
                <div>{{ scope.row.description }}</div>
                <div slot="reference">
                  {{ scope.row.description }}
                </div>
              </el-popover>
              <div v-else>
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            :label="$t('apppromotion.dateTime')"
            width="210"
            sortable="custom"
          />
          <el-table-column
            prop="detailInfo"
            :label="$t('apppromotion.mesOperation')"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                @click="showDrawer(scope.row)"
                type="text"
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
      <eg-pagination
        class="rt"
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
import { getAppdownAnaApi, getAppdownAnaApiChart } from '../../tools/api.js'
import egPagination from 'eg-view/src/components/EgPagination.vue'
import eCharts from 'echarts'
export default {
  components: {
    egPagination
  },
  data () {
    return {
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
      order: 'desc'
    }
  },
  computed: {
  },
  methods: {
    hiddenClass (row) {
      if (row.columnIndex === 7 || row.columnIndex === 0) {
        return 'hiddenClass'
      }
    },
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
      sessionStorage.setItem('currentPage', 1)
      this.getTableEx()
    },

    getTableEx () {
      this.appName = this.nameQuery.toLowerCase()
      this.appPackageData = []
      this.currentPageData = []
      this.findAppData = []
      if (this.prop === 'name') {
        this.prop = 'appName'
      }
      this.$nextTick(function () {
        this.updateTableExChart()
      })
      return new Promise((resolve, reject) => {
        getAppdownAnaApi(this.messageType, this.curPageSize, this.offsetPage, this.appName, this.prop, this.order).then((res) => {
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
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.getOperatorInfoFailed'),
            type: 'warning'
          })
        })
      })
    },
    refreshCurrentData () {
      this.$nextTick(function () {
        this.offsetPage = this.curPageSize * (this.pageNum - 1)
        this.currentPageData = []
        this.currentPageData = this.appPackageData
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    detail (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
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
      this.getTableEx()
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
      sessionStorage.setItem('offsetOpera', this.offsetPage)
    },
    getTableExChart () {
      return new Promise((resolve, reject) => {
        getAppdownAnaApiChart().then((res) => {
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
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.getOperatorInfoFailed'),
            type: 'warning'
          })
        })
      })
    },
    updateTableExChart () {
      this.getTableExChart().then((res) => {
        if (res.data.length <= 0) {
          return
        }
        const myCharts1 = this.$echarts.init(this.$refs.myCharts1)
        const myCharts2 = this.$echarts.init(this.$refs.myCharts2)
        const myCharts3 = this.$echarts.init(this.$refs.myCharts3)
        const myCharts4 = this.$echarts.init(this.$refs.myCharts4)
        // echart1
        let industryArr = []
        let nameArr = []
        let industryNames = this.getIndustryNames()
        industryNames.forEach(
          (item) => {
            let industryPullNum = this.getIndustrybeDownloadNum(item)
            if (industryPullNum > 0) {
              nameArr.push(item)
              let providerInfo = {
                value: industryPullNum,
                name: item
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
        let colors = ['#688EF3', '#754BAC', '#1FCAA8', '#FAC858', '#EE6666']
        let options1 = {
          color: colors,
          title: {
            text: this.$t('apppromotion.hotIndustry'),
            align: 'left',
            textStyle: {
              color: '#280B4E',
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: '430',
            top: '50',
            data: nameArr
          },
          series: [
            {
              name: 'Hot edge APP Distribution',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              center: [ '33%', '50%' ],
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
                show: true
              },
              data: industryArr
            }
          ]
        }

        // echart2
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

        let options2 = {
          title: {
            text: this.$t('apppromotion.appPushStatistic'),
            textStyle: {
              color: '#280B4E',
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '6%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisLabel: {
                interval: 0,
                formatter: function (value, index) {
                  var v = value.substring(0, 6) + '...'
                  return value.length > 9 ? v : value
                }
              },
              data: top5Name
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: this.$t('apppromotion.pushChartUnit')
            }
          ],
          series: [
            {
              name: 'PUSH',
              type: 'bar',
              stack: 'name',
              barWidth: 40,
              data: appStorePushArr,
              itemStyle: {
                normal: {
                  color: '#688EF3'
                }
              }
            }
          ]
        }

        // echart3
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

        let options3 = {
          title: {
            text: this.$t('apppromotion.appNoticeStatistic'),
            textStyle: {
              color: '#280B4E',
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '6%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
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
              name: this.$t('apppromotion.pushChartUnit')
            }
          ],
          series: [
            {
              name: 'NOTICE',
              type: 'bar',
              stack: 'name',
              barWidth: 40,
              data: appStoreNoticeArr,
              itemStyle: {
                normal: {
                  color: '#BB9AF5'
                }
              }
            }
          ]
        }

        // echart4
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
                  areaStyle: {
                    normal: {
                      color: new eCharts.graphic.LinearGradient(
                        0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: '#E0DDFC'
                          },
                          {
                            offset: 0.5,
                            color: '#F2F1FE'
                          },
                          {
                            offset: 1,
                            color: '#FFFFFF'
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

        let options4 = {
          title: {
            text: this.$t('apppromotion.appDownloadTrend'),
            textStyle: {
              color: '#280B4E',
              fontWeight: 'bold',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: sourceAppStoreArr,
            right: 30,
            top: 30
          },
          grid: {
            left: '6%',
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
            minInterval: 1,
            name: this.$t('apppromotion.pushChartUnit')
          },
          series: sourceAppStorePullArr
        }
        myCharts1.setOption(options1)
        myCharts2.setOption(options2)
        myCharts3.setOption(options3)
        myCharts4.setOption(options4)
      })
    }
  },
  mounted () {
    sessionStorage.removeItem('offsetOpera')
    this.$nextTick(function () {
      this.updateTableExChart()
    })
    this.getTableEx()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.$router.replace('/refresh')
    },
    curPageSize: function () {
      this.getTableEx()
    },
    offsetPage: function () {
      this.getTableEx()
    },
    appPackageData: function () {
      this.refreshCurrentData()
    }
  },
  destroyed () {
    sessionStorage.removeItem('offsetOpera')
  }
}
</script>
<style lang="less">
.my-app {
  .chart-content{
    background: #F2F3F5;
    height: 700px;
    width: 1416px;
    margin: auto;
    .analyseAna{
      width: 100%;
      height: 750px;
      background: #F2F3F5;
      display: inline-block;
      overflow-x: auto;
      overflow-y: hidden;
      text-align: center;
      .levelTop{
        width: 1416px;
        height: 375px;
        margin: auto;
        .mychartDiv1{
          height: 375px;
          width: 693px;
          display: inline-block;
          .mychart{
            height: 325px;
            background: #FFFFFF;
            margin: auto;
          }
          .chartDesc{
            width: 300px;
            height: 30px;
            margin: auto;
            margin-top: 10px;
            .desc-font{
              font-size: 14px;
              color: #B2B2B2;
              font-family: FZLTXIHJW--GB1-0, sans-serif;
            }
          }
        }
        .mychartDiv2{
          height: 375px;
          width: 693px;
          display: inline-block;
          margin-left: 30px;
          .mychart{
            height: 325px;
            background: #FFFFFF;
            margin: auto;
          }
          .chartDesc{
            width: 300px;
            height: 30px;
            margin: auto;
            margin-top: 10px;
            .desc-font{
              font-size: 14px;
              color: #B2B2B2;
              font-family: FZLTXIHJW--GB1-0, sans-serif;
            }
          }
        }
      }
      .levelBottom{
        width: 1416px;
        height: 375px;
        margin: auto;
        .mychartDiv1{
          height: 375px;
          width: 693px;
          display: inline-block;
          .mychart{
            height: 325px;
            background: #FFFFFF;
            margin: auto;
          }
          .chartDesc{
            width: 300px;
            height: 30px;
            margin: auto;
            margin-top: 10px;
            .desc-font{
              font-size: 14px;
              color: #B2B2B2;
              font-family: FZLTXIHJW--GB1-0, sans-serif;
            }
          }
        }
        .mychartDiv2{
          height: 375px;
          width: 693px;
          display: inline-block;
          margin-left: 30px;
          .mychart{
            height: 325px;
            background: #FFFFFF;
            margin: auto;
          }
          .chartDesc{
            width: 300px;
            height: 30px;
            margin: auto;
            margin-top: 10px;
            .desc-font{
              font-size: 14px;
              color: #B2B2B2;
              font-family: FZLTXIHJW--GB1-0, sans-serif;
            }
          }
        }
      }
    }
    .analyseAnaNoData{
      width: 100%;
      height: 400px;
      text-align: center;
      line-height: 25px;
    }
  }
  .my-app-content {
    background: white;
    padding: 20px;
    width: 1416px;
    margin: auto;
  }
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
  .searchRow {
    margin: 15px 0;
    .search_input{
      float: right;
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
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
}
.title1::before{
  content: '';
  display: inline-block;
  width: 3px;
  height: 18px;
  position: relative;
  top: 4px;
  background: #409EFF;
}
.title2{
  height: 36px;
  line-height: 36px;
  margin: 25px 0 15px;
  position: relative;
  z-index: 888;
  padding-left: 15px;
  border-bottom: 1px solid #e7ebf5;
}
.title2::before{
  content: '';
  display: inline-block;
  width: 3px;
  height: 18px;
  position: relative;
  top: 4px;
  background: #409EFF;
}
.basic_p{
  padding: 2px;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 25px;
  span{
    float: left;
    width: 100px;
    margin-left: 30px;
    color: #999;
  }
  span:last-child{
    text-align: left;
    padding-right: 10px;
  }
}
</style>
