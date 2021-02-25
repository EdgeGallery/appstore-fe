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
        <div class="search_pull">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="handleNameQuery"
            :placeholder="$t('common.appName')"
            class="search_input"
          />
        </div>
        <el-table
          :data="currentPageData"
          @selection-change="selectionLineChangeHandle"
          :default-sort="{prop: 'createTime', order: 'descending'}"
          @sort-change="sortChanged"
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
            sortable="custom"
          />
          <el-table-column
            prop="provider"
            :label="$t('appPull.provider')"
            sortable="custom"
          />
          <el-table-column
            prop="version"
            :label="$t('appPull.version')"
            sortable="custom"
          />
          <el-table-column
            prop="industry"
            :label="$t('appPull.appIndustry')"
            sortable="custom"
          />
          <el-table-column
            prop="type"
            :label="$t('appPull.appType')"
            sortable="custom"
          />
          <el-table-column
            prop="createTime"
            :label="$t('appPull.appCreateTime')"
            sortable="custom"
          />
          <el-table-column
            prop="atpTestReportUrl"
            :label="$t('appPull.testRepo')"
          >
            <template slot-scope="scope">
              <a
                :href="scope.row.atpTestReportUrl"
                target="_blank"
              >{{ $t('appPull.viewTestRepo') }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            :label="$t('appPull.operation')"
            width="100"
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
      <pagination
        style="margin-bottom: 20px;"
        :table-data="findAppData"
        @getCurrentPageData="getCurrentPageData"
      />
    </div>
  </div>
</template>

<script>
import { pullApp } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
export default {
  components: {
    pagination
  },
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      appPackageData: [],
      currentAppStoreId: '',
      findAppData: [],
      currentPageData: [],
      nameQuery: ''
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getCurrentPageData (data) {
      this.currentPageData = data
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
      if (!tempData) {
        tempData = []
      }
      let finalData = []
      let packageIds = []
      for (let i = 0; i < tempData.length; i++) {
        if (this.currentAppStoreId !== tempData[i].sourceStoreId) {
          finalData.push(tempData[i])
          packageIds.push(tempData[i].packageId)
        }
      }
      for (let j = 0; j < val.length; j++) {
        if (packageIds.indexOf(val[j].packageId) === -1) {
          packageIds.push(val[j].packageId)
          finalData.push(val[j])
        }
      }
      sessionStorage.setItem(
        'allAppPullInfo',
        JSON.stringify(finalData)
      )
    },
    handleNameQuery () {
      this.findAppData = this.appPackageData
      this.findAppData = this.findAppData.filter((item) => {
        let itemName = item.name.toLowerCase()
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppData = this.appPackageData
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
        sourceStoreName: row.sourceStoreName
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
    },
    sortChanged (column) {
      console.log(column)
      let sortTime = (a, b) => {
        let timeValueA = new Date(Date.parse(a.replace(/-/g, '/'))).getTime()
        let timeValueB = new Date(Date.parse(b.replace(/-/g, '/'))).getTime()
        return timeValueA - timeValueB
      }
      let findApp = (type) => {
        let fieldArr = []
        let appSort = []
        this.findAppData.forEach((item) => {
          if (type === 'name' || type === 'version' || type === 'provider' || type === 'industry' || type === 'type') {
            fieldArr.push(item[type].toLowerCase())
          } else {
            fieldArr.push(item[type])
          }
        })
        if (type === 'createTime') {
          fieldArr.sort(sortTime)
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
        console.log('finish sort ' + appSort.length)
        return appSort
      }

      let type = column.prop
      this.findAppData = findApp(type)
    }
  },
  mounted () {
    this.appPackageData = this.data
    this.findAppData = this.appPackageData
    if (this.appPackageData.length > 0) {
      this.currentAppStoreId = this.appPackageData[0].sourceStoreId
    }
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
  .search_pull {
    margin-bottom: 15px;
    margin-top: -55px;
    .search_input{
      width: 200px;
      float: right;
      margin-bottom: 10px;
    }
  }
}
</style>
