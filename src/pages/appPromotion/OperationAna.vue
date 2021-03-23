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
    <div class="my-app-content">
      <div class="app-list">
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
        <div class="searchRow clearfix">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="handleNameQuery"
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
            sortable="custom"
          />
          <el-table-column
            prop="version"
            :label="$t('apppromotion.version')"
            sortable="custom"
          />
          <el-table-column
            prop="messageType"
            :label="$t('apppromotion.messageType')"
            sortable="custom"
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
            width="210"
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
      <pagination
        style="margin-bottom: 20px;"
        :table-data="findAppData"
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
      middleData: [],
      nameQuery: '',
      findAppData: [],
      language: localStorage.getItem('language')
    }
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
          this.findAppData = this.appPackageData
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
    handleNameQuery () {
      this.findAppData = this.appPackageData
      this.findAppData = this.findAppData.filter((item) => {
        let itemName = item.name.toLowerCase()
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppData = this.appPackageData
    },
    sortChanged (column) {
      let sortTime = (a, b) => {
        let timeValueA = new Date(Date.parse(a.replace(/-/g, '/'))).getTime()
        let timeValueB = new Date(Date.parse(b.replace(/-/g, '/'))).getTime()
        return timeValueA - timeValueB
      }
      let findApp = (typePa) => {
        let fieldArr = []
        let appSort = []
        this.findAppData.forEach((item) => {
          if (typePa === 'name' || typePa === 'version' || typePa === 'provider' || typePa === 'messageType') {
            fieldArr.push(item[typePa].toLowerCase())
          } else {
            fieldArr.push(item[typePa])
          }
        })
        if (typePa === 'time') {
          fieldArr.sort(sortTime)
          if (column.order === 'descending') {
            fieldArr.reverse()
          }
        } else {
          fieldArr.sort()
          if (column.order === 'descending') {
            fieldArr.reverse()
          }
        }
        const set = new Set(fieldArr)
        fieldArr = [...set]
        this.filterSort(fieldArr, typePa, appSort)
        return appSort
      }

      let type = column.prop
      this.findAppData = findApp(type)
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
    }

  },
  mounted () {
    this.getTableEx().then((res) => {
      if (res.data.length <= 0) {
        return
      }
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
            name: 'Hot edge APP Distribution',
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
        title: {
          text: this.$t('apppromotion.appPushAndNoticeStatistic')
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['PUSH', 'NOTICE'],
          right: 30,
          top: 30
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
              interval: 0,
              formatter: function (value, index) {
                var v = value.substring(0, 6) + '...'
                return value.length > 9 ? v : value
              }
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
            name: 'PUSH',
            type: 'bar',
            stack: 'name',
            barWidth: 40,
            data: appStorePushArr
          },
          {
            name: 'NOTICE',
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
          for (let pullAppNumArr of pullAppNum) {
            if (pullAppNumArr > 0) {
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
        showClose: true,
        duration: 2000,
        message: this.$t('apppromotion.getOperatorInfoFailed'),
        type: 'warning'
      })
    })
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.$router.replace('/refresh')
    }
  }
}
</script>
<style lang="less">
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
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
