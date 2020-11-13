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
  <el-row id="headerComp">
    <el-col
      class="logo"
      :span="6"
    >
      <div>
        <img
          src="../../assets/images/logo.png"
          class="curp"
          @click="jumpTo('/index')"
          alt
        >
        <span
          @click="jumpTo('/index')"
          class="curp"
        > {{ $t('nav.appstore') }} V0.5</span>
      </div>
    </el-col>
    <el-col
      :span="12"
      class="navList"
      style="text-align: center;"
    >
      <div>
        <span
          class="curp"
          v-for="(item, index) in list"
          :class="{ active: isActive === index, isUse: !item.display }"
          :key="item.label"
          @click="jumpTo(item.route, index, item.link, item.display)"
        >{{ language === 'cn' ? item.labelCn : item.labelEn }}</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="nav-tabs">
        <span
          class="curp"
          @click="logout()"
          v-if="ifGuest"
        >{{ $t('nav.login') }}</span>
        <span
          class="curp"
          @click="beforeLogout"
          v-else
        >{{ $t('nav.logout') }}</span>
        <span
          @click="changeLanguage"
          class="curp"
        >
          {{ getLanguage }}
        </span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getUserInfo, logoutApi } from '../../tools/api.js'
// import axios from 'axios'
export default {
  name: 'HeaderComp',
  data () {
    return {
      language: 'cn',
      list: [
        {
          labelEn: 'Store',
          labelCn: '商店',
          route: '/index',
          pageId: '2.1.1',
          display: true,
          link: ''
        },
        {
          labelEn: 'Docs',
          labelCn: '文档',
          route: '/docs',
          pageId: '2.1.2',
          display: true,
          link: ''
        },
        {
          labelEn: 'My App',
          labelCn: '我的应用',
          route: '/myapp',
          pageId: '2.1.4',
          display: true,
          link: ''
        },
        {
          labelEn: 'About',
          labelCn: '关于我们',
          route: '/about',
          pageId: '2.1.5',
          display: true,
          link: 'https://gitee.com/edgegallery'
        }
      ],
      isActive: 0,
      userName: '',
      loginPage: '',
      ifGuest: true
    }
  },
  watch: {
    $route () {
      // this.getpermissions()
      let path = this.$route.path
      if (path === '/index') {
        this.isActive = 0
      } else if (path === '/docs') {
        this.isActive = 1
      } else if (path === '/myapp' || path === '/app/test/task' || path === '/report') {
        this.isActive = 2
      } else if (path === '/about') {
        this.isActive = 3
      } else {
        this.isActive = 0
      }
    }
  },
  computed: {
    getLanguage () {
      let language
      this.language === 'cn' ? language = 'English' : language = '中文'
      return language
    }
  },
  methods: {
    changeLanguage () {
      if (this.language === 'cn') {
        this.language = 'en'
      } else {
        this.language = 'cn'
      }
      localStorage.setItem('language', this.language)
      this.$i18n.locale = this.language
      this.$store.commit('changeLaguage', { language: this.language })
    },
    jumpTo (route, index, link, isUse = true) {
      if (!link) {
        if (!isUse) return ''
        this.$router.push(route)
        this.isActive = index || 0
      } else {
        window.open(link, '_blank')
      }
    },

    getpermissions () {
      let permissions = JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).permissions : []
      let pagesId
      permissions.forEach(item => {
        if (item.platform === 'MEAPP') {
          pagesId = item.pageIds
        }
      })
      if (pagesId) {
        this.list.forEach(page => {
          if (pagesId.includes(page.pageId)) {
            page.display = true
          } else {
            page.display = false
          }
        })
      } else {
        this.list.forEach(page => {
          page.display = false
        })
      }
    },
    logout () {
      logoutApi().then(res => {
        window.location.href = this.loginPage + '&return_to=' + 'https://' + window.location.host
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    beforeLogout () {
      this.$confirm(this.$t('promptMessage.confirmLogout'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(() => {
      })
    }
  },

  mounted () {
    localStorage.setItem('language', 'cn')
    // this.getpermissions()
    let path = this.$route.path
    if (path === '/') {
      this.isActive = 0
    } else if (path === '/docs') {
      this.isActive = 1
    } else if (path === '/myapp') {
      this.isActive = 2
    } else if (path === '/about') {
      this.isActive = 3
    }
    getUserInfo().then(res => {
      sessionStorage.setItem('userId', res.data.userId)
      sessionStorage.setItem('userName', res.data.userName)
      this.loginPage = res.data.loginPage
      if (res.data.userName === 'guest') {
        this.ifGuest = true
      } else {
        this.ifGuest = false
      }
    })
    let historyRoute = sessionStorage.getItem('historyRoute')
    if (historyRoute) {
      this.$router.push(historyRoute)
      sessionStorage.setItem('historyRoute', '')
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('historyRoute', this.$route.path)
  }
}
</script>

<style lang='less' >
#headerComp {
  height: 65px;
  color: white;
  background: #282b33;
  padding-left: 25px;
  .logo {
    height: 65px;
    line-height: 65px;
    img {
      height: 65px;
    }
    span {
      font-size: 18px;
      vertical-align: text-bottom;
    }
  }

  .navList {
    span {
      font-size: 20px;
      line-height: 65px;
      margin-right: 65px;
      padding-bottom: 17px;
    }
    span:hover {
      color: #6c92fa;
      border-bottom: 2px solid #6c92fa;
    }

    .active {
      color: #6c92fa;
      border-bottom: 2px solid #6c92fa;
    }
    .isUse{
      cursor: not-allowed;
      color: #ddd;
    }
  }

  .nav-tabs {
    padding-right: 20px;
    height: 65px;
    line-height: 65px;
    float: right;
    box-sizing: border-box;
    span{
      padding: 0 10px;
    }
  }
}
</style>
