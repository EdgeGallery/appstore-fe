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
import { common } from '../../tools/comon.js'
import { PLATFORMNAME_ATP } from '../../tools/constant.js'
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
      this.srcUrl = common.getPlatformUrlPrefix(PLATFORMNAME_ATP)
      this.srcUrl = this.srcUrl + '/#/atpreport' + '?taskid=' + this.taskId
    }
  },
  mounted () {
    this.taskId = this.$route.query.taskId
    this.getAtpUrl()
  }
}
</script>
