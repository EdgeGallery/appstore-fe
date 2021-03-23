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
    <div>
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
import EgPagination from 'eg-view/src/components/EgPagination.vue'
export default {
  components: {
    EgPagination
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
      nameQuery: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      curPageSize: 10,
      selectFlag: false
    }
  },
  methods: {
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNum = val
    },
    unique (arr) {
      if (!Array.isArray(arr)) {
        console.log('type error!')
        return
      }
      var array = []
      for (var arrData of arr) {
        if (array.indexOf(arrData) === -1) {
          array.push(arrData)
        }
      }
      return array
    },
    selectionLineChangeHandle (val) {
      // 动态的把勾选的app信息添加到总的allSelectionsApp中
      if (this.selectFlag) {
        this.selectFlag = false
        return
      }

      let tempData = JSON.parse(sessionStorage.getItem('allAppPullInfo'))
      if (!tempData) {
        tempData = []
      }
      let finalData = []
      let packageIds = []
      for (let tempDataArr of tempData) {
        if (this.currentAppStoreId !== tempDataArr.sourceStoreId) {
          finalData.push(tempDataArr)
          packageIds.push(tempDataArr.packageId)
        }
      }
      for (let varArr of val) {
        if (packageIds.indexOf(varArr.packageId) === -1) {
          packageIds.push(varArr.packageId)
          finalData.push(varArr)
        }
      }
      sessionStorage.setItem(
        'allAppPullInfo',
        JSON.stringify(finalData)
      )

      this.$emit('setSelectedItems', finalData)
    },
    refreshCurrentData () {
      let start = this.curPageSize * (this.pageNum - 1)
      let end = this.curPageSize * this.pageNum
      this.currentPageData = this.findAppData.slice(start, end)

      this.$nextTick(function () {
        for (let arr of this.currentPageData) {
          if (arr.isSelectToPull === true) {
            this.selectFlag = true
            this.$refs.multipleTable.toggleRowSelection(arr, this.selectFlag)
          }
        }
      })
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
      let findApp = (typePa) => {
        let fieldArr = []
        let appSort = []
        this.findAppData.forEach((item) => {
          if (typePa === 'name' || typePa === 'version' || typePa === 'provider' || typePa === 'industry' || typePa === 'type') {
            fieldArr.push(item[typePa].toLowerCase())
          } else {
            fieldArr.push(item[typePa])
          }
        })
        if (typePa === 'createTime') {
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
        this.newFunction(fieldArr, typePa, appSort)
        return appSort
      }

      let type = column.prop
      this.findAppData = findApp(type)
    },
    newFunction (fieldArr, typePa, appSort) {
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
    defaultSort () {
      setTimeout(() => {
        this.$refs.multipleTable.sort('createTime', 'descending')
      }, 500)
    }
  },
  mounted () {
    this.appPackageData = this.data
    this.findAppData = this.appPackageData
    this.total = this.findAppData.length
    if (this.appPackageData.length > 0) {
      this.currentAppStoreId = this.appPackageData[0].sourceStoreId
    }
    this.defaultSort()
  },
  watch: {
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
.packageTable{
  margin: 20px 0 40px 0;
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
.paginationStyle{
  float: right;
  margin-top: -20px;
}
</style>
