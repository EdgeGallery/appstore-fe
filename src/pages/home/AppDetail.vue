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
  <div class="app-detail">
    <div class="app-info">
      <div class="img-box">
        <img :src="appIconPath">
      </div>
      <div class="package-detail">
        <p>{{ currentData.name }}</p>
        <div class="app-header">
          <div class="version-title">
            <span>{{ $t('common.version') }}</span>
          </div>
          <div class="version-value">
            <select
              class="drop-down"
              v-model="currentData"
            >
              <option
                v-for="(data, index) in tableData"
                :value="data"
                :key="index"
                @change="updateData"
              >
                {{ data.version }}
              </option>
            </select>
          </div>
          <div class="score-title">
            <span>{{ $t('store.score') }}</span>
          </div>
          <div class="score-value">
            <span>
              <el-rate
                v-model="score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
            </span>
          </div>
        </div>
        <div class="app-desc">
          <span>{{ currentData.shortDesc }}</span>
        </div>
        <div class="information">
          <div class="left-titles">
            <div class="industry-title">
              <span>{{ $t('common.industry') }}</span>
            </div>
            <div class="affinity-title">
              <span>{{ $t('common.architecture') }}</span>
            </div>
          </div>
          <div class="left-values">
            <div class="industry-value">
              <span>{{ currentData.industry }}</span>
            </div>
            <div class="affinity-value">
              <span>{{ currentData.affinity }}</span>
            </div>
          </div>
          <div class="right-titles">
            <div class="type-title">
              <span>{{ $t('common.type') }}</span>
            </div>
            <div class="create-time-title">
              <span>{{ $t('store.createTime') }}</span>
            </div>
          </div>
          <div class="right-values">
            <div class="type-value">
              <span>{{ currentData.type }}</span>
            </div>
            <div class="create-time-value">
              <span>{{ currentData.createTime }}</span>
            </div>
          </div>
        </div>
        <div class="buttons">
          <button
            class="download-button"
            :disabled="ifDownload || currentData.userId===userId ? false : true"
            @click="download(currentData)"
          >
            {{ $t('store.download') }}
          </button>
          <button
            class="delete-button"
            :disabled="ifDelete || currentData.userId===userId ? false : true"
            @click="getDelete(currentData)"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </div>
    </div>
    <div class="doc-detail">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('demo')"
            :class="{ active: isActive('demo') }"
            href="#demo"
          >
            {{ $t('store.demo') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('introduction')"
            :class="{ active: isActive('introduction') }"
            href="#introduction"
          >
            {{ $t('store.introduction') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('comments')"
            :class="{ active: isActive('comments') }"
            href="#comments"
          >
            {{ $t('store.comments') }}
          </a>
        </li>
      </ul>
      <div
        class="tab-content"
        id="myTabContent"
      >
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('demo') }"
          id="demo"
        >
          <video-player
            class="video-player-box vjs-big-play-centered demo-tab"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
          />
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('introduction') }"
          id="introduction"
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
        </div>
        <div
          class="tab-pane fade comments-tab"
          :class="{ 'active show': isActive('comments') }"
          id="comments"
        >
          <div
            class="comment-list"
            v-if="!postComment"
          >
            <div
              class="comment-list-content"
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
    </div>
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
  deleteAppPackageApi,
  URL_PREFIX
} from '../../tools/api.js'

export default {
  components: {
  },
  data () {
    return {
      ifDelete: 'true',
      ifDownload: 'true',
      userId: sessionStorage.getItem('userId'),
      userName: '',
      editorStatus: true,
      details: '',
      appId: '',
      packageId: '',
      tableData: [],
      currentData: {},
      activeItem: 'demo',
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
      appIconPath: '',
      markdownSource: '',
      dialogVisible: false,
      playerOptions: {
        muted: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        language: 'en',
        sources: []
      }
    }
  },
  watch: {
    tableData: function (val) {
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && !(this.tableData.length === 0)) {
        this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
      }
      return ''
    }
  },
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
    updateData (data) {
      this.currentData = data.target.value
    },
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
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
    if ((sessionStorage.getItem('userName') === 'guest') || (sessionStorage.getItem('userName') !== 'guest' && sessionStorage.getItem('userName') !== 'admin')) {
      this.ifDelete = false
      this.ifDownload = false
    } else {
      this.ifDelete = true
      this.ifDownload = true
    }
    console.log(this.$route.params.item)
    let params = this.$route.params.item
      ? this.$route.params.item
      : JSON.parse(sessionStorage.getItem('appstordetail'))
    this.details = params
    this.appId = this.details.appId
    this.score = this.details.score
    this.getTableData(function clearData () {})
    this.getComments()
    this.userName = params.username
    let val = {
      type: 'video/mp4',
      src: URL_PREFIX + 'apps/' + this.appId + '/demoVideo'
    }
    this.playerOptions.sources.push(val)
    this.appIconPath = URL_PREFIX + 'apps/' + this.appId + '/icon'
  }
}
</script>
<style lang='less' >
.app-detail {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .app-info {
    border: 1px solid gray;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 5px 5px;
    background: white;
    .img-box {
      box-sizing: border-box;
      text-align: left;
      width: 200px;
      img {
        height: 80%;
        width: 100%;
      }
    }
    .package-detail {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      flex-grow: 1;
      p {
        padding: 5px 5px 5px;
        font-size: 20px;
        color: black !important;
        line-height: 23px;
        font-weight: 700;
        font-family: "Microsoft Yahei", "simsun", "arial", "tahoma", sans-serif;
      }
      span {
        display: inline-block;
        height: 28px;
        white-space:pre;
      }
      .app-header {
        padding: 5px 5px 5px;
        display: flex;
        flex-wrap: wrap;
        .version-title {
          flex-grow: 1;
          flex-direction: column;
        }
        .version-value {
          flex-grow: 16;
          flex-direction: column;
          align-content: left;
          .drop-down {
            background-color: whitesmoke;
            color: black;
            padding: 5px 19px 4px;
            font-size: 16px;
            border: 1px solid gray;
            cursor: pointer
          }
        }
        .score-title {
          flex-grow: 1;
          flex-direction: column;
        }
        .score-value {
          flex-grow: 1;
          flex-direction: column;
        }
      }
      .app-desc {
        border: 1px solid rgba(95, 92, 92, 0.2);
        padding: 10px 10px 10px;
      }
      .information {
        display: flex;
        flex-wrap: wrap;
        .left-titles {
          flex-grow: 1;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 5px 5px 5px;
          .industry-title {
            padding: 5px 5px 5px;
          }
          .affinity-title {
            padding: 5px 5px 5px;
          }
        }
        .left-values {
          flex-grow: 2;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 5px 5px 5px;
          .industry-value {
            padding: 5px 5px 5px;
          }
          .affinity-value {
            padding: 5px 5px 5px;
          }
        }
        .right-titles {
          flex-grow: 1;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 5px 5px 5px;
          .type-title {
            padding: 5px 5px 5px;
          }
          .create-time-title {
            padding: 5px 5px 5px;
          }
        }
        .right-values {
          flex-grow: 15;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          padding: 5px 5px 5px;
          .type-value {
            padding: 5px 5px 5px;
          }
          .create-time-value {
            padding: 5px 5px 5px;
          }
        }
      }
      .buttons {
        display: flex;
        flex-wrap: wrap;
        color: #333;
        background-color:#fff;
        border-radius: 4px;
        font-size: 14px;
        font-family: '微软雅黑',arail;
        cursor: pointer;
        .download-button {
          flex-direction: column;
          padding: 10px 20px 10px;
          background-color: #13ce66;
          color: #fff;
        }
        .delete-button {
          margin-left: 50px;
          flex-direction: column;
          padding: 10px 30px 10px;
          background-color: #c03030;
          color: #fff;
        }
        .delete-button[disabled]{
          border: 1px solid #999999;
          background-color: #cccccc;
          color: #666666;
        }
        .download-button[disabled]{
          border: 1px solid #999999;
          background-color: #cccccc;
          color: #666666;
        }
      }
    }
  }
  .doc-detail {
    border: 1px solid gray;
    .demo-tab {
      background: #fff;
      padding: 30px;
      align-items: center;
      justify-content: center;
      display: flex;
    }
    .comments-tab {
      background: #fff;
      padding: 30px;
      display: flex;
      p {
        margin-top: 10px;
      }
      .comment-list {
        padding-top: 10px;
        .comment-list-content {
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
