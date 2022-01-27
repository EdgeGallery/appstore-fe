<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div class="hostManagement">
    <div class="sandboxTop">
      <p class="sandebox_title defaultFontBlod">
        {{ $t('nav.systemHost') }}
      </p>
      <p
        class="addSandbox_btn hover_pointer"
        @click="handleShowForm(defaultForm)"
      >
        {{ $t('system.addHost') }}
      </p>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="onClose"
    >
      <div
        slot="title"
        class="title_content"
      >
        <p class="title_line" />
        <p class="defaultFontLight title_name">
          {{ form.hostId ? $t('system.modify') : $t('system.addHost') }}
        </p>
      </div>
      <el-form
        v-show="visible"
        :model="form"
        ref="form"
        :rules="rules"
        :label-width="language==='cn'?formLabelWidth:formLabelWidthEn"
        label-position="right"
      >
        <el-form-item
          :label="$t('system.name')"
          prop="name"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.inPort')"
          prop="port"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.port"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.lcmIp')"
          prop="lcmIp"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.lcmIp"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.mecHost')"
          prop="mecHost"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.mecHost"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.status')"
          prop="status"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.status"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.protocol')"
          prop="protocol"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.protocol"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in protocolOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.architecture')"
          prop="architecture"
          class="w50"
        >
          <el-select
            size="small"
            v-model="form.architecture"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in architectureOptions"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('system.portRange')"
          prop="portRangeMin"
          class="w50"
        >
          <el-input
            size="small"
            v-model="form.portRangeMin"
            class="port_input"
          />
          <span class="port_span">-</span>
          <el-input
            size="small"
            v-model="form.portRangeMax"
            class="port_input"
          />
        </el-form-item>
        <el-form-item
          :label="$t('nav.system')"
          prop="os"
        >
          <el-radio-group
            v-model="form.os"
            class="default_radio"
            @change="changeOs"
          >
            <el-radio label="K8S">
              K8S
            </el-radio>
            <el-radio label="OpenStack">
              OpenStack
            </el-radio>
            <el-radio label="FusionSphere">
              FusionSphere
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('system.address')"
          prop="address"
        >
          <el-input
            type="textarea"
            size="small"
            v-model="form.address"
          />
        </el-form-item>
        <el-form-item
          :label="$t('system.networkConfig')"
          v-if="showOther"
        >
          <el-input
            size="small"
            v-model="form.parameter"
          >
            <span
              slot="suffix"
              @click="addMore"
              class="view_more_btn"
            >
              {{ $t('common.check') }}</span>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="configId"
          :label="$t('system.config_id')"
        >
          <el-upload
            action=""
            :file-list="configId_file_list"
            :limit="1"
            :auto-upload="false"
            :on-change="(file) => { handleUpload('configId', file) }"
            :on-exceed="handleExceed"
            :on-remove="(file) => { handleRemove('configId', file) }"
          >
            <el-button
              slot="trigger"
              size="medium"
              plain
              class="uploadFile"
            >
              {{ $t('system.upload') + $t('system.config_id') }}
            </el-button>
            <el-tooltip
              effect="dark"
              :content="this.$t('system.typeConfig')"
              placement="right"
            >
              <span class="default_info_promt">i</span>
            </el-tooltip>
          </el-upload>
        </el-form-item>
        <el-dialog
          :visible.sync="innerVisible"
          :close-on-click-modal="false"
          append-to-body
          class="other_setting"
        >
          <div
            slot="title"
            class="title_content"
          >
            <p class="title_line" />
            <p class="defaultFontLight title_name">
              {{ $t('system.networkConfig') }}
            </p>
            <em
              v-if="true"
              class="el-icon-circle-plus-outline rt editBtn"
              @click="addListData"
            />
          </div>
          <div class="innerVisible_div">
            <p
              v-for="(item,index) in otherData"
              :key="index"
              class="container clear"
            >
              <el-input
                type="text"
                size="small"
                v-model="item.name"
              />
              <span class="equal">=</span>
              <el-input
                type="text"
                size="small"
                v-model="item.value"
              />
              <em
                v-if="true"
                class="el-icon-delete editBtn"
                @click="deleteListData(index)"
              />
            </p>
          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="confirmData"
              class="cancle_btn"
            >{{ $t('common.confirm') }}</el-button>
            <el-button
              @click="innerVisible=false"
              class="cancle_btn btnMargin"
            >{{ $t('common.cancel') }}</el-button>
          </span>
        </el-dialog>
      </el-form>
      <div
        v-show="visible"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          :loading="loading"
          @click="onSubmit"
          class="cancle_btn"
        >
          {{ $t('common.confirm') }}
        </el-button>
        <el-button
          @click="visible = false"
          class="cancle_btn btnMargin"
        >
          {{ $t('common.cancel') }}
        </el-button>
      </div>
    </el-dialog>
    <div class="list clear">
      <div class="title">
        <span>
          <el-input
            size="medium"
            v-model="enterQuery"
            :placeholder="$t('system.name')"
            class="search_input"
            @keyup.enter.native="searchListData"
            @clear="searchListData"
            @change="searchListData"
            suffix-icon="el-icon-search"
          />
        </span>
      </div>
      <el-table
        v-loading="loading"
        row-key="hostId"
        :data="allListData"
        class="common_table"
      >
        <el-table-column
          prop="name"
          :label="$t('system.name')"
          min-width="11%"
        />
        <el-table-column
          prop="os"
          :label="$t('nav.system')"
          min-width="9%"
        />
        <el-table-column
          prop="lcmIp"
          :label="$t('system.lcmIp')"
          min-width="10%"
        />
        <el-table-column
          prop="mecHost"
          :label="$t('system.mecHost')"
          min-width="15%"
        />
        <el-table-column
          prop="port"
          :label="$t('system.inPort')"
          min-width="11%"
        />
        <el-table-column
          prop="protocol"
          :label="$t('system.protocol')"
          min-width="9%"
        />
        <el-table-column
          prop="status"
          :label="$t('system.status')"
          min-width="9%"
        />
        <el-table-column
          prop="architecture"
          :label="$t('system.architecture')"
          min-width="11"
        />
        <el-table-column
          :label="$t('system.operation')"
          min-width="15%"
        >
          <template slot-scope="scope">
            <el-button
              :loading="loading"
              class="common_operationBtn"
              @click="handleShowForm(scope.row)"
            >
              {{ $t('system.modify') }}
            </el-button>

            <el-button
              :loading="loading"
              class="common_operationBtn"
              @click="handleDelete(scope.row)"
            >
              {{ $t('system.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div class="empty_img">
            <p>{{ $t('system.noDataNotice') }}</p>
          </div>
        </template>
      </el-table>
      <div class="pagebar">
        <pagination
          :table-data="allListData"
          :total="listTotal"
          @getCurrentPageData="getCurrentPageData"
          ref="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/common/Pagination.vue'
import { Workspace, System } from '@/tools/api.js'
import { Architecture } from '@/tools/constant.js'
import { common } from '../../tools/comon.js'

export default {
  name: 'HostList',
  components: {
    pagination
  },
  data () {
    const validate = (v, callback, errorMsg, rules) => {
      if (rules) {
        rules.forEach(item => {
          if (!item.rule(v)) {
            return callback(new Error(item.message))
          }
        })
      } else {
        if (v.some(s => [undefined, null, ''].includes(this.form[s]))) {
          return callback(new Error(errorMsg))
        }
      }
      return callback()
    }
    const validateName = (rule, value, callback) => {
      let reg = /^[\s\S]{6,50}$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.name')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}6~50 ${this.$t('system.char')}`))
      } else {
        callback()
      }
    }
    const validateMechost = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.mecHost')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('promptMessage.hostErrorInfo')))
      } else {
        callback()
      }
    }
    const validateLcmIp = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.lcmIp')}`))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('system.ipErrorInfo')))
      } else {
        callback()
      }
    }
    const validateAddress = (rule, value, callback) => {
      let reg = /^[\s\S]{1,100}$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.address')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}1~100 ${this.$t('system.char')}`))
      } else {
        callback()
      }
    }
    const validatePort = (rule, value, callback) => {
      let reg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
      if (!value) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.inPort')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}`))
      } else {
        callback()
      }
    }
    return {
      configId_file_list: [],
      limitSize: 2,
      offsetPage: 0,
      listTotal: 0,
      logData: [],
      protocolOptions: [
        { label: 'http', value: 'http' },
        { label: 'https', value: 'https' }
      ],
      statusOptions: [
        { label: 'NORMAL', value: 'NORMAL' },
        { label: 'BUSY', value: 'BUSY' },
        { label: 'STOP', value: 'STOP' }
      ],
      architectureOptions: Architecture,
      formLabelWidth: '110px',
      formLabelWidthEn: '150px',
      form: {
        port: 31252,
        portRangeMin: '30000',
        portRangeMax: '32000',
        architecture: 'X86',
        protocol: 'https',
        status: 'NORMAL',
        os: 'K8S'
      },
      defaultForm: {
        port: 31252,
        portRangeMin: '30000',
        portRangeMax: '32000',
        architecture: 'X86',
        protocol: 'https',
        status: 'NORMAL',
        os: 'K8S',
        parameter: ''
      },
      rules: {
        name: [
          { required: true, validator: validateName }
        ],
        os: [
          { required: true }
        ],
        mecHost: [
          { required: true, validator: validateMechost }
        ],
        lcmIp: [
          { required: true, validator: validateLcmIp }
        ],
        port: [
          { required: true, validator: validatePort }
        ],
        architecture: [
          { required: true }
        ],
        protocol: [
          { required: true }
        ],
        address: [
          { required: true, validator: validateAddress }
        ],
        status: [
          { required: true }
        ],
        portRangeMin: [{ required: true,
          validator: (r, v, callback) => {
            validate(['portRangeMin', 'portRangeMax'], callback, `${this.$t('system.pleaseInput')}${this.$t('system.portRange')}`, [{ rule: () => {
              return /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMin) && /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/.test(this.form.portRangeMax)
            },
            message: `${this.$t('system.pleaseInput')}${this.$t('system.correct')}${this.$t('system.inPort')}` }])
          } }]
      },
      visible: false,
      allListData: [],
      enterQuery: '',
      loading: false,
      userName: sessionStorage.getItem('userName'),
      userId: sessionStorage.getItem('userId'),
      language: localStorage.getItem('language'),
      innerVisible: false,
      otherData: [],
      screenHeight: document.body.clientHeight,
      currentIndex: -1,
      showOther: false
    }
  },
  mounted () {
    this.setDivHeight()
    this.getListData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    },
    $route (to, from) {
      this.getListData()
    },
    offsetPage (val, oldVal) {
      this.offsetPage = val
      this.getListData()
    },
    limitSize (val, oldVal) {
      this.limitSize = val
      this.getListData()
    }
  },
  methods: {
    changeOs (val) {
      if (val === 'K8S') {
        this.showOther = false
      } else {
        this.showOther = true
      }
    },
    showMoreBtnFun (index) {
      this.currentIndex = index
    },
    setDivHeight () {
      common.setDivHeightFun(this.screenHeight, 'hostManagement', 261)
    },
    addMore () {
      this.innerVisible = true
      this.otherData = []
      let str = this.form.parameter
      if (str) {
        let arrTemp = str.split(';')
        arrTemp.forEach(item => {
          let obj = {
            name: '',
            value: ''
          }
          obj.name = item.split('=')[0]
          obj.value = item.split('=')[1]
          this.otherData.push(obj)
        })
      }
    },
    addListData () {
      let obj = {
        name: '',
        value: ''
      }
      this.otherData.unshift(obj)
    },
    deleteListData (index) {
      this.otherData.splice(index, 1)
    },
    confirmData () {
      let nullMum = 0
      this.otherData.forEach(item => {
        if (item.name === '' || item.value === '') {
          nullMum++
        }
      })
      if (nullMum === 0) {
        let str = ''
        this.otherData.forEach(item => {
          str += item.name + '=' + item.value + ';'
        })
        this.form.parameter = str.substr(0, str.length - 1)
        this.innerVisible = false
      } else {
        this.message.warning(this.$t('system.completeInfo'))
      }
    },
    handleDelete ({ hostId }) {
      this.$confirm(this.$t('system.deleteConfirm'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        System.deleteHost(hostId).finally(() => {
          this.loading = false
          this.getListData()
        })
      })
    },
    onClose () {
      this.visible = false
    },
    onSubmit () {
      this.$refs.form.validate((valid, params) => {
        if (valid) {
          this.loading = true
          if (!this.showOther) {
            this.form.parameter = ''
          }
          System.saveHostInfo({ ...this.form, ...params, userId: this.userId }).then(res => {
            if (res.data) {
              this.$eg_messagebox((this.form.hostId ? this.$t('system.modify') : this.$t('system.addHost')) + this.$t('system.success'), 'success')

              this.onClose()
            } else {
              throw new Error()
            }
          }).catch(() => {
            this.$message({
              duration: 2000,
              type: 'warning',
              customClass: 'zZindex',
              message: this.$t('system.saveFail')
            })
          }).finally(() => {
            this.loading = false
            this.getListData()
          })
        }
      })
    },
    searchListData () {
      sessionStorage.setItem('currentPage', 1)
      this.getListData()
    },
    // Fetch list data
    getListData () {
      this.loading = true
      System.getHosts({ name: this.enterQuery }).then(res => {
        // System.getHosts({ name: this.enterQuery, offset: this.offsetPage, limit: this.limitSize }).then(res => {
        this.allListData = res.data || []
        this.listTotal = res.data.length
      }).finally(() => {
        this.loading = false
      })
    },
    handleRemove (key) {
      this[`${key}_file_list`] = []
      this.form[key] = ''
    },
    handleUpload (key, file) {
      if (file.name.indexOf('.') === -1) {
        this.submitFile(key, [file.raw])
      } else {
        this.configId_file_list = []
        this.$eg_messagebox(this.$t('promptMessage.typeError') + ' , ' + this.$t('promptMessage.typeConfig'), 'warning')
      }
    },
    submitFile (key, fileList) {
      const fd = new FormData()
      fd.append('file', fileList[0])
      this.loading = true
      Workspace.submitApiFileApi(this.userId, fd).then(res => {
        if (res.data.fileId) {
          this[`${key}_file_list`] = fileList
          this.form[key] = res.data.fileId
          this.$eg_messagebox(this.$t('system.uploadSuccess'), 'success')
        } else {
          this.handleRemove(key)
          throw new Error()
        }
      }).catch((error) => {
        if (error && error.response && error.response.data.code === 403) {
          this.$eg_messagebox(this.$t('promptMessage.guestPrompt'), 'warning')
        } else {
          this.$eg_messagebox(this.$t('promptMessage.uploadFailure'), 'error')
        }
        this.handleRemove(key)
      }).finally(() => {
        this.loading = false
      })
    },
    handleExceed () {
      this.$eg_messagebox(this.$t('system.fileExceed'), 'warning')
    },
    handleShowForm (v) {
      this.form = JSON.parse(JSON.stringify(v))
      delete this.form.userName
      if (this.form.os === 'K8S') {
        this.showOther = false
      } else {
        this.showOther = true
      }
      this.configId_file_list = []
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    getCurrentPageData (val, pageSize, start) {
      this.limitSize = pageSize
      this.offsetPage = start
    }
  }
}
</script>

<style lang="less">
.other_setting{
  .el-dialog .el-icon-close:before {
    display: none;
  }
}
.innerVisible_div{
  margin-bottom: 20px;
  .container{
    padding-top: 10px;
    .el-input{
      float: left;
      width: calc((100% - 65px)/2);
    }
    .equal{
      float: left;
      width: 15px;
      height: 32px;
      line-height: 32px;
      margin: 0 10px;
      color:#fff;
    }
    .el-icon-delete{
      color: #ccc;
      width: 30px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      text-align: right;
    }
    .el-icon-delete:hover{
      cursor: pointer;
      color: #5b7ede;
    }
  }

}
.hostManagement {
  margin: 0 13.18%;
  .sandboxTop{
    display: flex;
    justify-content: space-between;
    margin: 51px 0 28px;
    .sandebox_title{
      position: relative;
      color: #fff;
      letter-spacing: 4px;
      font-size: 30px;
    }
    .addSandbox_btn{
      background: #3E279B;
      border: 1px solid rgba(51, 26, 133, 0.5);
      color: #fff;
      padding: 16px 49px;
      border-radius: 16px;
      font-size: 20px;
      box-shadow: inset 0px 0px 1px 1px rgba(255, 255 ,255 ,0.5);
    }
    .addSandbox_btn:hover{
      font-weight: bold;
    }
  }
  .uploadFile{
    background: #4E3494;
    color: #fff;
  }
  .uploadFile:hover{
    background: #fff;
    color: #4E3494;
  }
  .dialog_host .el-dialog{
    min-width: 850px;
  }
  .view_more_btn{
    color: #fff;
    background: #4E3494;
    padding: 2px 8px;
    border-radius: 5px;
    position: relative;
    top: 7px;
    cursor: pointer;
  }
  .view_more_btn:hover{
    color: #4E3494;
    background: #fff;
  }
  .createimage_btn{
    position: absolute;
    right: 0;
    bottom: 30px;
    height: 50px;
    color: #fff;
    font-size: 20px;
    border-radius: 25px;
    padding: 0 35px;
    .new_icon{
      display: inline-block;
      width: 19px;
      height: 19px;
      background: url('../../assets/images/work_new_project.png');
      margin-right: 3px;
      position: relative;
      top: 2px;
    }
  }
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .port_span{
    display: inline-block;
    width: 30px;
    text-align: center;
  }
  .port_input{
    width: calc(50% - 15px);
  }
  .el-form-item__label {
    padding: 0 20px 0 0
  }
  .list {
    border-radius: 16px;
    background: #2E147C;
    padding: 30px 60px;
    box-shadow: 0 0 68px 5px rgba(94,24,200,0.06);
    .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  }
}
.title_content{
    display: flex;
    .title_line{
      position: relative;
      top: 8px;
      width: 9px;
      height: 9px;
      margin-right: 10px;
      border-radius: 50%;
      background: #43F6AD;
    }
    .title_name{
      color: #fff !important;
      font-size: 16px;
    }
  }
.cancle_btn{
  padding: 8px 21px;
  margin-bottom: 25px;
  background: #fff;
  color: #5944C0;
  border-radius: 10px;
  border: none;
  float: right;
  font-size: 14px;
  text-align: center;
}
.cancle_btn:hover{
  background: #5944C0;
  color: #fff;
}
.btnMargin{
  margin-right: 15px !important;
}
.zZindex {
  z-index: 3000 !important;
}
.el-icon-circle-plus-outline:before{
  color: #fff;
  position: relative;
  font-size: 23px !important;
  right: -650px;
}
.pagebar{
  position: relative;
  right: -55px;
}
</style>
