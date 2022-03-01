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
          :class="[item.experienceAble ? (language==='cn'?'img-boxcn':'img-boxen'): '',(item.appId === newAppId) ? (language==='cn'?'new-boxcn':'new-boxen'): '']"
        >
          <img
            :src="getAppIcon(item)"
            alt=""
          >
        </div>
        <div
          class="scoreMode"
        >
          <p
            class="appNameStyle"
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
import { URL_PREFIX, queryApp } from '../../tools/api.js'
import commonUtil from '../../tools/commonUtil.js'
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
    },
    current: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      activeIndex: -1,
      offsetPage: this.current,
      newAppId: '',
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
          offset: 0,
          limit: 1,
          sortItem: 'createTime',
          sortType: 'desc'
        }
      }
    }
  },
  methods: {
    getNewAppId () {
      queryApp(this.searchCondition).then((res) => {
        this.newAppId = res.data.results[0].appId
      }).catch(error => {
        let defaultMsg = this.$t('promptMessage.getAppFail')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
      })
    },
    hoverAppList (index) {
      this.activeIndex = index
    },
    jumpToDetai (item) {
      this.$router.push({ name: 'appstordetail', params: { item } })
      sessionStorage.setItem('appstordetail', JSON.stringify(item))
      sessionStorage.setItem('pathSource', 'index')
    },
    getAppIcon (item) {
      return URL_PREFIX + 'apps/' + item.appId + '/packages/' + item.packageId + '/icon'
    }
  },
  mounted () {
    this.getNewAppId()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
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
      border-radius: 8px;
      width: 97%;
      height: 234px;
      position: relative;
      .img-box {
        position: relative;
        background: rgba(255, 255, 255, 0.8);
        box-sizing: border-box;
        text-align: center;
        width: 100%;
        height: 156px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px 8px 0 0;
        background-size: 40%;
        background-repeat: no-repeat;
        background-position-x: right;
        img {
          overflow: hidden;
          height: 68px;
          width: 68px;
          border-radius: 10%;
        }
      }
      .img-boxen {
        background-image: url(../../assets/images/experienceFlagen.png);
      }
      .img-boxcn {
        background-image: url(../../assets/images/experienceFlag.png);
      }
      .new-boxcn{
        background-image:url(../../assets/images/newApp.png);
      }
      .new-boxen{
        background-image: url(../../assets/images/newAppen.png);
      }
      .scoreMode{
        border-radius: 0 0 8px 8px;
        width: 100%;
        background-color: #4E3494;
        position: absolute;
        bottom: 0;
        color: #fff;
        .appNameStyle {
          overflow: hidden;
          width: 100%;
          font-size: 20px;
          margin-top: 3px;
          margin-bottom: 1px;
          padding: 4px 0 0 8px;
          max-height: 36px;
        }
        .scoreIcon{
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-content: center;
          padding-top: 12px;
          .score{
            margin-left:10px;
            display: flex;
            img{
              width: 14px;
              height: 14px;
              margin:3px 6px 0 0 ;
            }
            .core{
              display: block;
              font-size: 14px;
            }
          }
          .deployMode{
            margin-right: 15px;
            font-size: 14px;
            font-weight: 300;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1800px) and (min-width: 1200px){
    .content {
      height: 207px;
      .application {
        height: 205px;
        .img-box {
          height: 130px;
        }
        .scoreMode{
          height: 76px;
          .appNameStyle {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
