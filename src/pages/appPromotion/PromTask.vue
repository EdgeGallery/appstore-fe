<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
      <div class="app-prom">
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
                title="Succeed"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'start'"
                class="el-icon-finished"
                title="start"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'empty'"
                class="el-icon-minus"
                title="empty"
              />
              <span
                v-else-if="scope.row[scope.column.property] === 'inProgress'"
                class="el-icon-loading"
                title="aaa"
              />
              <span
                class="el-icon-loading"
                v-else
                title="In Progress"
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
        <el-button
          type="primary"
          @click="handleExecute"
        >{{
          $t("apppromotion.execute")
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
      appPromStatus: 'ready',
      appData: [],
      providers: [],
      appStoreIds: [],
      packageIds: [],
      targetPlatformTitles: [],
      promoteAppStore: [],
      empty: 'empty',
      start: 'start',
      isTrue: 'true',
      iFalse: 'false',
      InProgress: 'inProgress',
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
      // 获取appstoreid和apstoreName
      this.platformData = this.appStoreListProp
      console.log(this.platformData)
      this.selectData.forEach(selectItem => {
        this.platformData.forEach(platformItem => {
          // 全部赋值成empty
          let attr = platformItem.label
          selectItem[attr] = this.empty
          // 修改value成已经选的appstore
          if (selectItem.targetPlatform.indexOf('全选') !== -1 || selectItem.targetPlatform.indexOf(platformItem.value) !== -1) {
            selectItem[attr] = this.start
          }
        })
      })
      console.log(this.selectData)
      this.appData = this.selectData
      console.log(this.appData)
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
      this.promTask(this.packageIds, this.platformData, this.appStoreIds)
    },
    getPackageIds (data) {
      this.packageIds = []
      data.forEach(
        (item) => {
          this.packageIds.push(item.packageId)
        }
      )
    },
    promTask (packageIds, platformData, appstoreIds) {
      console.log(this.appData)

      // 延迟2秒调用后台
      let data = JSON.parse(JSON.stringify(this.appData))
      data.forEach(
        (appDataItem) => {
          if (appDataItem.targetPlatform.indexOf('全选') !== -1) {
            appDataItem.targetPlatform = []
            this.platformData.forEach(item => {
              appDataItem.targetPlatform.push(item.value)
            })
          }
          let param = {
            targetPlatform: appDataItem.targetPlatform
          }
          for (let i = 0; i < appDataItem.targetPlatform.length; i++) {
            this.platformData.forEach(platformItem => {
              if (appDataItem.targetPlatform[i] === platformItem.value) {
                let attr = platformItem.label
                appDataItem[attr] = this.InProgress
              }
            })
          }
          this.appData = data
          promTaskApi(appDataItem.packageId, param)
            .then((res) => {
              if (res.data) {
                // [true,false]
                let reData = res.data
                console.log(reData)
                let resData = reData.join(',').split(',')
                console.log(resData)
                for (let i = 0; i < appDataItem.targetPlatform.length; i++) {
                  this.platformData.forEach(platformItem => {
                    if (appDataItem.targetPlatform[i] === platformItem.value) {
                      let attr = platformItem.label
                      appDataItem[attr] = resData[i]
                    }
                  })
                }
                console.log(this.appData)
              }
            })
            .catch((err) => {
              this.$message.error(this.$t('promptMessage.operationFailed'))
              console.log(err)
            })
        }
      )
      // setTimeout(() => {
      //   console.log(this.appData)
      // }, 500)
    },
    getPromoteAppStore (data) {
      this.promoteAppStore = []
      data.forEach(
        (item) => {
          let appstore = {
            packageId: '',
            appStoreIds: []
          }
          appstore.appStoreIds = item.targetPlatform
          appstore.packageId = item.packageId
          this.promoteAppStore.push(appstore)
          console.log('appstore:')
          console.log(this.promoteAppStore)
        }
      )
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    console.log(this.appStoreListProp)
    this.providers = this.appStoreListProp
    this.getStatus = function () {
      this.appPromStatus = 'success'
    }
    this.getTableData()
    this.getPromoteAppStore(this.appData)
    this.getPackageIds(this.appData)
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
