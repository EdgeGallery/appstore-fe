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
  <div>
    <div class="storeAppManager">
      <div class="clearbtAndSearch">
        <el-input
          suffix-icon="el-icon-search"
          v-model="nameQueryVal"
          @change="queryApp"
          :placeholder="$t('common.appName')"
          class="search_input"
        />
      </div>
      <div class="storeAppManagerTable">
        <el-table
          v-loading="dataLoading"
          :data="currentPageData"
          class="common_table"
          :default-sort="{ prop: 'createTime', order: 'descending' }"
          @sort-change="sortChange"
          ref="multipleTable"
        >
          <el-table-column
            prop="name"
            :label="$t('common.appName')"
            sortable="custom"
            width="210"
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
            prop="version"
            :label="$t('common.version')"
          />
          <el-table-column
            prop="industry"
            :label="$t('store.industry')"
          />
          <el-table-column
            prop="type"
            :label="$t('store.type')"
          />
          <el-table-column
            prop="createTime"
            :label="$t('appManager.appCreateTime')"
            width="220"
            sortable="custom"
          />
          <el-table-column
            :label="$t('appManager.repoSwitch')"
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
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import { myApp } from '../../tools/api.js'
import timeFormatTools from '../../tools/timeFormatTools.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
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
      prop: 'createTime',
      order: 'desc',
      status: ['Published'],
      searchCondition: {},
      appPackageData: [],
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
    getTableData () {
      let params = {
        limit: this.curPageSize,
        offset: this.offsetPage,
        appName: this.nameQueryVal.toLowerCase(),
        status: this.status,
        sortItem: this.prop,
        sortType: this.order
      }
      myApp.getMyAppPackage(params)
        .then(res => {
          this.appPackageData = res.data.results
          this.total = res.data.total
          this.appPackageData.forEach(item => {
            let formatedTime = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = formatedTime
            if (item.showType === 'public' || item.showType === 'inner-public') {
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
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      this.getTableData()
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    switchChange (value, index, data) {
      let fd = new FormData()
      if (value === 1) {
        fd.append('showType', 'inner-public')
      } else {
        fd.append('showType', 'private')
      }
      myApp.modifyAppAttr(fd, data.appId, data.packageId).then(res => {
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
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less">
.storeAppManager {
  margin: auto;
  background: rgba(46, 20, 124, 0.7);
  padding: 31px 0px 0px 31px ;
  .clearbtAndSearch{
    height: 40px;
    margin-bottom: 10px;
    .search_input{
      float: left;
      width: 200px;
      margin-right: 30px;
    }
  }
  .storeAppManagerTable{
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
}
.paginationStyle{
  width: 100%;
  padding: 40px 50px;
  height: 100px;
  background:rgba(46, 20, 124, 0.7);
  display: flex;
  justify-content: flex-end;
  border-radius: 0 0 16px 16px !important;
}
</style>
