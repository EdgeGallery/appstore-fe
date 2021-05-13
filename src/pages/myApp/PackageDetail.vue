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
  <div class="app-detail">
    <div class="app-info">
      <div class="img-box">
        <img
          :src="appIconPath"
          alt=""
        >
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
            :disabled="currentData.userId===userId ? false : true"
            @click="download(currentData)"
          >
            {{ $t('store.download') }}
          </button>
          <button
            class="delete-button"
            :disabled="currentData.userId===userId ? false : true"
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
      </div>
    </div>
  </div>
</template>
<script>
import {
  modifyAppPackageDetailApi,
  downloadAppPakageApi,
  deleteAppPackageApi,
  myApp,
  URL_PREFIX
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
      currentData: {},
      activeItem: 'demo',
      appDetailFileList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      editDetails: '',
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
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && this.tableData.length !== 0) {
        this.currentData = this.tableData[0]
      }
      return ''
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
        let newDateBegin = this.dateChange(data.createTime)
        data.createTime = newDateBegin
        this.tableData.push(data)
        if (data) {
          this.editDetails = this.source = data.details
          this.appDetailFileList = [JSON.parse(data.format)]
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
        return Y +
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
      }).catch((error) => {
        console.log(error)
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
    this.score = this.details.score
    this.packageId = this.details.packageId
    this.getTableData()
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
        .version {
          flex-direction: column;
          .drop-down {
            background-color: whitesmoke;
            color: black;
            padding: 5px 19px 4px;
            font-size: 16px;
            border: 1px solid gray;
            cursor: pointer
          }
        }
        .version-title {
          flex-grow: 1;
          flex-direction: column;
        }
        .version-value {
          flex-grow: 20;
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
          flex-grow: 10;
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
        font-family: '微软雅黑',arail, sans-serif;
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
  }
}
</style>
