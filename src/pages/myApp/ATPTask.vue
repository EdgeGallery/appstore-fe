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
  <div
    class="padding56"
    style="margin-top: 100px;"
  >
    <iframe
      v-if="isRouterAlive"
      title="atp"
      :src="srcUrl"
      name="atp"
      id="iframe_atp"
      width="100%"
      height="1000"
    />
  </div>
</template>

<script>
import { PROXY_PREFIX_APPSTORE } from '../../tools/api.js'
export default {
  name: 'Task',
  data () {
    return {
      srcUrl: '',
      isRouterAlive: true
    }
  },
  methods: {
    getAtpUrl () {
      let language = localStorage.getItem('language')
      let currUrl = window.location.origin
      if (PROXY_PREFIX_APPSTORE) {
        this.srcUrl = currUrl + '/edgagallery/atp/#/app/test/task' + '?language=' + language
      } else {
        if (currUrl.indexOf('30091') !== -1) {
          let originUrl = currUrl.replace('30091', '30094')
          this.srcUrl = originUrl + '/#/app/test/task' + '?language=' + language
        } else {
          this.srcUrl = currUrl.replace('appstore', 'atp')
          this.srcUrl = this.srcUrl + '/#/app/test/task' + '?language=' + language
        }
      }
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
