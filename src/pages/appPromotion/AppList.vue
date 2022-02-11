<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="my-app pushApp">
    <div class="my-app-content">
      <div class="title">
        {{ $t("nav.appPush") }}
      </div>
      <div class="app-list">
        <div class="batchProm">
          <el-button
            class="appPull commonBtnDisabled defaultFontLight"
            :disabled="btnChangeEnable"
            @click="showPushAppDialog"
          >
            {{ $t("apppromotion.batchPro") }}
          </el-button>
        </div>
        <template>
          <el-select
            multiple
            @remove-tag="removeTag($event)"
            v-model="promAppstoreList"
            :placeholder="$t('apppromotion.targetPaltform')"
            class="selectStyle"
          >
            <el-option
              label="All"
              value="All"
              @click.native="getSelectAppstoreData('All')"
            />
            <el-option
              v-for="item in appStoreList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              @click.native="getSelectAppstoreData(item.value)"
            />
          </el-select>
        </template>
        <div class="search_input">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="queryApp"
            :placeholder="$t('common.appName')"
          />
        </div>

        <div class="appPromPackageTable">
          <el-table
            class="common_table"
            :data="currentPageData"
            :default-sort="{prop: 'latestPushTime', order: 'descending'}"
            @sort-change="sortChanged"
            @selection-change="selectionLineChangeHandle"
            ref="multipleTable"
            :row-key="getRowKeys"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="80"
            />
            <el-table-column
              prop="name"
              :label="$t('apppromotion.appName')"
              sortable="custom"
              width="260"
              :cell-class-name="hiddenClass"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="260"
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
              width="160"
            />
            <el-table-column
              prop="version"
              :label="$t('apppromotion.version')"
              width="140"
            />
            <el-table-column
              prop="deployMode"
              :label="$t('store.workloadType')"
              width="160"
            >
              <template slot-scope="scope">
                {{ scope.row.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="latestPushTime"
              width="200"
              :label="$t('apppromotion.lastProTime')"
              sortable="custom"
            />
            <el-table-column
              prop="pushTimes"
              width="160"
              :label="$t('apppromotion.proTimes')"
              sortable="custom"
            />
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
            <el-table-column
              :label="$t('apppromotion.testRepo')"
              width="190"
            >
              <template slot-scope="scope">
                <a
                  :href="scope.row.atpTestReportUrl + (language === 'cn' ? '&language=cn' : '&language=en')"
                  target="_blank"
                  class="lookReport"
                >{{ $t('apppromotion.viewTestRepo') }}</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-if="uploadDiaVis">
          <promTask
            ref="promItem"
            v-model="uploadDiaVis"
            @refreshAppPromInfo="refreshPromData"
            :prom-store-list="promStoreList"
          />
        </div>
        <eg-pagination
          class="paginationStyle"
          :page-num="pageNum"
          :page-size="pageSize"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
      </div>
    </div>
    <img
      class="common_bg"
      src="../../assets/images/common_bg.png"
      alt=""
    >
  </div>
</template>

<script>
import { getAppPromTableApi, promProviderInfo } from '../../tools/api.js'
import promTask from './PromTask.vue'
import { common } from '../../tools/comon.js'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    promTask,
    EgPagination
  },
  data () {
    return {
      screenHeight: document.body.clientHeight,
      dataonLineListSelections: [],
      uploadDiaVis: false,
      appData: [],
      appPackageData: [],
      currentPageData: [],
      appStoreList: [],
      promAppstoreList: ['All'],
      btnChangeEnable: true,
      nameQuery: '',
      findAppData: [],
      selectedArray: ['All'],
      pageNum: 1,
      pageSize: 10,
      appStoreName: '',
      offsetPage: sessionStorage.getItem('offsetAppPush') || 0,
      total: 0,
      curPageSize: 10,
      appName: '',
      language: localStorage.getItem('language'),
      promStoreList: [],
      order: 'desc',
      prop: 'latestPushTime'
    }
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'app-list', 332)
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      sessionStorage.setItem('offsetAppPush', this.offsetPage)
      this.getTableData()
    },
    hiddenClass (row) {
      if (row.columnIndex === 0) {
        return 'hiddenClass'
      }
    },
    getRowKeys (row) {
      return row.packageId
    },
    selectionLineChangeHandle (val) {
      this.dataonLineListSelections = val
      if (this.dataonLineListSelections.length === 0) {
        this.btnChangeEnable = true
      } else {
        this.btnChangeEnable = false
      }
    },
    getProviders () {
      promProviderInfo(this.curPageSize, this.offsetPage, this.appStoreName).then((res) => {
        let data = res.data.results
        let index = 1
        data.forEach(item => {
          let providerItem = {
            number: index,
            value: '',
            label: ''
          }
          providerItem.value = item.appStoreId
          providerItem.label = item.appStoreName
          this.appStoreList.push(providerItem)
          index++
        })
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.promoteFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    showPushAppDialog (row) {
      this.promStoreList = []
      if (this.promAppstoreList.length === 1 && this.promAppstoreList[0] === 'All') {
        if (this.appStoreList.length === 0) {
          this.$message({
            duration: 2000,
            message: this.$t('apppromotion.promoteFailed'),
            type: 'warning'
          })
          return
        }
        for (let item of this.appStoreList) {
          this.promStoreList.push(item)
        }
      } else {
        this.setPromAppstoreList()
      }
      this.uploadDiaVis = true
      setTimeout(() => {
        this.$refs.promItem.handleExecute()
      }, 500)
      this.savePromData(row)
    },
    setPromAppstoreList () {
      for (let idItem of this.promAppstoreList) {
        for (let item of this.appStoreList) {
          if (item.value === idItem) {
            this.promStoreList.push(item)
            break
          }
        }
      }
    },
    savePromData (row) {
      if (!(row instanceof MouseEvent)) {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(row)
        )
      } else {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(this.dataonLineListSelections)
        )
      }
    },
    queryApp () {
      if (this.nameQuery.toLowerCase()) {
        this.pageNum = 1
      }
      this.getTableData()
    },
    getTableData () {
      this.appPackageData = []
      this.findAppData = []
      this.appName = this.nameQuery.toLowerCase()
      if (this.prop === 'name') {
        this.prop = 'appName'
      }
      getAppPromTableApi(this.curPageSize, this.offsetPage, this.appName, this.order, this.prop).then((res) => {
        this.total = res.data.total
        this.appPackageData = res.data.results
        this.appPackageData.forEach(item => {
          if (item.latestPushTime) {
            item.latestPushTime = item.latestPushTime.split('.')[0]
          }
          item.targetPlatform = ['All']
        })
        this.currentPageData = this.findAppData = this.appPackageData
      }).catch((error) => {
        let defaultMsg = this.$t('apppromotion.getPromInfoFailed')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    refreshCurrentData () {
      this.$nextTick(function () {
        this.offsetPage = this.curPageSize * (this.pageNum - 1)
        this.currentPageData = []
        this.currentPageData = this.findAppData
      })
    },
    getSelectAppstoreData (item) {
      if (this.promAppstoreList.indexOf(item) === -1) {
        if (item === 'All') {
          this.promAppstoreList = []
        }
      } else {
        if (item === 'All') {
          this.promAppstoreList = ['All']
        } else {
          let pos = this.promAppstoreList.indexOf('All')
          if (pos !== -1) {
            this.promAppstoreList.splice(pos, 1)
          }
        }
      }
    },
    removeTag (val) {
      if (val === 'All') {
        this.selectedArray = []
      }
    },
    sortChanged (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'latestPushTime'
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
    filterItem (fieldArr, typePa, appSort) {
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
    refreshPromData (value) {
      if (value) {
        this.getTableData()
        this.nameQuery = ''
      }
    },
    defaultSort () {
      setTimeout(() => {
        this.$refs.multipleTable.sort('latestPushTime', 'descending')
      }, 500)
    }
  },
  destroyed () {
    sessionStorage.removeItem('offsetAppPush')
  },
  mounted () {
    this.setDivHeight()
    this.getTableData()
    this.getProviders()
    this.defaultSort()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    curPageSize: function () {
      this.getTableData()
    },
    offsetPage: function () {
      this.getTableData()
    },
    findAppData: function () {
      this.refreshCurrentData()
    }
  }
}
</script>

<style lang="less" scoped>
.pushApp {
  width: 100%;
  margin-bottom: -100px;
  display: flex;
  justify-content: center;
  .my-app-content {
    min-height: 500px;
    width: 73.64%;
    margin: 51px 13.18%;
    min-width: 1200px;
    .title{
      font-size: 30px;
       color: #fff;
       font-family:defaultFontBlod, Arial, Helvetica, sans-serif;
       margin-bottom: 60px;
       letter-spacing: 4px;
    }
  }
  .paginationStyle{
    display: flex;
    justify-content: flex-end;
    position: relative;
    height: 80px;
    right: 20px;
    bottom: -8px;
  }
}
.app-list {
  background:rgba(46, 20, 124, 0.7);
  padding: 31px 31px 0 31px;
  position: relative;
  border-radius:16px ;
  .el-table {
    font-size: 14px;
  }
  .batchProm {
    margin-bottom: 15px;
    margin-left: 10px;
    float: right;
    .appPull:hover{
      font-weight: bold;
    }
  }
  .search_input{
    width: 200px;
    float: left;
    color: #999999;
  }
  .selectStyle{
    width: 260px;
    color: #333333;
    float: right;
    margin-bottom: 10px;
  }
  .appPromPackageTable{
    margin: 20px 0 40px 0;
    .el-table thead{
      th {
        background-color: #eee;
      }
    }
    .buttonText{
      color:#409eff;
    }
  }
}

div /deep/ .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    background-color:  #5E40C8  !important;
    border-color:  #5E40C8 !important;
}
div /deep/ .el-button--primary {
     background-color:  #5E40C8  !important;
    border-color:  #5E40C8 !important;
    height: 40px;
}

div /deep/ .headerStyle {
     border-right: none !important;
     background-color: #EDEEF8 !important;
     color: #62517A !important;
}
.lookReport{
  text-decoration: none;
  color: #fff;
  padding: 4px 12px;
  background: #4E3494;
  border-radius: 5px;
}
.lookReport:hover{
  color: #4E3494;
  background: #fff;
}
 div /deep/ .el-select-dropdown__list {
     padding: 20px !important;
}
div /deep/ .el-tag.el-tag--info {
     background: rgba(250, 250, 250, 0.2) !important;
    border: none !important;
    color: #fff !important;
}
div /deep/ .el-icon-arrow-up:before{
  position: relative;
  top: -5px;
}
</style>
