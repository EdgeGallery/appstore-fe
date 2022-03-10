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
  <div class="appStoreHome common_bg">
    <div
      class="common_title clear"
    >
      <p class="defaultFontBlod">
        {{ $t('nav.appstore') }}
      </p>
      <el-button
        class="uploadApp_btn common_button"
        id="myapp_checktest"
        @click="uploadPackage"
      >
        {{ $t('store.uploadApp') }}
      </el-button>
    </div>
    <div class="appMainContent">
      <el-row class="app-content common_background">
        <el-col
          :span="24"
          class="search"
        >
          <div class="title">
            <Search
              @changeAppShowType="changeAppShowType"
              @initTableData="initTableData"
            />
          </div>
        </el-col>

        <el-col
          :span="24"
          class="applist-content"
        >
          <component
            :is="appShowType"
            :app-data="currentPageData"
            :current="currentPage"
            @getAppData="getAppData"
            v-if="isShowComponent"
          />
          <pagination
            class="clearfix"
            style="margin-bottom: 0px;"
            :table-data="findAppData"
            :current-page-prop="currentPage"
            :total="total"
            @getCurrentPageData="getCurrentPageData"
          />
        </el-col>
      </el-row>
    </div>
    <!-- Upload components -->
    <div v-if="isShwoUploadDialog">
      <uploadPackage
        v-model="isShwoUploadDialog"
        @input="input"
      />
    </div>
  </div>
</template>

<script>
import { TYPES, AFFINITY, SORTITEM, INDUSTRY, DEPLOYMODE } from '../../tools/constant.js'
import { queryApp } from '../../tools/api'
import uploadPackage from './UploadPackage.vue'
import appGrid from './AppGrid.vue'
import appList from './AppList.vue'
import Search from './SearchAndFilter.vue'
import pagination from '../../components/common/Pagination.vue'
import uploadAppLogo from '@/assets/images/upload.png'
import appgridLogo from '@/assets/images/appgrid.png'
import applistLogo from '@/assets/images/applist.png'
import HomeSwiper from '../../components/common/Swipers.vue'
import commonUtil from '../../tools/commonUtil.js'
import timeFormatTools from '../../tools/timeFormatTools.js'
export default {
  name: 'Home',
  components: {
    uploadPackage,
    appGrid,
    appList,
    pagination,
    HomeSwiper,
    Search
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      isShwoUploadDialog: false,
      selectedConditions: [],
      appTypes: TYPES,
      appAffinity: AFFINITY,
      sortItems: SORTITEM,
      appIndustry: INDUSTRY,
      workloadType: DEPLOYMODE,
      appShowType: 'appGrid',
      currentPageData: [],
      findAppData: [],
      uploadAppLogo: uploadAppLogo,
      appgridLogo: appgridLogo,
      applistLogo: applistLogo,
      currentPage: 1,
      limitSize: 15,
      userId: sessionStorage.getItem('userId'),
      offsetPage: sessionStorage.getItem('offsetRepo') || 0,
      total: 0,
      sortItem: 'createTime',
      sortType: 'desc',
      searchCondition: {
        types: [],
        affinity: [],
        industry: [],
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        experienceAble: false,
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: this.sortItem,
          sortType: this.sortType
        }
      },
      isShowComponent: false
    }
  },
  methods: {
    checkFromDetail () {
      let fromPath = sessionStorage.getItem('fromPath') || ''
      sessionStorage.removeItem('fromPath')
      if (fromPath === '/detail') {
        this.currentPage = Number(sessionStorage.getItem('currentPage'))
        this.getAppData(this.searchCondition)
      }
    },
    uploadPackage () {
      if (sessionStorage.getItem('userNameRole') === 'guest') {
        this.$message.warning(this.$t('system.guestPrompt'))
      } else {
        let userName = sessionStorage.getItem('userNameRole')
        if (userName === 'guest') {
          this.isShwoUploadDialog = false
        } else {
          this.isShwoUploadDialog = true
        }
      }
    },
    changeAppShowType (appShowType) {
      this.appShowType = appShowType
    },
    initTableData (searchCondition) {
      this.searchCondition = searchCondition
      this.getAppData(searchCondition)
    },
    buildQueryReq () {
      this.sortItem = sessionStorage.getItem('sortItem')
      this.sortType = sessionStorage.getItem('sortType')
      this.searchCondition.queryCtrl = {
        status: ['Published'],
        appName: '',
        offset: this.offsetPage,
        limit: this.limitSize,
        sortItem: this.sortItem,
        sortType: this.sortType
      }
      return this.searchCondition
    },
    getCurrentPageData (data, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
      sessionStorage.setItem('offsetRepo', this.offsetPage)
      this.currentPageData = data
    },
    input (input) {
      this.isShwoUploadDialog = input
    },
    getAppData (searchCondition) {
      let searchParam = null
      if (typeof searchCondition !== 'undefined' && !searchCondition.queryCtrl.sortItem) {
        searchCondition.queryCtrl.limit = 15
        searchCondition.queryCtrl.offsetPage = sessionStorage.getItem('offsetRepo') || 0
        searchCondition.queryCtrl.sortItem = 'createTime'
        searchCondition.queryCtrl.sortType = 'desc'
        searchParam = searchCondition
      } else {
        searchParam = this.searchCondition
      }
      this.isShwoUploadDialog = false
      this.isShowComponent = false
      queryApp(searchParam).then((res) => {
        this.findAppData = res.data.results
        this.isShowComponent = true
        this.total = res.data.total
        this.findAppData.forEach(item => {
          let newDateBegin = timeFormatTools.formatDateTime(item.createTime)
          item.createTime = newDateBegin
        })
      }).catch(error => {
        let defaultMsg = this.$t('promptMessage.getAppFail')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.getAppData(this.searchCondition)
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.searchCondition = this.buildQueryReq()
      this.getAppData(this.searchCondition)
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.searchCondition = this.buildQueryReq()
      this.getAppData(this.searchCondition)
    },
    total (val, oldVal) {
      if (this.limitSize > val) {
        this.currentPage = 1
        sessionStorage.setItem('currentPage', 1)
        this.offsetPage = 0
      }
    }
  },
  mounted () {
    sessionStorage.removeItem('sortType')
    sessionStorage.removeItem('sortItem')
    this.sortItems.forEach((item) => {
      item.selected = false
      if (item.value === 'UploadTime') {
        item.selected = true
      }
    })
    this.checkFromDetail()
  },
  destroyed () {
    sessionStorage.removeItem('offsetRepo')
    this.searchCondition = {}
  }
}
</script>

<style lang="less" scoped>
.appStoreHome {
  .uploadApp_btn{
    position:absolute;
    right: 0;
    bottom: 40px;
  }
  .uploadApp{
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
  .el-dialog {
    height: 333px;
    width: 535px;
    .el-dialog__header {
      font-size: 16px;
      text-decoration: overline
    }
    .el-dialog__body{
      font-size: 20px;
    }
  }
  .appMainContent {
    box-sizing: border-box;
    .app-content {
      padding: 30px 30px 0px 30px;
      box-sizing: border-box;
      width: 73.64%;
      min-width: 1200px;
      margin: 0 auto;
      border-radius: 20px;
      .search {
        font-size: 16px;
        padding-bottom: 10px;
      }
    }
  }
  @media screen and (max-width:1380px){
    .app{
      padding: 30px 56px;
    }
  }
}
</style>
