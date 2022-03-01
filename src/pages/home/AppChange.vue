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
  <div class="appChange">
    <div class="appChangeTop">
      <p class="appChangeTool defaultFontBlod">
        {{ $t('store.appChange') }}
      </p>
      <el-button
        class="backAppStore"
        @click="jumpToIndex()"
      >
        {{ $t('store.backAppStore') }}
      </el-button>
    </div>
    <iframe
      class="appChangeContent"
      :src="srcUrl"
      title="app change content"
    />
  </div>
</template>

<script>
import { common } from '../../tools/comon.js'
import { PLATFORMNAME_APPD } from '../../tools/constant.js'
export default ({
  name: 'AppChange',
  components: {
  },
  data () {
    return {
      srcUrl: '',
      changeStyle: this.$route.query.changeStyle
    }
  },
  methods: {
    getAppdUrl () {
      this.srcUrl = common.getPlatformUrlPrefix(PLATFORMNAME_APPD)
      this.srcUrl = this.srcUrl + '/#/home'
    },
    jumpToIndex () {
      this.$router.push({
        path: '/index',
        query: {
          changeStyle: this.changeStyle
        }
      })
    }
  },
  mounted () {
    this.getAppdUrl()
  },
  watch: {
    '$i18n.locale': function () {
      this.getAppdUrl()
    }
  }
})
</script>

<style lang='less'>
.appChange{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 1200px;
  align-items: center;
  .appChangeTop{
    width: 73.64%;
    margin: 60px 13.18% 20px 13.18%;
    min-width: 1200px;
    display: flex;
    justify-content: space-between;
    .appChangeTool{
      font-size: 30px;
      letter-spacing: 4px;
      color: #fff;
      line-height: 50px;
      margin-bottom:0px ;
      text-align: left;
    }
    .backAppStore{
      background: #3E279B;
      border: 1px solid rgba(51, 26, 133, 0.5);
      color: #fff;
      padding: 13px 49px;
      border-radius: 16px;
      font-size: 20px;
      box-shadow: inset 0px 0px 1px 1px rgba(255 ,255 ,255,0.5);
    }
    .backAppStore:hover{
      font-weight: bold;
    }
  }
  .appChangeContent{
    width: 100%;
    height: 732px;
  }
}
</style>
