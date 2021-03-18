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
        <template>
          <el-select
            multiple
            @remove-tag="removeTag($event)"
            v-model="value"
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
        <div class="batchProm">
          <el-button
            type="primary"
            :disabled="btnChangeEnable"
            @click="showPushAppDialog"
          >
            {{ $t("apppromotion.batchPro") }}
          </el-button>
        </div>

        <div class="search_input">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="handleNameQuery"
            :placeholder="$t('common.appName')"
          />
        </div>

        <div class="packageTable">
          <el-table
            :data="currentPageData"
            :default-sort="{prop: 'latestPushTime', order: 'descending'}"
            @sort-change="sortChanged"
            @selection-change="selectionLineChangeHandle"
            ref="multipleTable"
            style="width: 100%"
            header-cell-class-name="headerStyle"
          >
            <el-table-column
              type="selection"
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
              sortable="custom"
            />
            <el-table-column
              prop="version"
              :label="$t('apppromotion.version')"
              sortable="custom"
            />
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
            v-model="uploadDiaVis"
            @refreshAppPromInfo="refreshPromData"
            :app-store-list-prop="promProviderList"
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
import EgPagination from 'eg-view/src/components/EgPagination.vue'
export default {
  components: {
    promTask,
    EgPagination
  },
  data () {
    return {
      dataonLineListSelections: [],
      uploadDiaVis: false,
      appData: [],
      appPackageData: [],
      currentPageData: [],
      appStoreList: [],
      value: ['All'],
      isEnLan: true,
      btnChangeEnable: true,
      nameQuery: '',
      findAppData: [],
      selectedArray: ['All'],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      curPageSize: 10,
      language: localStorage.getItem('language'),
      promProviderList: []
    }
  },
  methods: {
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
    },
    hiddenClass (row) {
      if (row.columnIndex === 0) {
        return 'hiddenClass'
      }
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
    handleSelectionChange (val) {
      this.multipleSelection = val
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
      promProviderInfo().then((res) => {
        let data = res.data
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
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.promoteFailed'),
          type: 'warning'
        })
      })
    },
    showPushAppDialog (row) {
      this.promProviderList = []
      for (let i = 0; i < this.value.length; i++) {
        for (let j = 0; j < this.appStoreList.length; j++) {
          if (this.appStoreList[j].value === this.value[i]) {
            this.promProviderList.push(this.appStoreList[j])
            break
          }
        }
      }
      this.uploadDiaVis = true
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
    getTableData () {
      this.appPackageData = []
      this.findAppData = []
      getAppPromTableApi().then((res) => {
        let data = res.data
        data.forEach(
          (item) => {
            let appDataItem = {
              name: item.name,
              provider: item.provider,
              version: item.version,
              atpTestStatus: item.atpTestStatus,
              atpTestReportUrl: item.atpTestReportUrl,
              latestPushTime: item.latestPushTime,
              pushTimes: item.pushTimes,
              packageId: item.packageId,
              targetPlatform: ['All']
            }
            this.appData.push(appDataItem)
            this.appPackageData.push(appDataItem)
          }
        )
        this.findAppData = this.appPackageData
        this.total = this.findAppData.length
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.getPromInfoFailed'),
          type: 'warning'
        })
      })
    },
    refreshCurrentData () {
      let start = this.curPageSize * (this.pageNum - 1)
      let end = this.curPageSize * this.pageNum
      this.currentPageData = this.findAppData.slice(start, end)
    },
    handleNameQuery () {
      this.findAppData = this.appPackageData
      this.findAppData = this.findAppData.filter((item) => {
        let itemName = item.name.toLowerCase()
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppData = this.appPackageData
      this.total = this.findAppData.length
    },
    getSelectAppstoreData (item) {
      // 去勾选
      if (this.value.indexOf(item) === -1) {
        if (item === 'All') {
          setTimeout(() => {
            this.value = []
          }, 100)
        }
      } else {
        if (item === 'All') {
          setTimeout(() => {
            this.value = ['All']
          }, 100)
        } else {
          let temp = JSON.parse(JSON.stringify(this.value))
          this.value = []
          for (let i = 0; i < temp.length; i++) {
            if (temp[i] !== 'All') {
              this.value.push(temp[i])
            }
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
      let sortTime = (a, b) => {
        let timeValueA = 0
        let timeValueB = 0
        if (a === null) {
          timeValueA = 946656000000
        } else {
          timeValueA = new Date(Date.parse(a.replace(/-/g, '/'))).getTime()
        }
        if (b === null) {
          timeValueB = 946656000000
        } else {
          timeValueB = new Date(Date.parse(b.replace(/-/g, '/'))).getTime()
        }
        return timeValueA - timeValueB
      }
      let sortNumber = (a, b) => {
        return a - b
      }
      let findApp = (type) => {
        let fieldArr = []
        let appSort = []
        this.findAppData.forEach((item) => {
          if (type === 'name' || type === 'version' || type === 'provider' || type === 'messageType') {
            fieldArr.push(item[type].toLowerCase())
          } else {
            fieldArr.push(item[type])
          }
        })
        if (type === 'latestPushTime') {
          fieldArr.sort(sortTime)
          if (column.order === 'descending') {
            fieldArr.reverse()
          }
        } else if (type === 'pushTimes') {
          fieldArr.sort(sortNumber)
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
        fieldArr.forEach((fieldItem) => {
          this.findAppData.forEach((item) => {
            if (type === 'name' || type === 'provider' || type === 'version' || type === 'messageType') {
              if (item[type].toLowerCase() === fieldItem) {
                appSort.push(item)
              }
            } else {
              if (item[type] === fieldItem) {
                appSort.push(item)
              }
            }
          })
        })
        return appSort
      }

      let type = column.prop
      this.findAppData = findApp(type)
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
  mounted () {
    this.getTableData()
    this.getProviders()
    sessionStorage.setItem(
      'appstordetail',
      JSON.stringify(this.dataonLineListSelections)
    )
    let language = localStorage.getItem('language')
    this.isEnLan = language === 'en'
    this.defaultSort()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    curPageSize: function () {
      this.refreshCurrentData()
    },
    pageNum: function () {
      this.refreshCurrentData()
    },
    findAppData: function () {
      this.refreshCurrentData()
    }
  }
}
</script>

<style lang="less" scoped>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
    .paginationStyle{
      float: right;
      margin-top: -20px;
    }
  }
}
.app-list {
  background:#fff;
  padding: 20px;
  .el-table {
    font-size: 14px;
  }
  padding: 20px 0;
  .batchProm {
    margin-bottom: 15px;
    margin-top: 5px;
    margin-left: 10px;
    float: left;
  }
  .search_input{
    width: 200px;
    float: right;
  }
  .selectStyle{
    width: 260px;
    float: left;
    margin-bottom: 10px;
  }
  .packageTable{
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
</style>
