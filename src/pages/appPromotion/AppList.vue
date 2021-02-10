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
        <div class="batchProm">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="handleNameQuery"
            :placeholder="$t('common.appName')"
            class="search_input"
          />
          <el-button
            class="batchProButton"
            type="primary"
            :disabled="btnChangeEnable"
            @click="showPushAppDialog"
          >
            {{ $t("apppromotion.batchPro") }}
          </el-button>
        </div>
        <div class="packageTable">
          <el-table
            :data="currentPageData"
            :default-sort="{prop: 'latestPushTime', order: 'descending'}"
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
              sortable
              width="150"
              :cell-class-name="hiddenClass"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="150"
                  trigger="hover"
                  v-if="scope.row.name.length>8"
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
              sortable
            />
            <el-table-column
              prop="version"
              :label="$t('apppromotion.version')"
              sortable
            />
            <el-table-column
              :label="$t('apppromotion.testRepo')"
            >
              <template slot-scope="scope">
                <a
                  style="color:#409eff"
                  :href="scope.row.atpTestReportUrl"
                  target="_blank"
                  class="buttonText"
                >{{ $t('apppromotion.viewTestRepo') }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="latestPushTime"
              :label="$t('apppromotion.lastProTime')"
              sortable
            />
            <el-table-column
              prop="pushTimes"
              :label="$t('apppromotion.proTimes')"
              sortable
            />
            <el-table-column
              :label="$t('apppromotion.intentionAppstore')"
            >
              <template slot-scope="scope">
                <el-select
                  multiple
                  collapse-tags
                  v-model="scope.row.targetPlatform"
                  @change="changeSelect($event, scope.row)"
                  @remove-tag="removeTag($event, scope.row)"
                  :placeholder="$t('apppromotion.targetPaltform')"
                  :class="scope.row.packageId"
                >
                  <el-option
                    label="All"
                    value="All"
                    @click.native="selectAll(scope.row)"
                  />
                  <el-option
                    v-for="item in appStoreList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="operation"
              fixed="right"
              :label="$t('apppromotion.mesOperation')"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  id="pushBtn"
                  @click="showPushAppDialog(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('apppromotion.messagePush') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 组件 -->
        <div v-if="uploadDiaVis">
          <promTask
            v-model="uploadDiaVis"
            :app-store-list-prop="appStoreList"
          />
        </div>
      </div>
      <pagination
        style="margin-bottom: 20px;"
        :table-data="findAppData"
        @getCurrentPageData="getCurrentPageData"
      />
    </div>
  </div>
</template>

<script>
import { getAppPromTableApi, promProviderInfo } from '../../tools/api.js'
import promTask from './PromTask.vue'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    promTask,
    pagination
  },
  data () {
    return {
      dataonLineListSelections: [],
      uploadDiaVis: false,
      appData: [],
      appPackageData: [],
      currentPageData: [],
      appStoreData: [],
      dataLoading: false,
      appStoreList: [],
      value: '',
      isEnLan: true,
      btnChangeEnable: true,
      nameQuery: '',
      findAppData: [],
      selectedArray: ['All']
    }
  },
  methods: {
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
    getCurrentPageData (data) {
      this.currentPageData = data
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
          console.log(providerItem)
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
      this.uploadDiaVis = true
      if (!(row instanceof MouseEvent)) {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(row)
        )
        console.log('button select push')
      } else {
        sessionStorage.setItem(
          'appstordetail',
          JSON.stringify(this.dataonLineListSelections)
        )
      }
    },
    getTableData () {
      this.appPackageData = []
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
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.getPromInfoFailed'),
          type: 'warning'
        })
      })
    },
    handleNameQuery () {
      this.findAppData = this.appPackageData
      this.findAppData = this.findAppData.filter((item) => {
        let itemName = item.name.toLowerCase()
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppData = this.appPackageData
    },
    selectAll (info) {
      if (this.selectedArray.indexOf('All') !== -1) {
        this.selectedArray = []
        this.selectedArray.push('All')
        this.appStoreList.map((item) => {
          this.selectedArray.push(item.value)
        })
      } else {
        this.selectedArray = []
      }
      info.targetPlatform = this.selectedArray
    },
    changeSelect (val, info) {
      this.selectedArray = val
      info.targetPlatform = this.selectedArray
    },
    removeTag (val, info) {
      if (val === 'All') {
        this.selectedArray = []
      }
    }
  },
  mounted () {
    console.log(this.$refs.multipleTable.selection)
    this.getTableData()
    this.getProviders()
    console.log(this.dataonLineListSelections)
    sessionStorage.setItem(
      'appstordetail',
      JSON.stringify(this.dataonLineListSelections)
    )
    let language = localStorage.getItem('language')
    this.isEnLan = language === 'en'
  }
}
</script>

<style lang="less" scoped>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
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
    margin-bottom: 5px;
    margin-top: 5px;
    .search_input{
      width: 200px;
      float: right;
    }
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
