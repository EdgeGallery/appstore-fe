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
  <div>
    <div class="app-list">
      <el-row class="batchProm">
        <el-col :span="24">
          <el-button
            id="myapp_checktest"
            type="primary"
            class="rt"
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
          stripe="true"
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
            prop="atpTestReportUrl"
            :label="$t('apppromotion.testRepo')"
          />
          <el-table-column
            prop="latestPushTime"
            :label="$t('apppromotion.lastProTime')"
          />
          <el-table-column
            prop="pushTimes"
            :label="$t('apppromotion.proTimes')"
          />
        </el-table>
      </div>
      <!-- 组件 -->
      <div v-if="uploadDiaVis">
        <promTask
          v-model="uploadDiaVis"
        />
      </div>
    </div>
    <pagination
      :table-data="appPackageData"
      @getCurrentPageData="getCurrentPageData"
    />
  </div>
</template>

<script>
import { getAppPromTableApi } from '../../tools/api.js'
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
      currentPageData: []
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
    },
    getCurrentPageData (data) {
      this.currentPageData = data
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
              packageId: item.packageId
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
  }
}
</script>
<style lang="less" scoped>
.app-list {
  background:#fff;
  padding: 20px;
  .el-table {
    font-size: 14px;
  }
  padding: 20px 0;
  .pagination {
    margin: 20px;
  }
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
