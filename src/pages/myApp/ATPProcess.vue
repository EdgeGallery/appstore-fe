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
    <el-button
      type="primary"
      icon="el-icon-back"
      @click="jumpToMyapp()"
      style="margin: 10px;"
    >
      {{ $t('nav.myApp') }}
    </el-button>
    <iframe
      title="atp"
      :src="srcUrl"
      name="atp"
      width="100%"
      height="800"
    />
  </div>
</template>

<script>
import { common } from '../../tools/comon.js'
import { PLATFORMNAME_ATP } from '../../tools/constant.js'
export default {
  name: 'Task',
  data () {
    return {
      srcUrl: '',
      taskId: ''
    }
  },
  methods: {
    getAtpUrl () {
      let language = localStorage.getItem('language')
      this.srcUrl = common.getPlatformUrlPrefix(PLATFORMNAME_ATP)
      this.srcUrl = this.srcUrl + '/#/atpprocess' + '?taskId=' + this.taskId + '&language=' + language
    },
    jumpToMyapp () {
      this.$router.push('/myapp')
    }
  },
  mounted () {
    this.taskId = this.$route.params.taskId
    this.getAtpUrl()
  }
}
</script>
