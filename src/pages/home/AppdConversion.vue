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
  <div class="padding56">
    <el-button
      type="primary"
      icon="el-icon-back"
      @click="jumpToIndex()"
      style="margin: 10px;position: relative; top: 40px;"
    >
      {{ $t('nav.appstore') }}
    </el-button>
    <iframe
      v-if="isRouterAlive"
      title="atp"
      :src="srcUrl"
      name="atp"
      width="100%"
      height="800"
    />
  </div>
</template>

<script>
import { PROXY_PREFIX_CURRENTSERVER, PROXY_PREFIX_APPD } from '../../tools/api.js'
export default {
  name: 'AppdConversion',
  data () {
    return {
      srcUrl: '',
      isRouterAlive: true
    }
  },
  methods: {
    getAtpUrl () {
      let currUrl = window.location.origin
      if (PROXY_PREFIX_CURRENTSERVER) {
        this.srcUrl = currUrl + PROXY_PREFIX_APPD + '/#/home'
      } else {
        if (currUrl.indexOf('30091') !== -1) {
          let originUrl = currUrl.replace('30091', '30087')
          this.srcUrl = originUrl + '/#/home'
        }
      }
    },
    jumpToIndex () {
      this.$router.push('/index')
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
