
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
import Vue from 'vue'
import i18n from '../locales/i18n.js'

function showTipMsg (language, error, defaultMsg) {
  let retCode = error.response.data.retCode
  let params = error.response.data.params
  if (retCode) {
    showRetCodeTipMsg(language, retCode, params)
  } else {
    showFilterExceptionTip(error, defaultMsg)
  }
}

function showRetCodeTipMsg (language, retCode, params) {
  if (retCode === 1) {
    Vue.prototype.$message({
      duration: 2000,
      message: i18n.t('common.exceptionServer'),
      type: 'warning'
    })
  } else {
    let resData = null
    let resMap = null
    if (language === 'cn') {
      resData = JSON.parse(sessionStorage.getItem('resCodeInfo')).zh_CN
      resMap = new Map(Object.entries(resData))
    } else {
      resData = JSON.parse(sessionStorage.getItem('resCodeInfo')).en_US
      resMap = new Map(Object.entries(resData))
    }
    getTipMsg(resMap, retCode, params)
  }
}

function getTipMsg (resMap, retCode, params) {
  for (let code of resMap.keys()) {
    if (retCode === Number(code)) {
      let msg = resMap.get(code)
      let msgTip = ''
      if (msg.indexOf('%s') !== -1 && params !== null) {
        for (let param of params) {
          msgTip = msg.replace('%s', param)
          msg = msgTip
        }
      } else {
        msgTip = msg
      }
      showWarningDlg(msgTip)
      return
    }
  }
}

function showWarningDlg (msg) {
  Vue.prototype.$message({
    duration: 2000,
    message: msg,
    type: 'warning'
  })
}

function showFilterExceptionTip (error, defaultMsg) {
  let errorCode = error.response.data.code
  let msg = ''
  switch (errorCode) {
    case 400:
      msg = i18n.t('common.exception400')
      break
    case 401:
      msg = i18n.t('common.exception401')
      break
    case 403:
      msg = i18n.t('common.exception403')
      break
    default:
      msg = defaultMsg
  }
  showWarningDlg(msg)
}

export default {
  showTipMsg
}
