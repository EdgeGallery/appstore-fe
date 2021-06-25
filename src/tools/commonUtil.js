
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

function showTipMsg (language, zhData, enData, retCode, params) {
  let zhMap = new Map(Object.entries(zhData))
  let enMap = new Map(Object.entries(enData))
  if (language === 'cn') {
    for (let code of zhMap.keys()) {
      if (retCode === Number(code)) {
        let para = zhMap.get(code)
        if (para.indexOf('%s') !== -1) {
          for (let param of params) {
            para = para.replace('%s', param)
          }
        }
        this.$message({
          duration: 2000,
          message: para,
          type: 'warning'
        })
        return
      }
    }
  } else {
    for (let code of enMap.keys()) {
      if (retCode === Number(code)) {
        let para = enMap.get(code)
        if (para.indexOf('%s') !== -1) {
          for (let param of params) {
            para = para.replace('%s', param)
          }
        }
        this.$message({
          duration: 2000,
          message: para,
          type: 'warning'
        })
        return
      }
    }
  }
}

export default {
  showTipMsg
}
