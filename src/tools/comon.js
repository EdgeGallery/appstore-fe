/*
 *  Copyright 2021 Huawei Technologies Co., Ltd.
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
  PLATFORM_LIST,
  PROXY_PREFIX_CURRENTSERVER,
  PORT_CURRENTSERVER,
  DOMAINNAME_CURRENTSERVER
} from './constant.js'

let common = {
  getPlatformUrlPrefix: function (platformName) {
    let _platform = PLATFORM_LIST.find(platformItem => platformItem.name === platformName)

    let _proxyPrefix = _platform ? _platform.proxyPrefix : PROXY_PREFIX_CURRENTSERVER
    let _port = _platform ? _platform.port : PORT_CURRENTSERVER
    let _domainName = _platform ? _platform.port : DOMAINNAME_CURRENTSERVER

    let _originUrl = window.location.origin
    if (PROXY_PREFIX_CURRENTSERVER) {
      return _originUrl + _proxyPrefix
    }

    if (_originUrl.indexOf(PORT_CURRENTSERVER) !== -1) {
      return _originUrl.replace(PORT_CURRENTSERVER, _port)
    } else {
      return _originUrl.replace(DOMAINNAME_CURRENTSERVER, _domainName)
    }
  },
  setDivHeightFun: function (screenHeight, className, otherHeight) {
    let oDiv = document.getElementsByClassName(className)
    if (oDiv[0]) {
      oDiv[0].style.minHeight = (Number(screenHeight) - otherHeight) + 'px'
    }
  },
  formatDate: function (timestamp) {
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    return year + (month < 10 ? '-0' : '-') + month + (day < 10 ? '-0' : '-') + day
  },
  dateChange: function (time) {
    if (time) {
      let date = new Date(Date.parse(time))
      let Y = date.getFullYear()
      let M = date.getMonth() + 1
      let D = date.getDate()
      let H = date.getHours()
      let m = date.getMinutes()
      let s = date.getSeconds()
      return Y + '-' +
    (M > 9 ? M : ('0' + M)) + '-' +
    (D > 9 ? D : ('0' + D)) + ' ' +
    (H > 9 ? H : ('0' + H)) + ':' +
    (m > 9 ? m : ('0' + m)) + ':' +
    (s > 9 ? s : ('0' + s))
    }
  }
}
export {
  common
}
