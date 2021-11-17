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
  <div class="appTest">
    <div class="appTestTop">
      <p class="appTestTitle" />
      <button
        class="backAppStore"
        @click="jumpToMyapp()"
      >
        {{ $t('store.backMyApp') }}
      </button>
    </div>
    <iframe
      v-if="isRouterAlive"
      title="atp"
      :src="srcUrl"
      name="atp"
      class="atp"
    />
  </div>
</template>

<script>
import { PROXY_PREFIX_CURRENTSERVER, PROXY_PREFIX_ATP } from '../../tools/api.js'
export default {
  name: 'Task',
  data () {
    return {
      srcUrl: '',
      taskId: '',
      isRouterAlive: true
    }
  },
  methods: {
    getAtpUrl () {
      let language = localStorage.getItem('language')
      let currUrl = window.location.origin
      if (PROXY_PREFIX_CURRENTSERVER) {
        this.srcUrl = currUrl + PROXY_PREFIX_ATP + '/#/selectscene?taskid=' + this.taskId + '&language=' + language
      } else {
        if (currUrl.indexOf('30091') !== -1) {
          let originUrl = currUrl.replace('30091', '30094')
          this.srcUrl = originUrl + '/#/selectscene?taskid=' + this.taskId + '&language=' + language
        } else {
          this.srcUrl = currUrl.replace('appstore', 'atp')
          this.srcUrl = this.srcUrl + '/#/selectscene?taskid=' + this.taskId + '&language=' + language
        }
      }
    },
    jumpToMyapp () {
      this.$router.push('/myapp')
    },
    rebuileComponents () {
      // Destroy subtag
      this.isRouterAlive = false
      // Recreate the subtag
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  mounted () {
    this.taskId = this.$route.params.taskId
    this.getAtpUrl()
  },
  watch: {
    '$i18n.locale': function () {
      this.rebuileComponents()
      this.getAtpUrl()
    }
  }
}
</script>

<style lang='less'>
.appTest{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 1200px;
  align-items: center;
  .atp{
    width: 73.64%;
    margin: 0 auto;
    min-width: 1200px;
    height: 950px;
  }
  .appTestTop{
    width: 73.64%;
    margin: 60px 13.18% 20px 13.18%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    .appTestTitle{
      line-height: 50px;
      margin-bottom:0px ;
    }
    .backAppStore{
      width: 222px;
      height: 50px;
      background: linear-gradient(122deg, #4444D0, #6724CB);
      border-radius: 25px;
      padding: 4px 10px;
      font-size: 20px;
      font-family: HarmonyHeiTi, sans-serif;
      font-weight: 300;
      color: #FFFFFF;
      border: 1px solid #6724CB;
      box-shadow: 0px 16px 8px rgba(94, 44, 204, 0.3);
    }
  }
  .appChanegContent{
    width: 100%;
    height: 632px;
  }
}
</style>
