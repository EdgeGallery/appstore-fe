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
  <div class="app-grid clearfix">
    <div
      class="curp content"
      v-for="(item, index) in appData"
      :key="index"
      :id="item.appId"
    >
      <div
        @click="jumpToDetai(item)"
        class="application"
        @mouseover="hoverAppList(index)"
        @mouseout="activeIndex=-1"
      >
        <div
          class="img-box"
          :class="{'img-boxen':item.experienceAble===true && language==='en' ,
                   'img-boxcn':item.experienceAble===true && language==='cn'}"
        >
          <img
            :src="require('@/assets/images/banner2_cn.png')"
            alt
          >
        </div>
        <div
          class="scoreMode"
        >
          <p
            class="appNameStyle"
            :class="{'appNameStyleAuto':activeIndex===index}"
          >
            {{ item.name }}
          </p>
          <div class="scoreIcon">
            <div class="score">
              <img
                :src="require('@/assets/images/scoreIcon.png')"
                alt
              >
              <span class="core">
                {{ item.score }}
              </span>
            </div>
            <p
              class="deployMode"
            >
              {{ item.deployMode==='container'?$t('store.deployContainer'):$t('store.deployVM') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { URL_PREFIX } from '../../tools/api.js'
export default {
  props: {
    appData: {
      type: Array,
      default () {
        return [
          {
            name: 'W3',
            version: '1.0',
            provider: 'HuaWeicompanyIntr',
            size: '12.00 k',
            type: 'CSAR'
          }
        ]
      }
    },
    dataLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ifShow: true,
      language: localStorage.getItem('language'),
      rate: 3,
      activeIndex: -1
    }
  },
  methods: {
    hoverAppList (index) {
      console.log(index)
      this.activeIndex = index
    },
    getAppInfo (type, item) {
      if (type === 'name') {
        if (item.name) {
          return item.name.length >= 14
            ? item.name.slice(0, 11) + '...'
            : item.name
        } else {
          return ''
        }
      } else if (type === 'version') {
        if (item.version) {
          return '(V' + item.version + ')'
        } else {
          return ''
        }
      }
    },
    jumpToDetai (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
    },
    getAppIcon (item) {
      return URL_PREFIX + 'apps/' + item.appId + '/icon'
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
  }
}
</script>
<style lang='less'>
.app-grid {
  padding: 10px;
  min-height: 320px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .content {
    padding-left: 10px;
    width: 17.5%;
    height: 240px;
    margin-right: 2.4%;
    box-sizing: border-box;
    margin-bottom: 20px;
    .application {
          box-shadow: 0px 1.5px 20px #dad8d8 !important;
          -webkit-box-shadow: 0px 1.5px 20px #dad8d8 !important;
          border-radius: 8px;
          width: 97%;
          height: 234px;
          position: relative;
      .img-box {
        position: relative;
        background-color: #fff;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px 8px 0 0;
        img {
          // max-width: 150px;
          overflow: hidden;
          max-height: 75px;
        }
      }
      .img-boxen {
        background-image: url(../../assets/images/experienceFlagen.png) ;
        background-size: 100% 100%;
        position: relative;
        background-color: #fff;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          // max-width: 150px;
          overflow: hidden;
          max-height: 75px;
        }
      }
      .img-boxcn {
        background-image: url(../../assets/images/experienceFlag.png) ;
        background-size: 100% 100%;
        position: relative;
        background-color: #fff;
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          overflow: hidden;
          max-height: 75px;
        }
      }

      .scoreMode{
        border-radius: 0 0 8px 8px;
        width: 100%;
        background-color: #F9F9F9;
        position: absolute;
        bottom: 0;
        .appName{
          font-size: 20px;
          font-family: HarmonyOS Sans SC;
          font-weight: 400;
          color: #3E3E3E;
          padding-top: 4px;
          padding-left: 10px;
          line-height: 36px;
          position: relative;

        }
        .appNameStyle {
            overflow: hidden;
            width: 100%;
            font-size: 20px;
            margin-top: 3px;
            margin-bottom: 1px;
            padding: 4px 0 0 8px;
            max-height: 36px;
          }
          .appNameStyleAuto{
            max-height: 100px;
          }
        .appNameAuto{
          max-height: 100px;
        }
        .scoreIcon{
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-content: center;
          .score{
            margin-left: 10px;
            img{
              width: 14px;
              height: 14px;
              margin-right:6px ;
            }
            .core{
              line-height: 40px;
              font-size: 14px;
              font-family: HarmonyOS Sans SC;
              font-weight: 300;
              color: #929292;
              position: relative;
              top: -1px;
            }
          }
          .deployMode{
              margin-right: 15px;
              height: 40px;
              line-height: 40px;
              font-size: 14px;
              font-family: HarmonyOS Sans SC;
              font-weight: 300;
              color: #414040;
            }
        }

      }
      .scoreModeAuto{
        height: auto;
        border: 1px solid green;
      }

    }
    .application:hover{
      transition: transform .3s ease-in-out, box-shadow .3s cubic-bezier(0, 0, 0, .715), border .3s linear .1s;
      box-shadow: 0px 3px 3px #c8c8c8 !important;
      -webkit-box-shadow: 0px 3px 3px #c8c8c8 !important;
      background-color: #fff;
      transform:translatey(-7px)
    }

  }
  @media screen and (max-width: 1800px) and (min-width: 1200px){
     .content {
    padding-left: 10px;
    height: 140px;
    margin-right: 2.4%;
    margin-bottom: 30px;
    .application {
          height: 120px;
      .img-box {
        height: 80px;
        img {
          height: 40px;
        }
      }
      .scoreMode{
        border-radius: 0 0 8px 8px;
        height: 76px;
        .appName{
          height: 30px;
          padding-top: 4px;
          padding-left: 10px;
          line-height: 30px;
          font-size: 14px;
        }
        .appNameStyle {
          font-size: 14px;
          margin-top: 3px;
          margin-bottom: 1px;
        }

        .scoreIcon{
          padding-top: 4px;
          .score{
            margin-left: 10px;
            img{
              width: 14px;
              height: 14px;
              margin-right:6px ;
            }
            .core{
              line-height: 24px;
              position: relative;
              top: 2px;
              font-size: 14px;
            }
          }
          .deployMode{
              margin-right: 10px;
          }
        }
      }
    }

  }
  }
}
</style>
