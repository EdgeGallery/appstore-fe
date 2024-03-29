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
    <div class="packageTable">
      <div
        class="el-upload__tip"
        slot="tip"
      >
        <em class="el-icon-warning" />
        <span class="warning-tip">
          {{ $t('store.syncTitleTip') }}
        </span>
        <div class="app_synchronize">
          <el-dropdown
            @command="synchronizePackage"
            trigger="click"
          >
            <el-button
              class="syncBtn"
              @click="checkSyncPackage"
              :disabled="noSync"
            >
              {{ $t('system.synchronizeToMEAO') }}
            </el-button>
            <el-dropdown-menu
              v-if="syncBtn"
              slot="dropdown"
              @change="synchronizePackage"
            >
              <el-dropdown-item
                v-for="(item) in this.systemData"
                :key="item"
                :command="item"
              >
                {{ item.systemName }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-table
        :data="tableData"
        :key="reflush"
        class="common_table"
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
            <span v-if="scope.row.status==='uploading'">{{ $t('store.uploading') }}</span>
            <span v-if="scope.row.status==='failed'">{{ $t('store.failed') }}</span>
            <span v-if="scope.row.status==='success'">{{ $t('store.success') }}</span>
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
              :format="format"
              :class="{'el-progress_error':scope.row.status==='failed','el-progress_inner':scope.row.status !== 'failed'}"
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
import en from '../../locales/en.js'
import cn from '../../locales/cn.js'
import {
  getProgressByPackageId,
  synchronizePackageApi,
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
    currentData: {
      required: true,
      type: Array
    },
    packageId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      syncBtn: false,
      MEAO: MEAO,
      language: localStorage.getItem('language'),
      total: 0,
      type: 'MEAO',
      systemName: '',
      status: '',
      systemData: [],
      testColor: [],
      systemNameData: [],
      tableData: [],
      timer: null,
      noSync: this.currentData.deployMode === 'container'
    }
  },
  methods: {
    format (percentage) {
      let _isCn = this.language === 'cn'
      let _store = _isCn ? cn.store : en.store
      for (let item of this.testColor) {
        if (item.color === true && item.percentage === percentage) {
          return _store.failed
        }
      }
      return percentage === 100 ? _store.finished : `${percentage}%`
    },
    filterTagTable (filters) {
      this.systemName = filters
    },
    filterMEAO (value, row, column) {
      const property = column['property']
      if (row[property] === value) {
        this.nameCount++
      }
      this.total = this.nameCount
      this.statusCount = 0
      return row[property] === value
    },
    filterStatus (value, row, column) {
      const property = column['property']
      if (row[property] === value) {
        this.statusCount++
      }
      this.total = this.statusCount
      this.nameCount = 0
      return row[property] === value
    },
    showFaileMessage () {
      this.$message({
        duration: 2000,
        type: 'warning',
        message: this.$t('promptMessage.getUploadProgressFail')
      })
    },
    getThirdSystemByType () {
      getThirdSystemByType(this.type).then(res => {
        this.systemData = res.data
        if (this.systemData.length !== 0) {
          this.syncBtn = true
        }
        this.addSystemNameData()
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getSystemDataFailed')
        })
      })
    },
    getProgressByPackageId () {
      getProgressByPackageId(this.packageId).then(res => {
        this.testColor = []
        this.tableData = res.data
        this.tableData.forEach(item => {
          let formatedTime = timeFormatTools.formatDateTime(item.createTime)
          item.createTime = formatedTime
          item.progress = parseInt(item.progress)
        })
        this.total = this.tableData.length
        this.checkFailedData()
      }, () => {
        this.showFaileMessage()
      })
    },
    addSystemNameData () {
      for (let item of this.systemData) {
        let object = {
          text: '',
          value: ''
        }
        object.text = item.systemName
        object.value = item.id
        this.systemNameData.push(object)
      }
    },
    checkSyncPackage () {
      if (this.systemData.length === 0) {
        this.$message.warning(this.$t('promptMessage.noSystemMEAO'))
      } else if (sessionStorage.getItem('userNameRole') !== 'admin') {
        this.$message.warning(this.$t('promptMessage.synchronizePrompt'))
      }
    },
    synchronizePackage (item) {
      if (sessionStorage.getItem('userNameRole') === 'admin') {
        this.getProgressByPackageId()
        if (this.timer !== null) {
          setTimeout(() => {
            clearInterval(this.timer)
          }, 600000)
        }
        synchronizePackageApi(this.currentData, item.id).then(res => {
          let syncResult = res.data
          if (syncResult.message.indexOf('can not support container app.') !== -1) {
            this.$message({
              duration: 2000,
              message: this.$t('store.notSupportContainerApp'),
              type: 'warning'
            })
          } else {
            this.$message({
              duration: 2000,
              message: this.$t('store.synchronizedwaiting'),
              type: 'success'
            })
          }
        }).catch(error => {
          let defaultMsg = this.$t('promptMessage.operationFailed')
          let retCode = error.response.data.retCode
          if (retCode) {
            commonUtil.showTipMsg(this.language, error, defaultMsg)
          } else {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.operationFailed'),
              type: 'warning'
            })
          }
        })
      } else {
        this.$message.warning(this.$t('system.synchronizePrompt'))
      }
    },
    checkFailedData () {
      for (let item of this.tableData) {
        if (item.status === 'failed') {
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
    },
    startInterval () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getProgressByPackageId()
      }, 10000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    packageId (newStr) {
      this.packageId = newStr
      if (this.packageId) {
        this.getProgressByPackageId()
      }
    }
  },
  mounted () {
    this.getThirdSystemByType()
    this.getProgressByPackageId()
    this.startInterval()
    setTimeout(() => {
      clearInterval(this.timer)
    }, 600000)
  }
}

</script>
<style lang='less'>
.app-list{
  .el-upload__tip {
    height: 110px;
    padding-top: 55px;
    width:100%;
  }
  .el-icon-warning{
    color: #fff;
    margin-right: 5px;
    font-size: 16px;
  }
  .warning-tip{
    color: #fff;
    font-size: 12px;
  }
  .el-pagination {
    margin-bottom: 30px;
    margin-right: 30px;
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: bold;
  }
  .packageTable {
    font-size: 16px;
    margin: 0px 63px;
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
    .el-progress_inner .el-progress-bar__inner {
      background: linear-gradient(-37deg, #53DABD, #54AAF3);
    }
    .el-progress_error .el-progress-bar__inner{
      background: linear-gradient(-37deg, #FF3232, #FF6F3F);
    }
  }
  .app_synchronize {
    float: right;
    .syncBtn{
      font-size: 14px;
      padding: 6px 17px;
      color: #5E40C8;
      background:#fff ;
      border-radius: 12px;
      border: none;
    }
    .syncBtn:hover{
      color: #fff;
      background:#5E40C8 ;
      cursor: pointer;
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
      box-shadow: 2px 2px 12px 0px rgba(36, 20, 119, 0.13);
    }
    .el-progress-bar__inner{
      background: linear-gradient(-37deg, #53DABD, #54AAF3);
    }
    .stepDromdown{
      width: 200px;
      position: relative;
      margin: 20px 80%;
      .el-button--primary {
        background: linear-gradient(122deg, #4444D0, #6724CB);
        color: #FFFFFF;
        font-size: 20px;
        font-family: HarmonyHeiTi, sans-serif;
        height: 40px;
        border-radius: 12px;
        font-weight: 300;
      }
    }
  }
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
