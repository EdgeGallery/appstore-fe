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
    <div class="my-app-content contents">
      <p class="pushTitle">
        应用推送
      </p>
      <div class="app-list">
        <div class="batchProm">
          <el-button
            type="primary"
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
            :data="currentPageData"
            :default-sort="{prop: 'latestPushTime', order: 'descending'}"
            @sort-change="sortChanged"
            @selection-change="selectionLineChangeHandle"
            ref="multipleTable"
            :row-key="getRowKeys"
            style="width: 100%"
            header-cell-class-name="headerStyle"
          >
            <el-table-column
              type="selection"
              :reserve-selection="true"
              width="70"
            />
            <el-table-column
              prop="name"
              :label="$t('apppromotion.appName')"
              sortable="custom"
              width="300"
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
              prop="deployMode"
              :label="$t('store.workloadType')"
              width="125"
            >
              <template slot-scope="scope">
                {{ scope.row.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('apppromotion.testRepo')"
            >
              <template slot-scope="scope">
                <a
                  :href="scope.row.atpTestReportUrl + (language === 'cn' ? '&language=cn' : '&language=en')"
                  target="_blank"
                >{{ $t('apppromotion.viewTestRepo') }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="latestPushTime"
              :label="$t('apppromotion.lastProTime')"
              sortable="custom"
            />
            <el-table-column
              prop="pushTimes"
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
      let language = localStorage.getItem('language')
      this.language = language
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
  background-color: #fff;
  .my-app-content {
    width: 73.64%;
    margin: 61px 13.18%;
    min-width: 1200px;
    .pushTitle{
      font-size: 26px;
      font-family: HarmonyHeiTi;
      font-weight: 600;
      color: #5E40C8;
      line-height: 24px;
    }
  }
  .paginationStyle{
    float: right;
  }
}

.app-list {
  background:#fff;
  padding: 31px;

  .el-table {
    font-size: 14px;
  }
  .batchProm {
    margin-bottom: 15px;
    margin-left: 10px;
    float: right;
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
    margin: 20px 0;
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
 div /deep/   .el-input__inner {
    border-color: #5E40C8 !important;
}
div /deep/ .el-select__caret{
  color: #5E40C8 !important;
}
div /deep/  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
    background-color: #9374FF !important;
}
div /deep/ .search_input .el-input__icon {
 color: #9374FF !important;
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
div /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color:#61CDD0  !important;
    border-color:#61CDD0  !important;
}
div /deep/ .el-checkbox__inner:after {
    border-color: #fff !important;
}
div /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #61CDD0 !important;
}
div /deep/.el-table .sort-caret.ascending {
    border-bottom-color: #B5E8E9 !important;
}
div /deep/ .el-table .sort-caret.descending {
    border-top-color: #B5E8E9 !important;
}
div /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color:  #61CDD0 !important;
}
div /deep/ .el-table::before {
     height: 0px !important;
}
div /deep/ .el-table::before, .el-table--group::after, .el-table--border::after {
    background-color: none  !important;

}
</style>
