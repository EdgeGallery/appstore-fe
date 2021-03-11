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
  <div class="app_detail padding56">
    <div class="app_info_div">
      <div class="app_icon">
        <img
          :src="appIconPath"
          alt=""
        >
      </div>
      <div class="app_info">
        <p class="app_title">
          {{ currentData.name }}
          <span class="createTime">{{ currentData.createTime }}</span>
        </p>
        <div class="app_version">
          {{ currentData.provider }}
          <span class="fg" />
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
        <p class="app_desc">
          {{ currentData.shortDesc }}
        </p>
        <p class="app_tag clearfix">
          <span class="industry">
            {{ currentData.industry }}
          </span>
          <span class="architecture">
            {{ currentData.affinity }}
          </span>
          <span class="type">
            {{ currentData.type }}
          </span>
        </p>
      </div>
      <div class="app_score">
        <span class="score_num">{{ currentData.score }}</span>
        <el-rate
          v-model="currentData.score"
          disabled
          text-color="#ff9900"
          score-template="{value}"
        />
        <p class="score_btn">
          <el-button
            type="primary"
            class="batchProButton"
            :disabled="ifDownload || currentData.userId===userId ? false : true"
            @click="download(currentData)"
          >
            {{ $t('store.download') }}
          </el-button>
        </p>
      </div>
    </div>
    <div class="app_content">
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          :label="$t('store.introduction')"
          name="introduction"
        >
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
            :box-shadow="false"
            preview-background="#ffffff"
          />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('store.comments')"
          name="comments"
        >
          <div class="submit_comment clearfix">
            <span class="score_span">{{ $t('store.score') }}</span>
            <el-rate
              v-model="comments.score"
              allow-half
              show-score
            />
            <div class="comment_input">
              <img
                :src="userIconUrl"
                alt=""
                class="user_icon"
              >
              <el-input
                type="textarea"
                v-model="comments.message"
                rows="5"
                maxlength="200"
                show-word-limit
                :placeholder="$t('store.commentInfo')"
              />
            </div>
            <p class="submit_btn">
              <el-button
                type="primary"
                @click="submitComment"
              >
                {{ $t('myApp.publish') }}
              </el-button>
            </p>
          </div>
          <div
            class="no_comment"
            v-if="historyComentsList.length===0"
          >
            <img
              :src="noCommentIcon"
              alt=""
            >
            <p>
              {{ $t('store.noComment') }}
            </p>
          </div>
          <div
            class="show_comment"
            v-if="historyComentsList.length!==0"
          >
            <ul>
              <li
                v-for="(item,index) in historyComentsList"
                :key="index"
              >
                <div class="user_icon">
                  <img
                    :src="userIconUrl"
                    alt=""
                    v-if="!item.userIconUrl"
                  >
                  <img
                    :src="item.userIconUrl"
                    alt=""
                    v-if="item.userIconUrl"
                  >
                </div>
                <div class="user_info">
                  <p>{{ item.user.userName }}</p>
                  <p class="commentTime">
                    {{ item.commentTime }}
                  </p>
                </div>
                <div class="comment_content">
                  {{ item.body }}
                  <el-rate
                    v-model="item.score"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                    show-score
                  />
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('store.demo')"
          name="demo"
        >
          <video-player
            class="video-player-box vjs-big-play-centered demo-tab"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getCommentsApi,
  getAppDetailTableApi,
  submitAppCommentApi,
  downloadAppPakageApi,
  URL_PREFIX
} from '../../tools/api.js'
export default {
  name: '',
  data () {
    return {
      ifDownload: 'true',
      userId: sessionStorage.getItem('userId'),
      details: '',
      appId: '',
      packageId: '',
      tableData: [],
      currentData: {},
      activeName: 'introduction',
      appDetailFileList: [],
      postComment: false,
      comments: {
        score: 0,
        message: ''
      },
      historyComentsList: [],
      source: '',
      appIconPath: '',
      playerOptions: {
        muted: false,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        language: 'en',
        sources: []
      },
      userIconUrl: require('../../assets/images/app_detail_user.jpg'),
      noCommentIcon: require('../../assets/images/app_detail_info_icon.png')
    }
  },
  watch: {
    tableData: function (val) {
      if (Object.keys(this.currentData).length === 0 && this.currentData.constructor === Object && (this.tableData.length !== 0)) {
        this.currentData = this.tableData.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())[0]
      }
      return ''
    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('fromPath', from.path)
    next(true)
  },
  methods: {
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
        this.handleDate()
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
    handleDate () {
      this.historyComentsList.sort(function (a, b) {
        return b.commentTime < a.commentTime ? -1 : 1
      })
      let year = new Date().getFullYear()
      this.historyComentsList.forEach(item => {
        if (item.commentTime.indexOf(year) !== -1) {
          item.commentTime = item.commentTime.replace((year + '-'), '')
        }
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
    download (row) {
      downloadAppPakageApi(this.appId, row)
    }
  },
  created () {
  },
  mounted () {
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

<style lang="less">
.app_detail{
  p{
    margin-bottom: 0;
  }
  .app_info_div{
    background: #fff;
    padding: 20px;
    display: flex;
    align-items: center;
    .app_icon{
      width: 130px;
      img{
        width: 100%;
      }
    }
    .app_info{
      width: calc(100% - 310px);
      padding: 0 20px;
      word-wrap: break-word;
      .app_title{
        font-size: 26px;
        font-weight: bold;
        .createTime{
          font-size: 14px;
          font-weight: normal;
          color: #666;
          margin-left: 10px;
        }
      }
      .app_version{
        .fg{
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #000;
          margin: 0 10px;
          position: relative;
          top: -3px;
        }
      }
      .app_desc{
        margin: 15px 0;
        line-height: 23px;
      }
      .app_tag{
        span{
          float: left;
          font-size: 14px;
          font-weight: bold;
          border-radius: 5px 0 0 5px;
          padding: 5px 20px 5px 10px;
          margin-right: 20px;
        }
        .industry{
          background: url('../../assets/images/app_detail_industry_bg.png') center right no-repeat #1ececa;
          background-size: contain;
        }
        .architecture{
          background: url('../../assets/images/app_detail_architecture_bg.png') center right no-repeat #fcb722;
          background-size: contain;
        }
        .type{
          background: url('../../assets/images/app_detail_type_bg.png') center right no-repeat #a680d7;
          background-size: contain;
        }
      }
    }
    .app_score{
      width: 180px;
      .score_num{
        float: left;
        width: 35px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 26px;
        font-weight: bold;
        margin-right: 5px;
      }
      .el-rate{
        float: left;
        width: 140px;
        .el-rate__icon{
          font-size: 22px;
          margin: 0 0 0 6px;
        }
      }
      .score_btn{
        float: left;
        width: 100%;
        text-align: center;
        margin-top: 25px;
        .el-button{
          width: 130px;
          border-radius: 0;
        }
      }
    }
  }
  .app_content{
    background: #fff;
    padding: 20px;
    margin-top: 20px;
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
      .el-tabs__item{
        font-size: 16px;
      }
    }
    .el-tabs__nav-wrap::after{
      height: 0;
    }
    .el-tabs__content{
      padding: 0 50px;
    }
    .submit_comment{
      padding: 20px;
      .score_span{
        float: left;
        font-size: 18px;
        font-weight: bold;
      }
      .el-rate{
        float: left;
        margin: 3px 0 0 10px;
        .el-rate__icon{
          font-size: 22px;
        }
      }
      .comment_input{
        float: left;
        width: 100%;
        margin: 40px 0 20px;
        display: flex;
        .user_icon{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .el-textarea__inner{
          height: 80px;
        }
      }
      .submit_btn{
        float: left;
        width: 100%;
        text-align: right;
        .el-button{
          border-radius: 0;
        }
      }
    }
    .no_comment{
      color: #bbb;
      text-align: center;
      p{
        margin: 10px 0 30px;
      }
    }
    .show_comment{
      padding: 20px;
      li{
        border-top: 1px solid #ddd;
        margin-left: 80px;
        padding: 20px 0;
        display: flex;
        // align-items: center;
        .user_icon{
          img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .user_info{
          margin: 0 20px 0 10px;
          min-width: 115px;
          .commentTime{
            font-size: 12px;
            color: #aaa;
          }
        }
        .el-rate{
          margin-top: 5px;
        }
      }
    }
    .video-js{
      width: 80%;
      min-height: 300px;
      margin: 30px auto 50px;
    }
  }
}
</style>
