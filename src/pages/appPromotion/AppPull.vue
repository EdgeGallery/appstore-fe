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
            @getOrder="getOrder"
            @getProp="getProp"
            @getCurPageSize="getCurPageSize"
            @getOffsetPaget="getoffsetPage"
            @getAppName="appName"
            :total="total"
            :data="currentTableData"
          />
        </div>
      </div>
      <!-- pull dialog -->
      <div v-if="isShowDialog">
        <appPullResultDlg
          ref="childItem"
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
      hackReset: false,
      hasActiveDefault: false,
      curPageSize: 10,
      offsetPage: 0,
      appStoreName: '',
      prop: 'createTime',
      order: 'desc',
      appName: '',
      total: 0,
      opType: 'pull'

    }
  },
  methods: {
    getOrder (data) {
      this.order = data
      console.log(this.order)
    },
    getProp (data) {
      this.prop = data
      console.log(this.prop)
    },
    getCurPageSize (data) {
      this.curPageSize = data
    },
    getOffsetPage (data) {
      this.offsetPage = data
    },
    getAppName (data) {
      this.appName = data
    },
    rebuileComponents () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    getSelectAppstoreData (name) {
      for (let appStoreItem of this.appStoreList) {
        if (appStoreItem.name === name) {
          this.currentTableData = appStoreItem.content
          this.rebuileComponents()
        }
      }
    },
    setSelectedItems (value) {
      this.setPullButtonValue(value)
      this.setAllAppSeclectValueToFalse()
      for (let selectItem of value) {
        for (let appStoreItem of this.appStoreList) {
          if (selectItem.sourceStoreName === appStoreItem.name) {
            for (let appItem of appStoreItem.content) {
              if (selectItem.packageId === appItem.packageId) {
                appItem['isSelectToPull'] = true
                break
              }
            }
            break
          }
        }
      }
    },
    setPullButtonValue (value) {
      if (value.length > 0) {
        this.btnChangeEnable = false
      } else {
        this.btnChangeEnable = true
      }
    },
    setAllAppSeclectValueToFalse () {
      for (let appStoreListItem of this.appStoreList) {
        for (let appItem of appStoreListItem.content) {
          appItem.isSelectToPull = false
        }
      }
    },
    showPullAppDialog (row) {
      this.appPullResultData = []
      let tempData = JSON.parse(sessionStorage.getItem('allAppPullInfo'))
      for (let tempDataArr of tempData) {
        let pullResult = {
          name: tempDataArr.name,
          appstoreName: tempDataArr.sourceStoreName,
          result: 'start'
        }
        this.appPullResultData.push(pullResult)
      }
      this.isShowDialog = true
      setTimeout(() => {
        this.$refs.childItem.handleExecute()
      }, 500)
    },
    getProviders () {
      return new Promise((resolve, reject) => {
        promProviderInfo(this.curPageSize, this.offsetPage, this.appStoreName).then((res) => {
          let data = res.data.results
          this.total = res.data.total
          let index = 1
          for (let item of data) {
            let providerItem = {
              number: index,
              appStoreId: '',
              label: ''
            }
            providerItem.appStoreId = item.appStoreId
            providerItem.label = item.appStoreName
            this.appStoreArr.push(providerItem)
            index++
          }
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
        for (let resAppstoreItem of resAppstore) {
          getAppByAppstoreId(resAppstoreItem.appStoreId, this.curPageSize, this.offsetPage, this.appName, this.order, this.prop, this.opType).then((res) => {
            let appStoreToApps = []
            let data = res.data.results
            this.total = res.data.total
            if (data !== '') {
              data.forEach(
                (item) => {
                  let appDataItem = {
                    name: item.name,
                    provider: item.provider,
                    version: item.version,
                    atpTestReportUrl: item.atpTestReportUrl,
                    packageId: item.packageId,
                    sourceStoreId: resAppstoreItem.appStoreId,
                    affinity: item.affinity,
                    industry: item.industry,
                    shortDesc: item.shortDesc,
                    type: item.type,
                    createTime: item.createTime,
                    atpTestStatus: item.atpTestStatus,
                    sourceStoreName: resAppstoreItem.label,
                    isSelectToPull: false
                  }
                  appStoreToApps.push(appDataItem)
                }
              )
              let tempdata = {
                name: resAppstoreItem.label,
                title: resAppstoreItem.label,
                content: appStoreToApps
              }
              this.appStoreList.push(tempdata)
            }
            if (!this.hasActiveDefault && this.appStoreList.length > 0) {
              this.currentTableData = this.appStoreList[0].content
              this.value = this.appStoreList[0].name
              this.hasActiveDefault = true
              this.rebuileComponents()
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
      .selectStyle{
        width: 260px;
        float: left;
      }
      .batch_pull {
        margin-bottom: 15px;
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
