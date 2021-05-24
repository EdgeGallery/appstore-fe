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
  <div>
    <eg-bread-crumb :data="breadCrumbData" />
    <div class="docs flex">
      <div
        class="test-editors"
        :class="{'test-editors-en':(language==='en')}"
      >
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          @select="handleSelect"
          background-color="#eee"
        >
          <el-submenu index="2">
            <template slot="title">
              {{ $t('nav.appQuery21') }}
            </template>
            <el-menu-item index="2">
              {{ $t('nav.appQuery21') }}
            </el-menu-item>
            <el-menu-item index="2-2">
              {{ $t('nav.appQuery22') }}
            </el-menu-item>
            <el-menu-item index="2-3">
              {{ $t('nav.appQuery23') }}
            </el-menu-item>
            <el-menu-item index="2-4">
              {{ $t('nav.appQuery24') }}
            </el-menu-item>
            <el-menu-item index="2-5">
              {{ $t('nav.appQuery25') }}
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              {{ $t('nav.appDownload3') }}
            </template>
            <el-menu-item index="3-1">
              {{ $t('nav.appDownload31') }}
            </el-menu-item>
            <el-menu-item index="3-2">
              {{ $t('nav.appDownload32') }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="1">
            {{ $t('nav.appMessage1') }}
          </el-menu-item>
        </el-menu>
      </div>
      <div
        id="test-editor"
      >
        <mavon-editor
          v-model="source"
          :toolbars-flag="false"
          :editable="false"
          :subfield="false"
          default-open="preview"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getInterface } from '../../tools/api.js'
import EgBreadCrumb from 'eg-view/src/components/EgBreadCrumb.vue'
export default {
  props: {
    treeId: {
      type: String,
      default: ''
    }
  },
  components: {
    EgBreadCrumb
  },
  data () {
    return {
      activeIndex: '2',
      source: '',
      language: localStorage.getItem('language') || 'cn',
      breadCrumbData: [
        {
          name: '首页',
          path: '/'
        },
        {
          name: '应用共享',
          path: '/appShare'
        },
        {
          name: '外部应用仓库管理',
          path: ''
        }
      ]
    }
  },

  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
      this.updateBreadCrumbData(this.activeIndex)
      this.getAppStoreDocs()
    }

  },
  methods: {
    getAppStoreDocs () {
      getInterface(this.language, this.activeIndex).then(res => {
        this.source = res.data ? res.data : ''
      })
    },
    clickShow () {
      let name = this.$route.params.value || '2'
      this.activeIndex = name
      this.updateBreadCrumbData(name)
    },
    handleSelect (key, keyPath) {
      this.activeIndex = key
      this.getAppStoreDocs()
      this.updateBreadCrumbData(key)
    },
    updateBreadCrumbData (activeIndex) {
      switch (activeIndex) {
        case '1':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appMessage1'), path: '' }]
          break
        case '2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery21'), path: '' }]
          break
        case '2-2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery22'), path: '' }]
          break
        case '2-3':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery23'), path: '' }]
          break
        case '2-4':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery24'), path: '' }]
          break
        case '2-5':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery25'), path: '' }]
          break
        case '3-1':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appDownload31'), path: '' }]
          break
        case '3-2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appDownload32'), path: '' }]
          break
        default:
      }
    }
  },
  mounted () {
    this.updateBreadCrumbData(this.activeIndex)
    this.getAppStoreDocs()
    this.clickShow()
  }
}
</script>
<style lang='less' >

.docs {
  margin-top: 0px;
  font-size: 14px;
  padding: 20px 10% 75px;
  .el-tabs--left .el-tabs__item.is-left {
    font-size: 15px;
    text-align: left;
  }
  .test-editors{
    width: 250px;
    .el-menu{
      background-color: #f0f2f5;
      height: 100%;
      text-align: left;
      .el-submenu__title{
        line-height: 44px;
        height: 44px;
      }
      .el-submenu__title:hover, .el-submenu__title.is-active{
        background-color: #e7edf7!important;
        color: #688ef3;
      }
      .el-menu-item{
        line-height: 44px;
        height: 44px;
      }
      .el-menu-item:hover, .el-menu-item.is-active{
        background-color: #e7edf7!important;
        color: #688ef3;
      }
    }
  }
  .test-editors.test-editors-en{
    width: 350px;
  }
  #test-editor{
    width: calc(100% - 420px);
    .markdown-body{
      height: 100%;
    }
  }
  .operation {
    margin-bottom: 10px;
    .btn {
      padding: 5px 0;
      font-size: 14px;
      span {
        margin-right: 12px;
      }
    }
  }
}
@media screen and (max-width: 1380px){
  .docs{
    padding: 0 56px;
  }
}
</style>
