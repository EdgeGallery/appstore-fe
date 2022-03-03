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
  <div class="serach">
    <el-form
      label-position="center"
      class="clear"
      style="margin-left: -20px;"
      @submit.native.prevent
    >
      <el-form-item
        prop="appName"
        class="lt"
      >
        <el-input
          maxlength="50"
          size="small"
          class="common_input"
          v-model="nameQueryVal"
          :placeholder="$t('common.appName')"
          @change="queryApp"
          suffix-icon="el-icon-search"
        />
      </el-form-item>
      <el-form-item
        prop="sortType"
        class="lt"
      >
        <el-dropdown
          :hide-on-click="true"
          split-button
          class="common_dropdown"
          @command="sortData"
        >
          <span class="el-dropdown-link">
            {{ this.sortItemLabel === '' ? $t('common.sort') : this.sortItemLabel }}
          </span>
          <el-dropdown-menu
            slot="dropdown"
            align="center"
            @change="sortData"
          >
            <el-dropdown-item
              v-for="(item, index) in sortItems"
              :key="index"
              class="box curp"
              :class="{selected: item.selected}"
              :command="index"
              divided
            >
              <span>{{ language === 'cn'?item.labelcn:item.labelen }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item
        class="sortItemContent lt"
      >
        <el-popover
          placement="bottom"
          width="60.2%"
          trigger="click"
          transition="fade-in-linear"
          v-model="isShowFilterDialog"
        >
          <div>
            <el-checkbox-group
              v-model="searchCondition.industry"
            >
              <label :class="language ==='cn'?'labelcn':'labelen'">
                {{ $t('common.industry2') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in appIndustry"
                :key="item.value"
                class="myCheckBox"
                :label="item.labelen"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                <span>{{ language==='cn'?item.labelcn:item.labelen }}</span>
              </el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group
              v-model=" searchCondition.types"
            >
              <label :class="language ==='cn'?'labelcn':'labelen'">
                {{ $t('common.type2') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in appTypes"
                :key="item.value"
                class="box curp"
                :label="item.labelen"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                <span>{{ language==='cn'?item.labelcn:item.labelen }}</span>
              </el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="searchCondition.affinity"
            >
              <label :class="language ==='cn'?'labelcn':'labelen'">
                {{ $t('common.architecture2') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in appAffinity"
                :key="item.value"
                class="box curp"
                :label="item.label"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                {{ item.label }}
              </el-checkbox-button>
            </el-checkbox-group>
            <el-checkbox-group
              v-model="searchCondition.workloadType"
            >
              <label :class="language ==='cn'?'labelcn':'labelen'">
                {{ $t('common.workloadType') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in workloadType"
                :key="item.value"
                class="box curp"
                :label="item.labelen"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                <span>{{ language==='cn'?item.labelcn:item.labelen }}</span>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div style="text-align: right; margin: 0">
            <el-button
              class="confirmBtn"
              size="mini"
              @click="getAppData"
            >
              {{ $t('common.confirm') }}
            </el-button>
            <el-button
              class="clearBtn"
              size="mini"
              @click="cancelAction"
            >
              {{ $t('common.clean') }}
            </el-button>
          </div>
          <el-button
            slot="reference"
            style="border: none; box-shadow: none; padding:0;background:none;"
          >
            <el-tooltip
              class="item"
              effect="light"
              :content="$t('store.filterApp')"
              placement="bottom-start"
              :visible-arrow="false"
            >
              <img
                src="../../assets/images/filter_icon.png"
                class="filterAppLogo header_img"
                alt=""
              >
            </el-tooltip>
          </el-button>
        </el-popover>
      </el-form-item>
      <el-form-item class="lt">
        <el-tooltip
          class="item"
          effect="light"
          :content="$t('common.displaySwitch')"
          placement="bottom-start"
          :visible-arrow="false"
        >
          <img
            class="header_img"
            v-if="appShowType === 'appList'"
            src="../../assets/images/applist.png"
            @click="changeAppList"
            alt=""
          >
          <img
            class="header_img"
            v-if="appShowType === 'appGrid'"
            src="../../assets/images/appgrid.png"
            @click="changeAppList"
            alt=""
          >
        </el-tooltip>
      </el-form-item>
      <el-form-item
        v-if="isShowAppdTrans"
        class="lt"
      >
        <el-tooltip
          class="item"
          effect="light"
          :content="$t('store.appdConversion')"
          placement="bottom-start"
          :visible-arrow="false"
        >
          >
          <img
            src="../../assets/images/appd_conversion_icon.png"
            class="uploadAppLogo header_img"
            @click="appdConversion"
            alt=""
          >
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { appPkgTransToolCheck } from '../../tools/api'
import { TYPES, AFFINITY, SORTITEM, INDUSTRY, DEPLOYMODE } from '../../tools/constant.js'
export default ({
  name: 'SearchAndFilter',
  data () {
    return {
      isShowAppdTrans: false,
      language: localStorage.getItem('language'),
      appShowType: 'appGrid',
      isShowFilterDialog: false,
      appTypes: TYPES,
      appAffinity: AFFINITY,
      appIndustry: INDUSTRY,
      workloadType: DEPLOYMODE,
      sortItems: SORTITEM,
      nameQueryVal: '',
      appName: '',
      selectedConditions: [],
      offsetPage: sessionStorage.getItem('offsetRepo') || 0,
      sortItemLabel: '',
      limitSize: 15,
      sortItem: 'createTime',
      sortType: 'desc',
      searchCondition: {
        types: [],
        affinity: [],
        industry: [],
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        queryCtrl: {
          status: ['Published'],
          appName: '',
          offset: 0,
          limit: 15,
          sortItem: this.sortItem,
          sortType: this.sortType
        }
      }
    }
  },
  methods: {
    initAppdTrans () {
      appPkgTransToolCheck().then(
        (res) => {
          this.isShowAppdTrans = res.data
        }
      )
    },
    queryApp () {
      sessionStorage.setItem('currentPage', 1)
      this.searchCondition.queryCtrl.appName = this.nameQueryVal.toLowerCase()
      this.$emit('initTableData', this.searchCondition)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('getSearchData', this.appName)
    },
    sortData (singleEvent) {
      if (this.language === 'cn') {
        this.sortItemLabel = this.sortItems[singleEvent].labelcn
      } else {
        this.sortItemLabel = this.sortItems[singleEvent].labelen
      }
      this.sortItem = this.sortItems[singleEvent].value
      this.searchCondition.queryCtrl.sortItem = this.sortItem
      sessionStorage.setItem('sortItem', this.sortItem)
      if (this.sortItem === 'AppName') {
        this.sortType = 'asc'
        this.searchCondition.queryCtrl.sortType = 'asc'
        sessionStorage.setItem('sortType', 'asc')
      } else {
        this.sortType = 'desc'
        this.searchCondition.queryCtrl.sortType = 'desc'
        sessionStorage.setItem('sortType', 'desc')
      }
      this.$emit('initTableData', this.searchCondition)
    },
    getAppData () {
      this.$emit('initTableData', this.searchCondition)
      this.isShowFilterDialog = false
    },
    cancelAction () {
      this.searchCondition = {
        appName: '',
        types: [],
        affinity: [],
        industry: [],
        status: 'Published',
        showType: ['public', 'inner-public'],
        workloadType: [],
        userId: '',
        queryCtrl: {
          status: ['Published'],
          offset: 0,
          limit: 15,
          sortItem: 'createTime',
          sortType: 'desc'
        }
      }
      this.selectedConditions = []
      this.appIndustry.forEach((item) => {
        item.selected = false
      })
      this.appTypes.forEach((item) => {
        item.selected = false
      })
      this.workloadType.forEach((item) => {
        item.selected = false
      })
      this.appAffinity.forEach((item) => {
        item.selected = false
      })
    },
    appdConversion () {
      this.$router.push({
        path: '/appChange',
        query: {
          changeStyle: this.appShowType
        }
      })
    },
    getSortedItem (type, value, index) {
      this.selectedConditions = []
      this[type][index].selected = !this[type][index].selected
      let types = ['types', 'affinity', 'industry', 'workloadType']
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
        workloadType: [],
        status: 'Published',
        showType: ['public', 'inner-public'],
        createTime: '',
        userId: '',
        queryCtrl: {
          offset: this.offsetPage,
          limit: this.limitSize,
          sortItem: this.sortItem,
          sortType: this.sortType
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
            default:
          }
        })
    },
    changeAppList () {
      if (this.appShowType === 'appGrid') {
        this.appShowType = 'appList'
        sessionStorage.setItem('currentComponent', 'appList')
      } else {
        this.appShowType = 'appGrid'
        sessionStorage.setItem('currentComponent', 'appGrid')
      }
      this.$emit('changeAppShowType', this.appShowType)
    }
  },
  mounted () {
    sessionStorage.removeItem('sortType')
    sessionStorage.removeItem('sortItem')
    this.initAppdTrans()
    let fromPath = sessionStorage.getItem('fromPath') || ''
    if (fromPath !== '/detail') {
      this.$emit('initTableData', this.searchCondition)
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
})
</script>

<style lang='less'>
.header_img{
  margin-top: 7px;
  cursor: pointer;
}
.el-dropdown-menu{
  padding: 0;
  border-radius: 8px;
}
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus{
  background-color: #9374FF;
  color: #fff;
  border-radius: 8px;
}
.el-dropdown-menu__item--divided{
  margin-top: 0;
}
.el-dropdown-menu__item--divided:before{
  height: 0;
}
.search{
  margin-top: 10px;
  .clear {
    .el-checkbox-button__inner {
      border: 0px;
    }
  }
  .search_input{
    float: left;
    width: 200px;
    .el-input__inner {
      border: 1px solid #5E40C8;
      border-radius: 8px;
    }
  }
  .el-input--small .el-input__inner {
    border: 1.5px solid #5E40C8;
    border-radius: 4px;
    background: rgba(46,20,124,0.7);
  }
  .menuStyle{
    border: 0px;
    -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
    -moz-box-shadow:0px 3px 3px #c8c8c8 ;
    box-shadow:0px 3px 3px #c8c8c8;
  }
  .el-dropdown{
    border: 0px;
  }
  .el-dropdown .el-button:first-child{
    border-right: none;
  }
  .el-dropdown .el-dropdown__caret-button::before {
    display: none !important;
  }
}
.el-checkbox-button__inner:hover{
  color: #5E40C8;
}
.el-popover.el-popper{
  position: absolute;
  top: 90px;
  width: 60.2%;
  left: 16% !important;
  transform-origin: center bottom;
  z-index: 2007;
  .el-button{
    background: #FFFFFF;
    color: #5F45BE;
    border: 1px solid #5F45BE;
    border-radius: 10px;
  }
  .el-button:hover{
    background: #5F45BE;
    color: #fff;
  }
}
.labelcn{
  height:20px;
  position: relative;
  font-size:14px;
  text-align: right;
  top: 6px;
}
.labelen{
  height:20px;
  position: relative;
  font-size:14px;
  top: 6px;
}
@media (max-width: 1800px) and (min-width: 1400px) {
  .el-popover.el-popper{
    left: 16.8% !important;
  }
}
@media (max-width: 1400px) and (min-width: 1200px) {
  .el-popover.el-popper{
    left: 13% !important;
  }
}
</style>
