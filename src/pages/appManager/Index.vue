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
  <div class="myApp padding56 minHeight">
    <div class="headerTitle">
      <p class="subheaderTitle">
        {{ $t('nav.appMgmt') }}
      </p>
      <div class="subBack" />
    </div>
    <ul class="list_top clear">
      <li
        @click="activeName='hot'"
        :class="{'container_active':activeName==='hot','container_default':activeName==='store','container_default2':activeName==='push',}"
      >
        <span>
          <em class="image_container" />{{ $t('appManager.hotAppTitle') }}
        </span>
      </li>
      <div
        v-if="activeName==='push'"
        class="horizontal-cell"
      >
        <link-right
          class="link-right"
        />
      </div>
      <li
        @click="activeName='store'"
        :class="{'vm_active':activeName==='store','vm_default':activeName==='hot','vm_default2':activeName==='push'}"
      >
        <span>
          <em class="image_vm" />{{ $t('appManager.storeAppTitle') }}
        </span>
      </li>
      <div
        v-if="activeName==='hot'"
        class="horizontal-cell"
      >
        <link-right
          class="link-right"
        />
      </div>
      <li
        @click="activeName='push'"
        :class="{'push_active':activeName==='push','push_default':activeName!=='push','push_default2':activeName==='store'}"
      >
        <span>
          <em class="push_container" />{{ $t('appManager.pushAppTitle') }}
        </span>
      </li>
      <li
        class="last_li"
        :class="{'push_active':activeName==='push','last_default':activeName!=='push','last_default2':activeName==='push'}"
      >
        <span />
      </li>
    </ul>
    <div
      class="container_div"
      :class="{'container_div_active':activeName!=='hot'}"
    >
      <hotAppManager
        v-show="activeName==='hot'"
        ref="hotAppManager"
      />
      <storeAppManager
        v-show="activeName==='store'"
        ref="storeAppManager"
      />
      <pushAppManager
        v-show="activeName==='push'"
        ref="pushAppManager"
      />
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
      activeName: 'hot',
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
    }
  }
}
</script>
<style lang='less'>
.myApp {
  border: none;
  .horizontal-cell{
        padding: 12px 0;
        float: left;
        width: 2px;
        height: 50px;
        // background: #d4d1ec;
        background-color: #d4d1ec;
    }
  .headerTitle{
    margin-top: 59px;
    margin-left: 126px;
    .subheaderTitle {
        font-size: 30px;
        font-weight: bold;
        color: #5d3da0;
        font-family: HarmonyOS_Sans_SC_Bold;
      }
    .subBack{
      // margin-top: 51px;
      background-color: rgba(158,123,205,.2);
      width: 88px;
      height: 7px;
      border-radius: 16pt  16pt   16pt  16pt;
    }

  }
  .list_top{
    margin-top: 58px;
    li{
      float: left;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      background: #D4D1EC;
      span{
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        font-size: 20px;
        color: #fff;
        transition: all 0.5s;
      }
    }
    .last_li{
      cursor: default;
    }
    em{
      display: inline-block;
      width: 19px;
      height: 22px;
      position: relative;
      top: 4px;
      margin-right: 10px;
    }
    .image_container{
      background: url('../../assets/images/popular_enable_icon.png');
    }
    .image_vm{
      background: url('../../assets/images/display_enable_icon.png');
    }
    .container_active .image_container{
      background: url('../../assets/images/popular_able_icon.png');
    }
    .vm_active .image_vm{
      background: url('../../assets/images/display_able_icon.png');
    }
    .push_active .push_container{
      background: url('../../assets/images/push_able_icon.png');
    }
    .push_container{
      background: url('../../assets/images/push_enable_icon.png');
    }
    .container_active{
      background: #d4d1ec;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .container_default{
      background: #fff;
      border-radius: 16px 0 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 16px 0 16px 0;
        transition: all 0.5s;
      }
    }
    .container_default2{
      background: #d4d1ec;
      border-radius: 16px 0 0 0;
    }
    .container_push_default{
      background: #fff;
      border-radius: 0 0 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 0 0 0 0;
        transition: all 0.5s;
      }

    }
    .vm_active{
      background: #d4d1ec;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .vm_default{
      background: #fff;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .vm_default2{
      background: #fff;
      span{
        background: #d4d1ec;
        border-radius: 0 0 16px 0;
      }
    }
    .last_li.last_active{
      background: #fff;
      span{
        background: #f5f6f8;
        border-radius: 0 0 0 0;
      }
    }
    .last_li.last_default{
      background: #d4d1ec;
      span{
        background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .last_li.last_default2{
      background: #fff;
      span{
        background: linear-gradient(to bottom, #f5f4f8, #f1edf6);
        border-radius: 0 0 0 16px;
        transition: all 0.5s;
      }
    }
    .push_active{
      background: #d4d1ec;
      border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #fff;
        border-radius: 16px 16px 0 0;
        color: #5e40c8;
        transition: all 0.5s;
      }
    }
    .push_default{
      background: #f4f3f7;
      // border-radius: 0 16px 0 0;
      transition: all 0.5s;
      span{
        background: #d4d1ec;
        border-radius: 0 16px 0 0px;
        transition: all 0.5s;
      }

    }
    .push_default2{
      background: #fff;
      border-radius: 0 16px 0 0;

      span{
        border-radius: 0 16px 0 16px;
      }
    }
  }
  .container_div{
    background: #fff;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
  }
  .container_div_active{
    background: #d4d1ec;
  }
  .vm_div{
    background: #d4d1ec;
    border-radius: 0 16px 16px 16px;
    transition: all 0.5s;
  }
  .view_image_dialog .el-dialog{
    width: 40%;
    min-width: 600px;
  }
  .link-left {
    width: 3px;
    height: 10px;
    border-left: solid #B3B0CA 2px;
  }
  .link-right {
    width: 3px;
    height: 10px;
    border-right: solid #B3B0CA 2px;
  }
}
.minHeight{
  min-height: 650px;
}
</style>
