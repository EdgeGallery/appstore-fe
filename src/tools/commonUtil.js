
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
function showTipMsg (language, zhData, enData, retCode, params) {
  let zhMap = new Map(Object.entries(zhData))
  let enMap = new Map(Object.entries(enData))
  if (language === 'cn') {
    getTipMsg(zhMap, retCode, params)
  } else {
    getTipMsg(enMap, retCode, params)
  }
}

function getTipMsg (LanguMap, retCode, params) {
  for (let code of LanguMap.keys()) {
    if (retCode === Number(code)) {
      let para = LanguMap.get(code)
      if (para.indexOf('%s') !== -1) {
        for (let param of params) {
          para = para.replace('%s', param)
        }
      }
      showWarningDlg(para)
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
