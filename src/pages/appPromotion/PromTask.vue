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
      :title="$t('apppromotion.appPromotion')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div
        class="app-prom"
      >
        <el-table
          :data="appData"
          style="width: 100%"
          header-cell-class-name="headerStyle"
        >
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
          />
          <el-table-column
            v-for="item in providers"
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
        class="dialog-footer"
      >
        <el-button
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
export default {
  props: {
    appStoreListProp: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true,
      appData: [],
      providers: [],
      packageIds: [],
      platformData: [],
      selectData: []
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
      // Get appstoreid and apstoreName
      this.platformData = this.appStoreListProp
      this.selectData.forEach(selectItem => {
        this.platformData.forEach(platformItem => {
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
        for (let j = 0; j < this.platformData.length; j++) {
          this.appData[i][this.platformData[j].label] = 'inProgress'
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
        this.appData[index][this.platformData[j].label] = reData[j]
      }
    },
    promTask () {
      let target = []
      this.platformData.forEach(item => {
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
          }).catch((err) => {
            this.$message.error(this.$t('promptMessage.operationFailed'))
            console.log(err)
          })
        }
      }, 2000)
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    this.providers = this.appStoreListProp
    this.getTableData()
  }
}
</script>
<style lang="less">
.promTask {
  .el-dialog__header{
    background-color: #688ef3 ;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .app-prom {
    height: 400px;
    overflow:auto;
    .el-icon-close:before{
      font-size: 25px;
      color: #d8363e;
    }
  }

  .el-dialog__footer {
    text-align: center;
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
