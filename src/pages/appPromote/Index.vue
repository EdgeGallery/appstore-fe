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
  <div class="my-app">
    <eg-banner
      :image-url="bannerImg"
    />
    <eg-bread-crumb :data="breadCrumbData" />
    <div class="padding56">
      <div class="my-app-content">
        <div class="batchProm">
          <el-input
            suffix-icon="el-icon-search"
            v-model="nameQueryVal"
            :placeholder="$t('common.appStoreName')"
            class="search_input"
          />
          <el-button
            id="addAppBtn"
            type="primary"
            class="batchProButton"
            @click="register"
          >
            {{ $t('myApp.addApp') }}
          </el-button>
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
              :cell-class-name="hiddenClass"
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
              :cell-class-name="hiddenClass"
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
        <eg-pagination
          class="paginationStyle"
          :page-num="pageNum"
          :page-size="curPageSize"
          :page-sizes="pageSizes"
          :total="total"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
        <div class="clearfix" />
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="45%"
        :before-close="handleClose"
        :close-on-click-modal="false"
        @close="clearForm"
      >
        <el-row>
          <el-col>
            <el-form
              :model="form"
              ref="form"
              :rules="rules"
              label-width="140px"
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
                >
                  <el-option
                    v-for="(item,index) in types"
                    :key="index"
                    :value="item.value"
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
          class="dialog-footer"
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
import EgBanner from 'eg-view/src/components/EgBanner.vue'
import EgBreadCrumb from 'eg-view/src/components/EgBreadCrumb.vue'
import EgPagination from 'eg-view/src/components/EgPagination.vue'
export default {
  components: {
    appStoreGrid,
    EgBanner,
    EgBreadCrumb,
    EgPagination
  },
  data () {
    return {
      pointNum: 5,
      tableData: [],
      userId: '',
      appPackageData: [],
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
      language: localStorage.getItem('language'),
      bannerImg: 'images/appstorecn.png'
    }
  },
  methods: {
    sizeChange (val) {
      this.curPageSize = val
    },
    currentChange (val) {
      this.pageNumCache = val
    },
    hiddenClass (row) {
      if (row.columnIndex === 5 || row.columnIndex === 0) {
        return 'hiddenClass'
      }
    },
    handleClose () {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    getAppPackageData () {
      this.appPackageData = []
      myAppStore.getMyAppApi(this.userId).then(res => {
        this.appPackageData = res.data
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message({
          duration: 2000,
          message: this.$t('promptMessage.getMyAppFail'),
          type: 'warning'
        })
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
          // 刷新页面
          this.getAppPackageData()
        }).catch(() => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        })
      })
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    updateBreadCrumbData () {
      this.breadCrumbData = [{ name: this.$t('nav.home'), path: '/' }, { name: this.$t('nav.appShare'), path: '/appShare' }, { name: this.$t('nav.externalAppManagement'), path: '' }]
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppPackageData()
    this.updateBreadCrumbData()
    this.language = localStorage.getItem('language')
    this.bannerImg = this.language === 'cn' ? 'images/appstorecn.png' : 'images/appstoreen.png'
  },
  computed: {
    title () {
      if (this.editType === 1) {
        return this.$t('myApp.addApp')
      } else {
        return this.$t('myApp.modifyAppStore')
      }
    },
    rules () {
      return {
        appStoreName: [
          { required: true, message: this.$t('apppromotion.nameCheck'), trigger: 'blur' }
        ],
        appStoreVersion: [
          { required: true, message: this.$t('apppromotion.versionCheck'), trigger: 'blur' }
        ],
        company: [
          { required: true, message: this.$t('apppromotion.companyCheck'), trigger: 'blur' }
        ],
        url: [
          { required: true, message: this.$t('apppromotion.addrCheck'), trigger: 'blur' },
          { pattern: /^((http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(:\d{0,5})?(\/.*)?$/, message: this.$t('promptMessage.normalVerify') }
        ],
        appdTransId: [
          { required: true, message: this.$t('apppromotion.appdCheck'), trigger: 'change' }
        ],
        shortDesc: [
          { required: true, message: this.$t('apppromotion.descriptionCheck'), trigger: 'blur' }
        ]
      }
    },
    findedData: function () {
      if (!this.nameQueryVal) {
        return this.appPackageData
      } else {
        return this.appPackageData.filter((item) => {
          let itemName = item.appStoreName.toLowerCase()
          return itemName.indexOf(this.nameQueryVal.toLowerCase()) !== -1
        })
      }
    },
    total: function () {
      return this.findedData.length
    },
    pageNum: function () {
      if (this.curPageSize * (this.pageNumCache - 1) >= this.total) {
        return 1
      }
      return this.pageNumCache
    },
    currentPageData: function () {
      let calPageNum = this.curPageSize * (this.pageNumCache - 1) >= this.total ? 1 : this.pageNumCache
      let start = this.curPageSize * (calPageNum - 1)
      let end = this.curPageSize * calPageNum
      return this.findedData.slice(start, end)
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.updateBreadCrumbData()
      this.language = localStorage.getItem('language')
      this.bannerImg = this.language === 'cn' ? 'images/appstorecn.png' : 'images/appstoreen.png'
    }
  },
  beforeDestroy () {
    this.clearInterval()
    clearInterval(this.timer)
  }
}
</script>
<style lang='less'>
.my-app {
  .my-app-content {
    background:#fff;
    padding: 20px;
    .packageTable{
      margin: 20px 0;
      display: none;
      .el-table thead{
        th {
          background-color: #eee;
        }
      }
    }
    .paginationStyle{
      float: right;
      margin-top: -20px;
    }
    .batchProm {
      margin-bottom: 5px;
      margin-top: 5px;
      .search_input{
        width: 200px;
        float: right;
      }
    }
  }
  .space>div{
    background: #000;
    height: 300px;
  }
  .el-dialog__footer {
    text-align: center;
  }
}
</style>
