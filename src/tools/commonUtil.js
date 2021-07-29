
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
function showTipMsg (language, retCode, params, errMsg) {
  if (retCode === 1) {
    Vue.prototype.$message({
      duration: 2000,
      message: errMsg,
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
      if (msg.indexOf('%s') !== -1 && params !== null) {
        for (let param of params) {
          msg.splice(msg.indexOf('%s'), 1, param)
        }
      }
      showWarningDlg(msg)
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

export default {
  showTipMsg
}
