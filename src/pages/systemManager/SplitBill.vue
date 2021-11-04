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
  <div class="bills">
    <div class="title_top title_left defaultFontBlod clear">
      {{ $t('split.splitMana') }}
      <span class="line_bot1" />
    </div>
    <div class="content top">
      <div>
        <span>{{ $t('split.default') }}</span>
        <el-input-number
          v-model="splitRatioForDefault"
          class="rate_input"
          ref="rateinput"
          :controls="false"
          :disabled="!isSettingDefaultConfig"
          max="80"
          min="1"
          step-strictly="true"
        />
        <span class="percent">%</span>
        <el-button
          class="bgBtn"
          @click="setDefaultConfig"
          v-if="!isSettingDefaultConfig"
        >
          {{ $t('split.set') }}
        </el-button>
        <el-button
          class="bgBtn"
          @click="confirmSetDefaultConfig"
          v-if="isSettingDefaultConfig"
        >
          {{ $t('common.confirm') }}
        </el-button>
        <el-button
          @click="cancelSetDefaultConfig"
          v-if="isSettingDefaultConfig"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          class="bgBtn rt"
          @click="handleAddSplitConfig"
        >
          {{ $t('split.add') }}
        </el-button>
      </div>
    </div>
    <div class="content">
      <div class="billTable">
        <el-table
          class="tableStyle"
          :data="splitConfigList"
          height="600"
        >
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
          <el-table-column
            prop="appName"
            :label="$t('bill.appName')"
          />
          <el-table-column
            prop="provider"
            :label="$t('bill.provider')"
          />
          <el-table-column
            prop="splitRatio"
            :label="$t('split.splitRatio')"
          >
            <template slot-scope="scope">
              <div>
                <el-progress
                  stroke-width="20"
                  color="#5844be"
                  :percentage="scope.row.splitRatio*100"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('myApp.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  @click="modifySplitConfig(scope.row)"
                  class="operations_btn"
                >
                  {{ $t('split.modify') }}
                </el-button>
                <el-button
                  @click="deleteSplitConfig(scope.row)"
                  class="operations_btn"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix" />
    </div>

    <!-- modify split ration config -->
    <el-dialog
      :visible.sync="showModifyDialog"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ $t('split.splitSettings') }}
      </div>
      <div style="margin-top:25px;">
        <el-form>
          <el-form-item :label="$t('bill.appName')">
            <span class="app_name">{{ appName }}</span>
          </el-form-item>
          <el-form-item :label="$t('split.splitRatio')">
            <el-input-number
              v-model="splitRatioForModi"
              class="rate_input"
              :controls="false"
              max="80"
              min="1"
              step-strictly="true"
            />
            <span class="percent">%</span>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="showModifyDialog = false"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="setAppBillRate()"
          class="bgBtn"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>

    <!-- add split ration config -->
    <el-dialog
      :visible.sync="showAddDialog"
      :close-on-click-modal="false"
      width="50%"
      :show-close="false"
      class="dialog_host default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ $t('split.addSplitSettings') }}
      </div>
      <div>
        <div class="billInputBox">
          {{ $t('split.splitRatio') }}
          <el-input-number
            v-model="splitRatioForAdd"
            class="rate_input"
            :controls="false"
            max="80"
            min="1"
            step-strictly="true"
          />
          <span class="percent">%</span>
        </div>
        <div class="billInputBox">
          <el-table
            class="tableStyle"
            :data="appList"
            height="400"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="name"
              :label="$t('bill.appName')"
            />
            <el-table-column
              prop="provider"
              :label="$t('bill.provider')"
            />
          </el-table>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer dialogPadding"
      >
        <el-button
          @click="showAddDialog = false"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="confirmAddNewSplitConfig()"
          class="bgBtn"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { subscribe, queryApp } from '../../tools/api.js'
export default {
  data () {
    return {
      splitConfigList: [],
      appList: [],
      splitRatioForDefault: 15,
      splitRatioForDefaultBak: 0,
      splitRatioForAdd: 15,
      showModifyDialog: false,
      isSettingDefaultConfig: false,
      appId: '',
      splitRatioForModi: 0,
      showAddDialog: false,
      appName: '',
      modifyIndex: '',
      selectedAppListToAdd: []
    }
  },
  mounted () {
    this.getSplitConfigsList()
  },
  methods: {
    handleSelectionChange (val) {
      this.selectedAppListToAdd = val
    },
    getSplitConfigsList () {
      subscribe.getSplitconfigs().then(res => {
        this.splitConfigList = res.data.data
        if (this.splitConfigList && this.splitConfigList.length > 0) {
          let _allItemIdx = this.splitConfigList.findIndex(item => item.appId === 'all')
          if (_allItemIdx >= 0) {
            this.splitRatioForDefault = this.splitConfigList[_allItemIdx].splitRatio * 100
            this.splitConfigList.splice(_allItemIdx, 1)
          }
        }
      })
    },
    modifySplitConfig (row) {
      this.splitConfigList.forEach((item, index) => {
        if (item.appName === row.appName) {
          this.modifyIndex = index
        }
      })
      this.splitRatioForModi = row.splitRatio * 100
      this.showModifyDialog = true
      this.appId = row.appId
      this.appName = row.appName
    },
    deleteSplitConfig (row) {
      this.$confirm(this.$t('split.confirmToDelete'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        subscribe.deleteSplitconfigs(row.appId).then(res => {
          this.getSplitConfigsList()
        })
      })
    },
    confirmAddNewSplitConfig () {
      if (this.selectedAppListToAdd.length < 1) {
        this.$message.error(this.$t('split.moreThanOne'))
        return
      }
      let param = {
        appIds: this.selectedAppListToAdd.map(item => item.appId),
        splitRatio: this.splitRatioForAdd / 100
      }
      subscribe.addSplitconfigs(param).then(res => {
        this.$message.success(this.$t('split.addSuccess'))
        this.showAddDialog = false
        this.getSplitConfigsList()
      })
    },
    setAppBillRate () {
      let param = {
        splitRatio: this.splitRatioForModi / 100
      }
      subscribe.modifySplitconfigs(this.appId, param).then(res => {
        this.$message.success(this.$t('split.setSuccess'))
        this.showModifyDialog = false
        this.getSplitConfigsList()
      })
    },
    setDefaultConfig () {
      this.$refs.rateinput.focus()
      this.isSettingDefaultConfig = true
      this.splitRatioForDefaultBak = this.splitRatioForDefault
    },
    confirmSetDefaultConfig () {
      let param = {
        splitRatio: this.splitRatioForDefault / 100
      }
      subscribe.modifyDefaultSplitconfigs(param).then(res => {
        this.$message.success(this.$t('split.modifySuccess'))
        this.isSettingDefaultConfig = false
      })
    },
    cancelSetDefaultConfig () {
      this.isSettingDefaultConfig = false
      this.splitRatioForDefault = this.splitRatioForDefaultBak
    },
    handleAddSplitConfig () {
      this.showAddDialog = true
      this.splitRatioForAdd = 15
      this.selectedAppListToAdd = []
      let queryParam = {
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: 0,
          limit: 100000,
          sortItem: 'createTime',
          sortType: 'desc'
        },
        showType: ['inner-public', 'public']
      }
      queryApp(queryParam).then(res => {
        this.appList = res.data.results
        for (let _splitConfig of this.splitConfigList) {
          let _idx = this.appList.findIndex(item => item.appId === _splitConfig.appId)
          if (_idx >= 0) {
            this.appList.splice(_idx, 1)
          }
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.bills{
  padding: 0 13%;
  .top{
    height: auto;
    min-height: 0!important;
    margin-bottom: 25px;
  }
  .content {
    background: #ffffff;
    border-radius: 20px;
    padding: 30px 60px;
    min-height: 500px;
    position: relative;
    .search_input {
      float: left;
      width: 200px;
    }
    .billTable{
      .el-table td{
        padding: 0;
        height: 60px;
        max-height: 60px;
        line-height: 60px;
      }
      .operation_button{
        background: #efefef;
        border: none;
        color: #7a6e8a;
        border-radius: 5px;
        padding: 6px 12px !important;
        margin-left: 5px;
      }
      em {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 6px;
        position: relative;
        top: 3px;
      }
    }
    .percent{
      display: inline-block;
      position: relative;
      left: -37px;
    }
  }
  .rate_input{
    margin: 0 15px;
    width: 70px;
  }
  .billInputBox{
    margin: 15px 0;
  }
  .app_name{
    line-height: 32px;
    margin-left: 12px;
  }
}
</style>
