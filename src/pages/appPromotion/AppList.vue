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
    <el-table
      :data="appData"
      @selection-change="selectionLineChangeHandle"
      ref="multipleTable"
      style="width: 100%"
      :header-cell-style="{ background: '#A0A5A7', color: '#fff' }"
    >
      <el-table-column
        type="selection"
        width="70"
      />
      <el-table-column
        prop="number"
        :label="$t('apppromotion.number')"
        width="155"
      />
      <el-table-column
        prop="appName"
        :label="$t('apppromotion.appName')"
        width="200"
      />
      <el-table-column
        prop="provider"
        :label="$t('apppromotion.provider')"
        width="200"
      />
      <el-table-column
        prop="version"
        :label="$t('apppromotion.version')"
        width="200"
      />
      <el-table-column
        prop="tesResult"
        :label="$t('apppromotion.tesResult')"
        width="230"
      />
      <el-table-column
        prop="testRepo"
        :label="$t('apppromotion.testRepo')"
        width="250"
      />
      <el-table-column
        prop="lastProTime"
        :label="$t('apppromotion.lastProTime')"
        width="270"
      />
      <el-table-column
        prop="proTimes"
        :label="$t('apppromotion.proTimes')"
        width="150"
      />
    </el-table>
    <!-- 组件 -->
    <div v-if="uploadDiaVis">
      <promTask @getAppData="getAppData" />
    </div>
  </div>
</template>

<script>
import { getAppPromTableApi } from '../../tools/api.js'
import promTask from './PromTask.vue'
export default {
  components: {
    promTask
  },
  data () {
    return {
      dataonLineListSelections: [],
      uploadDiaVis: false,
      // appData: []
      appData: [
        {
          number: '1',
          appName: '虚拟人生b',
          provider: '中国移动',
          version: 'V1.0',
          tesResult: 'Success',
          // testRepo: <a href="require('@/assets/images/202012150314.png')">202012150314</a>,
          testRepo: <a href="../../assets/images/202012150314.png" target="_blank">202012150314</a>,
          lastProTime: '2020-12-08 13:55:12',
          proTimes: '30'
        },
        {
          number: '2',
          appName: '梦幻生活c',
          provider: '中国电信',
          version: 'V2.0',
          tesResult: 'Failed11',
          testRepo: 'xxxrepo',
          lastProTime: '2021-11-08 13:55:12',
          proTimes: '50'
        },
        {
          number: '3',
          appName: '极限挑战',
          provider: '中国联通',
          version: 'V3.0',
          tesResult: 'Success',
          testRepo: 'xxxrepo',
          lastProTime: '2021-11-08 13:55:12',
          proTimes: '1000'
        }
      ]
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
    getAppData () {
      this.uploadDiaVis = false
    },
    // jumpTo() {
    //   console.log(this.dataonLineListSelections);
    //   this.$router.push("/app/prom/task");
    //   sessionStorage.setItem('appstordetail', JSON.stringify(this.dataonLineListSelections))
    // },
    uploadPackage () {
      this.uploadDiaVis = true
      sessionStorage.setItem(
        'appstordetail',
        JSON.stringify(this.dataonLineListSelections)
      )
    },
    getTableData () {
      this.uploadDiaVis = false
      getAppPromTableApi(this.appId).then((res) => {
      //   let data = res.data;
      //   data.forEach(
      //     (item) => {
      //       this.tableData.push(item);
      //     },
      //     () => {}
      //   );
      //   if (data.length !== 0) {
      // this.editDetails = this.source = data[0].details
      // this.appDetailFileList = [JSON.parse(data[0].format)]
      // this.packageId = data[0].csarId
      //   }
      })
    }
  },
  mounted () {
    this.getAppData()
    console.log(this.$refs.multipleTable.selection)
    // this.getTableData();
  }
}
</script>
<style lang="less" scoped>
.app-list {
  .el-table {
    font-size: 17px;
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
}
</style>
