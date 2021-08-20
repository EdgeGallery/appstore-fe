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
  <div class="hotAppManager">
    <div class="clearbtAndSearch">
      <el-input
        suffix-icon="el-icon-search"
        v-model="nameQueryVal"
        @change="queryApp"
        :placeholder="$t('common.appName')"
        class="search_input"
      />
    </div>
    <div class="hotAppManagerTable">
      <el-table
        v-loading="dataLoading"
        :data="currentPageData"
        class="tableStyle"
        :default-sort="{ prop: 'createTime', order: 'descending' }"
        @sort-change="sortChange"
        @filter-change="filterChange"
        ref="multipleTable"
      >
        <el-table-column
          prop="name"
          :label="$t('common.appName')"
          sortable="custom"
          width="210"
          :cell-class-name="hiddenClass"
        >
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
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
          :label="$t('common.provider')"
        />
        <el-table-column
          prop="industry"
          :label="$t('common.industry')"
        />
        <el-table-column
          prop="type"
          :label="$t('common.type')"
        />
        <el-table-column
          prop="createTime"
          :label="$t('appManager.appCreateTime')"
          width="220"
          sortable="custom"
        />
        <el-table-column
          :label="$t('appManager.hotSwitch')"
          width="120"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.selectStatus"
              :active-value="1"
              :inactive-value="0"
              @change="switchChange($event, scope.$index, scope.row)"
              active-color="#55D8BF"
              inactive-color="#CECCDC"
            />
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
</template>

<script>
import { myApp, getAppTableApi } from '../../tools/api.js'
import timeFormatTools from '../../tools/timeFormatTools.js'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import commonUtil from '../../tools/commonUtil.js'
export default {
  props: {
    hotAppListInfo: {
      required: true,
      type: Object
    }
  },
  components: {
    EgPagination
  },
  data () {
    return {
      currentPageData: [],
      dataLoading: true,
      pageSize: 10,
      curPageSize: 10,
      offsetPage: 0,
      pageNum: 1,
      total: 0,
      prop: 'isHotApp',
      order: 'desc',
      userId: sessionStorage.getItem('userId'),
      appName: '',
      status: 'Published',
      searchCondition: {},
      appPackageData: [],
      defaultSelectedIds: [],
      nameQueryVal: '',
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
      this.getTableData()
    },
    queryApp () {
      this.offsetPage = 0
      this.pageNum = 1
      this.getTableData()
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getTableData()
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    getTableData () {
      let queryCtrl = {
        offset: this.offsetPage,
        limit: this.curPageSize,
        sortItem: this.prop,
        sortType: this.order,
        createTime: 'createTime'
      }
      let params = {
        queryCtrl: queryCtrl,
        showType: ['inner-public', 'public'],
        status: this.status,
        appName: this.nameQueryVal
      }
      getAppTableApi(params)
        .then(res => {
          this.defaultSelectedIds = []
          this.appPackageData = res.data.results
          this.total = res.data.total
          this.appPackageData.forEach(item => {
            let formatedTime = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = formatedTime
            if (item.hotApp) {
              item.selectStatus = 1
            } else {
              item.selectStatus = 0
            }
          })
          this.currentPageData = this.appPackageData
          this.dataLoading = false
        }).catch((error) => {
          this.dataLoading = false
          let defaultMsg = this.$t('appManager.queryAppFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
    },
    switchChange (value, index, data) {
      let modifyAppIds = []
      modifyAppIds.push(data.appId)
      myApp.setHotApp(modifyAppIds).then(res => {
        this.$set(this.currentPageData, index, data)
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.modifySuccess'),
          type: 'success'
        })
      }).catch((error) => {
        let defaultMsg = this.$t('promptMessage.modifyFail')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    }
  },
  watch: {
    curPageSize: function () {
      this.getTableData()
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less">
.hotAppManager {
  width: 1416px;
  margin: auto;
  background: #fff;
  border-radius: 16px;
  padding: 31px 0 0 31px;
  .clearbtAndSearch{
    height: 40px;
    margin-bottom: 10px;
    .search_input{
      float: left;
      width: 200px;
      margin-right: 30px;
    }
  }
  .hotAppManagerTable{
    margin-right: 30px;
    .el-table td{
      padding: 0;
      height: 60px;
      max-height: 60px;
      line-height: 60px;
    }
    .buttonRight{
      padding: 0 1px;
      margin: 0 5px;
      background: #dfe1e6;
    }
  }
  .paginationStyle{
    float: right;
    margin-top: 20px;
    margin-right: 30px;
  }
}
</style>
