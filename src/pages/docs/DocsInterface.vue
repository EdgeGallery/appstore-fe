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
      <div class="test-editors">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          @select="handleSelect"
          background-color="#eee"
        >
          <el-menu-item index="1">
            {{ $t('nav.appMessage1') }}
          </el-menu-item>
          <el-menu-item index="2">
            {{ $t('nav.appQuery2') }}
          </el-menu-item>
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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['language'])
  },
  data () {
    return {
      activeIndex: '1',
      source: '',
      language: localStorage.getItem('language'),
      breadCrumbData: [
        {
          name: '首页1',
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
      this.updateBreadCrumbData()
      this.language = localStorage.getItem('language')
      this.getAppStoreDocs()
      this.changeBreadData()
    }

  },
  methods: {
    getAppStoreDocs () {
      getInterface(this.language, this.activeIndex).then(res => {
        this.source = res.data ? res.data : ''
      })
    },
    clickShow () {
      let name = this.$route.params.value
      this.activeIndex = name
      console.log(name)
      console.log(this.activeIndex)
    },
    handleSelect (key, keyPath) {
      this.activeIndex = key
      console.log(this.activeIndex)
      console.log(key)
      console.log(keyPath)
      this.getAppStoreDocs()
      this.updateBreadCrumbData(key)
    },
    updateBreadCrumbData (activeIndex) {
      this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }]
      if (this.language === 'cn') {
        switch (activeIndex) {
          case '1':
            this.breadCrumbData.push({ name: this.$t('nav.appMessage1'), path: '' })
            break
          case '2':
            this.breadCrumbData.push({ name: this.$t('nav.appQuery2'), path: '' })
            break
          case '3-1':
            this.breadCrumbData.push({ name: this.$t('nav.appDownload31'), path: '' })
            break
          case '3-2':
            this.breadCrumbData.push({ name: this.$t('nav.appDownload32'), path: '' })
            break
          default:
        }
      }
    }
  },
  mounted () {
    this.updateBreadCrumbData()
    this.clickShow()
    this.getAppStoreDocs()
  }
}
</script>
<style lang='less' >

.docs {
  margin-top: 0px;
  font-size: 14px;
  padding: 0 200px;
  .el-tabs--left .el-tabs__item.is-left {
    font-size: 15px;
    text-align: left;
  }
  .test-editors{
    // margin-top: 40px;

    width: 250px;
    .el-menu{
      padding: 20px;
      background-color: #c0c4cc;
      font-size: 16px;
      height: 100%;
      text-align: left;
      .el-submenu__title{
        font-size: 16px;
      }
      .el-menu-item{
        font-size: 16px;
      }

    }
  }
  #test-editor{
    // margin-top: 40px;
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
