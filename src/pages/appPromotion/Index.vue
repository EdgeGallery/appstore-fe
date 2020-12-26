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
  <div class="my-app padding56">
    <div class="my-app-content">
      <el-tabs
        type="border-card"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="$t('apppromotion.appPromotion')"
          name="prom"
        >
          <appList
            v-if="activeName == 'prom'"
            ref="prom"
          />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('apppromotion.downloadAna')"
          name="down"
        >
          <downloadAna
            v-if="activeName == 'down'"
            ref="down"
          />
        </el-tab-pane>
      </el-tabs>
      <div class="clearfix" />
    </div>
  </div>
</template>

<script>
import downloadAna from './DownloadAna.vue'
import appList from './AppList.vue'

export default {
  components: {
    appList,
    downloadAna
  },
  data () {
    return {
      activeName: 'prom',
      appData: []
    }
  },
  methods: {
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    handleClick (tab, event) {
      this.activeName = tab.name
      var that = this
      setTimeout(function () {
        that.onQuery()
      }, 500)
    }
  },
  mounted () {
  }
}
</script>
<style lang='less'>
.my-app {
  .my-app-content {
    background: white;
    padding: 20px;
  }
}
.batchProm{
  float: right;
  margin-bottom: 5px;
}
.el-tabs__item{
  font-size: 18px !important;
}
</style>
