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
  <div class="headerComp">
    <el-row
      :gutter="10"
    >
      <el-col
        :lg="5"
        :md="4"
        :sm="14"
        :xs="13"
      >
        <div class="logo">
          <img
            src="../../assets/images/logo.png"
            class="curp"
            alt
          >
        </div>
      </el-col>
      <el-col
        :lg="14"
        :md="12"
        class="navList"
      >
        <el-menu
          @select="handleSelect"
          mode="horizontal"
          :unique-opened="true"
          router
          text-color="#C8BDEF"
          background-color="#5E40C8"
          active-text-color="#6c92fa"
          :default-active="activeIndex"
        >
          <template
            v-for="(item,index) in list"
          >
            <el-submenu
              v-if="item.children && item.children.length"
              :disabled="!item.display"
              :index="item.route"
              :key="item.pageId"
              @click.native="jumpTo(item.route, index, item.link, item.display)"
            >
              <template
                slot="title"
              >
                {{ language === 'cn' ? item.labelCn : item.labelEn }}
              </template>
              <el-menu-item
                v-for="itemChild in item.children"
                :index="itemChild.route"
                :key="itemChild.pageId"
                @click="jumpTo(itemChild.route, index, itemChild.link, itemChild.display)"
              >
                {{ language === 'cn' ? itemChild.labelCn : itemChild.labelEn }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :disabled="!item.display"
              :index="item.route"
              :key="item.pageId"
              @click="jumpTo(item.route, index, item.link, item.display)"
            >
              {{ language === 'cn' ? item.labelCn : item.labelEn }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col
        :lg="5"
        :md="8"
        :sm="10"
        :xs="11"
      >
        <div class="nav-tabs">
          <div class="menu">
            <em
              class="el-icon-menu"
              @click="clickSmallMenu"
            />
          </div>
          <div
            class="el-icon-bell"
            @click="jumperToMsgDialog"
            v-if="isAdmin"
            @mouseenter="enter"
            @mouseleave="leave"
          >
            <div
              v-show="unReadMsgCount > 0"
              class="el-icon-chat-round"
            >
              <span
                class="countStyle"
                v-if="unReadMsgCount<100"
              >
                {{ unReadMsgCount }}
              </span>
              <span
                class="countStyleBig"
                v-else
              >
                ...
              </span>
            </div>
          </div>
          <span
            v-if="!ifGuest"
          >{{ userName }}</span>
          <span
            v-if="!ifGuest"
          >|</span>
          <span
            class="curp"
            @click="openUserAccountCenter()"
            v-if="!ifGuest"
          >{{ $t('nav.userAccountCenter') }}</span>
          <span
            v-if="!ifGuest"
          >|</span>
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
            <img
              :src="language === 'en' ? require('@/assets/images/icon_cn.png'): require('@/assets/images/icon_en.png')"
              class="iconLanguage"
              alt=""
            >
          </span>
        </div>
        <div
          class="popUp"
          v-show="seen && !isCheckAllMsg"
          @mouseenter="enter"
          @mouseleave="leave"
        >
          <messageDialog
            v-if="isAdmin"
            @msgEvent="getMsg"
            @msgCheckAllEvent="checkAllMsg"
          />
        </div>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div
        v-show="menu_small"
        id="menu-div"
        class="main-sidebar-small"
      >
        <el-menu
          @select="handleSelect"
          router
          text-color="#fff"
          background-color="#282b33"
          active-text-color="#6c92fa"
          :default-active="activeIndex"
        >
          <el-menu-item
            v-for="(item, index) in list"
            :key="item.pageId"
            @click="jumpTo(item.route, index, item.link, item.display)"
            :index="item.route"
          >
            {{ language === 'cn' ? item.labelCn : item.labelEn }}
          </el-menu-item>
        </el-menu>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import { getUserInfo, logoutApi, myApp } from '../../tools/api.js'
import { PROXY_PREFIX_CURRENTSERVER } from '../../tools/constant.js'
import messageDialog from '../../pages/msgCenter/MessageDialog.vue'
export default {
  name: 'HeaderComp',
  components: {
    messageDialog
  },
  data () {
    return {
      language: '',
      list: [
        {
          labelEn: 'Home',
          labelCn: '首页',
          route: '/home',
          pageId: '2.1',
          display: true,
          link: '',
          index: '4'
        },
        {
          labelEn: 'App Warehouse',
          labelCn: '应用仓库',
          route: '/index',
          pageId: '2.2',
          display: true,
          link: '',
          index: '1'
        },
        {
          labelEn: 'User Center',
          labelCn: '个人中心',
          route: '',
          pageId: '2.1.5',
          display: true,
          link: '',
          index: '5',
          children: [
            {
              labelEn: 'My App',
              labelCn: '我的应用',
              route: '/myapp',
              pageId: '2.1.4',
              display: true,
              link: '',
              index: '3'
            },
            {
              labelEn: 'Order Management',
              labelCn: '订单管理',
              route: '/orders',
              pageId: '2.1.6',
              display: true,
              link: '',
              index: '6'
            }
          ]
        },
        {
          labelEn: 'App Share',
          labelCn: '应用共享',
          route: '/appShare',
          pageId: '2.4',
          display: true,
          link: '',
          index: '5',
          children: [
            {
              labelEn: 'External AppStore Management',
              labelCn: '外部应用仓库管理',
              route: '/apppromote',
              pageId: '2.4.1',
              display: true,
              link: '',
              index: '5.1'
            }, {
              labelEn: 'App Promote',
              labelCn: '应用推送',
              route: '/apppromotion',
              pageId: '2.4.2',
              display: true,
              link: '',
              index: '5.2'
            }, {
              labelEn: 'App Pull',
              labelCn: '应用拉取',
              route: '/appPull',
              pageId: '2.4.3',
              display: true,
              link: '',
              index: '5.3'
            }, {
              labelEn: 'Message Center',
              labelCn: '消息中心',
              route: '/msgCenter',
              pageId: '2.4.4',
              display: true,
              link: '',
              index: '5.4'
            }, {
              labelEn: 'Operation Analyse',
              labelCn: '操作分析',
              route: '/operationAnalyse',
              pageId: '2.4.5',
              display: true,
              link: '',
              index: '5.5'
            }
          ]
        },
        {
          labelEn: 'System',
          labelCn: '系统',
          route: '/system',
          pageId: '2.5',
          display: true,
          link: '',
          index: '6',
          children: [
            {
              labelEn: 'APP Management',
              labelCn: '应用管理',
              route: '/appManager',
              pageId: '2.5.1',
              display: true,
              link: '',
              index: '6.1'
            }, {
              labelEn: 'Host Management',
              labelCn: '沙箱管理',
              route: '/systemHost',
              pageId: '2.5.2',
              display: true,
              link: '',
              index: '6.2'
            }
          ]
        },
        {
          labelEn: 'Docs',
          labelCn: '文档',
          route: '/docs',
          pageId: '2.6',
          display: true,
          link: '',
          index: '7'
        }
      ],
      isActive: 0,
      activeIndex: '',
      userName: '',
      loginPage: '',
      userCenterPage: '',
      forceModifyPwPage: '',
      ifGuest: true,
      isAdmin: false,
      menu_small: false,
      seen: false,
      unReadMsgCount: 0,
      isCheckAllMsg: false,
      wsSocketConn: null,
      wsMsgSendInterval: null,
      manualLoggout: false
    }
  },
  watch: {
    $route (to, from) {
      this.activeIndex = to.path
      this.judgeActiveRouter(to.path, from.path)
      let path = this.$route.path
      this.judgeActiveIndex(path)
      // post message to unified platform
      window.parent.postMessage({
        cmd: 'routeTo',
        params: {
          module: 'appStore',
          path: to.path,
          activeMenuPath: this.activeIndex
        }
      }, '*')
    }
  },
  computed: {
  },
  methods: {
    clickSmallMenu () {
      this.menu_small = !this.menu_small
    },
    closeMenu (data) {
      this.menu_small = data
    },
    handleSelect (index, path, item) {
      if (index) {
        this.activeIndex = index
        this.$router.push(this.activeIndex)
      }
      this.closeMenu()
    },
    changeLanguage (lan) {
      if (lan === 'cn') {
        this.language = 'cn'
      } else if (lan === 'en') {
        this.language = 'en'
      } else if (this.language === 'cn') {
        this.language = 'en'
      } else {
        this.language = 'cn'
      }
      localStorage.setItem('language', this.language)
      this.$i18n.locale = this.language
      this.$store.commit('changeLaguage', { language: this.language })
    },
    jumpTo (route, link, isUse = true) {
      if (!link) {
        if (!isUse) return ''
      }
      if (route === '/appShare') {
        this.$router.push(route)
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
      this.manualLoggout = true
      logoutApi().then(res => {
        this.enterLoginPage()
      }).catch(error => {
        this.$message.error(error.message)
        this.enterLoginPage()
      })
    },
    beforeLogout () {
      this.$confirm(this.$t('promptMessage.confirmLogout'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.logout()
      }).catch(error => {
        this.$message.error(error.message)
      })
      sessionStorage.removeItem('currentPage')
      sessionStorage.removeItem('myAppCurPageSize')
      sessionStorage.removeItem('myAppOffsetPage')
      sessionStorage.removeItem('currentComponent')
      sessionStorage.removeItem('myAppPageNum')
      sessionStorage.removeItem('userId')
    },
    enterLoginPage () {
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER + '&lang=' + this.language
    },
    enter () {
      this.seen = true
      this.isCheckAllMsg = false
    },
    leave () {
      this.seen = false
    },
    getMsg (value) {
      this.unReadMsgCount = value
    },
    checkAllMsg (value) {
      this.isCheckAllMsg = value
    },
    jumperToMsgDialog () {
      this.$router.push({ name: 'msgCenter' })
    },
    openUserAccountCenter () {
      window.open(this.userCenterPage + '?lang=' + this.language)
    },
    jumpToForceModifyPw () {
      if (this.ifGuest) {
        return false
      }
      if (this.forceModifyPwPage) {
        window.location.href = this.forceModifyPwPage
        return true
      }

      return false
    },
    judgeActiveIndex (path) {
      if (path === '/index') {
        this.isActive = 0
      } else if (path === '/docs') {
        this.isActive = 1
      } else if (path === '/myapp' || path === '/app/test/task' || path === '/atpreport' || path === '/myappdetail' || path === '/atpprocess' || path === '/atptestcase') {
        this.isActive = 2
      } else if (path === '/about') {
        this.isActive = 0
      } else if (path === '/appShare' || path === '/apppromote' || path === '/apppromotion' || path === '/msgCenter' || path === '/right_panel' || path === 'app/prom/task') {
        this.isActive = 4
      } else {
        this.isActive = 0
      }
    },
    judgeActiveRouter (toPath, fromPath) {
      if (toPath === '/detail' && fromPath === '/index') {
        this.activeIndex = '/index'
      }
      if (toPath === '/detail' && fromPath === '/home') {
        this.activeIndex = '/home'
      }
      if (toPath === '/appShare') {
        this.activeIndex = '/apppromote'
      }
      this.judgeDocs(toPath, fromPath)
      this.judgeMyApp(toPath, fromPath)
    },
    judgeDocs (toPath, fromPath) {
      if ((toPath === '/docsInterface' || toPath === '/docsAPPD' || toPath === '/docsBeginnerGuide') && fromPath === '/docs') {
        this.activeIndex = '/docs'
      }
    },
    judgeMyApp (toPath, fromPath) {
      if ((toPath === '/detail' && fromPath === '/myapp') || (toPath === '/app/test/task' && fromPath === '/myapp') || (toPath === '/atpreport' && fromPath === '/myapp') ||
      (toPath === '/myappdetail' && fromPath === '/myapp') || (toPath === '/atpprocess' && fromPath === '/myapp') || (toPath === '/atptestcase' && fromPath === '/myapp')) {
        this.activeIndex = '/myapp'
      }
    },
    judgeRoute (pathPa) {
      if (pathPa === '/') {
        this.isActive = 0
      } else if (pathPa === '/docs') {
        this.isActive = 1
      } else if (pathPa === '/myapp') {
        this.isActive = 2
      } else if (pathPa === '/about') {
        this.isActive = 3
      } else if (pathPa === '/apppromote' || pathPa === '/appStore') {
        this.isActive = 4
      }
    },
    getResCodeInfo () {
      let datas = '[appstore,atp]'
      myApp.getResponseCodeInfo(encodeURI(datas))
        .then(res => {
          sessionStorage.setItem('resCodeInfo', JSON.stringify(res.data))
        }).catch(error => {
          this.handleExceptionMsg(error)
        })
    },
    startHttpSessionInvalidListener (sessId) {
      if (typeof (WebSocket) === 'undefined') {
        return
      }
      let _wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
      this.wsSocketConn = new WebSocket(_wsProtocol + window.location.host + PROXY_PREFIX_CURRENTSERVER + '/wsserver/' + sessId)
      let _thisObj = this
      this.wsSocketConn.onmessage = function (msg) {
        clearTimeout(_thisObj.wsMsgSendInterval)
        _thisObj.wsMsgSendInterval = null
        if (_thisObj.manualLoggout) {
          return
        }
        let _hintInfo = _thisObj.$t('nav.hsInvalidHint')
        if (msg && msg.data) {
          if (msg.data === '1') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          } else if (msg.data === '2') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForLogout') + _hintInfo
          } else if (msg.data === '3') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForServerStopped') + _hintInfo
          } else {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          }
        }
        if (_thisObj.ifGuest) {
          window.location.reload()
          return
        }
        _thisObj.$confirm(_hintInfo, _thisObj.$t('promptMessage.prompt'), {
          confirmButtonText: _thisObj.$t('nav.reLogin'),
          cancelButtonText: _thisObj.$t('nav.refresh'),
          type: 'warning'
        }).then(() => {
          _thisObj.logout()
        }).catch(() => {
          window.location.reload()
        })
      }
      this.wsMsgSendInterval = setInterval(() => {
        this.wsSocketConn.send('')
      }, 10000)
    },
    initUserInfo () {
      getUserInfo().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        this.userName = res.data.userName
        this.loginPage = res.data.loginPage
        this.userCenterPage = res.data.userCenterPage
        if (res.data.authorities.indexOf('ROLE_APPSTORE_ADMIN') > -1) {
          sessionStorage.setItem('userNameRole', 'admin')
        } else if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1) {
          sessionStorage.setItem('userNameRole', 'tenant')
        } else {
          sessionStorage.setItem('userNameRole', 'guest')
        }
        this.ifGuest = res.data.userName === 'guest'
        this.forceModifyPwPage = res.data.forceModifyPwPage
        if (this.jumpToForceModifyPw()) {
          return
        }
        if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1 || res.data.authorities.indexOf('ROLE_APPSTORE_GUEST') > -1) {
          this.isAdmin = false
          this.list.splice(4, 1)
          this.list.splice(3, 1)
        } else {
          this.isAdmin = true
        }
        if (res.data.authorities.indexOf('ROLE_APPSTORE_GUEST') > -1) {
          this.list.splice(2, 1)
        }
        this.startHttpSessionInvalidListener(res.data.sessId)
      })
    }
  },
  mounted () {
    this.language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = localStorage.getItem('language') || 'cn'
    this.getResCodeInfo()
    let path = this.$route.path
    this.judgeRoute(path)
    this.initUserInfo()
    let historyRoute = sessionStorage.getItem('historyRoute')
    if (historyRoute) {
      this.$router.push(historyRoute)
      sessionStorage.setItem('historyRoute', '')
    }
    // Switch language
    let lanIndex = window.location.href.search('language')
    if (lanIndex > 0) {
      let lang = window.location.href.substring(lanIndex + 9, lanIndex + 11)
      this.changeLanguage(lang)
    }
    // message listener, message from unified platform
    window.addEventListener('message', (event) => {
      var data = event.data
      if (data.cmd === 'iframeLanguageChange') {
        let lang = data.params.lang
        this.changeLanguage(lang)
      }
    })
  },
  beforeDestroy () {
    sessionStorage.setItem('historyRoute', this.$route.path)
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
  }
}
</script>

<style lang='less' >
.headerComp {
  height: 65px;
  color: white;
  background: #5E40C8;
  position: fixed;
  z-index: 2001;
  width: 100%;
  padding: 0 13.18%;

  .logo {
    height: 65px;
    line-height: 65px;
    margin-left: -15px;
    img {
      height: 65px;
    }
    span {
      font-size: 18px;
      vertical-align: text-bottom;
    }
  }
    .navList {
      .el-menu--horizontal {
        border: none;
      }
      .el-menu--horizontal>.el-menu-item {
        height: 65px;
        line-height: 65px;
        font-size: 14px;
        font-weight: 700;
        margin-right: 0px;
        vertical-align: bottom;
      }
      .el-submenu__title {
        font-size: 14px;
        font-weight: 700;
      }
      .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 65px;
        line-height: 65px;
    }
    }
  .nav-tabs {
    padding-right: 20px;
    line-height: 65px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    border-bottom: 0px solid #dee2e6;
    span{
      padding: 0 6px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: -3px;
    }
    .menu{
      display: none;
    }
    .el-icon-bell{
      font-size: 22px;
      margin-top: 22px;
      right: 15px;
      position: relative;
    }
    .el-icon-chat-round{
      color: red;
      position: absolute;
      font-size: 16px;
      margin-top: -7px;
      margin-left: -13px;
      text-align: center;
    }
    .countStyle{
      color: #FFFFF2;
      font-size: 10px;
      transform: translateY(-140%)
    }
    .countStyleBig{
      color: #FFFFF2;
      font-size: 10px;
      transform: translateY(-170%)
    }
  }
  .popUp{
    width: 350px;
    height: 300px;
    background-color: #404348;
    z-index: 998;
    right: 10px;
    float: right;
    position:absolute;
  }
  .main-sidebar-small{
    position: relative;
    overflow-y: auto;
    z-index: 998;
    .el-menu{
      background: rgba(0, 0, 0, 0.6);
      border-right: none;
    .el-submenu.is-active, .el-menu-item.is-active{
      background: rgba(0, 0, 0, 0.3);
      .first-menu{
        color: #6c92fa;
      }
    }
    .el-submenu__title{
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
    .el-icon-arrow-down:before{
      color: #fff;
      font-size: 16px;
    }
  }
}
  @media only screen and (max-width: 991px){
    .nav-tabs{
      font-size: 16px;
      .menu{
      display: inline-block;
        .el-icon-menu{
          color: #fff;
          font-size: 25px;
          margin-top: 20px;
        }
      }
    }
    .navList{
      display: none;
    }
    .logo{
      img{
      height: 50px;
      margin: 5px 0 0 0;
    }
      span{
        font-size: 14px;
        margin: 5px 0 0 0;
      }
    }
  }
  @media screen and (max-width: 767px){
    .logo{
      img{
      height: 35px;
      margin: 15px 0 0 0;
      padding-bottom: 15px;
      }
      span{
        font-size: 13px;
      }
    }
    .nav-tabs{
      font-size: 12px;
    }
  }
  @media screen and (max-width: 385px) {
    .logo{
      img{
      height: 30px;
      }
      span{
        font-size: 13px;
      }
    }
    .nav-tabs{
      padding-right: 1px;
    }
  }
}
@media screen and (max-width:1380px){
  .headerComp{
    padding: 0 56px;
  }
}
.headerComp .navList .el-menu--horizontal > .el-menu-item.is-active {
    color: #FFFFFF !important;
}
</style>
