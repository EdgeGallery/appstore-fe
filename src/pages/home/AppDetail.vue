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
          style="width: 100%"
          header-cell-class-name="headerStyle"
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
            :label="$t('common.architecture')"
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
            width="270"
          >
            <template slot-scope="scope">
              <el-button
                id="appdetail_download"
                :disabled="scope.row.userId===userId ? false : true"
                @click="download(scope.row)"
                type="text"
              >
                {{ $t('store.download') }}
              </el-button>
              <el-button
                id="appdetail_detail"
                @click="getDetail(scope.row)"
                type="text"
              >
                {{ $t('common.detail') }}
              </el-button>
              <el-button
                id="appdetail_delete"
                :disabled="scope.row.userId===userId ? false : true"
                @click="getDelete(scope.row)"
                type="text"
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
          <div class="box comments">
            <h4>{{ $t('store.comments') }}</h4>
            <div
              class="commnet-list"
              v-if="!postComment"
            >
              <div
                class="commnet-list-content"
                v-for="item in historyComentsList"
                :key="item.commentTime"
              >
                <div class="flex">
                  <p style="margin-right: 5px;">
                    {{ $t('store.userName') }}:
                  </p>
                  <p>{{ item.user.userName }}</p>
                </div>
                <div class="flex">
                  <p style="margin-right: 5px;">
                    {{ $t('store.score') }}:
                  </p>
                  <p>
                    <el-rate
                      v-model="item.score"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                    />
                  </p>
                </div>
                <div class="flex">
                  <p style="margin-right: 5px;">
                    {{ $t('store.time') }}:
                  </p>
                  <p>{{ item.commentTime.split(' ')[0] }}</p>
                </div>
                <div class="flex">
                  <p style="margin-right: 5px;">
                    {{ $t('store.comments') }}:
                  </p>
                  <p>{{ item.body }}</p>
                </div>
              </div>
              <div
                class="rt clearfix"
                style="margin-top: 10px"
              >
                <el-button
                  id="appdetail_post_comment"
                  type="primary"
                  size="mini"
                  @click="changepostComment"
                >
                  {{ $t('store.comments') }}
                </el-button>
              </div>
              <div class="clearfix" />
            </div>
            <div
              class="submit-comment"
              v-if="postComment"
            >
              <p class="flex">
                <span style="margin-right: 5px;">{{ $t('store.score') }}:</span>
                <el-rate
                  v-model="comments.score"
                  allow-half
                  show-score
                />
              </p>
              <p id="appdetail_comment">
                <span style="margin-bottom: 5px;">{{ $t('store.comments') }}:</span>
                <el-input
                  type="textarea"
                  v-model="comments.message"
                  rows="5"
                  maxlength="200"
                  show-word-limit
                />
              </p>
              <p class="clearfix">
                <el-button
                  id="appdetail_submit_comment"
                  type="primary"
                  size="mini"
                  class="rt"
                  @click="submitComment"
                >
                  {{ $t('store.postComment') }}
                </el-button>
                <el-button
                  id="appdetail_commen_cancel"
                  type="success"
                  size="mini"
                  class="rt"
                  @click="changepostComment"
                  style="margin-right: 5px;"
                >
                  {{ $t('common.cancel') }}
                </el-button>
              </p>
              <div class="clearfix" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="$t('common.detail')"
      class="dialogdetail"
    >
      <mavon-editor
        v-model="markdownSource"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        default-open="preview"
        :box-shadow="false"
        preview-background="#ffffff"
      />
    </el-dialog>
  </div>
</template>
<script>
import {
  getCommentsApi,
  getAppDetailTableApi,
  modifyAppPackageDetailApi,
  submitAppCommentApi,
  getAppFileContentApi,
  downloadAppPakageApi,
  deleteAppPackageApi
} from '../../tools/api.js'

export default {
  components: {
  },
  data () {
    return {
      userId: sessionStorage.getItem('userId'),
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
      postComment: false,
      comments: {
        score: 0,
        message: ''
      },
      historyComentsList: [],
      source: '',
      showEdit: true,
      filePath: [],
      markdownSource: '',
      dialogVisible: false
    }
  },
  // watch: {
  //   $route (to, from) {
  //     console.log(111)
  //     // handler: function (val) {
  //     //   console.log(val)
  //     // },
  //     // deep: true,
  //     // immediate: true
  //   }
  // },
  beforeRouteLeave (to, from, next) {
    console.log(from.path)
    sessionStorage.setItem('fromPath', from.path)
    next(true)
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
    changepostComment () {
      this.postComment = !this.postComment
      let userName = sessionStorage.getItem('userName')
      this.historyComentsList.forEach((item) => {
        if (item.user.userName === userName) {
          this.postComment = false
          this.$message({
            duration: 2000,
            type: 'warning',
            message: this.$t('promptMessage.cannotComment')
          })
        }
      })
    },
    submitComment () {
      if (this.comments.score && this.comments.message) {
        let params = {
          score: this.comments.score,
          body: this.comments.message
        }
        params = JSON.stringify(params)
        /*         let fd = new FormData()
        Object.keys(params).forEach(item => {
          fd.append(item, params[item])
        }) */
        let userId = sessionStorage.getItem('userId')
        let userName = sessionStorage.getItem('userName')
        submitAppCommentApi(this.appId, params, userId, userName).then(res => {
          this.changepostComment()
          this.getComments()
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
              message: this.$t('promptMessage.subCommentFail'),
              type: 'warning'
            })
          }
        })
      } else {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.subCommentFailReason')
        })
      }
    },
    getComments () {
      getCommentsApi(this.appId).then(res => {
        this.historyComentsList = res.data
      }, () => {
        this.$message({
          duration: 2000,
          type: 'warning',
          message: this.$t('promptMessage.getCommentFail')
        })
      })
    },
    getTableData (callback) {
      getAppDetailTableApi(this.appId).then(res => {
        let data = res.data
        data.forEach(item => {
          let newDateBegin = this.dateChange(item.createTime)
          item.createTime = newDateBegin
          this.tableData.push(item)
        }, () => {
        })
        if (data.length !== 0) {
          this.editDetails = this.source = data[0].details
          this.appDetailFileList = [JSON.parse(data[0].format)]
          this.packageId = data[0].packageId
        }
        callback()
      })
    },
    dateChange (dateStr) {
      if (dateStr) {
        let date = new Date(Date.parse(dateStr))
        let Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let H = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        let changeDate =
          Y +
          '-' +
          (M > 9 ? M : '0' + M) +
          '-' +
          (D > 9 ? D : '0' + D) +
          ' ' +
          (H > 9 ? H : '0' + H) +
          ':' +
          (m > 9 ? m : '0' + m) +
          ':' +
          (s > 9 ? s : '0' + s)
        return changeDate
      }
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
          if (data) {
            this.dialogVisible = true
            if (nodeObj.name.indexOf('.md') >= 0) {
              this.markdownSource = res.data
            } else if (nodeObj.name.indexOf('.tgz') >= 0) {
              this.markdownSource = this.$t('promptMessage.fileNotSupport')
            } else {
              this.markdownSource = '```yaml\r\n' + res.data + '\r\n```'
            }
          } else {
            this.markdownSource = ''
            this.$message({
              duration: 2000,
              type: 'warning',
              message: this.$t('promptMessage.fileEmpty')
            })
          }
        }).catch(error => {
          this.dialogVisible = false
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
              message: this.$t('promptMessage.getfail')
            })
          }
        })
      }
    },
    download (row) {
      downloadAppPakageApi(this.appId, row)
    },
    getDetail (row) {
      this.editDetails = this.source = row.details
      this.appDetailFileList = [JSON.parse(row.format)]
      this.packageId = row.packageId
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
      this.historyComentsList = []
      this.getTableData(function clearData () {
        if (this.tableData.length > 0) {
          this.getComments()
        } else {
          this.$router.push({ name: 'appstorename' })
        }
      }.bind(this))
    }
  },
  mounted () {
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('appstordetail'))
    this.details = params
    this.appId = this.details.appId
    this.getTableData(function clearData () {})
    this.getComments()
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
    .provider {
      padding: 10px;
      .name-margin{
        margin-top: 10px;
      }
      .name {
        margin-left: 10px;
      }
    }
    .comments {
      p {
        margin-top: 10px;
        padding-left: 10px;
      }
      .commnet-list {
        padding-top: 10px;
        padding-left: 10px;
        .commnet-list-content {
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
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
  .dialogdetail{
    .el-dialog__close {
      color: #fff;
    }
  }
}
</style>
