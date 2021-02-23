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
  <div class="app-pull">
    <div class="app-pull-content">
      <div class="packageTable">
        <el-table
          :data="appPullListInfo"
          @selection-change="selectionLineChangeHandle"
          style="width: 100%"
          header-cell-class-name="headerStyle"
        >
          <el-table-column
            type="selection"
            width="70"
          />
          <el-table-column
            prop="name"
            :label="$t('appPull.name')"
          />
          <el-table-column
            prop="provider"
            :label="$t('appPull.provider')"
          />
          <el-table-column
            prop="version"
            :label="$t('appPull.version')"
          />
          <el-table-column
            prop="testRepo"
            :label="$t('appPull.testRepo')"
          />
          <el-table-column
            prop="operation"
            :label="$t('appPull.operation')"
          >
            <template slot-scope="scope">
              <el-button
                id="pullBtn"
                @click="handlePull(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('appPull.pull') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { pullApp } from '../../tools/api.js'
export default {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      appPackageData: [],
      appPullListInfo: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    unique (arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      var array = []
      for (var i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
          array.push(arr[i])
        }
      }
      return array
    },
    selectionLineChangeHandle (val) {
      // 动态的把勾选的app信息添加到总的allSelectionsApp中
      let tempData = JSON.parse(sessionStorage.getItem('allAppPullInfo'))
      let packageIds = []
      for (let i = 0; i < tempData.length; i++) {
        packageIds.push(tempData[i].packageId)
      }
      for (let j = 0; j < val.length; j++) {
        if (packageIds.indexOf(val[j].packageId) === -1) {
          packageIds.push(val[j].packageId)
          tempData.push(val)
        }
      }
      sessionStorage.setItem(
        'allAppPullInfo',
        JSON.stringify(tempData)
      )
    },
    handlePull (row) {
      let userId = sessionStorage.getItem('userId')
      let userName = sessionStorage.getItem('userName')
      let param = {
        sourceStoreId: row.sourceStoreId,
        name: row.name,
        provider: row.provider,
        version: row.version,
        userId: userId,
        userName: userName,
        affinity: row.affinity,
        industry: row.industry,
        shortDesc: row.shortDesc,
        type: row.type,
        atpTestStatus: row.atpTestStatus,
        sourceStoreName: row.sourcePlatform
      }
      pullApp(row.packageId, param).then((res) => {
        this.$message.success(this.$t('appPull.pullSuccess'))
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('appPull.pullFailed'),
          type: 'warning'
        })
      })
    }
  },
  mounted () {
    this.appPullListInfo = this.data
  }
}

</script>

<style lang="less" scoped>
.packageTable{
  margin: 20px 0;
  .el-table thead{
    th {
      background-color: #eee;
    }
  }
}
</style>
