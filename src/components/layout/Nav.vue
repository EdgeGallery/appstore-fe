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
  <div class="headerComp">
    <el-row
      :gutter="10"
    >
      <el-col
        :lg="6"
        :md="7"
        :sm="14"
        :xs="13"
      >
        <div class="logo">
          <img
            src="../../assets/images/logo.png"
            class="curp"
            @click="jumpTo('/index')"
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
        >
          <template
            v-for="(item,index) in list"
          >
            <el-submenu
              v-if="item.children && item.children.length"
              :disabled="!item.display"
              :index="item.route"
              :key="item.label"
            >
              <template
                slot="title"
              >
                <span :class="{ active: isActive === index,}">{{ language === 'cn' ? item.labelCn : item.labelEn }}</span>
              </template>
              <el-menu-item
                v-for="(itemChild, indexin) in item.children"
                :index="itemChild.route"
                :key="itemChild.label"
                @click="jumpTo(itemChild.route, index, itemChild.link, itemChild.display)"
              >
                <span :class="{ active: isActive === indexin,}">{{ language === 'cn' ? itemChild.labelCn : itemChild.labelEn }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :disabled="!item.display"
              :index="item.route"
              :key="item.label"
              @click="jumpTo(item.route, index, item.link, item.display)"
            >
              <span :class="{ active: isActive === index,}"> {{ language === 'cn' ? item.labelCn : item.labelEn }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col
        :lg="6"
        :md="5"
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
            @mouseenter="enter"
            @mouseleave="leave"
          >
            <div
              class="el-icon-chat-dot-round"
            />
          </div>
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
          v-show="seen"
          @mouseenter="enter"
          @mouseleave="leave"
        >
          <messageDialog />
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
          text-color="#fff"
          background-color="rgba(0,0,0,0.4)"
          active-text-color="#6c92fa"
          active-color="#6c92fa"
        >
          <el-menu-item
            v-for="(item, index) in list"
            :key="item.label"
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
// import axios from 'axios'
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
          labelEn: 'Warehouse',
          labelCn: '应用仓库',
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
        },
        {
          labelEn: 'AppPromote',
          labelCn: '应用共享',
          route: '/apppromote',
          pageId: '2.1.6',
          display: true,
          link: '',
          children: [
            {
              labelEn: 'App promotion',
              labelCn: '应用推广',
              route: '/apppromotion',
              pageId: '2.1.6.1',
              display: true,
              link: ''
            }, {
              labelEn: 'External App  Management',
              labelCn: '外部应用仓库管理',
              route: '/apppromote',
              pageId: '2.1.6.2',
              display: true,
              link: ''
            }, {
              labelEn: 'Message Center',
              labelCn: '消息中心',
              route: '/msgCenter',
              pageId: '2.1.6.3',
              display: true,
              link: ''
            }
          ]
        }
      ],
      isActive: 0,
      userName: '',
      loginPage: '',
      ifGuest: true,
      menu_small: false,
      seen: false
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
      } else if (path === '/myapp' || path === '/app/test/task' || path === '/report' || path === '/myappdetail' || path === '/atpprocess' || path === '/atptestcase') {
        this.isActive = 2
      } else if (path === '/about') {
        this.isActive = 0
      } else if (path === '/apppromote' || path === '/apppromotion' || path === '/msgCenter' || path === '/right_panel' || path === 'app/prom/task') {
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
    handleSelect (path) {
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
    jumpTo (route, index, link, isUse = true) {
      if (!link) {
        if (!isUse) return ''
        this.$router.push(route)
        this.isActive = index || 0
      } else {
        this.isActive = 0
        this.$router.push('/index')
        window.open(link, '_blank')
      }
      // this.closeMenu()
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
    },
    enter () {
      this.seen = true
    },
    leave () {
      this.seen = false
    },
    jumperToMsgDialog () {
      this.$router.push({ name: 'msgCenter' })
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
    } else if (path === '/apppromote') {
      this.isActive = 4
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
.headerComp {
  height: 65px;
  color: white;
  background: #282b33;

  .logo {
    height: 65px;
    line-height: 65px;
    padding-left: 25px;
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
    .el-menu--horizontal>.el-menu-item.is-active {
      border: none;
      color: #fff;
    }
    .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
        border: none;
        color: #fff;
    }
    .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu.is-active>.el-submenu__title{
        color: #6c92fa;
    }
    span {
      font-size: 20px;
      line-height: 65px;
      margin-right: 0px;
      padding-bottom: 17px;
      vertical-align: bottom;
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
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    span{
      display: inline-block;
      padding: 0 10px;
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
    .el-icon-chat-dot-round{
      color: red;
      position: absolute;
      font-size: 15px;
      margin-top: -7px;
      margin-left: -10px;
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
</style>
