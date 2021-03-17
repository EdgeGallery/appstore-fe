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
  <div class="app-pull padding56">
    <div class="app-pull-content">
      <div class="pull_container">
        <div
          class="pullNoData"
          v-if="appStoreList.length < 1"
        >
          <p>{{ $t('appPull.haveNoPullData') }}</p>
          <img
            src="../../assets/images/construct.png"
            alt="a"
          >
        </div>
        <template>
          <el-select
            v-model="value"
            :placeholder="$t('apppromotion.targetPaltform')"
            class="selectStyle"
          >
            <el-option
              v-for="item in appStoreList"
              :key="item.title"
              :label="item.name"
              :value="item.title"
              @click.native="getSelectAppstoreData(item.name)"
            />
          </el-select>
        </template>
        <div
          class="batch_pull"
          v-if="appStoreList.length > 0"
        >
          <el-button
            type="primary"
            :disabled="btnChangeEnable"
            @click="showPullAppDialog"
          >
            {{ $t("appPull.batchPull") }}
          </el-button>
        </div>

        <div v-if="hackReset">
          <AppStoreDetail
            @setSelectedItems="setSelectedItems"
            :data="currentTableData"
          />
        </div>
      </div>
      <!-- pull dialog -->
      <div v-if="isShowDialog">
        <appPullResultDlg
          v-model="isShowDialog"
          :app-pull-result-data="appPullResultData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import appPullResultDlg from './AppPullResultDlg.vue'
import AppStoreDetail from './AppStoreDetail'
import { promProviderInfo, getAppByAppstoreId } from '../../tools/api.js'
export default {
  components: {
    AppStoreDetail,
    appPullResultDlg
  },
  data () {
    return {
      allSelectionsApp: [],
      isShowDialog: false,
      appPullResultData: [],
      appStoreArr: [],
      btnChangeEnable: true,
      value: '',
      appStoreList: [],
      currentTableData: [],
      appPackageData: [],
      hackReset: true
    }
  },
  methods: {
    rebuileComponents () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    getSelectAppstoreData (name) {
      for (let i = 0; i < this.appStoreList.length; i++) {
        if (this.appStoreList[i].name === name) {
          this.currentTableData = this.appStoreList[i].content
          this.rebuileComponents()
        }
      }
    },
    setSelectedItems (value) {
      if (value.length > 0) {
        this.btnChangeEnable = false
      } else {
        this.btnChangeEnable = true
      }
      // 更新appStoreList里面的所有数据选中状态
      for (let i = 0; i < this.appStoreList.length; i++) {
        for (let j = 0; j < this.appStoreList[i].content.length; j++) {
          this.appStoreList[i].content[j].isSelectToPull = false
        }
      }
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.appStoreList.length; j++) {
          if (value[i].sourceStoreName === this.appStoreList[j].name) {
            for (let k = 0; k < this.appStoreList[j].content.length; k++) {
              if (value[i].packageId === this.appStoreList[j].content[k].packageId) {
                this.appStoreList[j].content[k].isSelectToPull = true
                break
              }
            }
            break
          }
        }
      }
    },
    showPullAppDialog (row) {
      this.appPullResultData = []
      let tempData = JSON.parse(sessionStorage.getItem('allAppPullInfo'))
      console.log(tempData.length)

      for (let i = 0; i < tempData.length; i++) {
        let pullResult = {
          name: tempData[i].name,
          appstoreName: tempData[i].sourceStoreName,
          result: 'start'
        }
        this.appPullResultData.push(pullResult)
      }
      this.isShowDialog = true
    },
    getProviders () {
      return new Promise((resolve, reject) => {
        promProviderInfo().then((res) => {
          let data = res.data
          let index = 1
          data.forEach(item => {
            let providerItem = {
              number: index,
              appStoreId: '',
              label: ''
            }
            providerItem.appStoreId = item.appStoreId
            providerItem.label = item.appStoreName
            this.appStoreArr.push(providerItem)
            index++
          })
          if (data.length > 0) {
            resolve(this.appStoreArr)
          }
        }).catch((error) => {
          this.$message({
            duration: 2000,
            message: this.$t('pullApp.getAppStoreException'),
            type: 'warning'
          })
          reject(error)
        })
      })
    },
    getAllPullApps () {
      this.getProviders().then((resAppstore) => {
        for (let i = 0; i < resAppstore.length; i++) {
          getAppByAppstoreId(resAppstore[i].appStoreId).then((res) => {
            let appStoreToApps = []
            let data = res.data
            if (data !== '') {
              data.forEach(
                (item) => {
                  let appDataItem = {
                    name: item.name,
                    provider: item.provider,
                    version: item.version,
                    atpTestReportUrl: item.atpTestReportUrl,
                    packageId: item.packageId,
                    sourceStoreId: resAppstore[i].appStoreId,
                    affinity: item.affinity,
                    industry: item.industry,
                    shortDesc: item.shortDesc,
                    type: item.type,
                    createTime: item.createTime,
                    atpTestStatus: item.atpTestStatus,
                    sourceStoreName: resAppstore[i].label,
                    isSelectToPull: false
                  }
                  console.log('test appstore' + resAppstore[i].appStoreId)
                  appStoreToApps.push(appDataItem)
                }
              )
              let tempdata = {
                name: resAppstore[i].label,
                title: resAppstore[i].label,
                content: appStoreToApps
              }
              this.appStoreList.push(tempdata)
            }
          }).catch(() => {
            this.$message({
              duration: 2000,
              message: this.$t('appPull.getPullAppException'),
              type: 'warning'
            })
          })
        }
        this.currentTableData = this.appStoreList[0]
        this.value = this.appStoreList[0].name
      }).catch(() => {
        this.$message({
          duration: 2000,
          message: this.$t('appPull.getAppStoreException'),
          type: 'warning'
        })
      })
    }
  },
  mounted () {
    this.getAllPullApps()
    sessionStorage.setItem(
      'allAppPullInfo',
      JSON.stringify([])
    )
  }
}

</script>

<style lang="less">
.app-pull {
  .app-pull-content {
    .pull_container {
      background: white;
      padding: 20px;
      .selectStyle{
        width: 260px;
        float: left;
      }
      .batch_pull {
        margin-bottom: 25px;
        margin-top: 5px;
        margin-left: 10px;
        float: left;
      }
      .el-tabs__nav-scroll{
        display: flex;
        justify-content: center;
        background: #EEEEEE;
      }
      .el-tabs__item{
        font-size: 16px;
        padding: 0 20px;
        height: 40px;
        box-sizing: border-box;
        line-height: 40px;
        display: inline-block;
        list-style: none;
        font-weight: 500;
        color: #303133;
        position: relative;
        border: 2px solid #fff;
      }
      .el-tabs__item.is-active {
        background: #C8BFE7;
        color: black;
      }
      .el-tabs__active-bar {
        background-color: transparent !important;
      }
      .el-tabs__header {
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      }
      .pullNoData{
        width:100%;
        height:400px;
        text-align: center;
        line-height: 25px;
      }
    }
  }
}
</style>
