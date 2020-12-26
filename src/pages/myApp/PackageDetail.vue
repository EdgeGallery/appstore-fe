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
  <div
    class="app-detail"
  >
    <div class="app-info">
      <p>{{ $t('store.appPackageInfo') }}</p>

      <div class="information">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            :label="$t('common.appName')"
          />
          <el-table-column
            prop="version"
            :label="$t('common.version')"
          />
          <el-table-column
            prop="industry"
            :label="$t('common.industry')"
          />
          <el-table-column
            prop="type"
            :label="$t('common.type')"
          />
          <el-table-column
            prop="affinity"
            :label="$t('common.affinity')"
          />
          <el-table-column
            :label="$t('store.createTime')"
            width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.createTime.split('.')[0] }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('common.operation')"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                id="appdetail_download"
                @click="download(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('store.download') }}
              </el-button>
              <el-button
                id="appdetail_delete"
                @click="getDelete(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-row :gutter="24">
      <el-col
        :span="18"
        style="position: relative;margin-top:15px;"
      >
        <div
          id="appDetailMd"
          ref="appDetailMd"
          v-if="editorStatus"
        >
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
        <div class="editor">
          <div v-if="!editorStatus">
            <div id="appdetail_detail_doc">
              <el-input
                type="textarea"
                rows="30"
                v-model="editDetails"
              />
            </div>
            <el-button
              id="appdetail_confirm"
              type="primary"
              size="mini"
              style="margin-top: 5px;float: right;"
              @click="confirmEdit"
            >
              {{ $t('common.confirm') }}
            </el-button>
            <el-button
              id="appdetail_cancel"
              type="primary"
              size="mini"
              style="margin-top: 5px;float: right;margin-right: 5px;"
              @click="cancleEdit"
            >
              {{ $t('common.cancel') }}
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <div
            class="provider"
            style="background: white;"
          >
            <p>
              <span>{{ $t('common.provider') }}:</span>
              <span class="name">{{ details.provider }}</span>
            </p>
          </div>
          <div class="box">
            <h4>Try it!</h4>
            <p>
              <el-button
                id="appdetail_platform"
                type="text"
              >
                <a
                  style="color: #409eff"
                  href="https://gitee.com/EdgeGallery"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EdgeGallery Platform</a>
              </el-button>
            </p>
          </div>
          <div
            class="box"
            style="background: white;"
          >
            <h4>Dependency</h4>
            <p>
              <el-button
                id="appdetail_mysql"
                type="text"
                disabled
              >
                MySQl
              </el-button>
            </p>
          </div>
          <div class="box appDetailFileList">
            <el-tree
              :data="appDetailFileList"
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="overflow-x: auto;"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  modifyAppPackageDetailApi,
  getAppFileContentApi,
  downloadAppPakageApi,
  deleteAppPackageApi,
  myApp
} from '../../tools/api.js'

export default {
  components: {
  },
  data () {
    return {
      userName: '',
      editorStatus: true,
      details: '',
      appId: '',
      packageId: '',
      tableData: [],
      appDetailFileList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      editDetails: '',
      source: '',
      showEdit: true,
      filePath: []
    }
  },
  methods: {
    editInfo (title, index) {
      this.editorStatus = false
      this.showEdit = false
    },
    cancleEdit () {
      this.showEdit = true
      this.editorStatus = true
      this.$nextTick(() => {
        this.$refs.appDetailMdArea.innerHTML = this.details.details
      })
    },
    confirmEdit () {
      this.showEdit = true
      let fd = new FormData()
      fd.append('content', this.editDetails)
      modifyAppPackageDetailApi(this.details.packageId, fd)
        .then(res => {
          this.editorStatus = true
          this.details.details = this.source = this.editDetails
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.modifySuccess'),
            type: 'success'
          })
        })
        .catch(() => {
          this.editorStatus = true
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.operationFailed'),
            type: 'warning'
          })
        })
    },
    getTableData (callback) {
      myApp.getPackageDetailApi(this.appId, this.packageId).then(res => {
        let data = res.data
        this.tableData.push(data)
        if (data) {
          this.editDetails = this.source = data.details
          this.appDetailFileList = [JSON.parse(data.format)]
          // this.packageId = data[0].packageId
        }
        callback()
      })
    },
    getParent (nodes) {
      let name = nodes.data.name
      if (!Array.isArray(nodes.parent)) {
        if (name) {
          this.filePath.push(name)
          this.getParent(nodes.parent)
        }
      }
    },
    handleNodeClick (nodeObj, node) {
      this.filePath = []
      if (!nodeObj.childs.length) {
        this.getParent(node)
      }
      if (this.filePath.length) {
        this.filePath.reverse().splice(0, 1)
        let truePath = this.filePath.join(':')
        let fd = new FormData()
        fd.append('filePath', truePath)
        getAppFileContentApi(this.appId, this.packageId, fd).then(res => {
          let data = res.data
          let blankWin = window.open('')
          blankWin.document.write(data)
        }).catch(error => {
          if (error.response.data.code === 403) {
            this.$message({
              duration: 2000,
              message: this.$t('promptMessage.guestUser'),
              type: 'warning'
            })
          } else {
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.fileNotSupport')
            })
          }
        })
      }
    },
    download (row) {
      downloadAppPakageApi(this.appId, row)
    },
    getDelete (row) {
      this.$confirm(this.$t('promptMessage.deletePrompt'), this.$t('promptMessage.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let userId = sessionStorage.getItem('userId')
        let userName = sessionStorage.getItem('userName')
        deleteAppPackageApi(row.appId, row.packageId, userId, userName).then(res => {
          this.$message({
            duration: 2000,
            message: this.$t('promptMessage.deleteSuccess'),
            type: 'success'
          })
          this.dataReload()
          this.$router.push('/myapp')
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
    dataReload () {
      this.tableData = []
      this.editDetails = ''
      this.appDetailFileList = []
      this.editorStatus = true
      this.source = ''
      this.getTableData(function clearData () {
        this.$router.push({ name: 'appstoremyapp' })
      }.bind(this))
    }
  },
  mounted () {
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('myappdetail'))
    this.details = params
    this.appId = this.details.appId
    this.packageId = this.details.packageId
    this.getTableData(function clearData () {})
    this.userName = params.username
  }
}
</script>
<style lang='less' >
.app-detail {
  padding: 0 56px 50px;
  .app-info {
    padding: 32px;
    background: white;
    p {
      font-size: 20px;
      color: #282b33;
      line-height: 24px;
      font-weight: 700;
    }
    .information {
      margin-top: 15px;
      .description {
        .el-textarea__inner {
          color: black !important;
          cursor: auto !important;
          font-family: "Microsoft Yahei", "simsun", "arial", "tahoma", sans-serif;
        }
      }
    }
  }
  .title-margin {
    margin: 15px 0;
  }
  .edit {
    margin-top: -40px;
    margin-right: 55px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
  }

  .editon-icon {
    float: right;
    position: relative;
    top: 20px;
    right: 130px;
    z-index: 10005;
    span{
      padding: 5px 35px;
      border: 1px solid #ddd;
    }
  }
  .right {
    margin-top: 15px;
    .box {
      margin-top: 15px;
      background-color: white;
      padding: 10px;
      .name-margin{
        margin-top: 10px;
      }
      .name {
        margin-left: 10px;
      }
    }
    .provider{
      .name-margin{
        margin-top: 10px;
      }
      .name {
        margin-left: 10px;
      }
    }
    .appDetailFileList {
      font-size: 18px;
      line-height: 24px;
      p {
        line-height: 24px;
      }
      .child {
        p {
          font-size: 16px;
          text-indent: 2rem;
        }
      }
      .subChild {
        p {
          font-size: 14px;
          text-indent: 2rem;
        }
      }
    }
  }
}
</style>
