<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
    <top-bar
      :image-url="bannerImg"
    />
    <div class="padding56">
      <el-breadcrumb
        separator=">"
      >
        <el-breadcrumb-item :to="{ path: '/' }">
          {{ $t('nav.home') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ $t('nav.appShare') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          {{ $t('nav.externalAppManagement') }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="my-app-content">
        <el-row>
          <el-col
            :span="4"
          >
            <div>
              <el-input
                suffix-icon="el-icon-search"
                v-model="nameQuery"
                @change="handleNameQuery"
                :placeholder="$t('common.appStoreName')"
              />
            </div>
          </el-col>
          <el-col
            :span="4"
            :offset="16"
          >
            <el-button
              id="addAppBtn"
              type="primary"
              class="rt"
              @click="register"
            >
              {{ $t('myApp.addApp') }}
            </el-button>
          </el-col>
        </el-row>
        <div class="packageTable">
          <el-table
            v-loading="dataLoading"
            :data="currentPageData"
            border
          >
            <el-table-column
              prop="appStoreName"
              :label="$t('common.appStoreName')"
            />
            <el-table-column
              prop="appStoreVersion"
              :label="$t('common.appStoreVersion')"
            />
            <el-table-column
              prop="company"
              :label="$t('common.company')"
            />
            <el-table-column
              prop="url"
              :label="$t('common.url')"
            />
            <el-table-column
              prop="appdTransId"
              :label="$t('common.appdTransId')"
            />
            <el-table-column
              prop="description"
              :label="$t('common.description')"
            />
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
                  size="small"
                >
                  {{ $t('common.modifyApp') }}
                </el-button>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="getDelete(scope.row)"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          :table-data="findAppStoreData"
          @getCurrentPageData="getCurrentPageData"
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
              label-width="110px"
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
                  placeholder="例如：http://127.0.0.1:8080"
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
            class="standardBtn"
            @click="handleClose"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            class="featureBtn"
            type="primary"
            @click="confirmToRegister('form')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import appList from '../home/AppList.vue'
import { TTYPES } from '../../tools/constant.js'
import { myAppStore } from '../../tools/api.js'
import pagination from '../../components/common/Pagination.vue'
import topBar from '../../components/common/TopBar'
export default {
  components: {
    // appList,
    pagination,
    topBar
  },
  data () {
    return {
      bannerImg: 'images/appstore.png',
      currentPageData: [],
      pointNum: 5,
      tableData: [],
      userId: '',
      appData: [],
      appPackageData: [],
      dataLoading: false,
      interval: '',
      title: this.$t('myApp.addApp'),
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
      rules: {
        appStoreName: [
          { required: true, message: '平台名称不能为空', trigger: 'blur' }
        ],
        appStoreVersion: [
          { required: true, message: '平台版本不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '公司不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: 'IP or URL不能为空', trigger: 'blur' },
          { pattern: /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, message: this.$t('promptMessage.normalVerify') }
        ],
        appdTransId: [
          { required: true, message: '转换器不能为空', trigger: 'change' }
        ],
        shortDesc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      nameQuery: '',
      findAppStoreData: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    getAppData () {
      this.appPackageData = []
      myAppStore.getMyAppApi(this.userId)
        .then(res => {
          this.appData = res.data
          if (this.appData.length === 0) {
            this.dataLoading = false
          } else {
            this.getAppPackageData()
          }
        }, () => {
          this.dataLoading = false
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.getMyAppFail'),
            type: 'warning'
          })
        })
    },
    getAppPackageData () {
      this.appPackageData = []
      myAppStore.getMyAppApi(this.userId).then(res => {
        let data = res.data
        if (data.length === 1) {
          this.appPackageData.push(data[0])
        } else {
          data.forEach(csaritem => {
            this.appPackageData.push(csaritem)
          })
        }
        this.findAppStoreData = this.appPackageData
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
      this.title = this.$t('myApp.addApp')
      this.isDisable = false
      this.clearForm()
      this.dialogVisible = true
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
            myAppStore.addAppStoreApi(fd).then(res => {
              this.$message.success(this.$t('promptMessage.addAppStoreSuccess'))
              this.getAppPackageData()
              this.dialogVisible = false
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else {
                this.$message.error(error.message)
              }
            })
          } else {
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
      this.title = this.$t('myApp.modifyAppStore')
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.form = middleData
      this.dialogVisible = true
    },
    getDelete (row) {
      console.log('*******appStoreId***********= ' + row.appStoreId)
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
      }).catch(() => {
      })
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    handleNameQuery () {
      this.findAppStoreData = this.appPackageData
      this.findAppStoreData = this.findAppStoreData.filter((item) => {
        let itemName = item.appStoreName.toLowerCase()
        return itemName.indexOf(this.nameQuery.toLowerCase()) !== -1
      })
      if (!this.nameQuery) this.findAppStoreData = this.appPackageData
    }
  },
  mounted () {
    this.userId = sessionStorage.getItem('userId')
    this.getAppData()
    // this.getAppPackageData()
    // this.interval = setInterval(() => {
    //   // this.getAppPackageData()
    // }, 30000)
    this.appPackageData = this.currentPageData
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
      .el-table thead{
        th {
          background-color: #eee;
        }
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
