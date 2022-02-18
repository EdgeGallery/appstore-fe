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
  <div class="docBackground">
    <div class="docTop">
      <p class="defaultFontBlod">
        {{ $t("nav.docs") }}
      </p>
    </div>
    <eg-bread-crumb
      :data="breadCrumbData"
      style="display:none;"
    />
    <div class="docContent">
      <div class="docs flex">
        <div
          class="test-editors"
          :class="{'test-editors-en':(language==='en')}"
        >
          <el-menu
            :default-active="activeIndex"
            v-model="activeIndex"
            class="el-menu-demo"
            unique-opened="false"
            @select="handleSelect"
            background-color="#eee"
          >
            <el-submenu index="5">
              <template
                slot="title"
              >
                <div
                  class="oneTitles"
                  :class="{'oneSelect': activeIndex === '5' }"
                >
                  <img
                    :src="activeIndex === '5' ? require('@/assets/images/docGuideUnselect.png'): require('@/assets/images/docGuideUnselect.png')"
                    alt=""
                  >
                  {{ $t('docs.userGuide') }}
                </div>
              </template>
              <el-menu-item index="5">
                {{ $t('docs.userGuide') }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template
                slot="title"
              >
                <div
                  class="oneTitles"
                  :class="{'oneSelect': (activeIndex === '4' ||activeIndex === '4-1'|| activeIndex === '4-2' ||activeIndex === '4-3'|| activeIndex === '4-4' || activeIndex === '4-5' )}"
                >
                  <img
                    :src="activeIndex === '4' ||activeIndex === '4-1'|| activeIndex === '4-2' ||activeIndex === '4-3'|| activeIndex === '4-4' || activeIndex === '4-5' ? require('@/assets/images/docAppUnselect.png'): require('@/assets/images/docAppUnselect.png')"
                    alt=""
                  >
                  {{ $t('docs.appFolderStar') }}
                </div>
              </template>
              <el-menu-item index="4">
                {{ $t('docs.summary') }}
              </el-menu-item>
              <el-menu-item index="4-1">
                {{ $t('docs.toscaFolder') }}
              </el-menu-item>
              <el-menu-item index="4-2">
                {{ $t('docs.APPDFolder') }}
              </el-menu-item>
              <el-menu-item index="4-3">
                {{ $t('docs.imageFolder') }}
              </el-menu-item>
              <el-menu-item index="4-4">
                {{ $t('docs.manifestFile') }}
              </el-menu-item>
              <el-menu-item index="4-5">
                {{ $t('docs.artifactsFolder') }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="1">
              <template
                slot="title"
              >
                <div
                  class="oneTitles"
                  :class="{'oneSelect': (activeIndex === '1' ||activeIndex === '1-2'|| activeIndex === '1-2-1' ||activeIndex === '1-2-2'|| activeIndex === '1-2-3' || activeIndex === '1-2-4'|| activeIndex === '1-2-5' || activeIndex === '1-3'|| activeIndex === '1-3-1' || activeIndex === '1-3-2' )}"
                >
                  <img
                    :src="activeIndex === '1' ||activeIndex === '1-2'|| activeIndex === '1-2-1' ||activeIndex === '1-2-2'|| activeIndex === '1-2-3' || activeIndex === '1-2-4'|| activeIndex === '1-2-5' || activeIndex === '1-3'|| activeIndex === '1-3-1' || activeIndex === '1-3-2' ? require('@/assets/images/docTextUnselect.png'): require('@/assets/images/docTextUnselect.png')"
                    alt=""
                  >
                  {{ $t('docs.interfaceStar') }}
                </div>
              </template>
              <el-menu-item index="1">
                {{ $t('nav.appMessage1') }}
              </el-menu-item>
              <el-submenu
                index="1-2"
              >
                <p
                  slot="title"
                  class="twoTitle"
                  :class="{'twoSelect': (activeIndex === '1-2-1' ||activeIndex === '1-2-2'|| activeIndex === '1-2-3' ||activeIndex === '1-2-4'|| activeIndex === '1-2-5' )}"
                >
                  {{ $t('docs.appView') }}
                </p>
                <el-menu-item
                  index="1-2-1"
                  class="threeMenu"
                >
                  {{ $t('nav.appQuery21') }}
                </el-menu-item>
                <el-menu-item
                  index="1-2-2"
                  class="threeMenu"
                >
                  {{ $t('nav.appQuery22') }}
                </el-menu-item>
                <el-menu-item
                  index="1-2-3"
                  class="threeMenu"
                >
                  {{ $t('nav.appQuery23') }}
                </el-menu-item>
                <el-menu-item
                  index="1-2-4"
                  class="threeMenu"
                >
                  {{ $t('nav.appQuery24') }}
                </el-menu-item>
                <el-menu-item
                  index="1-2-5"
                  class="threeMenu"
                >
                  {{ $t('nav.appQuery25') }}
                </el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <p
                  slot="title"
                  class="twoTitle"
                  :class="{'twoSelect': (activeIndex === '1-3-1' ||activeIndex === '1-3-2' )}"
                >
                  {{ $t('nav.appDownload3') }}
                </p>
                <el-menu-item
                  index="1-3-1"
                  class="threeMenu"
                >
                  {{ $t('nav.appDownload31') }}
                </el-menu-item>
                <el-menu-item
                  index="1-3-2"
                  class="threeMenu"
                >
                  {{ $t('nav.appDownload32') }}
                </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
        <div
          id="test-editor"
        >
          <div
            v-show="this.activeIndex === '5'"
            class="novice"
          >
            <p class="noviceTitle">
              {{ $t('docs.userGuide') }}
            </p>
            <div class="cutLline">
              <p class="cutLline1">
                . . .
              </p>
              <p class="cutLline2" />
            </div>
            <p class="noviceContent1">
              {{ $t('docs.beginnerPart1') }}
            </p>
            <div class="docImg">
              <img
                :src="language === 'cn' ? require('@/assets/images/docImgcn1.png'): require('@/assets/images/docImgen1.png')"
                alt=""
              >
            </div>
            <p class="noviceTitle">
              {{ $t('docs.coreFunGuide') }}
            </p>
            <div class="cutLline">
              <p class="cutLline1">
                . . .
              </p>
              <p class="cutLline2" />
            </div>
            <p class="noviceContent1">
              {{ $t('docs.beginnerPart2') }}
            </p>
            <div class="docImg2">
              <img
                :src="language === 'cn' ? require('@/assets/images/docImgcn2.png'): require('@/assets/images/docImgen2.png')"
                alt=""
              >
            </div>
          </div>
          <mavon-editor
            v-show="this.activeIndex != '5'"
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
            :box-shadow="false"
            preview-background="#f6f5f8"
          />
        </div>
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
      activeIndex: '5',
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
      let name = this.$route.params.value || '5'
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
        case '1-2-1':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery21'), path: '' }]
          break
        case '1-2-2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery22'), path: '' }]
          break
        case '1-2-3':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery23'), path: '' }]
          break
        case '1-2-4':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery24'), path: '' }]
          break
        case '1-2-5':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appQuery25'), path: '' }]
          break
        case '1-3-1':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appDownload31'), path: '' }]
          break
        case '1-3-2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('nav.appDownload32'), path: '' }]
          break
        case '4':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.summary'), path: '' }]
          break
        case '4-1':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.toscaFolder'), path: '' }]
          break
        case '4-2':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.APPDFolder'), path: '' }]
          break
        case '4-3':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.imageFolder'), path: '' }]
          break
        case '4-4':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.manifestFile'), path: '' }]
          break
        case '4-5':
          this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.docs'), path: '/docs' }, { name: this.$t('docs.artifactsFolder'), path: '' }]
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
<style lang='less'>
.docBackground{
  background-color: #3e279b;
  margin-bottom: -100px;
}
.docTop{
  padding:54px;
  padding-left:13.18% ;
  width: 100%;
  height: 314px;
  p:first-child{
    font-size: 30px;
    letter-spacing: 4px;
    color: #fff;
  }
}
.docContent{
  margin-top: -140px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
p{
  margin: 0;
}
.docs {
    width: 73.64%;
    min-height: 600px;
    border-radius:20px ;
    font-size: 14px;
    min-width: 1200px;
    padding: 55px;
    background-color: #2E147C;
  .el-tabs--left .el-tabs__item.is-left {
    font-size: 15px;
    text-align: left;
  }
  .test-editors.test-editors-en{
    .el-menu{
      width: 300px;
    }
  }
  .test-editors{
    width: 260px;
    .el-submenu__title {
      font-size: 20px;
    }
    .el-menu-item {
      font-size: 16px;
      font-family: defaultFontLight,
      Arial,
      Helvetica,
      sans-serif !important;
    }
    .threeMenu{
      font-size: 14px !important;
    }
    .el-menu{
      border-right:none ;
      height: 100%;
      width: 250px;
      box-sizing: border-box;
      text-align: left;
      margin-right: 10px;
      background-color:#2E147C !important;
      .el-submenu__title{
        line-height: 44px;
        color: #fff;
        height: 44px;
        background-color: #351B89 !important;
      }
      // .el-submenu.is-opened .el-submenu__title{
      //   background-color: #FBFBFB !important;
      // }
      //  .el-submenu.is-opened .el-menu-item{
      //   background-color: #FBFBFB !important;
      // }
      .el-submenu.is-opened{
        box-shadow: 0px 0px 13px 0px rgba(40, 12, 128, 0.1);
        border-radius: 20px;
      }
      .el-menu-item{
        line-height: 44px;
        height: 44px;
        background: #351B89 !important;
        color: #fff;
      }
      .el-menu-item:hover, .el-menu-item.is-active{
        background: #4e3494 !important;
        background: #4e3494!important;
        border-radius: 0px 8px 8px 0px;
        color: #fff;
      }
    }
  }
  #test-editor{
    .v-show-content, .v-show-content-html{
      box-shadow: inset 4px 4px 25px 5px rgba(36, 20, 119, 0.1) !important;
      border-radius: 16px;
      padding: 10px 30px 15px !important;
      width: 100%;
      background-color: #2E147C !important;
    }
    .novice{
      box-shadow: inset 4px 4px 25px 5px rgba(36, 20, 119, 0.1) !important;
      border-radius: 16px;
      width: 100%;
      min-height: 300px;
      padding-top: 41px;
      margin-left: 40px;
      .noviceTitle{
        padding-left: 41px;
        font-size: 26px;
        color: #fff;
        font-family: defaultFontLight,
        Arial,
        Helvetica,
        sans-serif !important;
      }
      .cutLline{
        width: 100%;
        height: 2px;
        margin-top: 4px;
        .cutLline1{
          width: 4%;
          padding-left:1% ;
          font-weight: bolder;
          color: #CCC5D9;
          float: left;
          margin-top: -14px;
        }
        .cutLline2{
          float: right;
          width: 96%;
          height: 2px;
          background: linear-gradient(to right,#CCC5D9,#fff)
        }
      }
      .noviceContent1{
        margin: 39px 0 0 63px;
        font-size: 16px;
        color: #fff;
        line-height: 24px;
        font-family: defaultFontLight,
        Arial,
        Helvetica,
        sans-serif !important;
      }
      .docImg{
        width: 100%;
        height: 16%;
        margin: 31px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 90.4%;
          height: 100%;
          border-radius: 8px;
        }
      }
      .docImg2{
        width: 100%;
        height: 57%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 90.4%;
          margin: 31px 0px;
          height: 100%;
          border-radius: 8px;
        }
      }
    }
    .markdown-body{
      color: #fff;
      font-family: defaultFontLight,
        Arial,
        Helvetica,
        sans-serif !important;
      h2{
        font-weight: lighter;
      }
      h3{
        font-weight: lighter;
      }
      h4{
        font-weight: lighter;
      }
      pre{
        background-color: #3A218B !important ;
        color: #fff;
        code{
          font-family: defaultFontLight,
          Arial,
          Helvetica,
          sans-serif !important;
        }
      }
      table th{
        background-color: #3A218B;
        font-weight: lighter;
      }
      table td{
        background-color: #3A218B;
      }
    }
    .v-note-wrapper{
      background-color: #2E147C !important;
      border: none !important;
    }
  }
}
div /deep/ .el-menu{
  background-color: none !important;
}
.title1{
  font-size: 20px !important;
}
div /deep/ .el-menu{
  background-color: #2E147C !important;
}
.oneTitles{
  font-size: 20px;
  font-family: defaultFontLight,
    Arial,
    Helvetica,
    sans-serif !important;
  img{
    position: relative;
    top: -2px;
  }
}
.oneTitles.oneSelect{
  background: none !important;
  border-radius: 0px 8px 8px 0px;
  color: #fff;
  height: 40px;
  width: 230px;
}
.twoTitle{
  font-size: 16px;
  font-family: defaultFontLight,
    Arial,
    Helvetica,
    sans-serif !important;
}
.twoTitle.twoSelect{
  color: #fff;
}
</style>
