/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {
  GET,
  GETV2,
  POSTV2,
  POST,
  PUT,
  DELETE,
  getCookie
} from './request.js'

import axios from 'axios'

const URL_PREFIX = '/mec-appstore/mec/appstore/v1/'
const URL_PREFIXV2 = '/mec-appstore/mec/appstore/v2/'

function getCommentsApi (appId, limit, offset) {
  let url = 'apps/' + appId + '/comments?limit=' + limit + '&offset=' + offset
  return GETV2(url)
}

function getAppDetailTableApi (appId, limit, offset) {
  let url = 'apps/' + appId + '/packages?limit=' + limit + '&offset=' + offset
  return GETV2(url)
}

// 查询所有可推广的应用
function getAppPromTableApi (limit, offset, appName, sortType, sortItem) {
  let url = 'packages/pushable?limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=' + sortType + '&sortItem=' + sortItem
  return GETV2(url, '')
}

// 获取图标全量操作信息
function getAppdownAnaApiChart () {
  let url = 'messages'
  return GET(url, '')
}

// 获取操作信息
function getAppdownAnaApi (messageType, limit, offset, appName, sortItem, sortType) {
  let url = 'messages?messageType=' + messageType + '&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortItem=' + sortItem + '&sortType=' + sortType
  return GETV2(url, '')
}

// 获取可以推送的平台信息
function promProviderInfo (curPageSize, offset, appStoreName) {
  let url = 'appstores?limit=' + curPageSize + '&offset=' + offset + '&appStoreName=' + appStoreName
  return GETV2(url, '')
}

// 推送任务
function promTaskApi (packageId, param) {
  let url = 'packages/' + packageId + '/action/push'
  return POST(url, param)
}

// 接收app推送信息
function acceptMsg (messageId) {
  let url = 'messages/' + messageId + '/action/download'
  return GET(url, '')
}

// 删除app推送信息
function deleteMsg (messageId) {
  let url = 'messages/' + messageId
  return DELETE(url, '')
}

// 获取类型为notice的消息
function getAppdownAnaApiByType (limit, offset, appName) {
  let url = 'messages' + '?messageType=NOTICE&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=desc&sortItem=time'
  return GETV2(url, '')
}

// 更新msg读取状态
function updateStatus (messageId) {
  let url = 'messages/' + messageId + '/action/readed'
  return PUT(url, '')
}

// 拉取app
function pullApp (packageId, param) {
  let url = 'packages/' + packageId + '/action/pull'
  return POST(url, param)
}

// 根据appstoreid获取可以拉取app
function getAppByAppstoreIdV1 (appstoreId) {
  let url = 'packages/' + appstoreId + '/pullable'
  return GET(url, '')
}

// 根据appstoreid获取可以拉取app
function getAppByAppstoreId (appstoreId, limit, offset, appName, sortType, sortItem) {
  let url = 'packages/' + appstoreId + '/pullable?limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=' + sortType + '&sortItem=' + sortItem
  return GETV2(url, '')
}

function getAppDetailFileApi (path, id) {
  let url = 'csars/' + id + '/' + path
  return GET(url)
}

function getAppTableApi (params) {
  let url = 'query/apps'
  return POSTV2(url, params)
}

function getAppListApi (appId) {
  let url = 'apps/' + appId
  return GET(url)
}

function startTestApi (appId, userId) {
  let url = 'mec/developer/v1/apps/' + appId + '/action/start-test?userId=' + userId
  return GET(url, '', 'developer')
}

function getTaskListApi (params, userId) {
  let url = 'mec/developer/v1/apps/?userId=' + userId
  return GET(url, params, 'developer')
}

function getSubTasksApi (appId, taskId) {
  let url = 'mec/developer/v1/apps/' + appId + '/task/' + taskId + '/subtasks'
  return GET(url, '', 'developer')
}

function modifyAppPackageDetailApi (csarId, params) {
  let url = 'csars/' + csarId + '/modifymd'
  return POST(url, params)
}

function submitAppCommentApi (appId, params, userId, userName) {
  let url = 'apps/' + appId + '/comments?userId=' + userId + '&userName=' + userName
  return POST(url, params)
}

function incAppDownloadTimesApi (appId, csarId) {
  let url = 'apps/' + appId + '/packages/' + csarId + '/action/download'
  return GET(url)
}

function uploadAppApi (params) {
  let userId = sessionStorage.getItem('userId')
  let userName = sessionStorage.getItem('userName')
  let url = 'apps/' + '?userId=' + userId + '&userName=' + userName
  return POST(url, params)
}

function uploadAppTaskApi (appId, userId, userName) {
  let url = 'mec/developer/v1/apps/' + appId + '/action/upload?userId=' + userId + '&' + 'userName=' + userName
  return POST(url, '', 'developer')
}

function deleteAppApi (appId, userId, userName) {
  let url = 'apps/' + appId + '?userId=' + userId + '&userName=' + userName
  return DELETE(url)
}

function deleteAppPackageApi (appId, csarId, userId, userName) {
  let url = 'apps/' + appId + '/packages/' + csarId + '?userId=' + userId + '&userName=' + userName
  return DELETE(url)
}

function getInterface (language, activeName) {
  let url = ''
  if (language === 'cn') {
    switch (activeName) {
      case '1':
        url = './InterfaceMessage.md'
        break
      case '2':
        url = './InterfaceappQuery2.md'
        break
      case '3-1':
        url = './InterfaceDownload1.md'
        break
      case '3-2':
        url = './InterfaceDownload2.md'
        break
      default:
    }
  } else {
    switch (activeName) {
      case '1':
        url = './InterfaceMessageen.md'
        break
      case '2':
        url = './InterfaceappQuery2en.md'
        break
      case '3-1':
        url = './InterfaceDownload1en.md'
        break
      case '3-2':
        url = './InterfaceDownload2en.md'
        break
      default:
    }
  }
  return axios.get(url)
}

function getDocsApi (language, activeName) {
  let url = ''

  if (language === 'cn') {
    switch (activeName) {
      case 'first':
        url = './APPPackageDefinition1.md'
        break
      case 'second':
        url = './APPPackageDefinition2.md'
        break
      case 'third':
        url = './APPPackageDefinition3.md'
        break
      case 'four':
        url = './APPPackageDefinition4.md'
        break
      case 'five':
        url = './APPPackageDefinition5.md'
        break
      case 'six':
        url = './APPPackageDefinition6.md'
        break
      default:
    }
  } else {
    switch (activeName) {
      case 'first':
        url = './APPPackageDefinition1EN.md'
        break
      case 'second':
        url = './APPPackageDefinition2EN.md'
        break
      case 'third':
        url = './APPPackageDefinition3EN.md'
        break
      case 'four':
        url = './APPPackageDefinition4EN.md'
        break
      case 'five':
        url = './APPPackageDefinition5EN.md'
        break
      case 'six':
        url = './APPPackageDefinition6EN.md'
        break
      default:
    }
  }
  return axios.get(url)
}

function getAppFileContentApi (appId, packageId, params) {
  let url = 'apps/' + appId + '/packages/' + packageId + '/files/'
  return POST(url, params)
}

function downloadAppPakageApi (appId, row) {
  let url = 'apps/' + appId + '/packages/' + row.packageId + '/action/download'
  let URL = URL_PREFIX + url
  window.open(URL)
}

function getUserInfo () {
  let url = '/auth/login-info'
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then(res => {
      resolve(res)
    }, (error) => {
      reject(error)
    })
  })
}

function logoutApi () {
  return axios({
    method: 'POST',
    url: '/logout',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    }
  })
}

let myAppStore = {
  // 新增appstore接口
  addAppStoreApi: function (params) {
    let url = 'appstores'
    return POST(url, params)
  },
  // 编辑appstore接口
  modifyAppStoreApi: function (params, appStoreId) {
    let url = 'appstores/' + appStoreId
    return PUT(url, params)
  },
  // 获取我的appstore
  getMyAppApi: function (curPageSize, offset, appStoreName) {
    let url = 'appstores?limit=' + curPageSize + '&offset=' + offset + '&appStoreName=' + appStoreName
    return GETV2(url, '')
  },
  deleteAppStoreApi: function (appStoreId) {
    let url = 'appstores/' + appStoreId
    return DELETE(url, '')
  }
}

let myApp = {

  // 首页上传接口
  uploadAppPackageApi: function (params) {
    let url = 'apps'
    return POST(url, params)
  },
  // 首页上传大文件接口
  uploadVMAppApi: function (params) {
    let url = 'apps/vm-register'
    return POST(url, params)
  },
  // 获取我的应用
  // getMyAppApi: function (userId) {
  //   let url = 'apps?userId=' + userId
  //   return GET(url)
  // },
  // 获取我的应用包
  getMyAppPackageApi: function (userId, limit, offset, appName, sortItem, sortType) {
    let url = 'packages?userId=' + userId + '&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortItem=' + sortItem + '&sortType=' + sortType
    return GETV2(url)
  },
  getMyAppPackageApiPage: function (userId) {
    let url = 'packages?userId=' + userId
    return GET(url)
  },
  // 测试应用
  testPackageApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId + '/action/test'
    return POST(url)
  },
  // 发布应用
  publishAppApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId + '/action/publish'
    return POST(url)
  },
  // 包的详情
  getPackageDetailApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId
    return GET(url)
  },
  // 修改应用
  modifyAppAttr: function (param, appId, packageId) {
    let url = 'apps/' + appId + '/package/' + packageId
    return PUT(url, param)
  }
}
export {
  getCommentsApi,
  getAppDetailTableApi,
  getAppDetailFileApi,
  getAppTableApi,
  startTestApi,
  getTaskListApi,
  getSubTasksApi,
  modifyAppPackageDetailApi,
  submitAppCommentApi,
  incAppDownloadTimesApi,
  uploadAppTaskApi,
  deleteAppApi,
  deleteAppPackageApi,
  getDocsApi,
  getAppByAppstoreIdV1,
  getInterface,
  getAppFileContentApi,
  downloadAppPakageApi,
  URL_PREFIX,
  URL_PREFIXV2,
  getUserInfo,
  logoutApi,
  uploadAppApi,
  myApp,
  myAppStore,
  getAppPromTableApi,
  getAppdownAnaApi,
  promTaskApi,
  getAppdownAnaApiChart,
  getAppdownAnaApiByType,
  promProviderInfo,
  acceptMsg,
  deleteMsg,
  updateStatus,
  pullApp,
  getAppByAppstoreId,
  getAppListApi
}
