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
    >
      <el-form-item
        prop="appName"
        class="lt"
      >
        <el-input
          maxlength="50"
          size="small"
          v-model="nameQueryVal"
          :placeholder="$t('common.appName')"
          @keyup.enter.native="queryApp"
          class="search_input"
          @clear="queryApp"
        >
          <em
            slot="suffix"
            class="search_icon"
            @click="queryApp"
          />
        </el-input>
      </el-form-item>
      <el-form-item
        prop="sortType"
        class="lt"
      >
        <el-dropdown
          :hide-on-click="true"
          split-button
          @command="handleClick"
        >
          <span class="el-dropdown-link">
            {{ $t('common.sort') }}
          </span>
          <el-dropdown-menu
            slot="dropdown"
            align="center"
            @change="handleClick"
          >
            <el-dropdown-item
              v-for="(item, index) in sortBy"
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
          width="60%"
          trigger="click"
          transition="fade-in-linear"
          v-model="visible"
        >
          <div>
            <el-checkbox-group
              v-model="industry"
            >
              <label style="height:20px;width:65px;position: relative;font-size:14px;top: 7px;">
                {{ $t('common.industry') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in industry"
                :key="item.value"
                class="myCheckBox"
                :label="item.labelen"
                :v-model="item"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value,index)"
              >
                <span>{{ language==='cn'?item.labelcn:item.labelen }}</span>
              </el-checkbox-button>
              <br>
              <label style="height:20px;width:65px;position: relative;font-size:14px;top: 7px;">
                {{ $t('common.type') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in types"
                :key="item.value"
                class="box curp"
                :label="item.labelen"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                <span>{{ language==='cn'?item.labelcn:item.labelen }}</span>
              </el-checkbox-button>
              <br>
              <label style="height:20px;width:65px;position: relative;font-size:14px;top: 7px;">
                {{ $t('common.architecture') }}
              </label>
              <el-checkbox-button
                v-for="(item, index) in affinity"
                :key="item.value"
                class="box curp"
                :label="item.label"
                :checked="item.selected"
                @change="getSortedItem(item.type, item.value, index)"
              >
                {{ item.label }}
              </el-checkbox-button>
              <br>
              <label style="height:20px;width:65px;position: relative;font-size:14px;top: 7px;">
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
              size="mini"
              type="text"
              @click="visible = false"
            >
              取消
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="confirmbtn"
            >
              确定
            </el-button>
          </div>
          <el-button
            slot="reference"
            style="border: none; box-shadow: none; padding:0"
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
                class="filterAppLogo"
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
          :content="$t('store.appdConversion')"
          placement="bottom-start"
          :visible-arrow="false"
        >
          >
          <img
            src="../../assets/images/appd_conversion_icon.png"
            class="uploadAppLogo"
            @click="appdConversion"
            alt=""
          >
        </el-tooltip>
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import logo from '@/assets/images/upload.png'
import { TYPES, AFFINITY, SORT_BY, INDUSTRY, DEPLOYMODE } from '../../tools/constant.js'
export default ({
  name: 'SearchAndFilter',
  components: {
    // uploadPackage
  },
  data () {
    return {
      value: '',
      language: localStorage.getItem('language'),
      iconAactive: false,
      currentComponent: '',
      singleItemList: [],
      singleItem: '',
      visible: false,
      types: TYPES,
      affinity: AFFINITY,
      industry: INDUSTRY,
      workloadType: DEPLOYMODE,
      sortBy: SORT_BY,
      dialogVisible: false,
      ifShow: true,
      statusOptionList: [],
      nameQueryVal: '',
      appName: '',
      selectedConditions: [],
      offsetPage: sessionStorage.getItem('offsetRepo') || 0,
      limitSize: 12,
      prop: 'createTime',
      order: 'desc',
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
          offset: 0,
          limit: 12,
          sortItem: 'createTime',
          sortType: 'desc'
        }
      }
    }
  },
  methods: {
    queryApp () {
      sessionStorage.setItem('currentPage', 1)
      this.searchCondition.appName = this.nameQueryVal.toLowerCase()
      console.log(this.searchCondition)
      this.$emit('getSearchCondition', this.searchCondition)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('getSearchData', this.appName)
    },
    handleClick (singleEvent) {
      console.log(singleEvent)
      this.singleItemList.push(this.sortBy[singleEvent].value)
      this.prop = this.sortBy[singleEvent].value
      console.log(this.prop)
      this.searchCondition.queryCtrl.sortItem = this.prop
      console.log(this.searchCondition)
      this.$emit('getSearchCondition', this.searchCondition)
    },
    confirmbtn () {
      console.log('dfff')
      this.$emit('getSearchCondition', this.searchCondition)
      this.visible = false
    },
    appdConversion () {
      this.$router.push({ name: 'appdconversion' })
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
      // this.searchCondition.appName = this.nameQuery.toLowerCase()
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
            default:
          }
        })
      console.log(this.searchCondition)
      // this.$emit('getSearchCondition', this.searchCondition)
    },
    changeAppList () {
      this.iconAactive = !this.iconAactive
      if (this.iconAactive) {
        this.currentComponent = 'appList'
        sessionStorage.setItem('currentComponent', 'appList')
      } else {
        this.currentComponent = 'appGrid'
        sessionStorage.setItem('currentComponent', 'appGrid')
      }
      // 传递currentComponent = 'appList'给index.vue父组件
      this.$emit('getCurrentComponent', this.currentComponent)
    }
  },
  mounted () {
    console.log(this.searchCondition)
    console.log('123456fdfdfgd')
    this.$emit('getSearchCondition', this.searchCondition)
    console.log('fdfdfgd')
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  }
})
</script>

<style lang='less'>
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
  .clear {
    .el-checkbox-button__inner {
      border: 0px;
    }
  }
  margin-top: 10px;
  .search_input{
    float: left;
      width: 200px;
      .el-input__inner {
        border: 1px solid #380879;
        border-radius: 8px;
      }
      .search_icon{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url('../../assets/images/work_project_search_icon.png');
        position: relative;
        top: 5px;
        cursor: pointer;
        margin-right: 5px;
      }
  }
  .el-button--primary {
    color: #0e0d0d;
    background-color: #fff;
    // border-color: #688ef3;
  }
  .menuStyle{
    border: 0px;
    -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
    -moz-box-shadow:0px 3px 3px #c8c8c8 ;
    box-shadow:0px 3px 3px #c8c8c8;
  }
  .el-dropdown{
    border: 0px;-webkit-box-shadow:0px 3px 3px #c8c8c8; -moz-box-shadow:0px 3px 3px #c8c8c8 ;box-shadow:0px 3px 3px #c8c8c8;
    .el-button{
      border: 0;
    }
  }
// .el-dropdown .el-dropdown__caret-button .el-dropdown__icon {
//     background-color: #61CDD0;
//     padding-left: 0;
//     border: 0px;
//     -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
//     -moz-box-shadow:0px 3px 3px #c8c8c8 ;
//     box-shadow:0px 3px 3px #c8c8c8;
// }
// .el-dropdown-menu{
//   padding: 0px;
//   margin: 0px;
// }
// .el-dropdown-menu__item--divided:before{
//   margin: 0px;
// }
// .el-dropdown{
//   margin-left: 30px;
//   .selected {
//           color: #5e40c8;
//           font-weight: bold;
//         }
// }
.el-button-group.element.style {
  border: 0px;
  -webkit-box-shadow:0px 3px 3px #c8c8c8 ;
  -moz-box-shadow:0px 3px 3px #c8c8c8 ;
  box-shadow:0px 3px 3px #c8c8c8;
}

.element.style {
    height: 20px;
    width: 50px;
    font-size: 14px;
    top: 7px;
    position: relative;
}
.create_time{
  width: 260px;
  border-radius: 8px;
  border-color: #5e40c8;
  height: 30px;
  margin-left: 30px;
  position: relative;
  top: -1px;
  .el-icon-date:before{
    display: none;
  }
  .el-range-input{
    width: 45%;
  }
  .el-icon-circle-close:before{
    position: relative;
    top: 2px;
  }
}
.el-range-editor.el-input__inner{
  padding: 0;
}
  // .el-form-item .el-form-item__content{
  //   height: 30px;
  //   line-height: 30px;
  // }
  .el-select{
    width:80%;
  }
}
</style>
