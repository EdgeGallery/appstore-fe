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
        :lg="6"
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
        :lg="12"
        :md="12"
        class="navList"
      >
        <el-menu
          @select="handleSelect"
          mode="horizontal"
          :unique-opened="true"
          router
          text-color="#fff"
          background-color="#282b33"
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
        :lg="6"
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
            {{ getLanguage }}
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
import { getUserInfo, logoutApi } from '../../tools/api.js'
import messageDialog from '../../pages/msgCenter/MessageDialog.vue'
export default {
  name: 'HeaderComp',
  components: {
    messageDialog
  },
  data () {
    return {
      language: 'cn',
      list: [
        {
          labelEn: 'Home',
          labelCn: '首页',
          route: '/home',
          pageId: '2.1.1',
          display: true,
          link: '',
          index: '4'
        },
        {
          labelEn: 'App Warehouse',
          labelCn: '应用仓库',
          route: '/index',
          pageId: '2.1.3',
          display: true,
          link: '',
          index: '1'
        },
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
          labelEn: 'App Share',
          labelCn: '应用共享',
          route: '/appShare',
          pageId: '2.1.6',
          display: true,
          link: '',
          index: '5',
          children: [
            {
              labelEn: 'External AppStore Management',
              labelCn: '外部应用仓库管理',
              route: '/apppromote',
              pageId: '2.1.6.1',
              display: true,
              link: '',
              index: '5.1'
            }, {
              labelEn: 'App Promote',
              labelCn: '应用推送',
              route: '/apppromotion',
              pageId: '2.1.6.2',
              display: true,
              link: '',
              index: '5.2'
            }, {
              labelEn: 'App Pull',
              labelCn: '应用拉取',
              route: '/appPull',
              pageId: '2.1.6.3',
              display: true,
              link: '',
              index: '5.3'
            }, {
              labelEn: 'Message Center',
              labelCn: '消息中心',
              route: '/msgCenter',
              pageId: '2.1.6.4',
              display: true,
              link: '',
              index: '5.4'
            }, {
              labelEn: 'Operation Analyse',
              labelCn: '操作分析',
              route: '/operationAnalyse',
              pageId: '2.1.6.5',
              display: true,
              link: '',
              index: '5.5'
            }
          ]
        },
        {
          labelEn: 'Docs',
          labelCn: '文档',
          route: '/docs',
          pageId: '2.1.2',
          display: true,
          link: '',
          index: '2'
        }
      ],
      isActive: 0,
      activeIndex: '',
      userName: '',
      loginPage: '',
      userCenterPage: '',
      ifGuest: true,
      isAdmin: false,
      menu_small: false,
      seen: false,
      unReadMsgCount: 0,
      isCheckAllMsg: false
    }
  },
  watch: {
    $route (to, from) {
      this.activeIndex = to.path
      if (to.path === '/detail' && from.path === '/index') {
        this.activeIndex = '/index'
      }
      if (to.path === '/detail' && from.path === '/home') {
        this.activeIndex = '/home'
      } else if (to.path === '/docsInterface' && from.path === '/docs') {
        this.activeIndex = '/docs'
      } else if (to.path === '/docsAPPD' && from.path === '/docs') {
        this.activeIndex = '/docs'
      } else if (to.path === '/docsBeginnerGuide' && from.path === '/docs') {
        this.activeIndex = '/docs'
      }
      this.judgePath(to, from)
      let path = this.$route.path
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
      }).catch(error => {
        this.$message.error(error.message)
      })
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
      window.open(this.userCenterPage)
    },
    judgePath (toPath, fromPath) {
      if ((toPath.path === '/detail' && fromPath.path === '/myapp') || (toPath.path === '/app/test/task' && fromPath.path === '/myapp') || (toPath.path === '/atpreport' && fromPath.path === '/myapp') ||
      (toPath.path === '/myappdetail' && fromPath.path === '/myapp') || (toPath.path === '/atpprocess' && fromPath.path === '/myapp') || (toPath.path === '/atptestcase' && fromPath.path === '/myapp')) {
        this.activeIndex = '/myapp'
      }
      if (toPath.path === '/appShare') {
        this.activeIndex = '/apppromote'
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
    }

  },

  mounted () {
    localStorage.setItem('language', 'cn')
    let path = this.$route.path
    this.judgeRoute(path)
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
      if (res.data.userName === 'guest') {
        this.ifGuest = true
      } else {
        this.ifGuest = false
      }
      if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1 || res.data.authorities.indexOf('ROLE_APPSTORE_GUEST') > -1) {
        this.isAdmin = false
        this.list.splice(3, 1)
      } else {
        this.isAdmin = true
      }
      if (res.data.authorities.indexOf('ROLE_APPSTORE_GUEST') > -1) {
        this.list.splice(2, 1)
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
.headerComp {
  height: 65px;
  color: white;
  background: #282b33;
  position: fixed;
  z-index: 9999;
  width: 100%;
  padding: 0 10%;

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
        font-size: 18px;
        font-weight: 700;
        margin-right: 0px;
        font-family: Microsoft YaHei , sans-serif;
        vertical-align: bottom;
      }
      .el-submenu__title {
        font-size: 18px;
        font-weight: 700;
        font-family: Microsoft YaHei , sans-serif;
      }
      .el-menu--horizontal>.el-submenu .el-submenu__title {
        height: 65px;
        line-height: 65px;
    }
    }
  .nav-tabs {
    padding-right: 20px;
    //height: 65px;
    line-height: 65px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    border-bottom: 0px solid #dee2e6;
    span{
      display: inline-block;
      padding: 0 6px;
      font-size: 14px;
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
    z-index: 999999;
    right: 10px;
    float: right;
    position:absolute;
  }
  .main-sidebar-small{
    position: relative;
    overflow-y: auto;
    z-index: 9999;
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
@media screen and (max-width:1545px){
  .headerComp{
    padding: 0 56px;
  }
}
</style>
