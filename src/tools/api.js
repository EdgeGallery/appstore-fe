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
  GETRESCODE,
  POST,
  PUT,
  PUTV2,
  DELETE,
  getCookie
} from './request.js'

import axios from 'axios'

const URL_PREFIX = '/mec-appstore/mec/appstore/v1/'
const URL_PREFIXV2 = '/mec-appstore/mec/appstore/v2/'
const URL_PREFIX_GATEWAY = '/mec/res/v2/'

function getCommentsApi (appId, limit, offset) {
  let url = 'apps/' + appId + '/comments?limit=' + limit + '&offset=' + offset
  return GETV2(url)
}

function getAppDetailTableApi (appId, limit, offset) {
  let url = 'apps/' + appId + '/packages?limit=' + limit + '&offset=' + offset
  return GETV2(url)
}

// Inquire about all the applications that can be promoted
function getAppPromTableApi (limit, offset, appName, sortType, sortItem) {
  let url = 'packages/pushable?limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=' + sortType + '&sortItem=' + sortItem
  return GETV2(url, '')
}

// Get full operation analysis data
function getAppdownAnaApiChart () {
  let url = 'messages'
  return GET(url, '')
}

// Get operation information
function getAppdownAnaApi (messageType, limit, offset, appName, sortItem, sortType) {
  let url = 'messages?messageType=' + messageType + '&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortItem=' + sortItem + '&sortType=' + sortType
  return GETV2(url, '')
}

// Get platform information that can be pushed
function promProviderInfo (curPageSize, offset, appStoreName) {
  let url = 'appstores?limit=' + curPageSize + '&offset=' + offset + '&appStoreName=' + appStoreName
  return GETV2(url, '')
}

// Push task
function promTaskApi (packageId, param) {
  let url = 'packages/' + packageId + '/action/push'
  return POST(url, param)
}

// Receive app push information
function acceptMsg (messageId) {
  let url = 'messages/' + messageId + '/action/download'
  return GET(url, '')
}

// Delete app push information
function deleteMsg (messageId) {
  let url = 'messages/' + messageId
  return DELETE(url, '')
}

// Get the message of type notice
function getAppdownAnaApiByType (limit, offset, appName) {
  let url = 'messages' + '?messageType=NOTICE&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&sortType=desc&sortItem=time'
  return GETV2(url, '')
}

// Update msg read status
function updateStatus (messageId) {
  let url = 'messages/' + messageId + '/action/readed'
  return PUT(url, '')
}

// Pull app
function pullApp (packageId, param) {
  let url = 'packages/' + packageId + '/action/pull'
  return POST(url, param)
}

// App can be pulled according to appstoreid
function getAppByAppstoreIdV1 (appstoreId) {
  let url = 'packages/' + appstoreId + '/pullable'
  return GET(url, '')
}

// App can be pulled according to appstoreid
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

let Workspace = {
  // �ϴ�Api�ļ�
  submitApiFileApi: function (userId, params) {
    // Post('mec/developer/v1/files?userId=' + userId, params)
    let url = 'files?userId=' + userId
    return POST(url, params)
  }

}
let System = {
  deleteHost: function (hostId) {
    let url = 'system/hosts/' + hostId
    return DELETE(url)
  },
  deleteService: function (params) {
    let url = 'system/capability'
    return DELETE(url, params)
  },
  getLogData: function (hostId) {
    let url = 'system/hosts/' + hostId + '/log'
    return GET(url)
  },
  saveHostInfo: function (params) {
    const func = params.hostId ? PUT : POST
    const path = params.hostId ? `system/hosts/${params.hostId}` : 'system/hosts'
    const data = { ...params }
    return func(path, data)
  },
  saveService: function (params) {
    const func = POST
    const path = 'mec-appstore/mec/appstore/v1/system/capability'
    return func(path, params)
  },
  getHosts: function (params) {
    let url = 'system/hosts'
    return GET(url, params)
  },
  getSerives: function (params) {
    let url = 'system/capability'
    return GET(url, params)
  }
}

function getInterface (language, activeName) {
  let url = ''
  if (language === 'cn') {
    switch (activeName) {
      case '1':
        url = './InterfaceMessage.md'
        break
      case '2':
        url = './InterfaceappQueryApps.md'
        break
      case '2-2':
        url = './InterfaceAppsAPPId.md'
        break
      case '2-3':
        url = './InterfaceAppsPackages.md'
        break
      case '2-4':
        url = './InterfaceAppsPakcageId.md'
        break
      case '2-5':
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
        url = './InterfaceappQueryAppsen.md'
        break
      case '2-2':
        url = './InterfaceAppsAPPIden.md'
        break
      case '2-3':
        url = './InterfaceAppsPackagesen.md'
        break
      case '2-4':
        url = './InterfaceAppsPakcageIden.md'
        break
      case '2-5':
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

function downloadAppPakageApi (appId, row, isDownloadImage) {
  let url = 'apps/' + appId + '/packages/' + row.packageId + '/action/download?isDownloadImage=' + isDownloadImage
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
  // Add appstore
  addAppStoreApi: function (params) {
    let url = 'appstores'
    return POST(url, params)
  },
  // Edit appstore
  modifyAppStoreApi: function (params, appStoreId) {
    let url = 'appstores/' + appStoreId
    return PUT(url, params)
  },
  // get my appstore
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

  // Call webgateWay to get interface response information
  getResponseCodeInfo: function (params) {
    let url = 'error-info?modules=' + params
    return GETRESCODE(url, '')
  },

  // Homepage upload interface
  uploadAppPackageApi: function (params) {
    let url = 'apps'
    return POSTV2(url, params)
  },
  // Homepage upload large file interface
  uploadVMAppApi: function (params) {
    let url = 'apps/vm-register'
    return POST(url, params)
  },
  // Get my app package
  getMyAppPackageApi: function (userId, limit, offset, appName, status, sortItem, sortType) {
    let url = 'packages?userId=' + userId + '&limit=' + limit + '&offset=' + offset + '&appName=' + appName + '&status=' + status + '&sortItem=' + sortItem + '&sortType=' + sortType
    return GETV2(url)
  },
  getMyAppPackageApiPage: function (userId) {
    let url = 'packages?userId=' + userId
    return GET(url)
  },
  // Test application
  testPackageApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId + '/action/test'
    return POST(url)
  },
  // Publish the application
  publishAppApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId + '/action/publish'
    return POST(url)
  },
  // Get package detail
  getPackageDetailApi: function (appId, packageId) {
    let url = 'apps/' + appId + '/packages/' + packageId
    return GET(url)
  },
  // getNodePort
  getNodePort: function (packageId, userId, name, ip) {
    let url = 'apps/show?packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return GET(url)
  },

  // getNodePortStatus
  getNodeStatus: function (packageId, userId, name, ip) {
    let url = 'query/container/workStatus?packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return GET(url)
  },

  // clean test env
  cleanTestEnv: function (packageId, userId, name, ip) {
    let url = 'apps/action/clean?packageId=' + packageId + '&userId=' + userId + '&name=' + name + '&ip=' + ip
    return POST(url)
  },
  modifyAppAttr: function (param, appId, packageId) {
    let url = 'apps/' + appId + '/package/' + packageId
    return PUT(url, param)
  },
  // Edit popular apps
  setHotApp: function (appIds) {
    let url = 'apps/hotapps'
    return PUTV2(url, appIds)
  }
}
export {
  System,
  Workspace,
  getCommentsApi,
  getAppDetailTableApi,
  getAppDetailFileApi,
  getAppTableApi,
  startTestApi,
  getTaskListApi,
  getSubTasksApi,
  modifyAppPackageDetailApi,
  submitAppCommentApi,
  uploadAppTaskApi,
  deleteAppApi,
  deleteAppPackageApi,
  getDocsApi,
  getAppByAppstoreIdV1,
  getInterface,
  downloadAppPakageApi,
  URL_PREFIX,
  URL_PREFIXV2,
  URL_PREFIX_GATEWAY,
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
