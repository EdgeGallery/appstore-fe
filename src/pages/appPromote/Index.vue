<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
  <div class="my-app outHouse common_bg">
    <div class="outHouseTop">
      <div class="title">
        {{ $t("nav.externalAppManagement") }}
      </div>
      <el-button
        id="addAppBtn"
        type="primary"
        class="addOutStore"
        @click="register"
      >
        {{ $t('myApp.addApp') }}
      </el-button>
    </div>
    <div class="contents">
      <div class="my-app-content">
        <div class="batchProm">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQueryVal"
            @change="queryAppStore"
            :placeholder="$t('common.appStoreName')"
            class="search_input"
          />
        </div>
        <div class="packageTable">
          <el-table
            v-loading="dataLoading"
            :data="currentPageData"
            header-cell-class-name="headerStyle"
          >
            <el-table-column
              prop="appStoreName"
              :label="$t('common.appStoreName')"
              width="300"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="hover"
                  v-if="scope.row.appStoreName.length>20"
                >
                  <div>{{ scope.row.appStoreName }}</div>
                  <div slot="reference">
                    {{ scope.row.appStoreName }}
                  </div>
                </el-popover>
                <div v-else>
                  {{ scope.row.appStoreName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="appStoreVersion"
              :label="$t('common.appStoreVersion')"
            />
            <el-table-column
              prop="company"
              :label="$t('common.company')"
            />
            <el-table-column
              prop="appdTransId"
              :label="$t('common.appdTransId')"
            />
            <el-table-column
              prop="url"
              :label="$t('common.url')"
            />
            <el-table-column
              prop="description"
              :label="$t('common.description')"
              width="300"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="hover"
                  v-if="scope.row.description.length>20"
                >
                  <div>{{ scope.row.description }}</div>
                  <div slot="reference">
                    {{ scope.row.description }}
                  </div>
                </el-popover>
                <div v-else>
                  {{ scope.row.description }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="operation"
              fixed="right"
              :label="$t('myApp.operation')"
              width="200"
            >
              <template slot-scope="scope">
                <el-button
                  id="modifyBtn"
                  @click="modifyApp(scope.row)"
                  type="text"
                >
                  {{ $t('common.modifyApp') }}
                </el-button>
                <el-button
                  id="deleteBtn"
                  type="text"
                  @click="getDelete(scope.row)"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
            <template slot="empty">
              <div>
                <img
                  src="../../assets/images/empty.png"
                  alt=""
                  style="padding: 10px;"
                >
                <p>{{ $t('common.noData') }}</p>
              </div>
            </template>
          </el-table>
        </div>
        <app-store-grid
          v-loading="dataLoading"
          :app-data="currentPageData"
          @modifyApp="modifyApp"
          @deleteApp="getDelete"
        />
        <div class="clearfix" />
        <eg-pagination
          :page-num="pageNumCache"
          :page-size="curPageSize"
          :page-sizes="pageSizes"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
      </div>
      <el-dialog
        class="outAppDialog"
        :visible.sync="dialogVisible"
        width="45%"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @close="clearForm"
      >
        <div class="dialogTitle ">
          <p class="dialogTitle1 " />
          <p class="dialogTitle2">
            {{ this.title }}
          </p>
        </div>
        <el-row>
          <el-col
            :class="{'formLeft':language==='en'}"
          >
            <el-form
              :model="form"
              ref="form"
              :rules="rules"
              :label-width="language === 'cn'?'110px':'130px'"
              style="padding:10px 40px 40px 40px"
            >
              <el-form-item
                :label="$t('common.appStoreName')"
                prop="appStoreName"
              >
                <el-input
                  id="appStoreName"
                  maxlength="20"
                  v-model="form.appStoreName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.appStoreVersion')"
                prop="appStoreVersion"
              >
                <el-input
                  id="appStoreVersion"
                  v-model="form.appStoreVersion"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.company')"
                prop="company"
              >
                <el-input
                  id="company"
                  v-model="form.company"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.url')"
                prop="url"
              >
                <el-input
                  id="url"
                  v-model="form.url"
                  placeholder="example: http://127.0.0.1:8080"
                />
              </el-form-item>
              <el-form-item
                :label="$t('common.appdTransId')"
                prop="appdTransId"
              >
                <el-select
                  id="add_select_types"
                  v-model="form.appdTransId"
                  :placeholder="$t('common.appdTransId')"
                  class="dialogSelect"
                >
                  <el-option
                    v-for="(item,index) in types"
                    :key="index"
                    :value="language === 'cn' ? item.value :item.label[1]"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('common.description')"
                prop="description"
              >
                <el-input
                  id="port"
                  v-model="form.description"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span
          slot="footer"
          class="btns"
        >
          <el-button
            @click="handleClose"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            type="primary"
            @click="confirmToRegister('form')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { TTYPES } from '../../tools/constant.js'
import { myAppStore } from '../../tools/api.js'
import appStoreGrid from './AppStoreGrid.vue'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
import commonUtil from '../../tools/commonUtil.js'
export default {
  components: {
    appStoreGrid,
    EgPagination
  },
  data () {
    const validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.nameCheck')}`))
      } else {
        callback()
      }
    }
    const validateVersion = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.versionCheck')}`))
      } else {
        callback()
      }
    }
    const validateCompany = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.companyCheck')}`))
      } else {
        callback()
      }
    }
    const validateUrl = (rule, value, callback) => {
      let reg = /^((http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:\d{0,5})?(\/.*)?$/
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.addrCheck')}`))
      } else if (!reg.test(value)) {
        callback(new Error(`${this.$t('promptMessage.normalVerify')}`))
      } else {
        callback()
      }
    }
    const validateId = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.appdCheck')}`))
      } else {
        callback()
      }
    }
    const validateDesc = (rule, value, callback) => {
      if (!value) {
        callback(new Error(`${this.$t('apppromotion.descriptionCheck')}`))
      } else {
        callback()
      }
    }
    return {
      pointNum: 5,
      tableData: [],
      userId: '',
      appPackageData: [],
      currentPageData: [],
      dataLoading: false,
      interval: '',
      dialogVisible: false,
      form: {
        appStoreName: '',
        appStoreVersion: '',
        company: '',
        url: '',
        appdTransId: '',
        description: ''
      },
      editType: 1,
      types: TTYPES,
      nameQueryVal: '',
      findAppStoreData: [],
      breadCrumbData: [],
      pageNumCache: 1,
      pageSizes: [8, 16, 24],
      curPageSize: 8,
      offsetPage: sessionStorage.getItem('offsetAppstore') || 0,
      total: 0,
      language: localStorage.getItem('language'),
      bannerImg: 'images/appstorecn.jpg',
      rules: {
        appStoreName: [
          { required: true, validator: validateName }
        ],
        appStoreVersion: [
          { required: true, validator: validateVersion }
        ],
        company: [
          { required: true, validator: validateCompany }
        ],
        url: [
          { required: true, validator: validateUrl }
        ],
        appdTransId: [
          { required: true, validator: validateId }
        ],
        description: [
          { required: true, validator: validateDesc }
        ]
      }
    }
  },
  methods: {
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNumCache = val
      this.offsetPage = this.curPageSize * (this.pageNumCache - 1)
      sessionStorage.setItem('offsetAppstore', this.offsetPage)
      this.getAppPackageData()
    },
    handleClose () {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    queryAppStore () {
      if (this.nameQueryVal.toLowerCase()) {
        this.pageNumCache = 1
      }
      this.getAppPackageData()
    },
    getAppPackageData () {
      let name = this.nameQueryVal.toLowerCase()
      this.appPackageData = []
      myAppStore.getMyAppApi(this.curPageSize, this.offsetPage, name).then(res => {
        this.currentPageData = this.appPackageData = res.data.results
        this.total = res.data.total
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        let defaultMsg = this.$t('promptMessage.getMyAppFail')
        commonUtil.showTipMsg(this.language, error, defaultMsg)
        this.clearInterval()
      })
    },
    clearForm () {
      this.form.appStoreId = ''
      this.form.appStoreName = ''
      this.form.appStoreVersion = ''
      this.form.company = ''
      this.form.url = ''
      this.form.appdTransId = ''
      this.form.description = ''
    },
    register () {
      this.editType = 1
      this.isDisable = false
      this.clearForm()
      this.dialogVisible = true
    },
    createCheckAppstoreName (name) {
      if (this.appPackageData.length > 0) {
        for (let arr of this.appPackageData) {
          if (arr.appStoreName === name) {
            return false
          }
        }
      }
      return true
    },
    modifyCheckAppstoreName (name, id) {
      if (this.appPackageData.length > 1) {
        for (let arr of this.appPackageData) {
          if (arr.appStoreName === name && arr.appStoreId !== id) {
            return false
          }
        }
      }
      return true
    },
    judgeResult (error) {
      if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
        this.$message.error(error.response.data.details[0])
      } else {
        this.$message.error(error.message)
      }
    },
    confirmToRegister (form) {
      let fd = new FormData()
      fd.append('appStoreId', this.form.appStoreId)
      fd.append('appStoreName', this.form.appStoreName)
      fd.append('appStoreVersion', this.form.appStoreVersion)
      fd.append('company', this.form.company)
      fd.append('url', this.form.url)
      fd.append('appdTransId', this.form.appdTransId)
      fd.append('description', this.form.description)
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.editType === 1) {
            if (!this.createCheckAppstoreName(this.form.appStoreName)) {
              this.$message({
                duration: 2000,
                message: this.$t('apppromotion.existSameAppstoreName'),
                type: 'warning'
              })
              return
            }
            myAppStore.addAppStoreApi(fd).then(res => {
              this.$message.success(this.$t('promptMessage.addAppStoreSuccess'))
              this.getAppPackageData()
              this.dialogVisible = false
            }, error => {
              this.judgeResult(error)
            })
          } else {
            if (!this.modifyCheckAppstoreName(this.form.appStoreName, this.form.appStoreId)) {
              this.$message({
                duration: 2000,
                message: this.$t('apppromotion.existSameAppstoreName'),
                type: 'warning'
              })
              return
            }
            myAppStore.modifyAppStoreApi(fd, this.form.appStoreId).then(res => {
              this.$message.success(this.$t('promptMessage.editAppStoreSuccess'))
              this.getAppPackageData()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.message)
            })
          }
          this.$refs.form.resetFields()
          this.dialogVisible = false
        }
      })
    },
    modifyApp (row) {
      this.editType = 2
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.form = middleData
      this.dialogVisible = true
    },
    getDelete (row) {
      this.$confirm(this.$t('promptMessage.deleteAppStore'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        myAppStore.deleteAppStoreApi(row.appStoreId).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.deleteSuccess'),
            type: 'success'
          })
          // Refresh page
          this.getAppPackageData()
        }).catch((error) => {
          let defaultMsg = this.$t('promptMessage.operationFailed')
          commonUtil.showTipMsg(this.language, error, defaultMsg)
        })
      })
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    updateBreadCrumbData () {
      this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.appShare'), path: '/appShare' }, { name: this.$t('nav.externalAppManagement'), path: '' }]
    },
    refreshCurrentData () {
      this.$nextTick(function () {
        this.offsetPage = this.curPageSize * (this.pageNumCache - 1)
        this.currentPageData = []
        this.currentPageData = this.appPackageData
      })
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppPackageData()
    this.updateBreadCrumbData()
    this.language = localStorage.getItem('language')
    this.bannerImg = this.language === 'cn' ? 'images/appstorecn.jpg' : 'images/appstoreen.jpg'
  },
  computed: {
    title () {
      if (this.editType === 1) {
        return this.$t('myApp.addApp')
      } else {
        return this.$t('myApp.modifyAppStore')
      }
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.updateBreadCrumbData()
      this.language = localStorage.getItem('language')
      this.bannerImg = this.language === 'cn' ? 'images/appstorecn.jpg' : 'images/appstoreen.jpg'
    },
    curPageSize: function () {
      this.getAppPackageData()
    },
    offsetPage: function () {
      this.getAppPackageData()
    },
    appPackageData: function () {
      this.refreshCurrentData()
    }
  },
  destroyed () {
    sessionStorage.removeItem('offsetAppstore')
  },
  beforeDestroy () {
    this.clearInterval()
    clearInterval(this.timer)
  }

}
</script>
<style lang='less' scoped>
.outHouse {
  width: 100%;
  .outHouseTop{
    width: 73.64%;
    margin: 51px auto;
    min-width: 1200px;
    height: 63px;
    letter-spacing: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
       font-size: 30px;
       color: #fff;
       font-family:defaultFontBlod, Arial, Helvetica, sans-serif;
    }
    .addOutStore{
      background: #3E279B;
      border: 1px solid rgba(51, 26, 133, 0.5);
      color: #fff;
      padding: 16px 49px;
      border-radius: 16px;
      font-size: 20px;
      box-shadow: inset 0px 0px 6px 0.4px rgba(255,255,255,0.5) !important;
    }
    .addOutStore:hover{
      font-weight: bold;
    }
  }
  .contents {
    width: 73.64%;
    margin: 23px auto 0px;
    min-width: 1200px;
    .formLeft{
      margin-left: 20px;
    }
    .my-app-content {
      border-radius: 16px;
      position: relative;
      min-height: 568px;
      background:rgba(46,20,124,0.7);
      padding: 20px;
      .batchProm{
        width: 200px;
        .el-input{
          margin-left: 40px;
        }
      }
      .packageTable{
        margin: 20px 0;
        display: none;
        .el-table thead{
          th {
            background-color: #eee;
          }
        }
      }
    }
    .pagination {
      float: right;
      justify-content: flex-end;
      display: flex;
      width: 100%;
      padding-right: 64px;
      position:absolute;
      bottom: 30px;
    }
  }
  .space>div{
    background: #000;
    height: 300px;
  }
}
.btns{
  position: relative;
  right: 40px;
  top: -20px;
}
.dialogTitle{
  border-radius: 8px 8px 0 0;
  display: flex;
  margin-left:40px ;
  .dialogTitle1{
    width:9px;
    height:9px;
    border-radius: 50%;
    background-color:#43F6AD;
    margin-right: 14px;
    margin-top: 10px;
  }
  .dialogTitle2{
    margin-bottom: 16px;
    font-size: 18px;
    color: #fff;
    letter-spacing:2px;
  }
}
.el-form-item__content .el-input{
  width: 95% !important;
}
.el-form-item__content .el-select{
  width: 95% !important;
}
div /deep/ .el-dialog__title {
  color: #5E40C8 !important;
}
div /deep/.el-form-item__label {
  color: #fff !important;
  font-size: 14px !important;
  height: 25px;
  line-height: 25px;
}
div /deep/ .el-icon-close:before {
  display: none;
}
div /deep/ .el-form-item .el-form-item__content {
  padding: 7px 10px 0 !important;
}
.dialogSelect{
  border: none !important;
}
.outAppDialog /deep/ .el-input__inner {
  border-radius: 8px !important;
  background: #4E3494 !important;
  border: none !important;
  height: 25px;
  color: #fff !important;
  line-height: 25px;
}
.el-button{
  background: #fff;
  color: #5E40C8;
  border: none;
  border-radius: 10px;
  padding: 8px 24px;
}
.el-button:hover{
  background: #5E40C8;
  color: #fff;
}
div /deep/ .el-form-item__error {
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  left: 30px;
  top:29px
}
div /deep/ .el-icon-arrow-up:before{
  position: relative !important;
  left: -6px !important;
}
</style>
