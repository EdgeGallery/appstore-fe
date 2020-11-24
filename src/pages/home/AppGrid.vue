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
  <div class="app-grid">
    <div
      class="curp content"
      v-for="(item, index) in appData"
      :key="index"
      :id="item.appId"
    >
      <div
        @click="jumpToDetai(item)"
        class="application"
      >
        <div class="img-box">
          <img
            :src="getAppIcon(item)"
            alt
          >
        </div>
        <div class="intr">
          <h4 class="name">
            <span class="app-name">{{ item.name }} &nbsp;</span>
          </h4>
          <p class="type-size">
            {{ $t('common.industry') }}：{{ item.industry?item.industry:'/' }}
          </p>
          <p class="type-size">
            {{ $t('common.provider') }}：{{ item.provider?item.provider:'/' }}
          </p>
          <p class="type-size">
            {{ $t('common.type') }}：{{ item.type }}
          </p>
          <p class="core">
            <span class="type">{{ $t('store.score') }}：</span>
            <el-rate
              v-model="item.score"
              disabled
              disabled-void-color="#C0C4CC"
              text-color="#ff9900"
            />
          </p>
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
      language: localStorage.getItem('language'),
      rate: 3
    }
  },
  methods: {
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
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.app-grid {
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  .content {
    width: 25%;
    padding: 0 15px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .application {
      border: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: space-around;
      transition: transform 0.3s ease-in;
      .img-box {
        padding: 50px 0;
        box-sizing: border-box;
        text-align: center;
        img {
          height: 65%;
          width: 65%;
        }
      }
      .intr {
        width: 55%;
        padding: 25px 0px;
        h4 {
          line-height: 34px;
        }
      p {
        color: black;
        line-height: 28px;
      }
      span {
        display: inline-block;
        height: 28px;
      }
      /* .provider {
        text-align: left;
      } */
      .name {
        text-align: left;
        .app-name {
          width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 22px;
        }
        .app-version {
          font-size: 14px;
          color: #999999;
        }
      }
      .type-size {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .type {
          text-align: left;
          display: inline-block;
        }
        .size {
          display: inline-block;
        }
      }
      .core {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        }
      }
    }
    .application:hover{
      transform: translate3d(0,-10px,0);
      box-shadow: 0 0 10px rgba(0,0,0,0.2);
      background-color: #f7f7f7;
    }
  }
}
</style>
