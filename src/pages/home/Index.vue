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
  <div class="home">
    <div class="title_top title_left defaultFontBlod clear appStoreTop">
      {{ $t('nav.appstore') }}
      <span class="line_bot1" />
      <el-button
        class="uploadApp_btn linearGradient"
        id="myapp_checktest"
        @click="uploadPackage"
      >
        <img
          src="../../assets/images/uploadApp.png"
          alt=""
          class="uploadApp"
        >
        {{ $t('store.uploadApp') }}
      </el-button>
    </div>
    <div class="app">
      <el-row class="app-content">
        <el-col
          :span="24"
          class="search"
        >
          <div class="title">
            <Search
              @getCurrentComponent="getCurrentComponent"
              @getSearchCondition="getSearchCondition"
            />
          </div>
        </el-col>

        <el-col
          :span="24"
          class="applist-content"
        >
          <component
            :is="currentComponent"
            :app-data="currentPageData"
            @getAppData="getAppData"
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
    <div v-if="uploadDiaVis">
      <uploadPackage
        v-model="uploadDiaVis"
        @input="input"
        @getAppData="getAppData"
      />
    </div>
  </div>
</template>

<script>
import { TYPES, AFFINITY, SORT_BY, INDUSTRY, DEPLOYMODE } from '../../tools/constant.js'
import { getAppTableApi } from '../../tools/api'
import uploadPackage from './UploadPackage.vue'
import appGrid from './AppGrid.vue'
import appList from './AppList.vue'
import Search from './SearchAndFilter.vue'
import pagination from '../../components/common/Pagination.vue'
import uploadAppLogo from '@/assets/images/upload.png'
import appgridLogo from '@/assets/images/appgrid.png'
import applistLogo from '@/assets/images/applist.png'
import HomeSwiper from '../../components/common/Swipers.vue'
import timeFormatTools from '../../tools/timeFormatTools.js'
import { common } from '../../tools/comon.js'
import commonUtil from '../../tools/commonUtil.js'
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
      ifShow: true,
      language: localStorage.getItem('language'),
      advancedStatus: false,
      uploadDiaVis: false,
      iconAactive: false,
      selectedConditions: [],
      types: TYPES,
      affinity: AFFINITY,
      sortBy: SORT_BY,
      industry: INDUSTRY,
      workloadType: DEPLOYMODE,
      currentComponent: 'appGrid',
      currentPageData: [],
      appData: [],
      findAppData: [],
      uploadAppLogo: uploadAppLogo,
      appgridLogo: appgridLogo,
      applistLogo: applistLogo,
      currentPage: 2,
      limitSize: 15,
      appName: '',
      userId: sessionStorage.getItem('userId'),
      offsetPage: sessionStorage.getItem('offsetRepo') || 0,
      total: 0,
      prop: 'createTime',
      order: 'desc',
      screenHeight: document.body.clientHeight,
      // searchCondition: {}
      searchCondition: {
        appName: '',
        types: [],
        affinity: [],
        industry: [],
        status: 'Published',
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        queryCtrl: {
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: this.prop,
          sortType: this.order
        }
      }
    }
  },
  methods: {

    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'home', 332)
    },
    ifFromDetail () {
      let fromPath = sessionStorage.getItem('fromPath') || ''
      if (fromPath === '/detail') {
        this.currentPage = Number(sessionStorage.getItem('currentPage'))
        this.currentComponent = sessionStorage.getItem('currentComponent')
        if (this.currentComponent === 'appGrid') {
          this.iconAactive = false
        } else if (this.currentComponent === 'appList') {
          this.iconAactive = true
        }

        this.getAppData(this.searchCondition)
      } else {
        this.currentPage = 1
      }
    },
    uploadPackage () {
      console.log('uploadtest')
      let userName = sessionStorage.getItem('userNameRole')
      if (userName === 'guest') {
        this.uploadDiaVis = false
      } else {
        this.uploadDiaVis = true
      }
    },
    getCurrentComponent (currentComponent) {
      this.currentComponent = currentComponent
      console.log(this.currentComponent)
    },
    getSearchCondition (searchCondition) {
      this.searchCondition = searchCondition
      console.log(this.searchCondition)
      this.getAppData(searchCondition)
    },
    doQuery () {
      this.selectedConditions = []
      let types = ['types', 'affinity', 'sortBy', 'industry', 'workloadType']
      types.forEach((item) => {
        this[item].forEach((condition) => {
          if (condition.selected) this.selectedConditions.push(condition)
        })
      })
      this.searchCondition = {
        appName: '',
        types: [],
        affinity: [],
        industry: [],
        status: 'Published',
        showType: ['public', 'inner-public'],
        workloadType: [],
        createTime: '',
        userId: '',
        queryCtrl: {
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: this.prop,
          sortType: this.order,
          createTime: 'createTime'
        }
      }
      this.selectedConditions.forEach(
        (item) => {
          switch (item.type) {
            case 'affinity':
              this.searchCondition.affinity.push(item.value)
              break
            case 'types':
              this.searchCondition.types.push(item.value)
              break
            case 'industry':
              this.searchCondition.industry.push(item.value)
              break
            case 'workloadType':
              this.searchCondition.workloadType.push(item.value)
              break
            case 'sortBy':
              switch (item.value) {
                case 'Most':
                  this.prop = this.searchCondition.queryCtrl.sortItem = 'downloadCount'
                  break
                case 'Score':
                  this.prop = this.searchCondition.queryCtrl.sortItem = 'score'
                  break
                case 'Name':
                  this.prop = this.searchCondition.queryCtrl.sortItem = 'appName'
                  break
                case 'UploadTime':
                  this.prop = this.searchCondition.queryCtrl.sortItem = 'createTime'
                  break
              }
              break
            default:
          }
        })

      this.getAppData(this.searchCondition)
    },
    buildQueryReq () {
      let _queryReq = this.searchCondition
      if (this.prop === 'appName') {
        this.order = 'asc'
      } else {
        this.order = 'desc'
      }
      this.searchCondition.queryCtrl = {
        'offset': this.offsetPage,
        'limit': this.limitSize,
        'sortItem': this.prop,
        'sortType': this.order
      }
      return _queryReq
    },

    getCurrentPageData (data, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
      sessionStorage.setItem('offsetRepo', this.offsetPage)
      this.currentPageData = data
    },
    checkProjectData () {
      this.findAppData.forEach(itemBe => {
        INDUSTRY.forEach(itemFe => {
          if (itemBe.industry.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.industry = itemBe.industry.replace(itemFe.labelen, itemFe.labelcn)
          } else if (itemBe.industry.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.industry = itemBe.industry.replace(itemFe.labelcn, itemFe.labelen)
          }
        })
        TYPES.forEach(itemFe => {
          if (itemBe.type.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.type = itemBe.type.replace(itemFe.label[1], itemFe.labelcn)
          } else if (itemBe.type.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.type = itemBe.type.replace(itemFe.labelcn, itemFe.labelen)
          }
        })
      })
    },
    input (input) {
      this.uploadDiaVis = input
    },
    getAppData (searchCondition) {
      this.uploadDiaVis = false
      console.log(searchCondition)
      this.currentComponent = sessionStorage.getItem('currentComponent') || 'appGrid'
      getAppTableApi(searchCondition).then(
        (res) => {
          this.appData = this.findAppData = res.data.results
          this.total = res.data.total
          this.appData.forEach(item => {
            let newDateBegin = timeFormatTools.formatDateTime(item.createTime)
            item.createTime = newDateBegin
          })
          // this.checkProjectData()
        },
        (error) => {
          let defaultMsg = this.$t('promptMessage.getAppFail')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        }
      )
    },
    // home page method
    setItemSelectedValue (item) {
      item.selected = false
      if (item.value === this.selectedConditions[0].label[1]) {
        item.selected = true
        this.doQuery()
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
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
    this.setDivHeight()
    if (sessionStorage.getItem('userNameRole') === 'guest') {
      this.ifShow = false
    }
    this.types.forEach((item) => {
      item.selected = false
    })
    this.affinity.forEach((item) => {
      item.selected = false
    })
    this.sortBy.forEach((item) => {
      item.selected = false
      if (item.value === 'UploadTime') {
        item.selected = true
      }
    })
    this.industry.forEach((item) => {
      item.selected = false
    })
    if (this.$route.params.data) {
      let params = JSON.parse(this.$route.params.data)
      this.selectedConditions = params
      this.industry.forEach((item) => {
        this.setItemSelectedValue(item)
      })
      this.affinity.forEach((item) => {
        item.selected = false
        if (item.value === this.selectedConditions[0].label) {
          item.selected = true
          this.doQuery()
        }
      })
      this.sortBy.forEach((item) => {
        this.setItemSelectedValue(item)
      })
      this.types.forEach((item) => {
        this.setItemSelectedValue(item)
      })
    }
    console.log(this.searchCondition)
    // this.getAppData(this.searchCondition)
    this.ifFromDetail()
  },
  destroyed () {
    sessionStorage.removeItem('offsetRepo')
    this.searchCondition = {}
  }
}
</script>

<style lang="less" scoped>
.home {
    .uploadApp_btn{
    position:absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 40px 0 35px;
    box-shadow: 0px 16px 10px  rgba(83,201,208,0.3);
  }
  .appStoreTop{
    width: 73.64%;
    min-width: 1200px;
    margin:0 auto ;
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
    .info1 {
      font-size: 20px;
    }
    .dialog-footer{
      text-align: center;
      margin-top: 2%;
    }
  }
  // margin-top: 65px;
  .el-form-item {
    margin-bottom: 0;
  }
  .searchAndButton {
    float: right;
    width: 500px;
  }
  .searchBox {
    float: right;
    width: 300px;
    margin-top: -2px;
  }
  .icon-group {
    float: right;
    width: 158px;
    padding-right: 56px;
    em {
      line-height: 55px;
      margin-right: 36px;
      font-size: 24px;
    }
    .iconAactive {
      color: #f66f6a;
      font-size: 30px;
    }
    em:last-child {
      margin-right: 0;
    }
    .uploadAppLogo {
      width: 31px;
      height: 25px;
      margin-right: 20px;
      cursor: pointer;
    }
    .header_img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }
  .app {
    // padding: 30px 10%;
    box-sizing: border-box;
    .app-content {
      background: white;
      padding: 30px 0px 30px 30px;
      box-sizing: border-box;
      width: 73.64%;
      min-width: 1200px;
      margin: 0 auto;
      .search {
        font-size: 16px;
        padding-bottom: 10px;
        .left {
          float: left;
          .search-title {
            color: #688ef3;
            margin: 0 0 0 16px;
          }
          .select-raw {
            display: inline-block;
            border: 8px solid transparent;
            margin: 0 8px;
            position: relative;
          }
          .select-raw-false {
            border-top-color: #688ef3;
            top: 5px;
          }
          .select-raw-true {
            border-bottom-color: #688ef3;
            border-top-left-radius: 50%;
          }
          .select-condition {
            display: inline-block;
            padding: 5px 11px;
            border-radius: 12px;
            font-size: 14px;
            margin-right: 20px;
            margin-bottom: 10px;
            border: 1px solid #688ef3;
            color: #688ef3;
          }
        }
        .right {
          float: right;
        }
      }
      .condition-list {
        margin-bottom: 18px;
        padding-top: 10px;
        .underline {
          padding-bottom: 10px;
          border-bottom: 1px solid #e7ebf5;
        }
        .sort-type {
          margin-top: 15px;
          min-height: 36px;
          line-height: 36px;
          strong {
            margin-right: 50px;
            font-size: 14px;
            color: #FFFFFF;
            font-weight: bold;
            display: inline-block;
            width: 85px;
            height: 30px;
            line-height: 30px;
            background: #688ef3;
            text-align: center;
          }
          .box {
            display: inline-block;
            margin: 0 10px;
            font-size: 14px;
            position: relative;
          }
          .selected {
            color: #688ef3;
            font-weight: bold;
          }
        }
        .sort-type.sort-type-en{
          strong{
            width: 105px;
          }
        }
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
