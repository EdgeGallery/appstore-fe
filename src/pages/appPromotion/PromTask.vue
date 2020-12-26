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
    >
      <div class="app-prom">
        <el-table
          :data="appData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eeeeee'}"
        >
          <el-table-column
            prop="number"
            :label="$t('apppromotion.number')"
            width="125"
          />
          <el-table-column
            prop="name"
            :label="$t('apppromotion.appName')"
          />
          <el-table-column
            v-for="item in providers"
            :key="item.number"
            :label="item.provider"
            :property="item.provider"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row[scope.column.property] === false"
                class="el-icon-close"
                title="false"
              />
              <span
                v-else-if="scope.row[scope.column.property] === true"
                class="el-icon-check"
                title="Succeed"
              />
              <span
                class="el-icon-finished"
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
          id="app_prom_execute"
          @click="handleExecute"
        >{{
          $t("apppromotion.execute")
        }}</el-button>
        <el-button
          id="app_prom_close"
          @click="handleCloseDirect"
        >{{
          $t("apppromotion.closePanel")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { promTaskApi, promProviderInfo } from '../../tools/api.js'
export default {
  data () {
    return {
      dialogVisible: true,
      appPromStatus: 'ready',
      appData: [],
      providers: [],
      appStoreIds: [],
      packageIds: [],
      targetPlatformTitles: []
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('input', false)
          done()
        })
        .catch(_ => {})
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    },
    handleExecute () {
      this.promTask(this.packageIds, this.targetPlatformTitles, this.appStoreIds)
    },
    getProviders () {
      promProviderInfo().then((res) => {
        let data = res.data
        let index = 1
        data.forEach(
          (item) => {
            let providerItem = {
              number: index,
              provider: item.appStoreName,
              appStoreId: item.appStoreId
            }
            this.targetPlatformTitles.push(providerItem.provider)
            this.appStoreIds.push(providerItem.appStoreId)
            this.providers.push(providerItem)
            index++
          }
        )
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('apppromotion.promoteFailed'),
          type: 'warning'
        })
      })
    },
    getPackageIds (data) {
      this.packageIds = []
      data.forEach(
        (item) => {
          this.packageIds.push(item.packageId)
        }
      )
    },
    promTask (packageIds, targetPlatformTitles, appstoreIds) {
      let param = {
        targetPlatform: appstoreIds
      }
      let tempDataArr = []
      this.appData.forEach(
        (data) => {
          promTaskApi(data.packageId, param)
            .then((res) => {
              let resData = res.data
              let tempData = data
              for (let i = 0; i < targetPlatformTitles.length; i++) {
                let attr = targetPlatformTitles[i]
                tempData[attr] = resData[i]
              }
              tempDataArr.push(tempData)
            })
            .catch((err) => {
              this.$message.error(this.$t('promptMessage.operationFailed'))
              console.log(err)
            })
        }
      )
      setTimeout(() => {
        this.appData = []
        this.appData = tempDataArr
        console.log('promote data length' + this.appData.length)
      }, 500)
    }
  },
  watch: {
    value: function (newVal) {
      this.dialogVisible = newVal
    }
  },
  mounted () {
    this.getStatus = function () {
      this.appPromStatus = 'success'
    }

    this.getProviders()
    this.appData = JSON.parse(sessionStorage.getItem('appstordetail'))
    this.getPackageIds(this.appData)
  }
}
</script>
<style lang="less">
.promTask {
  .app-prom {
    height: 400px;
    overflow:auto;
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
  .el-icon-close{
    font-size: 25px;
  }
  .el-icon-finished{
    font-size: 25px;
    color: darkgrey;
  }
  #app_prom_close {
    color: #fff;
    background-color: #5D5F64;
    border-color: #5D5F64;
  }
  #app_prom_execute {
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .execute_style {
    display: inline-block;
    height: auto;
    max-width: 100%;
  }
  .el-dialog__header{background-color: #F0F2F5}
}
</style>
