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
  <div class="padding56">
    <iframe
      title="atp"
      :src="srcUrl"
      name="atp"
      width="100%"
      height="1450"
    />
  </div>
</template>

<script>
export default {
  name: 'Atpreport',
  data () {
    return {
      srcUrl: '',
      taskId: ''
    }
  },
  methods: {
    getAtpUrl () {
      let currUrl = window.location.href
      if (currUrl.indexOf('30091') !== -1) {
        this.srcUrl = 'https://' + currUrl.split('//')[1].split(':')[0] + ':30094' + '/#/atpreport' + '?taskid=' + this.taskId
      } else {
        this.srcUrl = currUrl.replace('appstore', 'atp')
        this.srcUrl = this.srcUrl + '/#/atpreport' + '?taskid=' + this.taskId
      }
    }
  },
  mounted () {
    this.taskId = this.$route.query.taskId
    this.getAtpUrl()
  }
}
</script>
