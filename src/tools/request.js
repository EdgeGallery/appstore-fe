
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

import axios from 'axios'
import { URL_PREFIX, TEST_URL_PREFIX } from './api'

function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

// type: appstore&developer
function GET (url, params, type = 'store') {
  let baseUrl = URL_PREFIX + url
  if (type !== 'store') {
    baseUrl = TEST_URL_PREFIX + url
  }
  return new Promise((resolve, reject) => {
    axios.get(baseUrl, {
      params: params,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

function DELETE (url, params) {
  let baseUrl = URL_PREFIX + url
  return new Promise((resolve, reject) => {
    axios.delete(baseUrl, {
      params: params,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

function POST (url, params, type = 'store') {
  let baseUrl = URL_PREFIX + url
  if (type !== 'store') {
    baseUrl = TEST_URL_PREFIX + url
  }
  return new Promise((resolve, reject) => {
    axios.post(baseUrl, params, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    }).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export {
  GET,
  POST,
  DELETE,
  getCookie
}
