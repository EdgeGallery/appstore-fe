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
          />
          <el-table-column
            prop="version"
            :label="$t('appPull.version')"
          />
          <el-table-column
            prop="industry"
            :label="$t('appPull.appIndustry')"
          />
          <el-table-column
            prop="type"
            :label="$t('appPull.appType')"
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
        :page-sizes="pageSizes"
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
    },
    total: {
      required: false,
      default: 0,
      type: Number
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
      // total: 0,
      curPageSize: 10,
      pageSizes: [10, 20, 30],
      limitSize: 10,
      offsetPage: sessionStorage.getItem('offsetPull') || 0,
      selectFlag: false,
      sortActionFlag: false,
      prop: 'createTime',
      order: 'desc'
    }
  },
  methods: {
    sizeChange (val) {
      this.curPageSize = val
      sessionStorage.setItem('pullAppPageSize', val)
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      sessionStorage.setItem('offsetPull', this.offsetPage)
    },
    unique (arr) {
      if (!Array.isArray(arr)) {
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
      if (this.sortActionFlag) {
        this.sortActionFlag = false
        return
      }
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
      for (let tempDataItem of tempData) {
        if (this.currentAppStoreId !== tempDataItem.sourceStoreId) {
          finalData.push(tempDataItem)
          packageIds.push(tempDataItem.packageId)
        }
      }
      for (let varArrItem of val) {
        if (packageIds.indexOf(varArrItem.packageId) === -1) {
          packageIds.push(varArrItem.packageId)
          finalData.push(varArrItem)
        }
      }
      sessionStorage.setItem(
        'allAppPullInfo',
        JSON.stringify(finalData)
      )

      this.$emit('setSelectedItems', finalData)
    },
    refreshCurrentData () {
      this.currentPageData = this.findAppData
      this.$nextTick(function () {
        for (let appItem of this.currentPageData) {
          if (appItem.isSelectToPull === true) {
            this.selectFlag = true
            this.$refs.multipleTable.toggleRowSelection(appItem, this.selectFlag)
          }
        }
      })
    },
    handleNameQuery () {
      this.findAppData = this.appPackageData
      if (this.nameQuery.toLowerCase()) {
        this.offsetPage = 0
        this.pageNum = 1
        sessionStorage.setItem('pullAppPageNum', this.pageNum)
      }
      this.$emit('getCurPageSize', this.curPageSize)
      this.$emit('getOffsetPage', this.offsetPage)
      this.$emit('getAppName', this.nameQuery.toLowerCase())
      this.$parent.getAllPullApps()
    },
    sortChanged (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'createTime'
        this.order = 'desc'
      } else {
        this.prop = column.prop
        if (column.order === 'ascending') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
      }
      this.$emit('getOrder', this.order)
      this.$emit('getProp', this.prop)
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
        if (this.currentPageData.length > 0) {
          // 排序会触发勾选bug
          this.sortActionFlag = true
          this.$refs.multipleTable.sort('createTime', 'descending')
          setTimeout(() => {
            this.sortActionFlag = false
          }, 500)
        }
      }, 500)
    }
  },
  destroyed () {
    sessionStorage.removeItem('offsetPull')
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
      // this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.$emit('curPageSize', this.curPageSize)
      this.$emit('offsetPage', this.offsetPage)
      this.$parent.getAllPullApps()
      this.refreshCurrentData()
    },
    pageNum: function () {
      this.$emit('curPageSize', this.curPageSize)
      this.$emit('offsetPage', this.offsetPage)
      this.$parent.getAllPullApps()
      this.refreshCurrentData()
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
