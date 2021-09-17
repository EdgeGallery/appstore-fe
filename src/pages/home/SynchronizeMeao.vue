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
  <div class="app-list">
    <div class="app_synchronize">
      <el-dropdown
        @command="handleClick"
        trigger="click"
      >
        <el-button
          type="primary"
        >
          同步应用到MEAO
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          @change="handleClick"
        >
          <el-dropdown-item
            v-for="(item,index) in this.systemData"
            :key="index"
            :command="index"
          >
            <!-- <span>{{ language === 'cn'?item.labelcn:item.labelen }}</span> -->
            {{ item.systemName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="packageTable">
      <el-table
        :data="tableData"
        :key="reflush"
        class="tableStyle"
        style="width: 100%"
        @filter-change="filterTagTable"
      >
        <el-table-column
          prop="id"
          :label="$t('store.taskId')"
        />
        <el-table-column
          prop="systemName"
          :label="$t('store.MeaoName')"
          width="180"
          :filters="systemNameData"
          :filter-method="filterMEAO"
          :filter-multiple="false"
        />
        <el-table-column
          prop="url"
          :label="$t('store.MeaoUrl')"
          width="200"
        />
        <el-table-column
          prop="createTime"
          :label="$t('store.taskCreateTime')"
          width="210"
        />
        <el-table-column
          prop="status"
          :label="$t('store.taskStatus')"
          :filters="[{text: 'success', value: 'success'}, {text: 'failed', value: 'failed'}, {text: 'uploading', value: 'uploading'}]"
          :filter-method="filterStatus"
          :filter-multiple="false"
          width="150"
        >
          <template slot-scope="scope">
            <em
              v-if="scope.row.status==='uploading'"
              class="uploading"
            />
            <em
              v-if="scope.row.status==='failed'"
              class="failed"
            />
            <em
              v-if="scope.row.status==='success'"
              class="success"
            />
            <span v-if="scope.row.status==='uploading'">进行中</span>
            <span v-if="scope.row.status==='failed'">失败</span>
            <span v-if="scope.row.status==='success'">成功</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="progress"
          :label="$t('store.taskProgress')"
          width="240"
        >
          <template slot-scope="scope">
            <el-progress
              width="120"
              type="line"
              :stroke-width="14"
              :percentage="scope.row.progress"
              :color="customColorFormat"
              :format="format"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      class="clearfix"
      style="margin-bottom: 0px;"
      :total="total"
    />
  </div>
</template>

<script>
import {
  getProgressByPackageId,
  synchronizedPakageApi,
  getThirdSystemByType
} from '../../tools/api.js'
import { MEAO } from '../../tools/constant.js'
import commonUtil from '../../tools/commonUtil.js'
import pagination from '../../components/common/Pagination.vue'
import timeFormatTools from '../../tools/timeFormatTools.js'
export default {
  components: {
    pagination
  },
  props: {
    packageId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      customColor: '#6610f2',
      interval: '',
      MEAO: MEAO,
      language: localStorage.getItem('language'),
      ifSync: 'true',
      userId: sessionStorage.getItem('userId'),
      showSynchronize: false,
      huaweiper: 0,
      jiuzhouyunper: 0,
      startSync: false,
      hwMeAO: false,
      jzyMEAO: false,
      hwinterval: '',
      jzyinterval: '',
      showlun: false,
      total: 0,
      type: 'MEAO',
      systemName: '',
      status: '',
      systemData: [],
      testColor: [],
      systemNameData: [],
      tableData: []
    }
  },
  methods: {
    format (percentage) {
      for (let item of this.testColor) {
        if (item.color === true && item.percentage === percentage) {
          return '失败'
        }
      }
      return percentage === 100 ? '完成' : `${percentage}%`
    },
    customColorFormat (percentage) {
      for (let item of this.testColor) {
        if (item.color === true && item.percentage === percentage) {
          return '#F14949'
        } else {
          return '#53DABD'
        }
      }
    },
    filterTagTable (filters) {
      this.systemName = filters
      console.log(this.systemName)
    },
    filterMEAO (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    filterStatus (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    getThirdSystemByType () {
      getThirdSystemByType(this.type).then(res => {
        console.log(res.data)
        this.systemData = res.data
        this.addSystemNameData()
        console.log(this.systemData)
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
      })
    },
    getProgressByPackageId () {
      console.log(this.packageId)
      getProgressByPackageId(this.packageId).then(res => {
        console.log(res.data)
        this.testColor = []
        this.tableData = res.data
        this.tableData.forEach(item => {
          let formatedTime = timeFormatTools.formatDateTime(item.createTime)
          item.createTime = formatedTime
          item.progress = parseInt(item.progress)
        })
        this.total = this.tableData.length
        this.checkFailedData()
        console.log(this.tableData)
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
      })
    },

    addSystemNameData () {
      for (let item of this.systemData) {
        let object = {
          text: '',
          value: ''
        }
        object.text = item.systemName
        object.value = item.systemName
        this.systemNameData.push(object)
      }
      console.log(this.systemNameData)
    },

    handleClick (index) {
      console.log(index)
      if (index === 0) {
        this.synchronizePackage(this.currentData)
      } else if (index === 1) {
        console.log(this.jzyinterval)
        this.synchronizeJzy()
      }
      this.showlun = true
    },
    synchronizeJzy () {
      this.startSync = true
      this.jzyMEAO = true
      this.jiuzhouyunper = 10
      this.jzyinterval = setInterval(() => {
        this.$message({
          duration: 2000,
          message: this.$t('store.synchronizedwaiting'),
          type: 'success'
        })
        this.getProgressByPackageId()
      }).catch(error => {
        let retCode = error.response.data.retCode
        let params = error.response.data.params
        let errMsg = error.response.data.message
        if (retCode) {
          commonUtil.showTipMsg(this.language, retCode, params, errMsg)
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        }
      })
    },
    clearInterval () {
      clearTimeout(this.jzyinterval)
      clearTimeout(this.hwinterval)
      this.jzyinterval = null
      this.hwinterval = null
    },
    synchronizePackage (row) {
      console.log(row)
      synchronizedPakageApi(this.appId, row).then(res => {
        this.$message({
          duration: 2000,
          message: this.$t('store.synchronizedwaiting'),
          type: 'success'
        })
        this.getProgressByPackageId()
      }).catch(error => {
        let retCode = error.response.data.retCode
        let params = error.response.data.params
        let errMsg = error.response.data.message
        if (retCode) {
          commonUtil.showTipMsg(this.language, retCode, params, errMsg)
        } else {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        }
      })
    },
    clearIntervalCall () {
      this.interval = null
    },
    filterTableData (tempData) {
      this.testColor = []
      console.log(typeof (tempData))
      let tableDataname = []
      console.log(this.systemName)
      for (let items of tempData) {
        if (this.systemName) {
          let froResult = this.systemName.replace(/(^\s+)|(\s+$)/g, '')
          let bacResult = items.systemName.replace(/(^\s+)|(\s+$)/g, '')
          console.log(froResult === bacResult)
          if (bacResult === froResult) {
            if (this.status) {
              if (items.status.replace(/(^\s+)|(\s+$)/g, '') === this.status.replace(/(^\s+)|(\s+$)/g, '')) {
                tableDataname.push(items)
                console.log(tableDataname)
              }
            } else {
              tableDataname.push(items)
            }
          }
        } else if (this.status) {
          if (items.status.replace(/(^\s+)|(\s+$)/g, '') === this.status.replace(/(^\s+)|(\s+$)/g, '')) {
            tableDataname.push(items)
          }
        } else {
          tableDataname.push(items)
          console.log(tableDataname)
        }
      }
      this.tableData = tableDataname
      console.log(this.tableData)
      console.log(typeof (this.tableData))
      this.checkFailedData()
    },
    checkFailedData () {
      for (let item of this.tableData) {
        if (item.status === 'failed') {
          console.log(item.progress === 0)
          item.percentage = 99
          let colorDate = {
            color: false,
            percentage: 0
          }
          colorDate.color = true
          colorDate.percentage = item.progress
          this.testColor.push(colorDate)
        }
      }
      console.log(this.tableData)
      console.log(typeof (this.tableData))
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
        return Y +
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
      }
    }

  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  mounted () {
    this.getThirdSystemByType()
    this.getProgressByPackageId()
    if ((sessionStorage.getItem('userNameRole') === 'guest') || (sessionStorage.getItem('userNameRole') === 'tenant')) {
      this.ifSync = false
    } else {
      this.ifSync = true
    }
    this.interval = setInterval(() => {
      this.getProgressByPackageId()
    }, 10000)
  },
  beforeDestroy () {
    this.clearIntervalCall()
  }

}

</script>
<style lang='less'>
.app-list{
  .el-pagination {
    margin-bottom: 30px;
    margin-right: 30px;
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: bold;
}
  background: #fff;
  // padding: 20px 0;
  .packageTable {
      font-size: 16px;
      margin: 50px 63px;
      .el-table td{
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      em {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        position: relative;
        top: 3px;
      }
    .uploading {
      background: url('../../assets/images/Test-waiting.png') no-repeat;
      background-size: cover;
    }
    .failed {
      background: url('../../assets/images/Test-failed.png') no-repeat;
      background-size: cover;
    }
    .success {
      background: url('../../assets/images/Test-success.png') no-repeat;
      background-size: cover;
    }
    .el-progress--text-inside .el-progress-bar {
      margin-top: 20px;
      margin-left: 0px;
      // padding: 20px 0;
    }
    .el-progress-bar__outer {
      position: relative;
      top: 0px;
      left: 0px;
    }
    .el-progress__text{
      font-size: 14px;
      color: #5E40C8;
    }
    .el-progress-bar__inner {
    opacity: 0.85;
    }
}

.app_synchronize {
    position: relative;
    top: 30px;
    left: 84%;
    .el-button--primary {
        width: 160px;
        background: linear-gradient(122deg, #4444D0, #6724CB);
        color: #FFFFFF;
        font-size: 16px;
        font-family: HarmonyHeiTi;
        height: 40px;
        border-radius: 8px;
        font-weight: 300;
        padding: 0px;

    }
        .el-popper .popper__arrow::after {
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color:#4444D0!important;
  }
    .el-dropdown-menu__item {
      padding: 0 20px;
      font-size: 14px;
      color: #fff;
      border-bottom:1px solid  #4215C8;
      background: linear-gradient(122deg, #4444D0, #6724CB);
  }
  .el-dropdown-menu {
      padding: 0px 0px;
      border-radius:5px ;
      .el-dropdown-menu__item:first-child{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .el-dropdown-menu__item:last-child{
        border-bottom-left-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
      }
  }

  .el-progress-bar__innerText {
      display: inline-block;
      vertical-align: middle;
      color: #5E40C8;
      font-size: 14px;
      margin: 0 5px;
      margin-top: -8px;
  }
  .el-carousel__indicators {
      display: none;
  }
  .el-progress-bar__outer {
      position: relative;
      left: 110px;
      top:-20px;
  }
  .el-progress-bar__inner{
    background: linear-gradient(-37deg, #53DABD, #54AAF3);
  }
  .el-progress-bar__outer{
    box-shadow: 2px 2px 12px 0px rgba(36, 20, 119, 0.13);
  }
  .stepDromdown{
    width: 200px;
    position: relative;
    margin: 20px 80%;
    .el-button--primary {
        background: linear-gradient(122deg, #4444D0, #6724CB);
        color: #FFFFFF;
        font-size: 20px;
        font-family: HarmonyHeiTi;
        height: 40px;
        border-radius: 8px;
        font-weight: 300;
        // box-shadow: 0px 16px 8px rgba(94, 44, 204 , 0.3);

    }
  }

 }
}
.tableStyle.el-table td .cell {
    font-size: 14px !important;
}
.el-table-filter .el-table-filter__list{
      background-color: #EDEEF8;
    }
.el-table-filter .el-table-filter__list.el-table-filter__list-item{
      background-color: #EDEEF8
    }
    .el-table-filter .el-table-filter__list li:first-child{
      display: none;
    }
    .el-table-filter .el-table-filter__list li{
      border-bottom: 1px solid #fff;
    }

</style>
