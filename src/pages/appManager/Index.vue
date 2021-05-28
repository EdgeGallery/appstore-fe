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
  <div class="myApp padding56">
    <div class="myApp-content">
      <div class="appManagerTabs">
        <el-tabs
          type="border-card"
          @tab-click="handleClick"
        >
          <el-tab-pane label="近期热门应用管理">
            <div
              v-if="activeTabIndex==='0'"
              class="appManagerTab"
            >
              <hotAppManager
                v-model="activeTabIndex"
                :hot-app-list-info="hotAppListInfo"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="应用展示仓库应用列表管理">
            <div
              v-if="activeTabIndex==='1'"
              class="appManagerTab"
            >
              <storeAppManager
                v-model="activeTabIndex"
                :store-app-list-info="storeAppListInfo"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="可推广应用列表管理">
            <div
              v-if="activeTabIndex==='2'"
              class="appManagerTab"
            >
              <pushAppManager
                v-model="activeTabIndex"
                :push-app-list-info="pushAppListInfo"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import hotAppManager from './HotAppManager.vue'
import storeAppManager from './StoreAppManager.vue'
import pushAppManager from './PushAppManager.vue'
export default {
  components: {
    hotAppManager,
    storeAppManager,
    pushAppManager
  },
  data () {
    return {
      activeTabIndex: '0',
      hotAppListInfo: [{
        appId: '883d17f3c58946dc92e0d4255e309111',
        iconUrl: null,
        name: 'HOT APP joomla',
        provider: 'OpenSource',
        type: 'Big Data',
        shortDesc: 'Joomla! is a Content',
        showType: 'public',
        createTime: '2021-03-30 21:23:23',
        details: 'detail',
        downloadCount: 0,
        affinity: 'X86',
        industry: 'Open Source',
        contact: null,
        score: 5.0,
        userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
        userName: 'admin',
        status: 'Published',
        deployMode: 'container'
      }],
      storeAppListInfo: [{
        appId: '883d17f3c58946dc92e0d4255e309222',
        iconUrl: null,
        name: 'Store APP joomla',
        provider: 'OpenSource',
        type: 'Big Data',
        shortDesc: 'Joomla! is a Content',
        showType: 'public',
        createTime: '2021-03-30 21:23:23',
        details: 'detail',
        downloadCount: 0,
        affinity: 'X86',
        industry: 'Open Source',
        contact: null,
        score: 5.0,
        userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
        userName: 'admin',
        status: 'Published',
        deployMode: 'container'
      }],
      pushAppListInfo: [{
        appId: '883d17f3c58946dc92e0d4255e309333',
        iconUrl: null,
        name: 'Push App joomla',
        provider: 'OpenSource',
        type: 'Big Data',
        shortDesc: 'Joomla! is a Content',
        showType: 'public',
        createTime: '2021-03-30 21:23:23',
        details: 'detail',
        downloadCount: 0,
        affinity: 'X86',
        industry: 'Open Source',
        contact: null,
        score: 5.0,
        userId: '39937079-99fe-4cd8-881f-04ca8c4fe09d',
        userName: 'admin',
        status: 'Published',
        deployMode: 'container'
      }]
    }
  },
  methods: {
    handleClick (tab, event) {
      this.activeTabIndex = tab.index
    }
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getAppData()
    }

  },

  mounted () {

  },
  beforeDestroy () {
  }
}
</script>
<style lang='less'>
.myApp {
  .myApp-content {
    background: white;
    margin: 95px auto;
    width: 1416px;
    height: 800px;
    .appManagerTabs{
      width: 1416px;
      text-align: left;
      .el-tabs__item.is-active{
        background-color: #688EF3;
        color: #ffffff;
      }
      .el-tabs__item{
        font-size: 16px;
        color: #4B4B4B;
      }
      .appManagerTab{
        width: 1416px;
        height: 800px;
      }
    }
  }
}

</style>
