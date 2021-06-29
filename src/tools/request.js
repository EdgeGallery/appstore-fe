
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

import axios from 'axios'
import { URL_PREFIX, URL_PREFIXV2, URL_PREFIX_GATEWAY } from './api'

function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return (arr[2])
  } else {
    return null
  }
}

function commonGetRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
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

function commonPostRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, {
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

function commonPutRequest (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, {
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

function GET (url, params) {
  let baseUrl = URL_PREFIX + url
  return commonGetRequest(baseUrl, params)
}

function GETRESCODE (url, params) {
  let baseUrl = URL_PREFIX_GATEWAY + url
  return commonGetRequest(baseUrl, params)
}

function GETV2 (url, params) {
  let baseUrl = URL_PREFIXV2 + url
  return commonGetRequest(baseUrl, params)
}

function PUTV2 (url, params) {
  let baseUrl = URL_PREFIXV2 + url
  return commonPutRequest(baseUrl, params)
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

function POST (url, params) {
  let baseUrl = URL_PREFIX + url
  return commonPostRequest(baseUrl, params)
}

function POSTV2 (url, params) {
  let baseUrl = URL_PREFIXV2 + url
  return commonPostRequest(baseUrl, params)
}

function PUT (url, params) {
  let baseUrl = URL_PREFIX + url
  return commonPutRequest(baseUrl, params)
}

export {
  GET,
  GETV2,
  PUTV2,
  POSTV2,
  GETRESCODE,
  POST,
  PUT,
  DELETE,
  getCookie
}
