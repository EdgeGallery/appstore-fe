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
  <div class="storeAppManager">
    <div class="clearbtAndSearch">
      <el-button
        id="storeAppManager_resetting"
        type="primary"
        class="rt"
        @click="setStoreApp"
        :disabled="btnChangeEnable"
      >
        {{ $t('appManager.reSetting') }}
      </el-button>
      <img
        class="storeTipIcon"
        :src="appSetTipIcon"
        alt=""
      >
      <div class="storeSettingTipDiv">
        <span class="storeSettingTip">{{ $t('appManager.storeAppSetTipMsg') }}</span>
      </div>
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
        header-cell-class-name="headerStyle"
        :default-sort="defaultSort"
        @sort-change="sortChange"
        @selection-change="selectionLineChangeHandle"
        @filter-change="filterChange"
        ref="multipleTable"
      >
        <el-table-column
          type="selection"
          width="70"
        />
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
          prop="shortDesc"
          :label="$t('common.description')"
          width="320"
        />
        <el-table-column
          prop="createTime"
          :label="$t('appManager.appCreateTime')"
          width="220"
          sortable="custom"
        />
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
import appSetTipIcon from '@/assets/images/app_set_tip_icon.png'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import { myApp } from '../../tools/api.js'
import timeFormatTools from '../../tools/timeFormatTools.js'
export default {
  props: {
    storeAppListInfo: {
      required: true,
      type: Object
    }
  },
  components: {
    EgPagination
  },
  data () {
    return {
      appSetTipIcon: appSetTipIcon,
      currentPageData: [],
      selectDataList: [],
      btnChangeEnable: true,
      dataLoading: true,
      pageSize: 10,
      curPageSize: 10,
      offsetPage: 0,
      pageNum: 1,
      total: 0,
      prop: 'createTime',
      order: 'desc',
      appName: '',
      status: 'Published',
      searchCondition: {},
      appPackageData: [],
      defaultSelectedIds: [],
      defaultSelectedItems: [],
      changedItems: [],
      nameQueryVal: ''
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
      this.getTableData()
    },
    getTableData () {
      this.appName = this.nameQueryVal
      myApp.getMyAppPackageApi('', this.curPageSize, this.offsetPage, this.appName, this.status, this.prop, this.order)
        .then(res => {
          this.appPackageData = res.data.results
          this.total = res.data.total
          this.appPackageData.forEach(item => {
            let formatedTime = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = formatedTime
          })
          this.currentPageData = this.appPackageData
          this.dataLoading = false
          this.$nextTick(function () {
            for (let item of this.currentPageData) {
              if (item.showType === 'public' || item.showType === 'inner-public') {
                this.$refs.multipleTable.toggleRowSelection(item, true)
                this.defaultSelectedIds.push(item.packageId)
                this.defaultSelectedItems.push(item)
              }
            }
          })
        }).catch(() => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('appManager.queryAppFailed'),
            type: 'warning'
          })
          this.clearInterval()
        })
    },
    currentChange (val) {
      this.pageNum = val
      this.offsetPage = this.curPageSize * (this.pageNum - 1)
      sessionStorage.setItem('offsetAppPush', this.offsetPage)
      this.getTableData()
    },
    sizeChange (val) {
      this.curPageSize = val
    },
    calculateChangedItem () {
      this.changedItems = []
      let selectedItemIds = []
      for (let item of this.selectDataList) {
        selectedItemIds.push(item.packageId)
      }
      for (let item of this.selectDataList) {
        if (this.defaultSelectedIds.indexOf(item.packageId) === -1) {
          this.changedItems.push(item)
        }
      }
      for (let item of this.defaultSelectedItems) {
        if (selectedItemIds.indexOf(item.packageId) === -1) {
          this.changedItems.push(item)
        }
      }
    },
    setStoreApp () {
      this.calculateChangedItem()
      let fdAdd = new FormData()
      fdAdd.append('showType', 'inner-public')
      let fdRemove = new FormData()
      fdRemove.append('showType', 'private')
      for (let item of this.changedItems) {
        let fd = null
        if (item.showType === 'public' || item.showType === 'inner-public') {
          fd = fdRemove
        } else {
          fd = fdAdd
        }
        myApp.modifyAppAttr(fd, item.appId, item.packageId).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.modifySuccess'),
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.modifyFail'),
            type: 'warning'
          })
        })
      }
    },
    selectionLineChangeHandle (val) {
      this.selectDataList = val
      if (this.selectDataList.length === 0) {
        this.btnChangeEnable = true
      } else {
        this.btnChangeEnable = false
      }
    }

  },
  watch: {
    curPageSize: function () {
      this.getTableData()
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less">
.storeAppManager {
  width: 1416px;
  margin: auto;
  .clearbtAndSearch{
    height: 40px;
    margin-top: 30px;
    margin-bottom: 10px;
    .el-button{
      float: left;
      font-size: 14px;
    }
    .storeTipIcon{
      margin-left: 40px;
      margin-top: 11px;
      float: left;
    }
    .storeSettingTipDiv{
      margin-top: 5px;
      margin-left: 5px;
      width: 500px;
      float: left;
      .storeSettingTip{
        color: #999999;
        font-size: 16px;
        font-family: SimHei, sans-serif;
      }
    }
    .search_input{
      float: right;
      width: 200px;
      margin-right: 30px;
    }
  }
  .storeAppManagerTable{
    margin-right: 30px;
    .headerStyle{
      background: #e1e7f5;
      color: #575d6c;
      border-right: 2px solid #fff;
      padding: 0;
      height: 40px;
      line-height: 40px;
    }
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
