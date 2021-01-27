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
        <el-row class="batchProm">
          <el-col :span="24">
            <el-button
              id="myapp_checktest"
              type="primary"
              :disabled="btnChangeEnable"
              @click="uploadPackage"
            >
              {{ $t("apppromotion.batchPro") }}
            </el-button>
          </el-col>
        </el-row>
        <div class="packageTable">
          <el-table
            :data="currentPageData"
            @selection-change="selectionLineChangeHandle"
            border
            ref="multipleTable"
            style="width: 100%"
            :header-cell-style="{ background: '#eeeeee'}"
          >
            <el-table-column
              type="selection"
              width="70"
            />
            <el-table-column
              prop="number"
              :label="$t('apppromotion.number')"
            />
            <el-table-column
              prop="name"
              :label="$t('apppromotion.appName')"
            />
            <el-table-column
              prop="provider"
              :label="$t('apppromotion.provider')"
            />
            <el-table-column
              prop="version"
              :label="$t('apppromotion.version')"
            />
            <el-table-column
              prop="atpTestStatus"
              :label="$t('apppromotion.tesResult')"
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
            />
            <el-table-column
              prop="pushTimes"
              :label="$t('apppromotion.proTimes')"
            />
            <el-table-column
              :label="$t('apppromotion.intentionAppstore')"
            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.targetPlatform"
                  multiple
                  placeholder="请选择意向平台"
                  :class="scope.row.packageId"
                >
                  <el-option
                    v-for="item in appStoreList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
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
        :table-data="appPackageData"
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
      btnChangeEnable: true
    }
  },
  methods: {
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
    uploadPackage () {
      this.uploadDiaVis = true
      sessionStorage.setItem(
        'appstordetail',
        JSON.stringify(this.dataonLineListSelections)
      )
    },
    getTableData () {
      this.appPackageData = []
      getAppPromTableApi().then((res) => {
        let data = res.data
        let index = 1
        data.forEach(
          (item) => {
            let appDataItem = {
              number: index,
              name: item.name,
              provider: item.provider,
              version: item.version,
              atpTestStatus: item.atpTestStatus,
              atpTestReportUrl: item.atpTestReportUrl,
              latestPushTime: item.latestPushTime,
              pushTimes: item.pushTimes,
              packageId: item.packageId,
              targetPlatform: item.targetPlatform
            }
            this.appData.push(appDataItem)
            this.appPackageData.push(appDataItem)
            index++
          }
        )
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.getPromInfoFailed'),
          type: 'warning'
        })
      })
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
  // margin-top: 65px;
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
    float: right;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .packageTable{
      margin: 20px 0;
      .el-table thead{
        th {
          background-color: #eee;
        }
      }
    }
}
</style>
