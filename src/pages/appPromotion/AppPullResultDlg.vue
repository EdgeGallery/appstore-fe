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
  <div class="appPullResDlg">
    <el-dialog
      :title="$t('appPull.pullAppResult')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="app-pull">
        <el-table
          :data="appPullResultData"
          style="width: 100%"
          header-cell-class-name="headerStyle"
        >
          <el-table-column
            prop="name"
            :label="$t('appPull.name')"
          />
          <el-table-column
            prop="appstoreName"
            :label="$t('appPull.provider')"
          />
          <el-table-column
            prop="result"
            :label="$t('appPull.result')"
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
import { pullApp } from '../../tools/api.js'
export default {
  props: {
    appPullResultData: {
      required: true,
      type: Array
    },
    allSelectionsApp: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    handleCloseDirect () {
      this.dialogVisible = false
      this.$emit('input', false)
    },
    handleExecute () {
      this.appPullResultData = []
      let tempData = this.allSelectionsApp
      for (let item of tempData) {
        let pullResult = {
          name: item.name,
          appstoreName: item.sourceStoreName,
          result: 'inProgress'
        }
        this.appPullResultData.push(pullResult)
      }

      setTimeout(() => {
        let flagNumber = 0
        for (let i = 0; i < tempData.length; i++) {
        // 每次拉取一个app
          let userId = sessionStorage.getItem('userId')
          let userName = sessionStorage.getItem('userName')
          let param = {
            sourceStoreId: tempData[i].sourceStoreId,
            userId: userId,
            userName: userName,
            name: tempData[i].name,
            provider: tempData[i].provider,
            version: tempData[i].version,
            affinity: tempData[i].affinity,
            industry: tempData[i].industry,
            shortDesc: tempData[i].shortDesc,
            type: tempData[i].type,
            atpTestStatus: tempData[i].atpTestStatus,
            sourceStoreName: tempData[i].sourceStoreName
          }
          pullApp(tempData[i].packageId, param).then((res) => {
            let resData = res.data.toString()
            this.appPullResultData[i]['result'] = resData
            flagNumber++
            if (flagNumber === tempData.length) {
              let tempRes = JSON.parse(JSON.stringify(this.appPullResultData))
              this.appPullResultData = []
              for (let tempResArr of tempRes) {
                this.appPullResultData.push(tempResArr)
              }
            }
          }).catch(() => {
            this.$message({
              duration: 2000,
              message: this.$t('appPull.pullFailed'),
              type: 'warning'
            })
          })
        }
      }, 2000)
    }
  }
}
</script>
<style lang="less" scoped>
.appPullResDlg {
  .el-dialog__header{
    background-color: #688ef3 ;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .app-pull {
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
