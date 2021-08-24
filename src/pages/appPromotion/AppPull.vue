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
  <div class="app-pull pullApp">
    <div class="app-pull-content ">
      <div class="pull_container">
        <div
          class="pullNoData contents"
          v-if="appStoreList.length < 1"
        >
          <img
            src="../../assets/images/construct.png"
            alt="a"
          >
          <p class="noData-prompt">
            {{ $t('appPull.haveNoPullData') }} <a
              @click="jumpToApppromote"
              class="noData-prompt-alink"
            > {{ $t('appPull.addApppromote') }} </a>
          </p>
        </div>
        <div class="btn_select">
          <div
            class="batch_pull"
            v-if="appStoreList.length > 0"
          >
            <el-button
              type="primary"
              class="pullBtn"
              :disabled="btnChangeEnable"
              @click="showPullAppDialog"
            >
              {{ $t("appPull.batchPull") }}
            </el-button>
          </div>
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
import { common } from '../../tools/comon.js'
import { promProviderInfo } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    AppStoreDetail,
    appPullResultDlg
  },
  data () {
    return {
      screenHeight: document.body.clientHeight,
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
      total: 0,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'pull_container', 332)
    },
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
        let defaultMsg = this.$t('appPull.getAppStoreException')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  },
  mounted () {
    this.setDivHeight()
    this.getProviders()
  }
}

</script>

<style lang="less" scoped>
.pullApp {
  width: 100%;
  margin-top:48px;
  margin-bottom: -100px;
  display: flex;
  justify-content: center;
  min-height: 800px;
  .app-pull-content {
    width: 73.64%;
    margin: 61px 13.18%;
    min-width: 1200px;

    .pull_container {
      border-radius:16px ;
      background: white;
      padding: 31px;
      .selectStyle{
        width: 260px;
        float:right;
        margin-top: 2px;
      }
      .btn_select{
      .batch_pull {
        margin-bottom: 15px;
        margin-top: -36px;
        margin-left: 10px;
        float: right;
        .pullBtn{
          height:40px;
          margin-top: 38px;
        }
      }
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
.selectStyle /deep/ .el-input__inner {
    border-color: #5E40C8 !important;
    height: 40px;
}
 div /deep/ .el-select__caret{
  color: #5E40C8 !important;
}
div /deep/  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
    background-color: #9374FF !important;
}
div /deep/ .search_input .el-input__icon {
 color: #9374FF !important;
}
 .el-button--primary.is-disabled, .el-button--primary.is-disabled:hover, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:active {
    background-color:  #5E40C8  !important;
    border-color:  #5E40C8 !important;
}
div /deep/ .el-select-dropdown__item.hover,.el-select-dropdown__item:hover {
 background-color: #9374FF !important;
 color: #FFFFFF;
 border-radius: 8px !important;
}
</style>
