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
    <div class="contents">
      <p class="pushTitle">
        {{ $t("nav.appPull") }}
      </p>
      <div class="packageTable">
        <div
          class="search_pull"
        >
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQuery"
            @change="queryApp"
            :placeholder="$t('common.appName')"
            class="search_input"
          />
        </div>
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          @select="onTableSelect"
          @selection-change="selectionLineChangeHandle"
          :default-sort="{prop: 'createTime', order: 'descending'}"
          @sort-change="sortChange"
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
                :href="scope.row.atpTestReportUrl + (language === 'cn' ? '&language=cn' : '&language=en')"
                target="_blank"
                class="lookReport"
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
import { getAppByAppstoreId } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    EgPagination
  },
  props: {
    selectAppStoreInfo: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      btnChangeEnable: true,
      dataLoading: true,
      pageSize: 10,
      curPageSize: 10,
      offsetPage: 0,
      pageNum: 1,
      total: 0,
      prop: 'createTime',
      order: 'desc',
      searchCondition: {},
      appPackageData: [],
      currentPageData: [],
      defaultSelectedIds: [],
      defaultSelectedItems: [],
      changedItems: [],
      nameQuery: '',
      selectDataIdList: [],
      selectDataList: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    sortChange (column) {
      if (column.prop == null || column.order == null) {
        this.prop = 'createTime'
        this.order = 'desc'
      } else {
        if (column.prop === 'name') {
          this.prop = 'appName'
        } else {
          this.prop = column.prop
        }
        if (column.order === 'ascending') {
          this.order = 'asc'
        } else {
          this.order = 'desc'
        }
      }
      this.getTableData(this.selectAppStoreInfo)
    },
    queryApp () {
      this.getTableData(this.selectAppStoreInfo)
    },
    selectionLineChangeHandle (val) {
      if (this.selectDataList.length === 0) {
        this.selectDataList = val
        for (let item of this.selectDataList) {
          this.selectDataIdList.push(item.packageId)
        }
      } else {
        for (let item of val) {
          if (this.selectDataIdList.indexOf(item.packageId) === -1) {
            this.selectDataIdList.push(item.packageId)
            this.selectDataList.push(item)
          }
        }
      }
      this.$emit('getAppPullInfo', this.selectDataList)
    },
    onTableSelect (rows, row) {
      let selected = rows.length && rows.indexOf(row) !== -1
      if (!selected || selected === 0) {
        let index = this.selectDataIdList.indexOf(row.packageId)
        this.selectDataList.splice(index, 1)
        this.selectDataIdList.splice(index, 1)
      }
    },
    getTableData (selectAppStoreInfo) {
      getAppByAppstoreId(selectAppStoreInfo.appStoreId, this.curPageSize, this.offsetPage, this.nameQuery, this.order, this.prop).then((res) => {
        this.currentPageData = []
        let data = res.data.results
        this.total = res.data.total
        if (data !== '') {
          data.forEach(
            (item) => {
              let appDataItem = {
                name: item.name,
                provider: item.provider,
                version: item.version,
                atpTestReportUrl: item.atpTestReportUrl,
                packageId: item.packageId,
                sourceStoreId: selectAppStoreInfo.appStoreId,
                affinity: item.affinity,
                industry: item.industry,
                shortDesc: item.shortDesc,
                type: item.type,
                deployMode: item.deployMode,
                createTime: item.createTime,
                atpTestStatus: item.atpTestStatus,
                sourceStoreName: selectAppStoreInfo.name,
                isSelectToPull: false
              }
              this.currentPageData.push(appDataItem)
            }
          )
          this.$nextTick(function () {
            for (let item of this.currentPageData) {
              if (this.selectDataIdList.indexOf(item.packageId) !== -1) {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            }
          })
        }
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        let defaultMsg = this.$t('appPull.getPullAppException')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getTableData(this.selectAppStoreInfo)
    },
    sizeChange (val) {
      this.curPageSize = val
    }
  },
  mounted () {
    this.getTableData(this.selectAppStoreInfo)
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    },
    curPageSize: function () {
      this.getTableData(this.selectAppStoreInfo)
    }
  }
}

</script>

<style lang="less" scoped>
  .contents{
          position: relative;
            min-height: 750px;
            padding-bottom: 40px;
  }
  .pushTitle{
      font-size: 26px;
      font-family: HarmonyHeiTi;
      font-weight: 600;
      color: #5E40C8;
      line-height: 24px;
      margin:-84px 0  48px -31px ;
  }
.packageTable{
  .el-table thead{
    th {
      background-color: #eee;
    }
  }
  .search_pull {
    margin-bottom: 15px;
    margin-top: 0px;
    float:left;
    .search_input{
      width: 200px;
      float: right;
      margin-top: -2px;
    }
  }
}
.paginationStyle{
    position: absolute;
    right: 20px;
    bottom: -10px;

}
.search_input /deep/ .el-input__inner {
    height: 40px !important;
}

div /deep/ .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    background-color:  #5E40C8  !important;
    border-color:  #5E40C8 !important;
}
div /deep/ .headerStyle {
     border-right: none !important;
     background-color: #EDEEF8 !important;
     color: #62517A !important;
}
.lookReport{
  text-decoration: none;
  color: #7A6E8A;
  padding: 4px 12px;
  background: #EFEFEF;
  border-radius: 12px;
}
</style>
