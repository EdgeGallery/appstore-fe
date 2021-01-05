/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
  POST,
  PUT,
  DELETE,
  getCookie
} from './request.js'

import axios from 'axios'

const URL_PREFIX = '/mec-appstore/mec/appstore/v1/'

const APPSTORE_URL_PREFIX = '/mec-appstore/mec/appstore/poke/'

function getCommentsApi (appId) {
  let url = 'apps/' + appId + '/comments'
  return GET(url)
}

function getAppDetailTableApi (appId) {
  let url = 'apps/' + appId + '/packages/'
  return GET(url)
}

// 查询所有可推广的应用
function getAppPromTableApi () {
  let url = 'pushable/packages'
  return GET(url, '', 'appstore')
}

// 获取操作信息
function getAppdownAnaApi () {
  let url = 'messages'
  return GET(url, '', 'appstore')
}

// 获取可以推送的平台信息
function promProviderInfo () {
  let url = 'appstores'
  return GET(url, '', 'appstore')
}

// 推送任务
function promTaskApi (packageId, param) {
  let url = 'pushable/packages/' + packageId + '/action/push'
  return POST(url, param, 'appstore')
}

// 接收app信息
function acceptMsg (messageId) {
  let url = 'messages/' + messageId + '/action/download'
  return GET(url, '', 'appstore')
}

// 获取类型为notice的消息
function getAppdownAnaApiByType () {
  let url = 'messages' + '?messageType=NOTICE'
  return GET(url, '', 'appstore')
}
// 更新msg读取状态
function updateStatus (messageId) {
  let url = 'messages/' + messageId + '/action/readed'
  return PUT(url, '', 'appstore')
}

function getAppDetailFileApi (path, id) {
  let url = 'csars/' + id + '/' + path
  return GET(url)
}

function getAppTableApi (params) {
  let url = 'apps'
  return GET(url, params)
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

// function getMyAppApi (userId) {
//   let url = 'apps?userId=' + userId
//   return GET(url)
// }

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

// function uploadAppPackageApi (params) {
//   let url = 'mec/developer/v1/apps/'
//   return POST(url, params, 'developer')
// }
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

function getDocsApi (language) {
  let url = './APPSTOREDOCSEN.md'
  if (language === 'cn') {
    url = './APPSTOREDOCSCN.md'
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
/*   let url = 'apps/' + appId + '/packages/' + row.csarId + '/action/download'
  incAppDownloadTimesApi(appId, row.csarId).then(res => {})
  let form = document.createElement('form')
  document.getElementsByTagName('body')[0].appendChild(form)
  form.setAttribute('style', 'display:none')
  form.setAttribute('target', '')
  form.setAttribute('method', 'post')
  form.setAttribute('action', URL_PREFIX + url)
  form.submit() */
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
    return POST(url, params, 'appstore')
  },
  // 编辑appstore接口
  modifyAppStoreApi: function (params, appStoreId) {
    let url = 'appstores/' + appStoreId
    return PUT(url, params, 'appstore')
  },
  // 获取我的appstore
  getMyAppApi: function () {
    let url = 'appstores'
    return GET(url, '', 'appstore')
  },
  deleteAppStoreApi: function (appStoreId) {
    let url = 'appstores/' + appStoreId
    return DELETE(url, '', 'appstore')
  }
}

let myApp = {
  // 首页上传接口
  uploadAppPackageApi: function (params) {
    let url = 'apps'
    return POST(url, params)
  },
  // 获取我的应用
  // getMyAppApi: function (userId) {
  //   let url = 'apps?userId=' + userId
  //   return GET(url)
  // },
  // 获取我的应用包
  getMyAppPackageApi: function (userId) {
    let url = 'packages/' + userId
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
  getAppFileContentApi,
  downloadAppPakageApi,
  URL_PREFIX,
  APPSTORE_URL_PREFIX,
  getUserInfo,
  logoutApi,
  uploadAppApi,
  myApp,
  myAppStore,
  getAppPromTableApi,
  getAppdownAnaApi,
  promTaskApi,
  getAppdownAnaApiByType,
  promProviderInfo,
  acceptMsg,
  updateStatus
}
