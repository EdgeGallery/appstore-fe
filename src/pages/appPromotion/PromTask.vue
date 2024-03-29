<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="promTask">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="modify_header">
        <span class="title_icon" />
        <div
          slot="title"
          class="header-title"
        >
          {{ $t('apppromotion.appPromotion') }}
        </div>
      </div>
      <div
        class="app-prom"
      >
        <el-table
          :data="appData"
          class="common_table"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
          />
          <el-table-column
            v-for="item in promStoreList"
            :key="item.number"
            :label="item.label"
            :prop="item.label"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row[scope.column.property] === 'false'"
                class="el-icon-close"
                title="false"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'true' "
                class="el-icon-check"
                title="succeed"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'start'"
                class="el-icon-finished"
                title="start"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'inProgress'"
                class="el-icon-loading"
                title="inProgress"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="btns"
      >
        <el-button
          class="footer-button"
          @click="handleCloseDirect"
        >{{
          $t("apppromotion.closePanel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { promTaskApi } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  props: {
    promStoreList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true,
      appData: [],
      packageIds: [],
      selectData: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    getTableData () {
      let tempData = JSON.parse(sessionStorage.getItem('appstordetail'))
      if (tempData instanceof Array) {
        this.selectData = tempData
      } else {
        this.selectData.push(tempData)
      }
      this.selectData.forEach(selectItem => {
        this.promStoreList.forEach(platformItem => {
          // Assign 'start' value to all attribute
          let attr = platformItem.label
          selectItem[attr] = 'start'
        })
      })
      this.appData = this.selectData
    },
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    },
    handleExecute () {
      this.promTask()
    },
    changeToProcess () {
      for (let i = 0; i < this.appData.length; i++) {
        for (let j = 0; j < this.promStoreList.length; j++) {
          this.appData[i][this.promStoreList[j].label] = 'inProgress'
        }
      }
      let tempTableData = JSON.parse(JSON.stringify(this.appData))
      this.appData = []
      for (let arr of tempTableData) {
        this.appData.push(arr)
      }
    },
    updateResult () {
      let tempRes = JSON.parse(JSON.stringify(this.appData))
      this.appData = []
      for (let tempArr of tempRes) {
        this.appData.push(tempArr)
      }
      this.$emit('refreshAppPromInfo', true)
    },
    fillResultData (index, result) {
      let reData = result.join(',').split(',')
      for (let j = 0; j < reData.length; j++) {
        this.appData[index][this.promStoreList[j].label] = reData[j]
      }
    },
    promTask () {
      let target = []
      this.promStoreList.forEach(item => {
        target.push(item.value)
      })
      let param = {
        targetPlatform: target
      }
      this.changeToProcess()
      let tempData = this.appData
      setTimeout(() => {
        let flagNumber = 0
        for (let i = 0; i < tempData.length; i++) {
          promTaskApi(tempData[i].packageId, param).then((res) => {
            if (res.data) {
              this.fillResultData(i, res.data)
            }
            flagNumber++
            if (flagNumber === tempData.length) {
              this.updateResult()
            }
          }).catch((error) => {
            let defaultMsg = this.$t('promptMessage.operationFailed')
            commonUtil.showTipMsg(this.language, error, defaultMsg)
          })
        }
      }, 2000)
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
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
.promTask {
  position: absolute;
  .el-dialog__body{
    padding:20px 40px 40px 40px !important;
  }
  .el-dialog__footer{
    padding:20px 0 20px 0;
  }
  .btns{
    position: relative;
    right: 58px;
  }
  .modify_header{
    position: absolute;
    top: 8px;
    display: inline-flex;
    .title_icon{
      background: #43F6AD;
      border-radius: 50%;
      height: 9px;
      width: 9px;
      position: relative;
      top: 8px;
    }
    .header-title{
      margin-left: 10px;
      color: #fff;
      font-size: 18px;
    }
  }
  .app-prom {
    margin-top: 50px;
    overflow:auto;
    padding: 0 20px;
  }
  .el-icon-loading {
    color: #607B36;
    font-size: 25px;
  }
  .el-icon-check {
    color: #40BF90;
    font-size: 25px;
  }
  .el-icon-finished{
    font-size: 25px;
    color: darkgrey;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
}
</style>
