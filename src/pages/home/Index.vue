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
  <div class="home">
    <div>
      <home-swiper />
    </div>
    <div class="app">
      <el-row class="app-content">
        <el-col
          :span="24"
          class="search"
        >
          <el-row class="searchAndButton">
            <el-col
              class="icon-group"
            >
              <div class="rt">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="上传应用"
                  placement="bottom-start"
                  :visible-arrow="false"
                >
                  >
                  <img
                    :src="uploadAppLogo"
                    class="uploadAppLogo"
                    @click="uploadPackage"
                    alt=""
                  >
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="展示切换"
                  placement="bottom-start"
                  :visible-arrow="false"
                >
                  <img
                    class="header_img"
                    v-if="!iconAactive"
                    src="../../assets/images/applist.png"
                    @click="changeAppList"
                    alt=""
                  >
                  <img
                    class="header_img"
                    v-if="iconAactive"
                    src="../../assets/images/appgrid.png"
                    @click="changeAppList"
                    alt=""
                  >
                </el-tooltip>
              </div>
            </el-col>
            <el-col class="searchBox">
              <div
                class="right"
                id="home_namequery"
              >
                <el-input
                  suffix-icon="el-icon-search"
                  v-model="nameQuery"
                  @change="handleNameQuery"
                  :placeholder="$t('common.appName')"
                  class="search_input"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="24"
          class="condition-list"
        >
          <div class="sort-type">
            <span class="icon" />
            <strong>{{ $t('common.industry') }}</strong>
            <div
              v-for="(item, index) in industry"
              :key="index"
              class="box curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('industry', index)"
            >
              <span>{{ language==='cn'?item.label[0]:item.label[1] }}</span>
            </div>
          </div>
          <div class="sort-type">
            <span class="icon" />
            <strong>{{ $t('common.type') }}</strong>
            <div
              v-for="(item, index) in types"
              :key="index"
              class="box curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('types', index)"
            >
              <span>{{ language === 'cn'?item.label[0]:item.label[1] }}</span>
            </div>
          </div>
          <div class="sort-type">
            <span class="icon" />
            <strong>{{ $t('common.architecture') }}</strong>
            <div
              v-for="(item, index) in affinity"
              :key="index"
              class="box curp"
              :class="{selected: item.selected}"
              @click="selectedCondition('affinity', index)"
            >
              <span>{{ item.label }}</span>
            </div>
          </div>
          <div class="sort-type underline">
            <span class="icon" />
            <strong>{{ $t('store.sortBy') }}</strong>
            <div
              v-for="(item, index) in sortBy"
              :key="index"
              class="box curp"
              :class="{selected: item.selected}"
              @click="selectedSortBy( index)"
            >
              <span>{{ language === 'cn'?item.label[0]:item.label[1] }}</span>
            </div>
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
            style="margin-bottom: 10px;"
            :table-data="findAppData"
            :current-page-prop="currentPage"
            @getCurrentPageData="getCurrentPageData"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 上传组件 -->
    <div v-show="uploadDiaVis">
      <uploadPackage
        v-model="uploadDiaVis"
        @getAppData="getAppData"
      />
    </div>
  </div>
</template>

<script>
import { TYPES, AFFINITY, SORT_BY, INDUSTRY } from '../../tools/constant.js'
import { getAppTableApi } from '../../tools/api'
import uploadPackage from './UploadPackage.vue'
import appGrid from './AppGrid.vue'
import appList from './AppList.vue'
import pagination from '../../components/common/Pagination.vue'
import bannerImage from '../../components/common/BannerImage.vue'
import uploadAppLogo from '@/assets/images/upload.png'
import appgridLogo from '@/assets/images/appgrid.png'
import applistLogo from '@/assets/images/applist.png'
import HomeSwiper from '../../components/common/Swipers.vue'
export default {
  name: 'Home',
  components: {
    uploadPackage,
    appGrid,
    appList,
    pagination,
    bannerImage,
    HomeSwiper
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      advancedStatus: false,
      uploadDiaVis: false,
      iconAactive: false,
      nameQuery: '',
      selectedConditions: [],
      types: TYPES,
      affinity: AFFINITY,
      sortBy: SORT_BY,
      industry: INDUSTRY,
      currentComponent: 'appGrid',
      currentPageData: [],
      appData: [],
      findAppData: [],
      uploadAppLogo: uploadAppLogo,
      appgridLogo: appgridLogo,
      applistLogo: applistLogo,
      currentPage: 2
    }
  },
  methods: {
    ifFromDetail () {
      let fromPath = sessionStorage.getItem('fromPath') || ''
      if (fromPath === '/detail') {
        console.log('from  detail')
        this.currentPage = Number(sessionStorage.getItem('currentPage'))
        this.getAppData()
      } else {
        sessionStorage.removeItem('currentPage')
        this.currentPage = 1
      }
      console.log(this.currentPage)
    },
    filterFindAppData (data) {
      let appId = []
      for (let item of data) {
        appId.push(item.appId)
      }
      let filterData = []
      appId = [...new Set(appId)]
      for (let i = 0; i < appId.length; i++) {
        for (let item of data) {
          if (item.appId === appId[i]) {
            filterData.push(item)
            appId.splice(i, 1)
          }
        }
      }
      return filterData
    },
    uploadPackage () {
      this.uploadDiaVis = true
    },
    changeAppList () {
      this.iconAactive = !this.iconAactive
      if (this.iconAactive) {
        this.currentComponent = 'appList'
      } else {
        this.currentComponent = 'appGrid'
      }
    },
    sortByApp () {
      let sortNumber = (a, b) => {
        return b - a
      }
      // order by app name
      let findApp = (fieldName, type) => {
        let fieldArr = []
        let appSort = []
        this.findAppData.forEach((item) => {
          if (type === 'Name') {
            fieldArr.push(item[fieldName].toLowerCase())
            fieldArr = fieldArr.sort()
          } else {
            fieldArr.push(item[fieldName])
            fieldArr = fieldArr.sort(sortNumber)
          }
        })
        const set = new Set(fieldArr)
        fieldArr = [...set]
        fieldArr.forEach((fieldItem) => {
          this.findAppData.forEach((item) => {
            if (type === 'Name') {
              if (item[fieldName].toLowerCase() === fieldItem) {
                appSort.push(item)
              }
            } else {
              if (item[fieldName] === fieldItem) {
                appSort.push(item)
              }
            }
          })
        })
        return appSort
      }
      this.selectedConditions.forEach((item) => {
        let type = item.value
        if (type === 'Name') {
          this.findAppData = findApp('name', type)
        } else if (type === 'Most') {
          this.findAppData = findApp('downloadCount', type)
        } else if (type === 'Score') {
          this.findAppData = findApp('score', type)
        } else if (type === 'UploadTime') {
          this.findAppData = findApp('uploadTime', type)
        }
      })
    },
    queryAppByCondition () {
      this.findAppData = []
      let conditionsTypes = []
      this.selectedConditions.forEach((condition) => {
        conditionsTypes.push(condition.type)
        let type = condition.label.toString()
        let conformData = this.appData.filter((item) => {
          let itemAffinity = item.affinity
          let itemType = item.type
          let itemIndustry = item.industry
          return (
            type.match(itemAffinity) || type.match(itemType) || type.match(itemIndustry)
          )
          // console.log(itemType)
          // return (type.match(itemType[0]) || type.match(itemType[1]))
          // itemType.forEach((item) => {
          //   console.log(type.match(item))
          //   return type.match(item)
          // })
        })
        if (
          conditionsTypes.every((item) => {
            return item === 'types'
          }) ||
          conditionsTypes.every((item) => {
            return item === 'affinity'
          }) ||
          conditionsTypes.every((item) => {
            return item === 'industry'
          })
        ) {
          this.findAppData = [...this.findAppData, ...conformData]
        } else if (
          conditionsTypes.every((item) => {
            return item !== 'sortBy'
          })
        ) {
          this.findAppData = this.findAppData.filter((item) => {
            return conformData.indexOf(item) !== -1
          })
        }
      })
      if (!this.selectedConditions.length) this.findAppData = this.appData
      conditionsTypes = [...new Set(conditionsTypes)]
      if (conditionsTypes.length === 1 && conditionsTypes[0] === 'sortBy') {
        this.findAppData = this.appData
      }
      // filter of type and affinity
      this.findAppData = this.filterFindAppData(this.findAppData)
      // this.sortByApp(this.findAppData)
    },
    changeSelectedConditions () {
      this.selectedConditions = []
      let types = ['types', 'affinity', 'sortBy', 'industry']
      types.forEach((item) => {
        this[item].forEach((condition) => {
          if (condition.selected) this.selectedConditions.push(condition)
        })
      })
      this.queryAppByCondition()
    },
    changeSelectedConditions2 () {
      this.selectedConditions = []
      let types = ['types', 'affinity', 'sortBy', 'industry']
      types.forEach((item) => {
        this[item].forEach((condition) => {
          if (condition.selected) this.selectedConditions.push(condition)
        })
      })
      this.queryAppByCondition()
      this.sortByApp(this.findAppData)
    },
    selectedCondition (type, index) {
      this[type][index].selected = !this[type][index].selected
      this.changeSelectedConditions()
    },
    selectedSortBy (index) {
      if (
        this.sortBy.every((item) => {
          return item.selected === false
        })
      ) {
        this.sortBy[index].selected = !this.sortBy[index].selected
        this.changeSelectedConditions2()
      } else {
        if (this.sortBy[index].selected === true) {
          this.sortBy[index].selected = !this.sortBy[index].selected
          this.changeSelectedConditions2()
        } else {
          this.sortBy.forEach((item) => {
            item.selected = false
          })
          this.sortBy[index].selected = !this.sortBy[index].selected
          this.changeSelectedConditions2()
        }
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },

    handleNameQuery () {
      this.findAppData = this.appData
      this.findAppData = this.findAppData.filter((item) => {
        let itemName = item.name.toLowerCase()
        // return itemName.match(this.nameQuery.toLowerCase())
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppData = this.appData
    },
    checkProjectData () {
      this.findAppData.forEach(itemBe => {
        INDUSTRY.forEach(itemFe => {
          if (itemBe.industry.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.industry.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[0], itemFe.label[1])
          }
        })
        TYPES.forEach(itemFe => {
          if (itemBe.type.match(itemFe.label[1]) && this.language === 'cn') {
            itemBe.type = itemBe.type.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.type.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.type = itemBe.type.replace(itemFe.label[0], itemFe.label[1])
          }
        })
      })
    },
    getAppData () {
      this.uploadDiaVis = false
      getAppTableApi().then(
        (res) => {
          this.appData = this.findAppData = res.data
          this.checkProjectData()
        },
        () => {
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.getAppFail')
          })
        }
      )
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getAppData()
    }
  },
  mounted () {
    this.getAppData()
    this.ifFromDetail()
    this.types.forEach((item) => {
      item.selected = false
    })
    this.affinity.forEach((item) => {
      item.selected = false
    })
    this.sortBy.forEach((item) => {
      item.selected = false
    })
    this.industry.forEach((item) => {
      item.selected = false
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  margin-top: 65px;
  background: white;
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
      // margin-right: 20px;
      cursor: pointer;
    }
  }
  .app {
    padding: 0 56px;
    box-sizing: border-box;
    .app-content {
      background: white;
      padding: 0px;
      box-sizing: border-box;
      .search {
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e7ebf5;
        // padding-bottom: 15px;
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
          // width: 250px;
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
          margin-top: 10px;
          strong {
            margin-right: 20px;
            font-size: 14px;
            color: #3d3d3d;
            font-weight: bold;
            display: inline-block;
            width: 65px;
          }
          .icon {
            width: 8px;
            height: 8px;
            display: inline-block;
            background-color: #688ef3;
            margin-right: 10px;
            border-radius: 50%;
          }
          .box {
            display: inline-block;
            padding: 6px 8px;
            margin: 0 5px;
            font-size: 14px;
            // border: 1px solid #bac0ce;
            position: relative;
          }
          .selected {
            // border: 1px solid #688ef3;
            border-radius: 12px;
            background-color: #688ef3;
            color: white;
          }
        }
      }
    }
  }
}
</style>
