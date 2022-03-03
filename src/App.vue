<!--
  -  Copyright 2020-2022 Huawei Technologies Co., Ltd.
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
  <div
    id="app"
    style="overflow-x:hidden"
  >
    <Navcomp
      class="clearfix"
      @clickLogo="clickLogo"
      @changeLange="changeLange"
      @logout="logout"
      :if-guest-prop="ifGuest"
      :user-name-prop="userName"
      :user-center-page-prop="userCenterPage"
      @beforeLogout="beforeLogout"
      :json-data-prop="jsonData"
      :nav-menu-fontsize-prop="navMenuFontsize"
      :version-prop="version"
    >
      <div
        slot="Message"
      >
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
        <div
          class="popUp"
          v-show="seen && !isCheckAllMsg"
          @mouseenter="enter"
          @mouseleave="leave"
        >
          <Message
            v-if="isAdmin"
            @msgEvent="getMsg"
            @msgCheckAllEvent="checkAllMsg"
          />
        </div>
      </div>
    </Navcomp>
    <router-view
      class="view"
      :key="$route.fullPath"
    />
  </div>
</template>

<script>
import Navcomp from 'eg-view/src/components/EgNav.vue'
import navData from '../src/navData/nav_data.js'
import navDataCn from '../src/navData/nav_data_cn.js'
import { getUserInfo, logoutApi, myApp } from '../src/tools/api.js'
import { PROXY_PREFIX_CURRENTSERVER, PLATFORMNAME_EG } from '../src/tools/constant.js'
import { common } from '../src/tools/comon.js'
import Message from '../src/pages/msgCenter/MessageDialog.vue'
export default {
  name: 'App',
  components: {
    Navcomp,
    Message
  },
  data () {
    return {
      jsonData: [],
      loginPage: '',
      userCenterPage: '',
      menu_small: false,
      screenHeight: document.body.clientHeight,
      timer: false,
      ifGuest: true,
      userName: '',
      showUserInfo: false,
      searchCon: '',
      select: '',
      isScroll: false,
      wsSocketConn: null,
      wsMsgSendInterval: null,
      manualLoggout: false,
      navMenuFontsize: 18,
      seen: false,
      unReadMsgCount: 0,
      isCheckAllMsg: false,
      isAdmin: false,
      version: 'v1.5.1'
    }
  },
  methods: {
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
    clickLogo () {
      this.$router.push('/home')
    },
    changeLange (lang) {
      let language
      if (lang === 'Cn' || lang === 'cn') {
        this.jsonData = navDataCn.mecAppstore
        language = 'cn'
      } else {
        this.jsonData = navData.mecAppstore
        language = 'en'
      }
      this.$i18n.locale = language
      localStorage.setItem('language', language)
    },
    enterLoginPage () {
      let _lang = localStorage.getItem('language')
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER + '&lang=' + _lang
    },
    loginFun () {
      getUserInfo().then(res => {
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('userName', res.data.userName)
        sessionStorage.setItem('accessToken', res.data.accessToken)
        this.loginPage = res.data.loginPage
        let _lang = localStorage.getItem('language')
        this.userCenterPage = res.data.userCenterPage + '?lang=' + _lang
        if (res.data.authorities.indexOf('ROLE_APPSTORE_ADMIN') > -1) {
          sessionStorage.setItem('userNameRole', 'admin')
        } else if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1) {
          sessionStorage.setItem('userNameRole', 'tenant')
        } else {
          sessionStorage.setItem('userNameRole', 'guest')
        }
        this.ifGuest = res.data.userName === 'guest'
        if (!this.ifGuest && res.data.forceModifyPwPage) {
          window.location.href = res.data.forceModifyPwPage
          return
        }
        if (res.data.authorities.indexOf('ROLE_APPSTORE_TENANT') > -1 || res.data.authorities.indexOf('ROLE_APPSTORE_GUEST') > -1) {
          this.isAdmin = false
        } else {
          this.isAdmin = true
        }
        this.showToolchain(this.jsonData)
        const authorities = res.data.authorities || []
        sessionStorage.setItem('userAuthorities', authorities)
        const navJsonData = JSON.parse(JSON.stringify(this.jsonData))
        const validateAuthority = (array) => {
          const newArray = []
          array.forEach(item => {
            const s = { ...item }
            this.handleNavData(item, authorities, newArray, s, validateAuthority)
          })
          return newArray
        }
        this.jsonData = validateAuthority(navJsonData)
        this.startHttpSessionInvalidListener(res.data.sessId)
        this.sendPageLoadedMsg(res.data.userId)
      })
    },
    sendPageLoadedMsg (userId) {
      if (window.parent !== window) {
        let _possibleTopWinOriginUrlList = []
        if (PROXY_PREFIX_CURRENTSERVER) {
          _possibleTopWinOriginUrlList.push(window.location.origin)
        } else {
          _possibleTopWinOriginUrlList.push(common.getPlatformUrlPrefix(PLATFORMNAME_EG))
        }
        _possibleTopWinOriginUrlList.forEach(_possibleTopWinOriginUrl => {
          window.top.postMessage({
            cmd: 'subpageLoaded',
            params: { userId }
          }, _possibleTopWinOriginUrl)
        })
      }
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
    handleSubpageLoadedMsg (eventData) {
      if (eventData.params.userId !== sessionStorage.getItem('userId')) {
        this.$alert(this.$t('nav.accountInconsistent'), this.$t('promptMessage.prompt'), {
          confirmButtonText: this.$t('nav.reLogin'),
          type: 'warning',
          callback: () => {
            this.logout()
          }
        })
      }
    },
    handleNavData (item, authorities, newArray, s, validateAuthority) {
      if (!item.authority || item.authority.some(a => authorities.includes(a))) {
        newArray.push(s)
        if (item.children) {
          s.children = validateAuthority(item.children)
        }
      }
    },
    logout () {
      this.manualLoggout = true
      logoutApi().then(res => {
        this.enterLoginPage()
      }).catch(err => {
        console.log(err)
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
    showToolchain (jsonData) {
      this.userName = sessionStorage.getItem('userName')
      if (this.userName === 'guest') {
        jsonData.forEach(item => {
          if (item.children) {
            item.children.forEach((subItem, subIndex) => {
              if (subItem.name === '个人中心' || subItem.name === 'User Center') {
                item.children.splice(subIndex, 1)
              } else if (subItem.name === '应用共享' || subItem.name === 'App Share') {
                item.children.splice(subIndex, 1)
              } else if (subItem.name === '系统' || subItem.name === 'System') {
                item.children.splice(subIndex, 1)
              }
            })
          }
        })
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
    }
  },
  mounted () {
    this.getResCodeInfo()
    this.loginFun()
    let historyRoute = sessionStorage.getItem('historyRoute')
    if (historyRoute) {
      this.$router.push(historyRoute)
      sessionStorage.setItem('historyRoute', '')
    }
    let lanIndex = window.location.href.search('language')
    if (lanIndex > 0) {
      let lan = window.location.href.substring(lanIndex + 9, lanIndex + 11)
      this.changeLange(lan)
    }
    window.addEventListener('message', (event) => {
      var data = event.data
      if (data.cmd === 'iframeLanguageChange') {
        let lang = data.params.lang
        this.changeLange(lang)
      } else if (data.cmd === 'subpageLoaded') {
        this.handleSubpageLoadedMsg(data)
      }
    })
  },
  watch: {
    '$i18n.locale': function () {
      this.showToolchain(this.jsonData)
      this.loginFun()
    }
  },
  beforeMount () {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'cn')
    }
    let language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = language
    if (language === 'en') {
      this.jsonData = navData.mecAppstore
    } else {
      this.jsonData = navDataCn.mecAppstore
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('historyRoute', this.$route.path)
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
  }
}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: defaultFontLight,
    Arial,
    Helvetica,
    sans-serif !important;
  min-width: 1200px;
  background: #3E279B;
  overflow: auto;
}
.popUp{
    width: 350px;
    height: 300px;
    z-index: 998;
    float: right;
    top:75px;
    right: 214px;
    position:absolute;

}
.el-icon-bell{
      font-size: 22px;
      height: 51px;
      right: 15px;
      position: relative;

}
.el-submenu__title {
  margin-top: 5px !important;
}
.el-icon-chat-round{
  color: red;
  position: absolute;
  font-size: 15px;
  margin-top: -7px;
  margin-left: -13px;
  text-align: center;

}
  .countStyle{
    color: #FFFFF2;
    display: block;
    font-size: 10px;
    position: relative;
    top: -14px;
    transform: scale(0.8) !important;
  transform: translateY(-140%)
}
.countStyleBig{
  color: #FFFFF2;
  display: block;
  font-size: 10px;
  position: relative;
  top: 3px;
  transform: translateY(-170%)
}

.view{
  margin-top: 65px;
  height:calc(100% - 65px);
  // background: white;
}
</style>
