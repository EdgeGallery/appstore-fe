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
          <img
            src="../../assets/images/construct.png"
            alt="a"
          >
          <p class="noData-prompt">{{$t('appPull.haveNoPullData')}}<a @click="jumpToApppromote" class="noData-prompt-alink">{{$t('appPull.addApppromote') }}</a>
          </p>
        </div>
        <template>
          <el-select
            v-if="appStoreList.length > 0"
            v-model="activeAppStore"
            :placeholder="$t('apppromotion.targetPaltform')"
            class="selectStyle"
          >
            <el-option
              v-for="item in appStoreList"
              :key="item.title"
              :label="item.name"
              :value="item.title"
              @click.native="getSelectAppstoreData(item)"
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
            @getAppPullInfo="getAppPullInfo"
            :total="total"
            :select-app-store-info="selectAppStoreInfo"
          />
        </div>
      </div>
      <!-- pull dialog -->
      <div v-if="isShowDialog">
        <appPullResultDlg
          ref="childItem"
          v-model="isShowDialog"
          :app-pull-result-data="appPullResultData"
          :all-selections-app="allSelectionsApp"
        />
      </div>
    </div>
  </div>
</template>

<script>
import appPullResultDlg from './AppPullResultDlg.vue'
import AppStoreDetail from './AppStoreDetail'
import { promProviderInfo } from '../../tools/api.js'
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
      btnChangeEnable: true,
      activeAppStore: '',
      appStoreList: [],
      selectAppStoreInfo: {},
      hackReset: false,
      curPageSize: 10,
      offsetPage: 0,
      appStoreName: '',
      prop: 'createTime',
      order: 'desc',
      nameQuery: '',
      total: 0
    }
  },
  methods: {
    jumpToApppromote () {
      this.$router.push('/apppromote')
    },
    getAppPullInfo (data) {
      if (data.length > 0) {
        this.allSelectionsApp = data
        this.btnChangeEnable = false
      } else {
        this.btnChangeEnable = true
      }
    },
    rebuileComponents () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    getSelectAppstoreData (item) {
      this.selectAppStoreInfo = item
      this.rebuileComponents()
    },
    showPullAppDialog () {
      this.appPullResultData = []
      for (let item of this.allSelectionsApp) {
        let pullResult = {
          name: item.name,
          appstoreName: item.sourceStoreName,
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
      promProviderInfo(this.curPageSize, this.offsetPage, this.appStoreName).then((res) => {
        let data = res.data.results
        this.total = res.data.total
        for (let item of data) {
          let tempdata = {
            name: item.appStoreName,
            title: item.appStoreName,
            appStoreId: item.appStoreId
          }
          this.appStoreList.push(tempdata)
        }
        if (this.appStoreList.length > 0) {
          this.selectAppStoreInfo = this.appStoreList[0]
          this.activeAppStore = this.appStoreList[0].name
          this.rebuileComponents()
        }
      }).catch((error) => {
        console.log(error)
        this.$message({
          duration: 2000,
          message: this.$t('appPull.getAppStoreException'),
          type: 'warning'
        })
      })
    }
  },
  mounted () {
    this.getProviders()
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
        height:600px;
        text-align: center;
        line-height: 25px;
        .noData-prompt {
          text-align: center;
          margin: 60px 0 30px;
          font-size: 17px;
          .noData-prompt-alink {
            cursor: pointer;
          }
          .noData-prompt-alink:link {
            text-decoration:none;
          }
          .noData-prompt-alink:visited {
            text-decoration: none;
          }
          .noData-prompt-alink:hover {
            text-emphasis: underline;
          }
          .noData-prompt-alink:active{
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
