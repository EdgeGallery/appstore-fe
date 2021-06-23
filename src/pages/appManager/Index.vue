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
    <div class="appManager-content">
      <div class="appManagerTabs">
        <el-tabs
          type="border-card"
          @tab-click="handleClick"
        >
          <el-tab-pane>
            <span slot="label">
              <img
                :src="activeTabIndex==='0'?popularAbleIcon:popularEnableIcon"
                class="img-icon"
                alt=""
              >
              {{ $t('appManager.hotAppTitle') }}
            </span>
            <div
              v-if="activeTabIndex==='0'"
              class="appManagerTab"
            >
              <hotAppManager
                v-model="activeTabIndex"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <img
                :src="activeTabIndex==='1'?displayAbleIcon:displayEnableIcon"
                class="img-icon"
                alt=""
              >
              {{ $t('appManager.storeAppTitle') }}
            </span>
            <div
              v-if="activeTabIndex==='1'"
              class="appManagerTab"
            >
              <storeAppManager
                v-model="activeTabIndex"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <img
                :src="activeTabIndex==='2'?pushAbleIcon:pushEnableIcon"
                class="img-icon"
                alt=""
              >
              {{ $t('appManager.pushAppTitle') }}
            </span>
            <div
              v-if="activeTabIndex==='2'"
              class="appManagerTab"
            >
              <pushAppManager
                v-model="activeTabIndex"
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
import popularEnableIcon from '@/assets/images/popular_enable_icon.png'
import popularAbleIcon from '@/assets/images/popular_able_icon.png'
import displayEnableIcon from '@/assets/images/display_enable_icon.png'
import displayAbleIcon from '@/assets/images/display_able_icon.png'
import pushEnableIcon from '@/assets/images/push_enable_icon.png'
import pushAbleIcon from '@/assets/images/push_able_icon.png'
export default {
  components: {
    hotAppManager,
    storeAppManager,
    pushAppManager
  },
  data () {
    return {
      activeTabIndex: '0',
      popularEnableIcon: popularEnableIcon,
      popularAbleIcon: popularAbleIcon,
      displayEnableIcon: displayEnableIcon,
      displayAbleIcon: displayAbleIcon,
      pushEnableIcon: pushEnableIcon,
      pushAbleIcon: pushAbleIcon
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
  .appManager-content {
    background: white;
    margin: 95px auto;
    width: 1416px;
    height: 800px;
    border: none;
    .appManagerTabs{
      width: 1416px;
      text-align: left;
      border: none;
      .el-tabs--border-card > .el-tabs__header {
        background-color: #F0F2F5;
      }
      .img-icon{
        width: 14px;
        height: 14px;
      }
      .el-tabs__item.is-active{
        background-color: #FEFEFE;
        color: #7390E3;
        border-top-right-radius: 50px;
      }
      .el-tabs__item{
        font-size: 16px;
        background-color: #E3E8F7;
        color: #4B4B4B;
        border-top-right-radius: 50px;
      }
      .appManagerTab{
        width: 1416px;
        height: 800px;
      }
    }
  }
}

</style>
