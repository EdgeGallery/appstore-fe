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
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          stretch
        >
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
          <el-tab-pane
            v-for="(item) in appStoreList"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <!-- <component :is="item.content" /> -->
            <div v-if="isShowAppTable">
              <AppStoreDetail
                @setEnableStatus="setButtonStatus"
                :data="item.content"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
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
import { pullApp, promProviderInfo, getAppByAppstoreId } from '../../tools/api.js'
export default {
  components: {
    AppStoreDetail,
    appPullResultDlg
  },
  data () {
    return {
      isShowAppTable: true,
      allSelectionsApp: [],
      isShowDialog: false,
      appPullResultData: [],
      appStoreArr: [],
      activeName: '',
      isFirstTab: true,
      btnChangeEnable: true,
      appStoreList: [],
      appPackageData: []
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    setButtonStatus (value) {
      this.btnChangeEnable = value
    },
    showPullAppDialog (row) {
      this.appPullResultData = []
      let tempData = JSON.parse(sessionStorage.getItem('allAppPullInfo'))
      console.log(tempData.length)

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
          let resData = res.data
          let pullResult = {
            name: tempData[i].name,
            appstoreName: tempData[i].sourceStoreName,
            result: resData
          }
          this.appPullResultData.push(pullResult)
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('appPull.pullFailed'),
            type: 'warning'
          })
        })
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
                    sourceStoreName: resAppstore[i].label
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
              // 添加tab数据
              this.appStoreList.push(tempdata)
              if (this.isFirstTab) {
                this.activeName = tempdata.name
                this.isFirstTab = false
              }
            }
          }).catch(() => {
            this.$message({
              duration: 2000,
              message: this.$t('appPull.getPullAppException'),
              type: 'warning'
            })
          })
        }
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
      .batch_pull {
        margin-bottom: 25px;
        margin-top: 5px;
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
